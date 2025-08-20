import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinaryService";

export async function POST(req: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { success: false, error: "Cloudinary is not properly configured" },
        { status: 500 }
      );
    }

    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file found" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPG, JPEG, PNG, and HEIC are allowed.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const uniqueFileName = `qr-template-${timestamp}`;
    
    // Upload to Cloudinary
    const uploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'qr-cards';
    const cloudinaryResult = await uploadToCloudinary(buffer, {
      folder: `guestbook/${uploadFolder}`,
      public_id: uniqueFileName,
      resource_type: 'image',
      format: fileExtension
    });
    
    console.log(`QR template uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
    
    return NextResponse.json({ 
      success: true, 
      path: cloudinaryResult.secure_url, // Return Cloudinary URL
      filename: `${uniqueFileName}.${fileExtension}`,
      cloudinaryId: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url
    });
  } catch (error) {
    console.error("Error uploading QR template:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}