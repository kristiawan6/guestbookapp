import sharp from 'sharp';
import { toDataURL } from 'qrcode';

// Define Guest type based on Prisma schema
type Guest = {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  numberOfGuests: number | null;
  session: string | null;
  tableNumber: string | null;
  notes: string | null;
  qrCode: string | null;
  invitationLink: string | null;
  status: 'Invited' | 'Attended' | 'Cancelled';
  eventId: string;
  guestCategoryId: string | null;
};

export interface QRCodeOverlayOptions {
  guestData: Guest;
  blankTemplateBuffer: Buffer;
  qrCodePosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  namePosition?: {
    x: number;
    y: number;
    fontSize: number;
    fontColor: string;
  };
}

export interface CoordinateField {
  id: string;
  type: 'qr-code' | 'text';
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fieldName?: string;
}

export interface DynamicQRCodeOptions {
  guestData: Guest;
  blankTemplateBuffer: Buffer;
  coordinateFields: CoordinateField[];
}

export class ImageProcessingService {
  /**
   * Generate a QR code buffer from guest data
   */
  private async generateQRCodeBuffer(
    guestData: Guest,
    width: number = 200,
    _height: number = 200 // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<Buffer> {
    try {
      // Create QR code data with guest information
      const qrData = JSON.stringify({
        id: guestData.id,
        name: guestData.name,
        phoneNumber: guestData.phoneNumber,
        email: guestData.email,
        timestamp: new Date().toISOString()
      });

      // Generate QR code as PNG buffer
      const qrCodeDataURL = await toDataURL(qrData, {
        width,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // Convert data URL to buffer
      const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, '');
      return Buffer.from(base64Data, 'base64');
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error}`);
    }
  }

  /**
   * Create a text overlay buffer for guest name
   */
  private async createTextOverlay(
    text: string,
    fontSize: number = 24,
    fontColor: string = '#000000',
    fontWeight: string = 'normal',
    width: number = 400,
    height: number = 60
  ): Promise<Buffer> {
    try {
      // Create SVG text element
      const svgText = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                font-family="Arial, sans-serif" 
                font-size="${fontSize}" 
                font-weight="${fontWeight}" 
                fill="${fontColor}">
            ${text}
          </text>
        </svg>
      `;

      return Buffer.from(svgText);
    } catch (error) {
      throw new Error(`Failed to create text overlay: ${error}`);
    }
  }

  /**
   * Process blank template with QR code and name overlay
   */
  async processQRCodeTemplate(options: QRCodeOverlayOptions): Promise<Buffer> {
    try {
      const {
        guestData,
        blankTemplateBuffer,
        qrCodePosition = { x: 50, y: 50, width: 200, height: 200 },
        namePosition = { x: 50, y: 270, fontSize: 24, fontColor: '#000000' }
      } = options;

      // Get template metadata
      const templateMetadata = await sharp(blankTemplateBuffer).metadata();
      const templateWidth = templateMetadata.width || 400;
      const _templateHeight = templateMetadata.height || 600; // eslint-disable-line @typescript-eslint/no-unused-vars

      // Generate QR code buffer
      const qrCodeBuffer = await this.generateQRCodeBuffer(
        guestData,
        qrCodePosition.width,
        qrCodePosition.height
      );

      // Create name text overlay
      const nameOverlayBuffer = await this.createTextOverlay(
        guestData.name,
        namePosition.fontSize,
        namePosition.fontColor,
        'normal', // Default font weight for legacy method
        templateWidth - namePosition.x * 2, // Dynamic width based on template
        60
      );

      // Composite all elements onto the blank template
      const processedImage = await sharp(blankTemplateBuffer)
        .composite([
          {
            input: qrCodeBuffer,
            left: qrCodePosition.x,
            top: qrCodePosition.y
          },
          {
            input: nameOverlayBuffer,
            left: namePosition.x,
            top: namePosition.y
          }
        ])
        .png()
        .toBuffer();

      return processedImage;
    } catch (error) {
      throw new Error(`Failed to process QR code template: ${error}`);
    }
  }

