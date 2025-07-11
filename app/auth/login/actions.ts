"use server";

import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please provide both username and password." };
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: { events: true },
  });

  if (!user) {
    return { error: "Invalid username or password." };
  }

  const passwordsMatch = await compare(password, user.password);

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

  (await cookies()).set("token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  if (user.role === "SuperAdmin") {
    redirect("/admin/dashboard");
  } else {
    redirect("/dashboard");
  }
}