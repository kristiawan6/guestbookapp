import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppTemplateMessage } from "@/lib/services/whatsappBroadcastService";
import prisma from "@/lib/prisma";

/**
 * POST /api/guests/send-whatsapp
 * Send WhatsApp message to individual guest using template
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, guestId, eventId } = body;

    // Validate required fields
    if (!templateId || !guestId || !eventId) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required fields: templateId, guestId, eventId" 
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

    // Verify guest exists and belongs to the event
    const guest = await prisma.guest.findUnique({
      where: { 
        id: guestId,
        eventId: eventId
      }
    });

    if (!guest) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Guest not found or does not belong to this event" 
        },
        { status: 404 }
      );
    }

    if (!guest.phoneNumber) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Guest does not have a phone number" 
        },
        { status: 400 }
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

    // Send WhatsApp message
    const result = await sendWhatsAppTemplateMessage(templateId, guestId, eventId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `WhatsApp message sent successfully to ${guest.name}`,
        data: {
          messageId: result.messageId,
          recipient: {
            id: guest.id,
            name: guest.name,
            phoneNumber: guest.phoneNumber
          },
          template: {
            id: template.id,
            name: template.name
          }
        }
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Failed to send WhatsApp message to ${guest.name}`,
          error: result.error
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error in send WhatsApp API:', error);
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