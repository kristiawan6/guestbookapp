import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { emitWhatsAppStatusUpdate, type WhatsAppStatusUpdateEvent } from '@/lib/socket';

// WhatsApp status enum (matching Prisma schema)
enum WhatsAppStatus {
  NotSent = 'NotSent',
  Sent = 'Sent',
  Delivered = 'Delivered',
  Read = 'Read',
  Failed = 'Failed'
}

// WhatsApp webhook verification token
const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

// Interface for WhatsApp webhook payload
interface WhatsAppWebhookEntry {
  id: string;
  changes: {
    value: {
      messaging_product: string;
      metadata: {
        display_phone_number: string;
        phone_number_id: string;
      };
      statuses?: {
        id: string;
        status: 'sent' | 'delivered' | 'read' | 'failed';
        timestamp: string;
        recipient_id: string;
        errors?: {
          code: number;
          title: string;
          message: string;
        }[];
      }[];
      messages?: any[];
    };
    field: string;
  }[];
}

interface WhatsAppWebhookPayload {
  object: string;
  entry: WhatsAppWebhookEntry[];
}

// GET handler for webhook verification
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    console.log('WhatsApp webhook verification request:', { mode, token, challenge });

    // Verify the webhook
    if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
      console.log('WhatsApp webhook verified successfully');
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.error('WhatsApp webhook verification failed');
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error in WhatsApp webhook verification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler for webhook events
export async function POST(request: NextRequest) {
  try {
    const payload: WhatsAppWebhookPayload = await request.json();
    
    console.log('WhatsApp webhook received:', JSON.stringify(payload, null, 2));

    // Verify this is a WhatsApp webhook
    if (payload.object !== 'whatsapp_business_account') {
      console.log('Not a WhatsApp business account webhook, ignoring');
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    // Process each entry in the webhook
    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        // Process status updates
        if (change.value.statuses) {
          await processStatusUpdates(change.value.statuses, payload);
        }

        // Process incoming messages (optional - for future use)
        if (change.value.messages) {
          console.log('Received incoming messages:', change.value.messages);
          // Handle incoming messages if needed
        }
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Error processing WhatsApp webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Process status updates from WhatsApp
async function processStatusUpdates(
  statuses: any[],
  webhookPayload: WhatsAppWebhookPayload
) {
  for (const status of statuses) {
    try {
      console.log('Processing status update:', status);

      // Find the WhatsApp message by message ID
      // Note: This requires running 'npx prisma migrate dev' first to create the WhatsAppMessage table
      // const whatsappMessage = await prisma.whatsAppMessage.findUnique({
      //   where: { messageId: status.id },
      //   include: { guest: true }
      // });

      // if (!whatsappMessage) {
      //   console.log(`WhatsApp message not found for ID: ${status.id}`);
      //   continue;
      // }

      // Temporary: Log the status update until migration is complete
      console.log(`Status update for message ${status.id}: ${status.status}`);
      continue;

      // Map WhatsApp status to our enum
      let newStatus: WhatsAppStatus;
      let timestampField: string;
      
      switch (status.status) {
        case 'sent':
          newStatus = WhatsAppStatus.Sent;
          timestampField = 'sentAt';
          break;
        case 'delivered':
          newStatus = WhatsAppStatus.Delivered;
          timestampField = 'deliveredAt';
          break;
        case 'read':
          newStatus = WhatsAppStatus.Read;
          timestampField = 'readAt';
          break;
        case 'failed':
          newStatus = WhatsAppStatus.Failed;
          timestampField = 'failedAt';
          break;
        default:
          console.log(`Unknown status: ${status.status}`);
          continue;
      }

      // Prepare update data
      const updateData: any = {
        status: newStatus,
        webhookData: webhookPayload,
        [timestampField]: new Date(parseInt(status.timestamp) * 1000)
      };

      // Add error message if status is failed
      if (status.status === 'failed' && status.errors) {
        updateData.errorMessage = status.errors.map((err: any) => 
          `${err.title}: ${err.message} (Code: ${err.code})`
        ).join('; ');
      }

      // Update WhatsApp message status (requires migration)
      // await prisma.whatsAppMessage.update({
      //   where: { id: whatsappMessage.id },
      //   data: updateData
      // });

      // Update guest's WhatsApp status (will be available after Prisma migration)
      // await prisma.guest.update({
      //   where: { id: whatsappMessage.guestId },
      //   data: { whatsappStatus: newStatus }
      // });

      console.log(`Status update processed for message ${status.id}: ${newStatus}`);
      
      try {
        // Create or update WhatsAppMessage record
        const whatsappMessage = await prisma.whatsAppMessage.upsert({
          where: { messageId: status.id },
          update: {
            status: newStatus,
            ...(newStatus === 'Delivered' && { deliveredAt: new Date(parseInt(status.timestamp) * 1000) }),
             ...(newStatus === 'Read' && { readAt: new Date(parseInt(status.timestamp) * 1000) }),
             ...(newStatus === 'Failed' && { 
              failedAt: new Date(parseInt(status.timestamp) * 1000),
              errorMessage: status.errors?.[0]?.title || 'Unknown error'
            }),
            webhookData: status
          },
          create: {
            messageId: status.id,
            guestId: 'unknown', // This should be linked properly in production
            eventId: 'unknown', // This should be linked properly in production
            content: 'Status update from webhook',
            status: newStatus,
            ...(newStatus === 'Delivered' && { deliveredAt: new Date(parseInt(status.timestamp) * 1000) }),
             ...(newStatus === 'Read' && { readAt: new Date(parseInt(status.timestamp) * 1000) }),
             ...(newStatus === 'Failed' && { 
              failedAt: new Date(parseInt(status.timestamp) * 1000),
              errorMessage: status.errors?.[0]?.title || 'Unknown error'
            }),
            webhookData: status
          }
        });

        // Update guest whatsapp status
        await prisma.guest.updateMany({
          where: {
            whatsappMessages: {
              some: {
                messageId: status.id
              }
            }
          },
          data: {
            whatsappStatus: newStatus
          }
        });

        console.log(`Updated WhatsApp message ${status.id} to status: ${newStatus}`);

        // Emit Socket.io event for real-time UI updates
        try {
          const statusUpdateEvent: WhatsAppStatusUpdateEvent = {
            guestId: whatsappMessage.guestId,
            eventId: whatsappMessage.eventId,
            status: newStatus,
            messageId: status.id,
            timestamp: new Date(parseInt(status.timestamp) * 1000).toISOString()
          };
          emitWhatsAppStatusUpdate(statusUpdateEvent);
          console.log('Emitted WhatsApp status update via Socket.io');
        } catch (socketError) {
          console.error('Error emitting Socket.io event:', socketError);
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
      }

    } catch (error) {
      console.error(`Error processing status update for message ${status.id}:`, error);
    }
  }
}