import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await jwtVerify(token, secret);

    // Return environment variables (safe ones only)
    const envVars = {
      EMAIL_FROM: process.env.EMAIL_FROM || "NOT_SET",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT_SET",
      NODE_ENV: process.env.NODE_ENV || "NOT_SET",
      VERCEL_ENV: process.env.VERCEL_ENV || "NOT_SET",
      // Add timestamp to see when this was checked
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      environment: envVars,
      message: "Environment variables checked successfully"
    });
  } catch (error) {
    console.error("Error checking environment:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}