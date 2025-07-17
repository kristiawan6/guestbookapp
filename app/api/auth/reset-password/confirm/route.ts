import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { hash } from "bcrypt";
import { apiResponse } from "@/lib/api-response";
import { resetPasswordSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = resetPasswordSchema.safeParse(body);
  if (!validation.success) {
    return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
  }
  const { token, newPassword } = validation.data;

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

    return apiResponse("success", "Password has been reset successfully", null, null, null, 200);
  } catch {
    return apiResponse("error", "Invalid or expired token", null, null, null, 400);
  }
}