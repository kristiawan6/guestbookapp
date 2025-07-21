import { NextRequest } from "next/server";
import { apiResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { sendEmail } from "@/lib/services/emailService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return apiResponse("error", "User not found", null, [], null, 404);
    }

    const otp = randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpires,
      },
    });

    await sendEmail(email, "Your OTP for password reset", otp);

    return apiResponse(
      "success",
      "OTP sent successfully",
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