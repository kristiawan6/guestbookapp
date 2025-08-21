import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const { guestId } = await request.json();

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

    // Find the guest
    const guest = await prisma.guest.findUnique({
      where: { id: guestId },
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
        "You are already Attended",
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
      },
    });

    return apiResponse(
      "success",
      "Attendance recorded successfully",
      updatedGuest,
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