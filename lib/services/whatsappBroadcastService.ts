/**
 * WhatsApp Broadcast Template Service
 * Handles sending WhatsApp messages using broadcast templates with variable replacement
 * and image attachment support via WhatsApp Cloud API.
 */

import { getBroadcastTemplateById } from './broadcastTemplateService';
import { replaceTemplateVariables, type GuestData } from '@/lib/utils/templateVariables';
import prisma from '@/lib/prisma';

// WhatsApp Cloud API configuration
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;

interface WhatsAppMessagePayload {
  messaging_product: string;
  to: string;
  type: string;
  text?: {
    body: string;
  };
  image?: {
    link?: string;
    caption?: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: Array<{
      type: string;
      parameters?: Array<{
        type: string;
        text?: string;
        image?: { link: string };
      }>;
    }>;
  };
}

interface BroadcastResult {
  success: boolean;
  successCount: number;
  failureCount: number;
  errors: string[];
  messageIds: string[];
}

interface WhatsAppTemplateData {
  templateId: string;
  recipientIds: string[];
  recipientType: 'individual' | 'category' | 'all';
  eventId: string;
}

/**
 * Send WhatsApp message with image attachment
 */
export const sendWhatsAppMessageWithImage = async (
  to: string, 
  message: string, 
  imageUrl?: string,
  caption?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error('WhatsApp credentials not configured. Please set WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID environment variables.');
      return { success: false, error: 'WhatsApp credentials not configured' };
    }

    // Format phone number (remove any non-digit characters except +)
    const formattedPhone = to.replace(/[^\d+]/g, '');
    const phoneNumber = formattedPhone.startsWith('+') ? formattedPhone.substring(1) : formattedPhone;

    let messagePayload: WhatsAppMessagePayload;

    if (imageUrl) {
      // Send image with caption
      messagePayload = {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "image",
        image: {
          link: imageUrl,
          caption: caption || message
        }
      };
    } else {
      // Send text message
      messagePayload = {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: {
          body: message
        }
      };
    }

    const response = await fetch(WHATSAPP_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messagePayload)
    });

    const responseData = await response.json();

    if (response.ok && responseData.messages && responseData.messages.length > 0) {
      console.log(`WhatsApp message sent successfully to ${to}. Message ID: ${responseData.messages[0].id}`);
      return { 
        success: true, 
        messageId: responseData.messages[0].id 
      };
    } else {
      console.error('Failed to send WhatsApp message:', responseData);
      return { 
        success: false, 
        error: responseData.error?.message || 'Unknown error' 
      };
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Send WhatsApp broadcast using template
 */
export const sendWhatsAppBroadcast = async (data: WhatsAppTemplateData): Promise<BroadcastResult> => {
  const { templateId, recipientIds, recipientType, eventId } = data;
  
  const result: BroadcastResult = {
    success: false,
    successCount: 0,
    failureCount: 0,
    errors: [],
    messageIds: []
  };

  try {
    // Get the broadcast template
    const template = await getBroadcastTemplateById(templateId);
    
    if (!template || template.type !== 'WhatsApp') {
      result.errors.push('WhatsApp template not found or invalid type');
      return result;
    }

    // Get recipients based on type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let recipients: any[] = [];
    
    if (recipientType === 'individual') {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: eventId,
          id: { in: recipientIds },
          phoneNumber: { not: null }
        },
        include: {
          guestCategory: { select: { name: true } },
          event: { select: { name: true } }
        }
      });
    } else if (recipientType === 'category') {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: eventId,
          guestCategoryId: { in: recipientIds },
          phoneNumber: { not: null }
        },
        include: {
          guestCategory: { select: { name: true } },
          event: { select: { name: true } }
        }
      });
    } else if (recipientType === 'all') {
      recipients = await prisma.guest.findMany({
        where: {
          eventId: eventId,
          phoneNumber: { not: null }
        },
        include: {
          guestCategory: { select: { name: true } },
          event: { select: { name: true } }
        }
      });
    }

    if (recipients.length === 0) {
      result.errors.push('No recipients found with valid phone numbers');
      return result;
    }

    console.log(`Sending WhatsApp broadcast to ${recipients.length} recipients using template: ${template.name}`);

    // Process image attachment if exists
    let imageUrl: string | undefined;
    if (template.imageAttachment && template.imageAttachment !== 'none') {
      try {
        if (template.imageAttachment.startsWith('http')) {
          // External URL
          imageUrl = template.imageAttachment;
        } else {
          // Local file - convert to full URL
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
          imageUrl = template.imageAttachment.startsWith('/') 
            ? `${baseUrl}${template.imageAttachment}`
            : `${baseUrl}/${template.imageAttachment}`;
        }
      } catch (error) {
        console.error('Error processing image attachment:', error);
        result.errors.push(`Failed to process image attachment: ${error}`);
      }
    }

    // Send messages to each recipient
    for (const recipient of recipients) {
      try {
        // Prepare guest data for variable replacement
        const guestData: GuestData = {
          id: recipient.id,
          name: recipient.name,
          email: recipient.email,
          phoneNumber: recipient.phoneNumber,
          address: recipient.address,
          numberOfGuests: recipient.numberOfGuests,
          session: recipient.session,
          tableNumber: recipient.tableNumber,
          notes: recipient.notes,
          guestCategory: recipient.guestCategory,
          event: recipient.event
        };

        // Replace template variables in content
        const personalizedContent = replaceTemplateVariables(template.content, guestData);
        
        // Replace template variables in footer if exists
        const personalizedFooter = template.footerMessage 
          ? replaceTemplateVariables(template.footerMessage, guestData)
          : undefined;

        // Combine content and footer
        const finalMessage = personalizedFooter 
          ? `${personalizedContent}\n\n${personalizedFooter}`
          : personalizedContent;

        // Send WhatsApp message
        const sendResult = await sendWhatsAppMessageWithImage(
          recipient.phoneNumber,
          finalMessage,
          imageUrl
        );

        if (sendResult.success) {
          result.successCount++;
          if (sendResult.messageId) {
            result.messageIds.push(sendResult.messageId);
          }
          console.log(`WhatsApp sent successfully to ${recipient.name} (${recipient.phoneNumber})`);
        } else {
          result.failureCount++;
          result.errors.push(`Failed to send to ${recipient.name}: ${sendResult.error}`);
        }

        // Add small delay between messages to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        result.failureCount++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        result.errors.push(`Failed to send to ${recipient.name}: ${errorMessage}`);
        console.error(`Error sending WhatsApp to ${recipient.name}:`, error);
      }
    }

    result.success = result.successCount > 0;
    
    console.log(`WhatsApp broadcast completed. Success: ${result.successCount}, Failed: ${result.failureCount}`);
    
    return result;
    
  } catch (error) {
    console.error('Error in WhatsApp broadcast:', error);
    result.errors.push(error instanceof Error ? error.message : 'Unknown error occurred');
    return result;
  }
};

