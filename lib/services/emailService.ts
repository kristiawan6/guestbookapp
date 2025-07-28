import { Resend } from "resend";
import { OtpEmail } from "@/emails/otp-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  otp: string
): Promise<boolean> => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject,
      react: OtpEmail({ otp }) as React.ReactElement,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};