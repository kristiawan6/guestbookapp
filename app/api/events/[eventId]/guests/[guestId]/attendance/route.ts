import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string; guestId: string }> }
) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { eventId, guestId } = await params;

    if (!guestId) {
      return apiResponse(
        "error",
        "Guest ID is required",
        null,
        null,
        null,
        400
      );
    }

    // Find the guest and verify it belongs to the event
    const guest = await prisma.guest.findFirst({
      where: { 
        id: guestId,
        eventId: eventId,
        isDeleted: false
      },
    });

    if (!guest) {
      return apiResponse(
        "error",
        "Guest not found",
        null,
        null,
        null,
        404
      );
    }

    // Check if guest is already attended
    if (guest.status === 'Attended') {
      return apiResponse(
        "error",
        "Guest is already marked as attended",
        null,
        null,
        null,
        400
      );
    }

    // Update guest status to attended
    const updatedGuest = await prisma.guest.update({
      where: { id: guestId },
      data: {
        status: 'Attended',
        dateArrival: new Date(),
      },
    });

    return apiResponse(
      "success",
      "Attendance recorded successfully",
      { guest: updatedGuest },
      null,
      null,
      200
    );
  } catch (error) {
    console.error("Error recording attendance:", error);
    return apiResponse(
      "error",
      "Failed to record attendance",
      null,
      null,
      null,
      500
    );
  }
}