/**
 * Send WhatsApp message to individual recipient using template
 */
export const sendWhatsAppTemplateMessage = async (
  templateId: string,
  recipientId: string,
  eventId: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    // Get the broadcast template
    const template = await getBroadcastTemplateById(templateId);
    
    if (!template || template.type !== 'WhatsApp') {
      return { success: false, error: 'WhatsApp template not found or invalid type' };
    }

    // Get recipient data
    const recipient = await prisma.guest.findUnique({
      where: {
        id: recipientId,
        eventId: eventId
      },
      include: {
        guestCategory: { select: { name: true } },
        event: { select: { name: true } }
      }
    });

    if (!recipient || !recipient.phoneNumber) {
      return { success: false, error: 'Recipient not found or no phone number' };
    }

    // Prepare guest data for variable replacement
    const guestData: GuestData = {
      id: recipient.id,
      name: recipient.name,
      email: recipient.email,
      phoneNumber: recipient.phoneNumber,
      address: recipient.address,
      numberOfGuests: recipient.numberOfGuests,
      session: recipient.session,
      tableNumber: recipient.tableNumber,
      notes: recipient.notes,
      guestCategory: recipient.guestCategory,
      event: recipient.event
    };

    // Replace template variables
    const personalizedContent = replaceTemplateVariables(template.content, guestData);
    const personalizedFooter = template.footerMessage 
      ? replaceTemplateVariables(template.footerMessage, guestData)
      : undefined;

    // Combine content and footer
    const finalMessage = personalizedFooter 
      ? `${personalizedContent}\n\n${personalizedFooter}`
      : personalizedContent;

    // Process image attachment
    let imageUrl: string | undefined;
    if (template.imageAttachment && template.imageAttachment !== 'none') {
      if (template.imageAttachment.startsWith('http')) {
        imageUrl = template.imageAttachment;
      } else {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        imageUrl = template.imageAttachment.startsWith('/') 
          ? `${baseUrl}${template.imageAttachment}`
          : `${baseUrl}/${template.imageAttachment}`;
      }
    }

    // Send WhatsApp message
    return await sendWhatsAppMessageWithImage(
      recipient.phoneNumber,
      finalMessage,
      imageUrl
    );
    
  } catch (error) {
    console.error('Error sending WhatsApp template message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Validate WhatsApp phone number format
 */
export const validateWhatsAppPhoneNumber = (phoneNumber: string): boolean => {
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Check if it's a valid international format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Get WhatsApp broadcast statistics
 */
export const getWhatsAppBroadcastStats = async (eventId: string) => {
  try {
    // Get total guests count
    const totalGuests = await prisma.guest.count({
      where: {
        eventId: eventId
      }
    });

    // Get guests with phone numbers count
    const guestsWithPhone = await prisma.guest.count({
      where: {
        eventId: eventId,
        AND: [
          { phoneNumber: { not: null } },
          { phoneNumber: { not: '' } }
        ]
      }
    });

    return {
      totalGuests,
      guestsWithPhone,
      guestsWithoutPhone: totalGuests - guestsWithPhone,
      phoneNumberCoverage: totalGuests > 0 ? (guestsWithPhone / totalGuests) * 100 : 0
    };
  } catch (error) {
    console.error('Error getting WhatsApp broadcast stats:', error);
    return {
      totalGuests: 0,
      guestsWithPhone: 0,
      guestsWithoutPhone: 0,
      phoneNumberCoverage: 0
    };
  }
};