import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
const alg = "HS256";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      // Assuming the user model has an email field.
      // If not, this needs to be adjusted.
      // For now, I'll use username as a placeholder.
      username: email,
    },
  });

  if (!user) {
    // Don't reveal if the user exists or not
    return NextResponse.json(
      { message: "If a user with that email exists, a password reset link has been sent." },
      { status: 200 }
    );
  }

  const token = await new SignJWT({ userId: user.id, email: user.username })
    .setProtectedHeader({ alg })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(secret);

  // In a real app, you would send an email with this link
  console.log(`Password reset link: /auth/reset-password?token=${token}`);

  return NextResponse.json(
    { message: "If a user with that email exists, a password reset link has been sent." },
    { status: 200 }
  );
}