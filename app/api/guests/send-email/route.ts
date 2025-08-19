import { NextRequest, NextResponse } from 'next/server';
import { sendEmailWithQRCard, sendEmail } from '@/lib/services/emailService';
import { imageProcessingService } from '../../../../src/services/imageProcessingService';
import prisma from '@/lib/prisma';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { replaceEmailVariables, type GuestData } from '@/lib/utils/templateVariables';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestIds, templateId, eventId, subject, message, templateImageUrl } = body;

    if (!guestIds || !Array.isArray(guestIds) || guestIds.length === 0) {
      return NextResponse.json(
        { error: 'Guest IDs are required and must be an array' },
        { status: 400 }
      );
    }

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Get template data if templateId is provided
    let template = null;
    let emailSubject = subject;
    let emailMessage = message;
    let emailTemplateImageUrl = templateImageUrl;

    if (templateId) {
      template = await prisma.broadcastTemplate.findUnique({
        where: { id: templateId },
      });

      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }

      // Use template data
      emailSubject = template.subject || template.name;
      emailMessage = template.content;
      emailTemplateImageUrl = template.imageAttachment;
    } else {
      // Legacy support: require subject and message if no template
      if (!subject || !message) {
        return NextResponse.json(
          { error: 'Subject and message are required when not using a template' },
          { status: 400 }
        );
      }
    }

    // Fetch guests from database with all necessary fields for variable replacement
    const guests = await prisma.guest.findMany({
      where: {
        id: { in: guestIds },
        ...(eventId && { eventId })
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
        { error: 'No guests found with the provided IDs' },
        { status: 404 }
      );
    }

    const results = [];
    const errors = [];

    // Ensure the QR cards directory exists
    const qrCardsDir = join(process.cwd(), 'public', 'qr-cards');
    if (!existsSync(qrCardsDir)) {
      await mkdir(qrCardsDir, { recursive: true });
    }

    for (const guest of guests) {
      try {
        if (!guest.email) {
          errors.push({
            guestId: guest.id,
            guestName: guest.name,
            error: 'Guest has no email address'
          });
          continue;
        }

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

        const { subject: personalizedSubject, content: personalizedMessage } = replaceEmailVariables(
          emailSubject,
          emailMessage,
          guestData
        );

        // Check if guest has QR code and template is configured for QR card generation
        const isQRTemplate = template && (template.imageAttachmentType === "qr-code-card" || template.imageAttachmentType === "dynamic-qr" || template.imageAttachment === "qr-card" || template.imageAttachment === "qr-code-card");
        
        if (guest.qrCode && isQRTemplate && emailTemplateImageUrl) {
          // Read the template image
          let blankTemplateBuffer;
          try {
            if (emailTemplateImageUrl.startsWith('/')) {
              // Handle local file path
              const templatePath = join(process.cwd(), 'public', emailTemplateImageUrl);
              console.log('Reading template from path:', templatePath);
              blankTemplateBuffer = await readFile(templatePath);
            } else {
              // Handle external URL
              console.log('Fetching template from URL:', emailTemplateImageUrl);
              const templateResponse = await fetch(emailTemplateImageUrl);
              const templateArrayBuffer = await templateResponse.arrayBuffer();
              blankTemplateBuffer = Buffer.from(templateArrayBuffer);
            }
            console.log('Template buffer size:', blankTemplateBuffer.length);

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
            
            if (template && template.coordinateFields) {
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

            // Save the processed image
            const filename = `qr-card-${guest.id}-${Date.now()}.png`;
            const filepath = join(qrCardsDir, filename);
            await writeFile(filepath, processedImageBuffer);

            // Send email with QR card attachment
            await sendEmailWithQRCard(
              guest.email,
              personalizedSubject,
              personalizedMessage,
              filepath,
              guest.name
            );

            results.push({
              guestId: guest.id,
              guestName: guest.name,
              email: guest.email,
              status: 'sent',
              qrCardPath: `/qr-cards/${filename}`
            });
          } catch (templateError) {
            console.error('Error reading template:', templateError);
            // Fallback to regular email without QR card
            await sendEmail(guest.email, personalizedSubject, personalizedMessage);
            results.push({
              guestId: guest.id,
              guestName: guest.name,
              email: guest.email,
              status: 'sent'
            });
          }
        } else {
          // Send regular email without QR card
          await sendEmail(guest.email, personalizedSubject, personalizedMessage);
          results.push({
            guestId: guest.id,
            guestName: guest.name,
            email: guest.email,
            status: 'sent'
          });
        }
      } catch (error) {
        console.error(`Error processing guest ${guest.id}:`, error);
        errors.push({
          guestId: guest.id,
          guestName: guest.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalGuests: guests.length,
      successfulSends: results.length,
      failedSends: errors.length,
      results,
      errors
    });

  } catch (error) {
    console.error('Error in send-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}