import { NextRequest, NextResponse } from 'next/server';
import { sendEmailWithQRCard } from '@/lib/services/emailService';
import { imageProcessingService } from '../../../../src/services/imageProcessingService';
import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestIds, subject, message, templateImageUrl, eventId } = body;

    if (!guestIds || !Array.isArray(guestIds) || guestIds.length === 0) {
      return NextResponse.json(
        { error: 'Guest IDs are required and must be an array' },
        { status: 400 }
      );
    }

    if (!subject || !message) {
      return NextResponse.json(
        { error: 'Subject and message are required' },
        { status: 400 }
      );
    }

    if (!templateImageUrl) {
      return NextResponse.json(
        { error: 'Template image URL is required for QR code generation' },
        { status: 400 }
      );
    }

    // Fetch guests from database
    const guests = await prisma.guest.findMany({
      where: {
        id: { in: guestIds },
        ...(eventId && { eventId })
      },
      select: {
        id: true,
        name: true,
        email: true,
        qrCode: true
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

        if (!guest.qrCode) {
          errors.push({
            guestId: guest.id,
            guestName: guest.name,
            error: 'Guest has no QR code'
          });
          continue;
        }

        // Read the blank template image
        const templateResponse = await fetch(templateImageUrl);
        const templateArrayBuffer = await templateResponse.arrayBuffer();
        const blankTemplateBuffer = Buffer.from(templateArrayBuffer);

        // Process QR template with guest data
        const processedImageBuffer = await imageProcessingService.processQRCodeTemplate({
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
          blankTemplateBuffer
        });

        // Save the processed image
        const filename = `qr-card-${guest.id}-${Date.now()}.png`;
        const filepath = join(qrCardsDir, filename);
        await writeFile(filepath, processedImageBuffer);

        // Send email with QR card attachment
        const emailSent = await sendEmailWithQRCard(
          guest.email,
          subject,
          message,
          filepath,
          guest.name
        );

        if (emailSent) {
          results.push({
            guestId: guest.id,
            guestName: guest.name,
            email: guest.email,
            status: 'sent',
            qrCardPath: `/qr-cards/${filename}`
          });
        } else {
          errors.push({
            guestId: guest.id,
            guestName: guest.name,
            error: 'Failed to send email'
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