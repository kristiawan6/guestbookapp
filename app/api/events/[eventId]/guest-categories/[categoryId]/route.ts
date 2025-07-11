import { NextRequest, NextResponse } from "next/server";
import {
  deleteGuestCategory,
  getGuestCategoryById,
  updateGuestCategory,
} from "@/lib/services/guestCategoryService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const guestCategory = await getGuestCategoryById(params.categoryId);
    return apiResponse(
      "success",
      "Guest category retrieved successfully",
      guestCategory,
      null,
      null,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 404);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const guestCategory = await updateGuestCategory(params.categoryId, body);
    return apiResponse(
      "success",
      "Guest category updated successfully",
      guestCategory,
      null,
      null,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    await deleteGuestCategory(params.categoryId);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}