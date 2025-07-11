import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/services/whatsappService";
import { sendEmail } from "@/lib/services/emailService";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    const { templateId, recipientType, recipientIds } = await req.json();

    if (!templateId || !recipientType || !recipientIds) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const template = await prisma.broadcastTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    let recipients: { email: string | null; phoneNumber: string | null }[] = [];

    if (recipientType === "all") {
      recipients = await prisma.guest.findMany({
        where: { eventId: params.eventId },
        select: { email: true, phoneNumber: true },
      });
    } else if (recipientType === "category") {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: params.eventId,
          guestCategoryId: { in: recipientIds },
        },
        select: { email: true, phoneNumber: true },
      });
    } else if (recipientType === "individual") {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: params.eventId,
          id: { in: recipientIds },
        },
        select: { email: true, phoneNumber: true },
      });
    }

    if (template.type === "WhatsApp") {
      for (const recipient of recipients) {
        if (recipient.phoneNumber) {
          await sendWhatsAppMessage(recipient.phoneNumber, template.content);
        }
      }
    } else if (template.type === "Email") {
      for (const recipient of recipients) {
        if (recipient.email) {
          await sendEmail(recipient.email, template.name, template.content);
        }
      }
    }

    return NextResponse.json(
      { message: "Broadcast sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}