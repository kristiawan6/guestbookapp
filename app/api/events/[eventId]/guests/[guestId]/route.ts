import { NextRequest } from "next/server";
import {
  deleteGuest,
  updateGuest,
} from "@/lib/services/guestService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { guestSchema } from "@/lib/validations";
import { emitGuestUpdate } from "@/lib/socket";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

/**
 * @swagger
 * /api/events/{eventId}/guests/{guestId}:
 *   put:
 *     summary: Update a guest
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: guestId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guest'
 *     responses:
 *       200:
 *         description: Guest updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ guestId: string; eventId: string }> }
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
    const { guestId, eventId } = await params;
    const guest = await updateGuest(guestId, validation.data);
    
    // Emit real-time update for guest modification
    emitGuestUpdate({
      guestId,
      eventId,
      updatedFields: validation.data,
      timestamp: new Date().toISOString()
    });
    
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

/**
 * @swagger
 * /api/events/{eventId}/guests/{guestId}:
 *   delete:
 *     summary: Delete a guest
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: guestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guest deleted successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ guestId: string; eventId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { guestId, eventId } = await params;
    await deleteGuest(guestId);
    
    // Emit real-time update for guest deletion
    emitGuestUpdate({
      guestId,
      eventId,
      updatedFields: { deleted: true },
      timestamp: new Date().toISOString()
    });
    
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