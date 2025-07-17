import { NextRequest } from "next/server";
import {
  getEventById,
  updateEvent,
  deleteEvent,
} from "@/lib/services/eventService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { eventSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const awaitedParams = await params;
    const event = await getEventById(awaitedParams.id);
    return apiResponse("success", "Event retrieved successfully", event, null, null, 200);
  } catch {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }

    const body = await req.json();
    const validation = eventSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const awaitedParams = await params;
    const event = await updateEvent(awaitedParams.id, validation.data);
    return apiResponse("success", "Event updated successfully", event, null, null, 200);
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, null, null, 400);
    }
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }

    const awaitedParams = await params;
    await deleteEvent(awaitedParams.id);
    return apiResponse("success", "Event deleted successfully", null, null, null, 204);
  } catch {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}