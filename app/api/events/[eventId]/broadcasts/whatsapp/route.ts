import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppBroadcast, getWhatsAppBroadcastStats } from "@/lib/services/whatsappBroadcastService";
import prisma from "@/lib/prisma";

/**
 * POST /api/events/[eventId]/broadcasts/whatsapp
 * Send WhatsApp broadcast using template
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const body = await req.json();
    const { templateId, recipientIds, recipientType } = body;
    const eventId = (await params).eventId;

    // Validate required fields
    if (!templateId || !recipientType || !eventId) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required fields: templateId, recipientType, eventId" 
        },
        { status: 400 }
      );
    }

    // Validate recipientType
    if (!['individual', 'category', 'all'].includes(recipientType)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid recipientType. Must be 'individual', 'category', or 'all'" 
        },
        { status: 400 }
      );
    }

    // For individual and category types, recipientIds is required
    if ((recipientType === 'individual' || recipientType === 'category') && (!recipientIds || recipientIds.length === 0)) {
      return NextResponse.json(
        { 
          success: false, 
          message: `recipientIds is required for recipientType '${recipientType}'` 
        },
        { status: 400 }
      );
    }

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Event not found" 
        },
        { status: 404 }
      );
    }

    // Verify template exists and is WhatsApp type
    const template = await prisma.broadcastTemplate.findUnique({
      where: { 
        id: templateId,
        eventId: eventId
      }
    });

    if (!template) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Template not found" 
        },
        { status: 404 }
      );
    }

    if (template.type !== 'WhatsApp') {
      return NextResponse.json(
        { 
          success: false, 
          message: "Template is not a WhatsApp template" 
        },
        { status: 400 }
      );
    }

    // Send WhatsApp broadcast
    const result = await sendWhatsAppBroadcast({
      templateId,
      recipientIds: recipientIds || [],
      recipientType,
      eventId
    });

    // Return detailed result
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? `WhatsApp broadcast sent successfully to ${result.successCount} recipients`
        : `WhatsApp broadcast failed. ${result.failureCount} failures.`,
      data: {
        successCount: result.successCount,
        failureCount: result.failureCount,
        totalAttempted: result.successCount + result.failureCount,
        messageIds: result.messageIds,
        errors: result.errors
      }
    }, { 
      status: result.success ? 200 : 207 // 207 Multi-Status for partial success
    });

  } catch (error) {
    console.error('Error in WhatsApp broadcast API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/events/[eventId]/broadcasts/whatsapp
 * Get WhatsApp broadcast statistics for an event
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const eventId = (await params).eventId;

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Event not found" 
        },
        { status: 404 }
      );
    }

    // Get WhatsApp broadcast statistics
    const stats = await getWhatsAppBroadcastStats(eventId);

    // Get WhatsApp templates count
    const whatsappTemplatesCount = await prisma.broadcastTemplate.count({
      where: {
        eventId: eventId,
        type: 'WhatsApp'
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        whatsappTemplatesCount
      }
    });

  } catch (error) {
    console.error('Error getting WhatsApp broadcast stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}