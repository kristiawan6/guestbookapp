import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/services/whatsappService";
import { sendEmail } from "@/lib/services/emailService";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const { templateId, guestIds, type, eventId } = body;

    // Validate required fields
    if (!templateId || !guestIds || !type || !eventId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the broadcast template
    const template = await prisma.broadcastTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    // Get the selected guests
    const guests = await prisma.guest.findMany({
      where: {
        eventId: eventId,
        id: { in: guestIds },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
      },
    });

    if (guests.length === 0) {
      return NextResponse.json(
        { message: "No guests found" },
        { status: 404 }
      );
    }

    let successCount = 0;
    let failureCount = 0;
    const errors: string[] = [];

    // Send messages based on type
    if (type === "WhatsApp") {
      for (const guest of guests) {
        if (guest.phoneNumber) {
          try {
            // Personalize the message with guest name
            const personalizedContent = template.content.replace(
              /\{\{name\}\}/g,
              guest.name
            );
            
            await sendWhatsAppMessage(guest.phoneNumber, personalizedContent);
            successCount++;
          } catch (error) {
            failureCount++;
            errors.push(`Failed to send WhatsApp to ${guest.name}: ${error}`);
          }
        } else {
          failureCount++;
          errors.push(`${guest.name} has no phone number`);
        }
      }
    } else if (type === "Email") {
      for (const guest of guests) {
        if (guest.email) {
          try {
            // Personalize the message with guest name
            const personalizedContent = template.content.replace(
              /\{\{name\}\}/g,
              guest.name
            );
            const personalizedSubject = template.subject?.replace(
              /\{\{name\}\}/g,
              guest.name
            ) || template.name;
            
            await sendEmail(guest.email, personalizedSubject, personalizedContent);
            successCount++;
          } catch (error) {
            failureCount++;
            errors.push(`Failed to send email to ${guest.name}: ${error}`);
          }
        } else {
          failureCount++;
          errors.push(`${guest.name} has no email address`);
        }
      }
    } else {
      return NextResponse.json(
        { message: "Invalid message type" },
        { status: 400 }
      );
    }

    // Return summary of results
    return NextResponse.json(
      {
        message: "Bulk sending completed",
        summary: {
          total: guests.length,
          successful: successCount,
          failed: failureCount,
          errors: errors.length > 0 ? errors : undefined,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Bulk send error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}