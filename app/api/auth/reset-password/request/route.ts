import { NextRequest } from "next/server";
import { apiResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { sendOtpEmail } from "@/lib/services/emailService";
import { authenticator } from "otplib";
import QRCode from "qrcode";

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

    let totpSecret = user.totpSecret;
    if (!totpSecret) {
      totpSecret = authenticator.generateSecret();
      await prisma.user.update({
        where: { email },
        data: { totpSecret },
      });
    }
    const otpauth = authenticator.keyuri(email, "GuestbookApp", totpSecret);
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth);
    const otp = randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpires,
      },
    });

    await sendOtpEmail(email, "Your OTP for password reset", otp);

    return apiResponse(
      "success",
      "Scan the QR code with Google Authenticator",
      { qrCodeDataUrl },
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