import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: string;
  bytes: number;
}

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  format?: string;
  transformation?: any[];
}

/**
 * Upload a file buffer to Cloudinary
 * @param buffer - File buffer to upload
 * @param options - Upload options
 * @returns Promise with upload result
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: options.resource_type || 'auto',
      folder: options.folder || 'guestbook',
      public_id: options.public_id,
      format: options.format,
      transformation: options.transformation,
      ...options,
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result as CloudinaryUploadResult);
        } else {
          reject(new Error('Upload failed - no result returned'));
        }
      }
    ).end(buffer);
  });
}

/**
 * Upload a base64 string to Cloudinary
 * @param base64Data - Base64 encoded data (with or without data URL prefix)
 * @param options - Upload options
 * @returns Promise with upload result
 */
export async function uploadBase64ToCloudinary(
  base64Data: string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const uploadOptions = {
    resource_type: options.resource_type || 'auto',
    folder: options.folder || 'guestbook',
    public_id: options.public_id,
    format: options.format,
    transformation: options.transformation,
    ...options,
  };

  try {
    const result = await cloudinary.uploader.upload(base64Data, uploadOptions);
    return result as CloudinaryUploadResult;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
}

/**
 * Delete a file from Cloudinary
 * @param publicId - Public ID of the file to delete
 * @param resourceType - Type of resource (image, video, raw)
 * @returns Promise with deletion result
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<any> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${error}`);
  }
}

/**
 * Generate a secure URL for a Cloudinary asset
 * @param publicId - Public ID of the asset
 * @param options - Transformation options
 * @returns Secure URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options: any = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
}

/**
 * Generate a transformation URL for image processing
 * @param publicId - Public ID of the image
 * @param transformations - Array of transformation objects
 * @returns Transformed image URL
 */
export function getTransformedImageUrl(
  publicId: string,
  transformations: any[] = []
): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformations,
  });
}

/**
 * Check if Cloudinary is properly configured
 * @returns boolean indicating if configuration is valid
 */
export function isCloudinaryConfigured(): boolean {
  return !!
    (process.env.CLOUDINARY_CLOUD_NAME &&
     process.env.CLOUDINARY_API_KEY &&
     process.env.CLOUDINARY_API_SECRET);
}

/**
 * Get Cloudinary configuration status
 * @returns Object with configuration details
 */
export function getCloudinaryConfig() {
  return {
    configured: isCloudinaryConfigured(),
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'Not set',
    api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
  };
}

export default cloudinary;