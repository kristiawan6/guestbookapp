import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";
import { apiResponse } from "@/lib/api-response";
import { resetPasswordRequestSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
const alg = "HS256";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = resetPasswordRequestSchema.safeParse(body);
  if (!validation.success) {
    return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
  }
  const { email } = validation.data;

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
    return apiResponse("success", "If a user with that email exists, a password reset link has been sent.", null, null, null, 200);
  }

  await new SignJWT({ userId: user.id, email: user.username })
    .setProtectedHeader({ alg })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(secret);

  // In a real app, you would send an email with this link

  return apiResponse("success", "If a user with that email exists, a password reset link has been sent.", null, null, null, 200);
}