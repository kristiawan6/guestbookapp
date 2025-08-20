import { NextRequest, NextResponse } from 'next/server';
import { imageProcessingService, CoordinateField } from '@/src/services/imageProcessingService';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const templateId = formData.get('templateId') as string;
    const guestIds = formData.get('guestIds') as string; // JSON string of guest IDs

    if (!templateId || !guestIds) {
      return NextResponse.json(
        { error: 'Template ID and guest IDs are required' },
        { status: 400 }
      );
    }

    // Parse guest IDs
    const parsedGuestIds: string[] = JSON.parse(guestIds);

    // Get broadcast template with coordinate fields
    const template = await prisma.broadcastTemplate.findUnique({
      where: { id: templateId },
      include: { event: true }
    });

    if (!template || !template.imageAttachment) {
      return NextResponse.json(
        { error: 'Template not found or no image attachment' },
        { status: 404 }
      );
    }

    // Check if template has coordinate fields
    if (!template.coordinateFields) {
      return NextResponse.json(
        { error: 'Template does not have coordinate fields configured' },
        { status: 400 }
      );
    }

    // Parse coordinate fields
    let coordinateFields: CoordinateField[];
    try {
      coordinateFields = JSON.parse(template.coordinateFields);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid coordinate fields configuration' },
        { status: 400 }
      );
    }

    // Get guests
    const guests = await prisma.guest.findMany({
      where: {
        id: { in: parsedGuestIds },
        eventId: template.eventId
      }
    });

    if (guests.length === 0) {
      return NextResponse.json(
        { error: 'No valid guests found' },
        { status: 404 }
      );
    }

    // Read the blank template image
    const templateImagePath = path.join(process.cwd(), 'public', template.imageAttachment);
    const blankTemplateBuffer = await fs.readFile(templateImagePath);

    // Process QR code templates for all guests using dynamic coordinates
    const processedResults = await Promise.all(
      guests.map(async (guest) => {
        const processedImage = await imageProcessingService.processQRCodeTemplateWithDynamicFields({
          guestData: guest,
          blankTemplateBuffer,
          coordinateFields
        });
        return { guest, processedImage };
      })
    );

    // Save processed images and return file paths
    const savedImages = await Promise.all(
      processedResults.map(async ({ guest, processedImage }) => {
        const fileName = `qr-template-dynamic-${guest.id}-${Date.now()}.png`;
        const filePath = path.join(process.cwd(), 'public', 'processed-qr', fileName);
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        // Save processed image
        await fs.writeFile(filePath, processedImage);
        
        return {
          guestId: guest.id,
          guestName: guest.name,
          guestEmail: guest.email,
          guestPhoneNumber: guest.phoneNumber,
          imageUrl: `/processed-qr/${fileName}`,
          imagePath: filePath
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: `Processed ${savedImages.length} dynamic QR code templates`,
      processedImages: savedImages,
      coordinateFields: coordinateFields
    });

  } catch {
    console.error('Error processing dynamic QR code templates:');
    return NextResponse.json(
      { error: 'Failed to process dynamic QR code templates' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve processed templates for a specific template ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('templateId');
    const eventId = searchParams.get('eventId');

    if (!templateId || !eventId) {
      return NextResponse.json(
        { error: 'Template ID and Event ID are required' },
        { status: 400 }
      );
    }

    // Get template and verify it belongs to the event
    const template = await prisma.broadcastTemplate.findFirst({
      where: {
        id: templateId,
        eventId: eventId
      }
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Check if coordinate fields are configured
    if (!template.coordinateFields) {
      return NextResponse.json({
        success: true,
        message: 'Template found but no coordinate fields configured',
        coordinateFields: [],
        hasCoordinateFields: false
      });
    }

    // Parse and return coordinate fields
    let coordinateFields: CoordinateField[];
    try {
      coordinateFields = JSON.parse(template.coordinateFields);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid coordinate fields configuration' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Template coordinate fields retrieved successfully',
      coordinateFields: coordinateFields,
      hasCoordinateFields: true,
      template: {
        id: template.id,
        name: template.name,
        imageAttachment: template.imageAttachment
      }
    });

  } catch {
    console.error('Error retrieving template coordinate fields:');
    return NextResponse.json(
      { error: 'Failed to retrieve template coordinate fields' },
      { status: 500 }
    );
  }
}