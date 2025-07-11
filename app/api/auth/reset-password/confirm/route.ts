import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { hash } from "bcrypt";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json(
      { message: "Token and new password are required" },
      { status: 400 }
    );
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { userId } = payload;

    if (!userId) {
      throw new Error("Invalid token");
    }

    const hashedPassword = await hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId as string },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
  }
}