import { NextRequest, NextResponse } from "next/server";
import {
  createGuestCategory,
  getGuestCategories,
} from "@/lib/services/guestCategoryService";
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
    const { eventId } = params;
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const guestCategories = await getGuestCategories(
      eventId,
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    );
    return apiResponse(
      "success",
      "Guest categories retrieved successfully",
      guestCategories.data,
      null,
      guestCategories.meta,
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
    const { eventId: event_id } = params;
    const guestCategory = await createGuestCategory(event_id, body);
    return apiResponse(
      "success",
      "Guest category created successfully",
      guestCategory,
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