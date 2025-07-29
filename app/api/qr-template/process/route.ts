import { NextRequest, NextResponse } from 'next/server';
import { imageProcessingService } from '@/src/services/imageProcessingService';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const templateId = formData.get('templateId') as string;
    const guestIds = formData.get('guestIds') as string; // JSON string of guest IDs
    const qrCodePosition = formData.get('qrCodePosition') as string; // JSON string
    const namePosition = formData.get('namePosition') as string; // JSON string

    if (!templateId || !guestIds) {
      return NextResponse.json(
        { error: 'Template ID and guest IDs are required' },
        { status: 400 }
      );
    }

    // Parse guest IDs
    const parsedGuestIds: string[] = JSON.parse(guestIds);
    
    // Parse positions (optional)
    const parsedQrCodePosition = qrCodePosition ? JSON.parse(qrCodePosition) : undefined;
    const parsedNamePosition = namePosition ? JSON.parse(namePosition) : undefined;

    // Get broadcast template
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

    // Process QR code templates for all guests
    const processedResults = await imageProcessingService.batchProcessQRCodeTemplates(
      guests,
      blankTemplateBuffer,
      parsedQrCodePosition,
      parsedNamePosition
    );

    // Save processed images and return file paths
    const savedImages = await Promise.all(
      processedResults.map(async ({ guest, processedImage }) => {
        const fileName = `qr-template-${guest.id}-${Date.now()}.png`;
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
      message: `Processed ${savedImages.length} QR code templates`,
      processedImages: savedImages
    });

  } catch (error) {
    console.error('Error processing QR code templates:', error);
    return NextResponse.json(
      { error: 'Failed to process QR code templates' },
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

    // Check if processed QR directory exists
    const processedDir = path.join(process.cwd(), 'public', 'processed-qr');
    
    try {
      const files = await fs.readdir(processedDir);
      const templateFiles = files.filter(file => 
        file.includes(`qr-template-`) && file.endsWith('.png')
      );

      const processedImages = templateFiles.map(file => ({
        fileName: file,
        imageUrl: `/processed-qr/${file}`,
        createdAt: file.split('-').pop()?.replace('.png', '') || 'unknown'
      }));

      return NextResponse.json({
        success: true,
        template: {
          id: template.id,
          name: template.name,
          imageAttachment: template.imageAttachment
        },
        processedImages
      });

    } catch (dirError) {
      return NextResponse.json({
        success: true,
        template: {
          id: template.id,
          name: template.name,
          imageAttachment: template.imageAttachment
        },
        processedImages: []
      });
    }

  } catch (error) {
    console.error('Error retrieving processed QR templates:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve processed QR templates' },
      { status: 500 }
    );
  }
}