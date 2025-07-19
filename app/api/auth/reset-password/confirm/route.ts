import { NextRequest } from "next/server";
import { apiResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return apiResponse("error", "User not found", null, [], null, 404);
    }

    if (!user.otpExpires || user.otp !== otp || user.otpExpires < new Date()) {
      return apiResponse("error", "Invalid or expired OTP", null, [], null, 400);
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpires: null,
      },
    });

    return apiResponse(
      "success",
      "Password reset successfully",
      null,
      null,
      null,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Internal Server Error", null, [], null, 500);
  }
}