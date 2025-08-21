import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/services/whatsappService";
import { sendEmail, sendEmailWithQRCard } from "@/lib/services/emailService";
import { imageProcessingService } from "../../../../src/services/imageProcessingService";
import { readFile } from "fs/promises";
import { join } from "path";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinaryService";
import { replaceEmailVariables, replaceTemplateVariables, type GuestData } from "@/lib/utils/templateVariables";

export async function POST(req: NextRequest) {
  try {
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

    // Get the selected guests with all necessary fields for variable replacement
    const guests = await prisma.guest.findMany({
      where: {
        eventId: eventId,
        id: { in: guestIds },
      },
      include: {
        guestCategory: {
          select: {
            name: true
          }
        },
        event: {
          select: {
            name: true
          }
        }
      }
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
            // Personalize the message with comprehensive variable replacement
            const guestData: GuestData = {
              id: guest.id,
              name: guest.name,
              email: guest.email,
              phoneNumber: guest.phoneNumber,
              address: guest.address,
              numberOfGuests: guest.numberOfGuests,
              session: guest.session,
              tableNumber: guest.tableNumber,
              notes: guest.notes,
              guestCategory: guest.guestCategory,
              event: guest.event
            };
            
            const personalizedContent = replaceTemplateVariables(template.content, guestData);
            
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
      // Check if Cloudinary is configured for QR card uploads
      if (!isCloudinaryConfigured()) {
        return NextResponse.json(
          { message: 'Cloudinary is not properly configured for QR card generation' },
          { status: 500 }
        );
      }

      for (const guest of guests) {
        if (guest.email) {
          try {
            // Personalize the message and subject with comprehensive variable replacement
            const guestData: GuestData = {
              id: guest.id,
              name: guest.name,
              email: guest.email,
              phoneNumber: guest.phoneNumber,
              address: guest.address,
              numberOfGuests: guest.numberOfGuests,
              session: guest.session,
              tableNumber: guest.tableNumber,
              notes: guest.notes,
              guestCategory: guest.guestCategory,
              event: guest.event
            };
            
            const { subject: personalizedSubject, content: personalizedContent } = replaceEmailVariables(
              template.subject || template.name,
              template.content,
              guestData
            );
            
            // Check if guest has QR code and template has image for QR card generation
            if (guest.qrCode && template.imageAttachment) {
              // Read the template image
              let blankTemplateBuffer;
              try {
                if (template.imageAttachment.startsWith('/')) {
                  // Handle local file path
                  const templatePath = join(process.cwd(), 'public', template.imageAttachment);
                  blankTemplateBuffer = await readFile(templatePath);
                } else {
                  // Handle external URL
                  const templateResponse = await fetch(template.imageAttachment);
                  const templateArrayBuffer = await templateResponse.arrayBuffer();
                  blankTemplateBuffer = Buffer.from(templateArrayBuffer);
                }
              } catch (templateError) {
                console.error('Error reading template:', templateError);
                // Fallback to regular email without QR card
                await sendEmail(guest.email, personalizedSubject, personalizedContent, undefined, guest.id);
                successCount++;
                continue;
              }

              // Parse coordinate fields from template or use defaults
              const coordinateConfig: any = {
                qrCodePosition: {
                  x: 200,
                  y: 450,
                  width: 180,
                  height: 180
                },
                namePosition: {
                  x: 200,
                  y: 650,
                  fontSize: 24,
                  fontColor: '#000000'
                }
              };

              let parsedCoordinateFields: any[] = [];
              
              if (template.coordinateFields) {
                try {
                  parsedCoordinateFields = JSON.parse(template.coordinateFields);
                  
                  // Process each coordinate field type for legacy support
                  parsedCoordinateFields.forEach((field: any) => {
                    switch (field.type) {
                      case 'qr-code':
                        coordinateConfig.qrCodePosition = {
                          x: field.x,
                          y: field.y,
                          width: field.width,
                          height: field.height
                        };
                        break;
                      case 'text':
                        // Map text fields based on fieldName
                        if (field.fieldName === 'name') {
                          coordinateConfig.namePosition = {
                            x: field.x,
                            y: field.y,
                            fontSize: field.fontSize || 24,
                            fontColor: '#000000'
                          };
                        } else if (field.fieldName === 'email') {
                          coordinateConfig.emailPosition = {
                            x: field.x,
                            y: field.y,
                            fontSize: field.fontSize || 16,
                            fontColor: '#666666'
                          };
                        } else if (field.fieldName === 'eventName') {
                          coordinateConfig.eventNamePosition = {
                            x: field.x,
                            y: field.y,
                            fontSize: field.fontSize || 18,
                            fontColor: '#333333'
                          };
                        } else if (field.fieldName === 'tableNumber') {
                          coordinateConfig.tableNumberPosition = {
                            x: field.x,
                            y: field.y,
                            fontSize: field.fontSize || 18,
                            fontColor: '#000000'
                          };
                        }
                        break;
                    }
                  });
                } catch (parseError) {
                  console.error('Error parsing coordinate fields, using defaults:', parseError);
                }
              }

              // Process QR template with guest data using dynamic coordinate fields
              const processedImageBuffer = await imageProcessingService.processQRCodeTemplateWithDynamicFields({
                guestData: {
                  id: guest.id,
                  name: guest.name,
                  email: guest.email,
                  phoneNumber: null,
                  address: null,
                  numberOfGuests: null,
                  session: null,
                  tableNumber: null,
                  notes: null,
                  qrCode: guest.qrCode,
                  invitationLink: null,
                  status: 'Invited' as const,
                  eventId: eventId || '',
                  guestCategoryId: null
                },
                blankTemplateBuffer,
                coordinateFields: parsedCoordinateFields
              });

              // Upload the processed image to Cloudinary
              const filename = `qr-card-${guest.id}-${Date.now()}`;
              const cloudinaryResult = await uploadToCloudinary(processedImageBuffer, {
                folder: `guestbook/${process.env.CLOUDINARY_UPLOAD_FOLDER || 'qr-cards'}`,
                public_id: filename,
                resource_type: 'image',
                format: 'png'
              });

              // Send email with QR card attachment using Cloudinary URL
              await sendEmailWithQRCard(
                guest.email,
                personalizedSubject,
                personalizedContent,
                cloudinaryResult.secure_url,
                guest.name,
                guest.id
              );
            } else {
              // Send regular email without QR card
              await sendEmail(guest.email, personalizedSubject, personalizedContent, undefined, guest.id);
            }
            
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