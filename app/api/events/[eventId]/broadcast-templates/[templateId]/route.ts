import { NextRequest } from "next/server";
import {
  deleteBroadcastTemplate,
  getBroadcastTemplateById,
  updateBroadcastTemplate,
} from "@/lib/services/broadcastTemplateService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { broadcastTemplateSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; templateId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { templateId } = await params;
    const broadcastTemplate = await getBroadcastTemplateById(templateId);
    
    // Map footerMessage back to footer for frontend compatibility
    // Convert relative image paths to full URLs
    const templateForFrontend = {
      ...broadcastTemplate,
      footer: broadcastTemplate.footerMessage,
      imageAttachment: broadcastTemplate.imageAttachment && !broadcastTemplate.imageAttachment.startsWith('http') 
        ? `${req.nextUrl.origin}${broadcastTemplate.imageAttachment.startsWith('/') ? '' : '/'}${broadcastTemplate.imageAttachment}`
        : broadcastTemplate.imageAttachment,
    };
    
    return apiResponse(
      "success",
      "Broadcast template retrieved successfully",
      templateForFrontend,
      null,
      null,
      200
    );
  } catch (err: unknown) {
    const error = err as { name?: string; code?: string };
    if (
      error.name === "JWTExpired" ||
      error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ||
      error.code === "ERR_JWS_INVALID"
    ) {
      return apiResponse("error", "Unauthorized", null, [], null, 401);
    }
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 500);
    }
    return apiResponse(
      "error",
      "An unknown error occurred",
      null,
      [],
      null,
      500
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; templateId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { templateId } = await params;
    const body = await req.json();
    const validation = broadcastTemplateSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const broadcastTemplate = await updateBroadcastTemplate(templateId, validation.data);
    
    // Map footerMessage back to footer for frontend compatibility
    const templateForFrontend = {
      ...broadcastTemplate,
      footer: broadcastTemplate.footerMessage,
    };
    
    return apiResponse(
      "success",
      "Broadcast template updated successfully",
      templateForFrontend,
      null,
      null,
      200
    );
  } catch (err: unknown) {
    const error = err as { name?: string; code?: string };
    if (
      error.name === "JWTExpired" ||
      error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ||
      error.code === "ERR_JWS_INVALID"
    ) {
      return apiResponse("error", "Unauthorized", null, [], null, 401);
    }
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse(
      "error",
      "An unknown error occurred",
      null,
      [],
      null,
      500
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; templateId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { templateId } = await params;
    await deleteBroadcastTemplate(templateId);
    return apiResponse(
      "success",
      "Broadcast template deleted successfully",
      null,
      null,
      null,
      200
    );
  } catch (err: unknown) {
    const error = err as { name?: string; code?: string };
    if (
      error.name === "JWTExpired" ||
      error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ||
      error.code === "ERR_JWS_INVALID"
    ) {
      return apiResponse("error", "Unauthorized", null, [], null, 401);
    }
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 500);
    }
    return apiResponse(
      "error",
      "An unknown error occurred",
      null,
      [],
      null,
      500
    );
  }
}