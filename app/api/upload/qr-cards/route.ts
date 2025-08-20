import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { stat } from "fs/promises";
import { tmpdir } from "os";

export async function POST(req: NextRequest) {
  try {
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

    // Use temporary directory for serverless environments
    const qrCardsDir = join(tmpdir(), "qr-cards");
    try {
      await stat(qrCardsDir);
    } catch (error: unknown) {
      const e = error as { code?: string };
      if (e.code === "ENOENT") {
        await mkdir(qrCardsDir, { recursive: true });
      } else {
        console.error("Error checking qr-cards directory:", error);
        return NextResponse.json(
          { success: false, error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }

    // Generate unique filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const uniqueFileName = `qr-template-${timestamp}.${fileExtension}`;
    const path = join(qrCardsDir, uniqueFileName);
    
    await writeFile(path, buffer);
    console.log(`QR template uploaded to ${path}`);

    // In serverless environments, return base64 data instead of file path
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;
    
    return NextResponse.json({ 
      success: true, 
      path: dataUrl, // Return data URL instead of file path
      filename: uniqueFileName,
      tempPath: path // For debugging purposes
    });
  } catch (error) {
    console.error("Error uploading QR template:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}