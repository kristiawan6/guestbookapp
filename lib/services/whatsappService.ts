/**
 * WhatsApp service integration using WhatsApp Cloud API.
 * Handles sending WhatsApp messages via Facebook's official API.
 */

export const sendWhatsAppMessage = async (to: string, message: string): Promise<boolean> => {
  try {
    // WhatsApp Cloud API configuration
    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error('WhatsApp credentials not configured. Please set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID environment variables.');
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