import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/services/whatsappService";
import { sendEmail, sendEmailWithQRCard } from "@/lib/services/emailService";
import { imageProcessingService } from "../../../../../../src/services/imageProcessingService";
import { readFile } from "fs/promises";
import path from "path";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinaryService";

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

    // Check if Cloudinary is configured for QR card processing
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: "Cloudinary is not properly configured for file uploads"
        },
        { status: 500 }
      );
    }

    const { eventId } = await params;
    const body = await req.json();
    const { templateId, recipientType, recipientIds } = body;

    if (!templateId || !recipientType || !eventId || !recipientIds) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: templateId, recipientType, eventId, recipientIds"
        },
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
        
        // Get full guest data for QR code processing based on recipient type
        const guestWhereClause: any = {
          eventId: (await params).eventId,
          email: { not: null },
          qrCode: { not: null }
        };
        
        if (recipientType === "individual") {
          guestWhereClause.id = { in: recipientIds };
        } else if (recipientType === "category") {
          guestWhereClause.guestCategoryId = { in: recipientIds };
        }
        // For "all" type, no additional filter needed
        
        const fullRecipients = await prisma.guest.findMany({
          where: guestWhereClause,
          select: { id: true, name: true, email: true, qrCode: true },
        });
        console.log(`Template: ${template.name}, Recipients: ${fullRecipients.length}`);

        // Use the imported imageProcessingService singleton
        
        for (const recipient of fullRecipients) {
          if (recipient.email && recipient.qrCode) {
            try {
              // Read the blank template from file system
              const templateImagePath = path.join(process.cwd(), 'public', template.imageAttachment);
              const templateBuffer = await readFile(templateImagePath);
              
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
              
              // Upload processed image to Cloudinary
              const uniqueFileName = `qr-card-${recipient.id}-${Date.now()}`;
              const cloudinaryResult = await uploadToCloudinary(processedImageBuffer, {
                folder: `guestbook/${process.env.CLOUDINARY_UPLOAD_FOLDER || 'qr-cards'}`,
                public_id: uniqueFileName,
                resource_type: 'image',
                format: 'png'
              });
              
              console.log(`QR card uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
              
              // Send email with QR card attachment using Cloudinary URL
              console.log(`Sending QR card email to ${recipient.email} with Cloudinary URL: ${cloudinaryResult.secure_url}`);
              const emailResult = await sendEmailWithQRCard(
                recipient.email,
                template.subject || template.name,
                template.content.replace(/##_GUEST_NAME_##/g, recipient.name),
                cloudinaryResult.secure_url,
                recipient.name
              );
              console.log(`Email sent result: ${emailResult}`);
            } catch (error) {
              console.error(`Failed to send QR card email to ${recipient.name}:`, error);
              console.error('Error details:', error);
            }
          }
        }
      } else if (template.imageAttachment && template.imageAttachment !== "no-image" && template.imageAttachment !== "qr-code") {
        // Regular email with image attachment (not QR code card)
        console.log("Processing regular image attachment for email broadcast");
        
        for (const recipient of recipients) {
          if (recipient.email) {
            try {
              // Read the image attachment from file system
              const imagePath = path.join(process.cwd(), 'public', template.imageAttachment);
              const imageBuffer = await readFile(imagePath);
              const base64Image = imageBuffer.toString('base64');
              
              // Determine content type based on file extension
              const fileExtension = path.extname(template.imageAttachment).toLowerCase();
              let contentType = 'image/png'; // default
              if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
                contentType = 'image/jpeg';
              } else if (fileExtension === '.gif') {
                contentType = 'image/gif';
              } else if (fileExtension === '.webp') {
                contentType = 'image/webp';
              }
              
              // Create attachment object
              const attachment = {
                content: base64Image,
                filename: path.basename(template.imageAttachment),
                contentType: contentType
              };
              
              console.log(`Sending email with image attachment to ${recipient.email}: ${attachment.filename}`);
              const emailResult = await sendEmail(
                recipient.email,
                template.subject || template.name,
                template.content,
                [attachment]
              );
              console.log(`Email sent result: ${emailResult}`);
            } catch (error) {
              console.error(`Failed to send email with attachment to ${recipient.email}:`, error);
              // Fallback to sending email without attachment
              await sendEmail(recipient.email, template.subject || template.name, template.content);
            }
          }
        }
      } else {
        // Regular email without any attachment
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
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}