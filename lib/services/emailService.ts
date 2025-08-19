import { Resend } from "resend";
import { OtpEmail } from "@/emails/otp-email";
import { BroadcastEmail } from "@/emails/broadcast-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

// Original OTP email function
export const sendOtpEmail = async (
  to: string,
  subject: string,
  otp: string
): Promise<boolean> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "Email service not configured. Please set RESEND_API_KEY environment variable."
      );
      console.log(
        `Simulating OTP email send to ${to}: Subject: ${subject}, OTP: ${otp}`
      );
      return true; // Return true for development/testing purposes
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "no-reply@williamkristiawan.site",
      to,
      subject,
      react: OtpEmail({ otp }) as React.ReactElement,
    });
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

// Interface for email attachments
interface EmailAttachment {
  content?: string; // Base64 encoded content
  path?: string; // URL to remote file
  filename: string; // Name of the file
  contentType?: string; // MIME type
}

// General email function for bulk messaging
export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
  attachments?: EmailAttachment[]
): Promise<boolean> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "Email service not configured. Please set RESEND_API_KEY environment variable."
      );
      console.log(
        `Simulating email send to ${to}: Subject: ${subject}, Message: ${message}`
      );
      if (attachments) {
        console.log(
          `Attachments: ${attachments.map((a) => a.filename).join(", ")}`
        );
      }
      return true; // Return true for development/testing purposes
    }

    const emailData: {
      from: string;
      to: string;
      subject: string;
      react: React.ReactElement;
      attachments?: EmailAttachment[];
    } = {
      from: process.env.EMAIL_FROM || "no-reply@williamkristiawan.site",
      to,
      subject,
      react: BroadcastEmail({ message }) as React.ReactElement,
    };

    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments
        .filter((att) => att.content) // hanya ambil yang punya base64 content
        .map((att) => ({
          filename: att.filename,
          content: att.content, // wajib base64
          contentType: att.contentType,
        }));
    }

    await resend.emails.send(emailData);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Enhanced email function specifically for QR code cards
export const sendEmailWithQRCard = async (
  to: string,
  subject: string,
  message: string,
  qrCardImagePath: string,
  guestName: string
): Promise<boolean> => {
  try {
    console.log(`Reading QR card image from: ${qrCardImagePath}`);
    const fs = await import("fs/promises");

    // Read the QR card image and convert to base64
    const imageBuffer = await fs.readFile(qrCardImagePath);
    const base64Image = imageBuffer.toString("base64");
    console.log(
      `QR card image read successfully, size: ${imageBuffer.length} bytes`
    );

    const attachment: EmailAttachment = {
      content: base64Image,
      filename: `qr-card-${guestName.replace(/\s+/g, "-").toLowerCase()}.png`,
      contentType: "image/png",
    };

    console.log(`Sending email with attachment: ${attachment.filename}`);
    const result = await sendEmail(to, subject, message, [attachment]);
    console.log(`Email with QR card sent successfully: ${result}`);
    return result;
  } catch (error) {
    console.error("Error sending email with QR card:", error);
    return false;
  }
};
