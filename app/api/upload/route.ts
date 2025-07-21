import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { stat } from "fs/promises";

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

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), "public", "uploads");
    try {
      await stat(uploadsDir);
    } catch (error: unknown) {
      const e = error as { code?: string };
      if (e.code === "ENOENT") {
        await mkdir(uploadsDir, { recursive: true });
      } else {
        console.error("Error checking uploads directory:", error);
        return NextResponse.json(
          { success: false, error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }

    const path = join(uploadsDir, file.name);
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    return NextResponse.json({ success: true, path: `/uploads/${file.name}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}