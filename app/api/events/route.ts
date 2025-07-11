import { NextRequest, NextResponse } from "next/server";
import { createEvent, getEvents } from "@/lib/services/eventService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, [], null, 403);
    }

    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const events = await getEvents(
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    );
    return apiResponse(
      "success",
      "Events retrieved successfully",
      events.data,
      null,
      events.meta,
      200
    );
  } catch (err) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, [], null, 403);
    }

    const body = await req.json();
    const event = await createEvent(body);
    return apiResponse(
      "success",
      "Event created successfully",
      event,
      null,
      null,
      201
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}