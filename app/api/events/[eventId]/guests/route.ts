import { NextRequest, NextResponse } from "next/server";
import { createGuest, getGuests } from "@/lib/services/guestService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const guests = await getGuests(
      params.eventId,
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    );
    return apiResponse(
      "success",
      "Guests retrieved successfully",
      guests.data,
      null,
      guests.meta,
      200
    );
  } catch (err) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const guest = await createGuest(params.eventId, body);
    return apiResponse(
      "success",
      "Guest created successfully",
      guest,
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