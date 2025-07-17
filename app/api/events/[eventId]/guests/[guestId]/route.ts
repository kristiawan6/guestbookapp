import { NextRequest, NextResponse } from "next/server";
import {
  deleteGuest,
  updateGuest,
} from "@/lib/services/guestService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { guestSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ guestId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const validation = guestSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const { guestId } = await params;
    const guest = await updateGuest(guestId, validation.data);
    return apiResponse(
      "success",
      "Guest updated successfully",
      guest,
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
  { params }: { params: Promise<{ guestId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { guestId } = await params;
    await deleteGuest(guestId);
    return apiResponse(
      "success",
      "Guest deleted successfully",
      null,
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