  /**
   * Process QR code template with dynamic coordinate fields
   */
  async processQRCodeTemplateWithDynamicFields(options: DynamicQRCodeOptions): Promise<Buffer> {
    try {
      const { guestData, blankTemplateBuffer, coordinateFields } = options;

      // Get template metadata
      const templateMetadata = await sharp(blankTemplateBuffer).metadata();
      const templateWidth = templateMetadata.width || 400;
      const templateHeight = templateMetadata.height || 600;

      // Prepare composite operations
      const compositeOperations: sharp.OverlayOptions[] = [];

      // Process each coordinate field
      for (const field of coordinateFields) {
        if (field.type === 'qr-code') {
          // Generate QR code
          const qrWidth = field.width ? (field.width / 100) * templateWidth : 200;
          const qrHeight = field.height ? (field.height / 100) * templateHeight : 200;
          const qrCodeBuffer = await this.generateQRCodeBuffer(
            guestData,
            qrWidth,
            qrHeight
          );

          // Center the QR code at the specified coordinates (like the preview)
          compositeOperations.push({
            input: qrCodeBuffer,
            left: Math.round((field.x / 100) * templateWidth - qrWidth / 2),
            top: Math.round((field.y / 100) * templateHeight - qrHeight / 2)
          });
        } else if (field.type === 'text' && field.fieldName) {
          // Get field value from guest data
          const fieldValue = this.getGuestFieldValue(guestData, field.fieldName);
          if (fieldValue) {
            // Calculate text dimensions
            const textWidth = field.width ? (field.width / 100) * templateWidth : Math.round(templateWidth * 0.8);
            const textHeight = field.height ? (field.height / 100) * templateHeight : Math.round((field.fontSize || 16) * 1.5);
            
            // Create text overlay
            const textOverlayBuffer = await this.createTextOverlay(
              fieldValue,
              field.fontSize || 16,
              '#000000',
              field.fontWeight || 'normal',
              textWidth,
              textHeight
            );

            // Center the text at the specified coordinates (like the preview)
            compositeOperations.push({
              input: textOverlayBuffer,
              left: Math.round((field.x / 100) * templateWidth - textWidth / 2),
              top: Math.round((field.y / 100) * templateHeight - textHeight / 2)
            });
          }
        }
      }

      // Composite all elements onto the blank template
      const processedImage = await sharp(blankTemplateBuffer)
        .composite(compositeOperations)
        .png()
        .toBuffer();

      return processedImage;
    } catch (error) {
      throw new Error(`Failed to process dynamic QR code template: ${error}`);
    }
  }

  /**
   * Get guest field value by field name
   */
  private getGuestFieldValue(guestData: Guest, fieldName: string): string {
    const fieldMap: { [key: string]: string } = {
      'Fullname': guestData.name || '',
      'Email': guestData.email || '',
      'Address / Institution': guestData.address || '',
      'Table Number': guestData.tableNumber || '',
      'Notes': guestData.notes || '',
      'Total Pack': guestData.numberOfGuests?.toString() || '1',
      'Link Web Inv (Personal)': guestData.invitationLink || '',
      'Link RSVP': guestData.invitationLink || '',
      'Link Web (General)': guestData.invitationLink || ''
    };

    return fieldMap[fieldName] || '';
  }

  /**
   * Batch process multiple guests with the same template
   */
  async batchProcessQRCodeTemplates(
    guests: Guest[],
    blankTemplateBuffer: Buffer,
    qrCodePosition?: QRCodeOverlayOptions['qrCodePosition'],
    namePosition?: QRCodeOverlayOptions['namePosition']
  ): Promise<{ guest: Guest; processedImage: Buffer }[]> {
    try {
      const results = await Promise.all(
        guests.map(async (guest) => {
          const processedImage = await this.processQRCodeTemplate({
            guestData: guest,
            blankTemplateBuffer,
            qrCodePosition,
            namePosition
          });

          return {
            guest,
            processedImage
          };
        })
      );

      return results;
    } catch (error) {
      throw new Error(`Failed to batch process QR code templates: ${error}`);
    }
  }

  /**
   * Validate and optimize uploaded template image
   */
  async validateAndOptimizeTemplate(imageBuffer: Buffer): Promise<{
    isValid: boolean;
    optimizedBuffer?: Buffer;
    metadata?: sharp.Metadata;
    error?: string;
  }> {
    try {
      // Get image metadata
      const metadata = await sharp(imageBuffer).metadata();

      // Validate image format
      if (!['jpeg', 'jpg', 'png', 'webp'].includes(metadata.format || '')) {
        return {
          isValid: false,
          error: 'Invalid image format. Only JPEG, PNG, and WebP are supported.'
        };
      }

      // Validate image dimensions (reasonable limits)
      if (!metadata.width || !metadata.height) {
        return {
          isValid: false,
          error: 'Unable to determine image dimensions.'
        };
      }

      if (metadata.width > 2000 || metadata.height > 2000) {
        return {
          isValid: false,
          error: 'Image dimensions too large. Maximum size is 2000x2000 pixels.'
        };
      }

      if (metadata.width < 200 || metadata.height < 200) {
        return {
          isValid: false,
          error: 'Image dimensions too small. Minimum size is 200x200 pixels.'
        };
      }

      // Optimize the image (convert to PNG for consistency)
      const optimizedBuffer = await sharp(imageBuffer)
        .png({ quality: 90, compressionLevel: 6 })
        .toBuffer();

      return {
        isValid: true,
        optimizedBuffer,
        metadata
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Failed to validate template: ${error}`
      };
    }
  }
}

// Export singleton instance
export const imageProcessingService = new ImageProcessingService();