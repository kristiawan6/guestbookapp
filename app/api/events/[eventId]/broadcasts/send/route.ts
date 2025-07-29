import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/services/whatsappService";
import { sendEmail, sendEmailWithQRCard } from "@/lib/services/emailService";
import { imageProcessingService } from "../../../../../src/services/imageProcessingService";
import { readFile } from "fs/promises";
import path from "path";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
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
        where: { eventId: (await params).eventId },
        select: { email: true, phoneNumber: true },
      });
    } else if (recipientType === "category") {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: (await params).eventId,
          guestCategoryId: { in: recipientIds },
        },
        select: { email: true, phoneNumber: true },
      });
    } else if (recipientType === "individual") {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: (await params).eventId,
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
      // Check if template has QR code card attachment
      if (template.imageAttachmentType === "qr-code-card" && template.imageAttachment) {
        console.log("Processing QR code card template for email broadcast");
        // Get full guest data for QR code processing
        const fullRecipients = await prisma.guest.findMany({
          where: {
            eventId: (await params).eventId,
            id: { in: recipientIds },
            email: { not: null },
            qrCode: { not: null }
          },
          select: { id: true, name: true, email: true, qrCode: true },
        });
        console.log(`Template: ${template.name}, Recipients: ${fullRecipients.length}`);

        // Use the imported imageProcessingService singleton
        
        for (const recipient of fullRecipients) {
          if (recipient.email && recipient.qrCode) {
            try {
              // Download the blank template
              const templateResponse = await fetch(template.imageAttachment);
              if (!templateResponse.ok) {
                console.error(`Failed to download template for ${recipient.name}`);
                continue;
              }
              const templateBuffer = Buffer.from(await templateResponse.arrayBuffer());
              
              // Process QR code template with guest data
               const processedImageBuffer = await imageProcessingService.processQRCodeTemplate({
                 guestData: {
                   id: recipient.id,
                   name: recipient.name,
                   email: recipient.email,
                   phoneNumber: null,
                   address: null,
                   numberOfGuests: null,
                   session: null,
                   tableNumber: null,
                   notes: null,
                   qrCode: recipient.qrCode,
                   invitationLink: null,
                   status: 'Invited' as const,
                   eventId: (await params).eventId,
                   guestCategoryId: null
                 },
                 blankTemplateBuffer: templateBuffer
               });
              
              // Save processed image temporarily
              const tempDir = path.join(process.cwd(), 'temp');
              const tempFileName = `qr-card-${recipient.id}-${Date.now()}.png`;
              const tempFilePath = path.join(tempDir, tempFileName);
              
              // Ensure temp directory exists
              const fs = await import('fs/promises');
              try {
                await fs.mkdir(tempDir, { recursive: true });
              } catch (err) {
                // Directory might already exist
              }
              
              await fs.writeFile(tempFilePath, processedImageBuffer);
              
              // Send email with QR card attachment
              console.log(`Sending QR card email to ${recipient.email} with attachment: ${tempFilePath}`);
              const emailResult = await sendEmailWithQRCard(
                recipient.email,
                template.subject || template.name,
                template.content.replace(/##_GUEST_NAME_##/g, recipient.name),
                tempFilePath,
                recipient.name
              );
              console.log(`Email sent result: ${emailResult}`);
              
              // Clean up temporary file
              try {
                await fs.unlink(tempFilePath);
              } catch (err) {
                console.error(`Failed to delete temp file: ${tempFilePath}`);
              }
            } catch (error) {
              console.error(`Failed to send QR card email to ${recipient.name}:`, error);
              console.error('Error details:', error);
            }
          }
        }
      } else {
        // Regular email without QR card attachment
        for (const recipient of recipients) {
          if (recipient.email) {
            await sendEmail(recipient.email, template.subject || template.name, template.content);
          }
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