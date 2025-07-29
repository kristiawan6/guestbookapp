import { Resend } from "resend";
import { OtpEmail } from "@/emails/otp-email";
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
      console.error('Email service not configured. Please set RESEND_API_KEY environment variable.');
      console.log(`Simulating OTP email send to ${to}: Subject: ${subject}, OTP: ${otp}`);
      return true; // Return true for development/testing purposes
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
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
      console.error('Email service not configured. Please set RESEND_API_KEY environment variable.');
      console.log(`Simulating email send to ${to}: Subject: ${subject}, Message: ${message}`);
      if (attachments) {
        console.log(`Attachments: ${attachments.map(a => a.filename).join(', ')}`);
      }
      return true; // Return true for development/testing purposes
    }

    const emailData: any = {
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 10px 0;">Event Notification</h2>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
            <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">This email was sent from the Guest Management System.</p>
          </div>
        </div>
      `,
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments.map(attachment => {
        const attachmentObj: any = {
          filename: attachment.filename
        };
        
        if (attachment.content) {
          attachmentObj.content = attachment.content;
        }
        
        if (attachment.path) {
          attachmentObj.path = attachment.path;
        }
        
        if (attachment.contentType) {
          attachmentObj.content_type = attachment.contentType;
        }
        
        return attachmentObj;
      });
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
    const fs = await import('fs/promises');
    
    // Read the QR card image and convert to base64
    const imageBuffer = await fs.readFile(qrCardImagePath);
    const base64Image = imageBuffer.toString('base64');
    console.log(`QR card image read successfully, size: ${imageBuffer.length} bytes`);
    
    const attachment: EmailAttachment = {
      content: base64Image,
      filename: `qr-card-${guestName.replace(/\s+/g, '-').toLowerCase()}.png`,
      contentType: 'image/png'
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