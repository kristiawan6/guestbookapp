/**
 * WhatsApp service integration using WhatsApp Cloud API.
 * Handles sending WhatsApp messages via Facebook's official API.
 * Supports text messages, template messages, and attachments.
 */

// Interface for template variables
interface TemplateVariable {
  type: 'text' | 'currency' | 'date_time' | 'image' | 'document' | 'video' | 'audio';
  text?: string;
  currency?: {
    fallback_value: string;
    code: string;
    amount_1000: number;
  };
  date_time?: {
    fallback_value: string;
  };
  image?: {
    link: string;
  };
  document?: {
    link: string;
    filename?: string;
  };
  video?: {
    link: string;
  };
  audio?: {
    link: string;
  };
}

// Interface for WhatsApp attachment
interface WhatsAppAttachment {
  type: 'image' | 'document' | 'video' | 'audio';
  url: string;
  filename?: string;
  caption?: string;
}

// Interface for template message response
interface WhatsAppMessageResponse {
  messaging_product: string;
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

export const sendWhatsAppMessage = async (to: string, message: string): Promise<boolean> => {
  try {
    // WhatsApp Cloud API configuration
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error('WhatsApp credentials not configured. Please set WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID environment variables.');
      console.log(`Simulating sending WhatsApp message to ${to}: "${message}"`);
      return true; // Return true for development/testing purposes
    }
    
    // Format phone number (remove any non-digit characters except +)
    const formattedPhone = to.replace(/[^\d+]/g, '');
    
    // Ensure phone number starts with country code
    const phoneNumber = formattedPhone.startsWith('+') ? formattedPhone.substring(1) : formattedPhone;
    
    // Prepare the message payload
    const messagePayload = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "text",
      text: {
        body: message
      }
    };
    
    // Send message via WhatsApp Cloud API
    const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
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
      return true;
    } else {
      console.error('Failed to send WhatsApp message:', responseData);
      // Log the error but don't fail completely in development
      console.log(`Simulating WhatsApp message send to ${to}: "${message}"`);
      return false;
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    // Fallback to simulation in case of network errors
    console.log(`Simulating WhatsApp message send to ${to}: "${message}"`);
    return false;
  }
};

/**
 * Send WhatsApp broadcast message using pre-approved templates
 * @param to - Phone number with country code
 * @param templateName - Name of the approved WhatsApp template
 * @param variables - Array of template variables for dynamic content
 * @param languageCode - Language code (default: 'en')
 * @returns Promise<string | null> - Message ID if successful, null if failed
 */
export const sendBroadcastWhatsApp = async (
  to: string,
  templateName: string,
  variables: TemplateVariable[] = [],
  languageCode: string = 'en'
): Promise<string | null> => {
  try {
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error('WhatsApp credentials not configured.');
      console.log(`Simulating broadcast template "${templateName}" to ${to}`);
      return 'simulated_message_id';
    }
    
    // Format phone number
    const phoneNumber = to.replace(/[^\d+]/g, '').startsWith('+') ? 
      to.replace(/[^\d+]/g, '').substring(1) : 
      to.replace(/[^\d]/g, '');
    
    // Prepare template message payload
    const templatePayload = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        components: variables.length > 0 ? [
          {
            type: "body",
            parameters: variables
          }
        ] : []
      }
    };
    
    const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(templatePayload)
    });
    
    const responseData: WhatsAppMessageResponse = await response.json();
    
    if (response.ok && responseData.messages && responseData.messages.length > 0) {
      const messageId = responseData.messages[0].id;
      console.log(`WhatsApp template "${templateName}" sent successfully to ${to}. Message ID: ${messageId}`);
      return messageId;
    } else {
      console.error('Failed to send WhatsApp template:', responseData);
      console.log(`Simulating broadcast template "${templateName}" to ${to}`);
      return null;
    }
  } catch (error) {
    console.error('Error sending WhatsApp template:', error);
    console.log(`Simulating broadcast template "${templateName}" to ${to}`);
    return null;
  }
};

/**
 * Send WhatsApp message with attachment (image, document, video, audio)
 * @param to - Phone number with country code
 * @param templateName - Name of the approved WhatsApp template (optional)
 * @param attachment - Attachment object with type, URL, and optional metadata
 * @param variables - Template variables if using template
 * @param languageCode - Language code for template (default: 'en')
 * @returns Promise<string | null> - Message ID if successful, null if failed
 */
export const sendWhatsAppWithAttachment = async (
  to: string,
  templateName: string | null,
  attachment: WhatsAppAttachment,
  variables: TemplateVariable[] = [],
  languageCode: string = 'en'
): Promise<string | null> => {
  try {
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error('WhatsApp credentials not configured.');
      console.log(`Simulating ${attachment.type} attachment to ${to}`);
      return 'simulated_message_id';
    }
    
    // Format phone number
    const phoneNumber = to.replace(/[^\d+]/g, '').startsWith('+') ? 
      to.replace(/[^\d+]/g, '').substring(1) : 
      to.replace(/[^\d]/g, '');
    
    let messagePayload: {
      messaging_product: string;
      to: string;
      type: string;
      template?: {
        name: string;
        language: { code: string };
        components?: Array<{
          type: string;
          parameters?: TemplateVariable[];
        }>;
      };
      text?: { body: string };
      image?: { link: string; caption?: string };
      document?: { link: string; filename?: string; caption?: string };
      video?: { link: string; caption?: string };
      audio?: { link: string };
    };
    
    if (templateName) {
      // Send template with media header
      messagePayload = {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: attachment.type,
                  [attachment.type]: {
                    link: attachment.url,
                    ...(attachment.filename && { filename: attachment.filename })
                  }
                }
              ]
            },
            ...(variables.length > 0 ? [
              {
                type: "body",
                parameters: variables
              }
            ] : [])
          ]
        }
      };
    } else {
      // Send media message directly
      messagePayload = {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: attachment.type,
        [attachment.type]: {
          link: attachment.url,
          ...(attachment.caption && { caption: attachment.caption }),
          ...(attachment.filename && { filename: attachment.filename })
        }
      };
    }
    
    const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messagePayload)
    });
    
    const responseData: WhatsAppMessageResponse = await response.json();
    
    if (response.ok && responseData.messages && responseData.messages.length > 0) {
      const messageId = responseData.messages[0].id;
      console.log(`WhatsApp ${attachment.type} sent successfully to ${to}. Message ID: ${messageId}`);
      return messageId;
    } else {
      console.error('Failed to send WhatsApp attachment:', responseData);
      console.log(`Simulating ${attachment.type} attachment to ${to}`);
      return null;
    }
  } catch (error) {
    console.error('Error sending WhatsApp attachment:', error);
    console.log(`Simulating ${attachment.type} attachment to ${to}`);
    return null;
  }
};

/**
 * Helper function to create text template variables
 * @param text - Text content for the variable
 * @returns TemplateVariable object
 */
export const createTextVariable = (text: string): TemplateVariable => ({
  type: 'text',
  text
});

/**
 * Helper function to create image template variables
 * @param imageUrl - URL of the image
 * @returns TemplateVariable object
 */
export const createImageVariable = (imageUrl: string): TemplateVariable => ({
  type: 'image',
  image: {
    link: imageUrl
  }
});

/**
 * Helper function to create document template variables
 * @param documentUrl - URL of the document
 * @param filename - Optional filename
 * @returns TemplateVariable object
 */
export const createDocumentVariable = (documentUrl: string, filename?: string): TemplateVariable => ({
  type: 'document',
  document: {
    link: documentUrl,
    ...(filename && { filename })
  }
});