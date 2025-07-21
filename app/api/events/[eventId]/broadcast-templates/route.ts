import { NextRequest } from "next/server";
import {
  createBroadcastTemplate,
  getBroadcastTemplates,
} from "@/lib/services/broadcastTemplateService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { broadcastTemplateSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { eventId } = await params;
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const type = req.nextUrl.searchParams.get("type");
    const broadcastTemplates = await getBroadcastTemplates(
      eventId,
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      type || undefined
    );
    return apiResponse(
      "success",
      "Broadcast templates retrieved successfully",
      broadcastTemplates.data,
      null,
      broadcastTemplates.meta,
      200
    );
  } catch (err: unknown) {
    const error = err as { name?: string; code?: string };
    if (error.name === "JWTExpired" || error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" || error.code === "ERR_JWS_INVALID") {
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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { eventId } = await params;
    const body = await req.json();
    const validation = broadcastTemplateSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const broadcastTemplate = await createBroadcastTemplate(
      eventId,
      validation.data
    );
    return apiResponse(
      "success",
      "Broadcast template created successfully",
      broadcastTemplate,
      null,
      null,
      201
    );
  } catch (err: unknown) {
    const error = err as { name?: string; code?: string };
    if (error.name === "JWTExpired" || error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" || error.code === "ERR_JWS_INVALID") {
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