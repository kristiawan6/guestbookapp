import { NextRequest } from "next/server";
import {
  createClaimableItem,
  getClaimableItems,
} from "@/lib/services/claimService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { claimableItemSchema } from "@/lib/validations";

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
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const sortKey = req.nextUrl.searchParams.get("sortKey");
    const sortOrder = req.nextUrl.searchParams.get("sortOrder");
    const claimableItems = await getClaimableItems(
      (await params).eventId,
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      sortKey || undefined,
      sortOrder || undefined
    );
    return apiResponse(
      "success",
      "Claimable items retrieved successfully",
      claimableItems.data,
      null,
      claimableItems.meta,
      200
    );
  } catch {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
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
    const body = await req.json();
    const validation = claimableItemSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const { name, quantity } = validation.data;
    const { eventId } = await params;
    const claimableItem = await createClaimableItem(eventId, {
      name,
      totalQuantity: quantity,
    });
    return apiResponse(
      "success",
      "Claimable item created successfully",
      claimableItem,
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