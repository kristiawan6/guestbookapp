"use server";

import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function login(
  prevState: { error?: string; success?: boolean; role?: string } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please provide both username and password." };
  }

  // Trim whitespace and validate input
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (!trimmedUsername || !trimmedPassword) {
    return { error: "Please provide both username and password." };
  }

  const user = await prisma.user.findUnique({
    where: { username: trimmedUsername },
    include: { events: true },
  });

  if (!user) {
    return { error: "Invalid username or password." };
  }

  // Check if user account is active
  if (!user.isActive) {
    return { error: "Your account has been deactivated. Please contact support for assistance." };
  }

  const passwordsMatch = await compare(trimmedPassword, user.password);

  if (!passwordsMatch) {
    return { error: "Invalid username or password." };
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
  const alg = "HS256";

  const jwt = await new SignJWT({
    userId: user.id,
    role: user.role,
    events: user.events.map((e) => e.eventId),
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .setIssuedAt()
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set("token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return { success: true, role: user.role };
}