import { NextRequest } from "next/server";
import { getAllGuests } from "@/lib/services/guestService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

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
    const guests = await getAllGuests(eventId);
    return apiResponse(
      "success",
      "Guests retrieved successfully",
      guests,
      null,
      null,
      200
    );
  } catch {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}