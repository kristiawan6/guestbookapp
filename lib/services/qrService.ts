import { toDataURL } from "qrcode";

/**
 * Generates a QR code as a data URL.
 * @param data The data to encode in the QR code (e.g., a guest ID).
 * @returns A promise that resolves with the data URL of the QR code.
 */
export const generateQrCode = async (data: string): Promise<string> => {
  try {
    const qrCodeUrl = await toDataURL(data);
    return qrCodeUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Could not generate QR code.");
  }
};

/**
 * In a real application, this service could also include functions
 * for decoding QR codes if processing is done on the server side,
 * although typically decoding happens on the client.
 */