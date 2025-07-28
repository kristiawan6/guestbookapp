import { NextRequest } from "next/server";
import {
  getEventById,
  updateEvent,
  deleteEvent,
} from "@/lib/services/eventService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { eventSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

/**
 * @swagger
 * /api/events/{eventId}/{id}:
 *   get:
 *     summary: Get an event by ID
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       401:
 *         description: Unauthorized
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; id: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { id } = await params;
    const event = await getEventById(id);
    return apiResponse("success", "Event retrieved successfully", event, null, null, 200);
  } catch {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}

/**
 * @swagger
 * /api/events/{eventId}/{id}:
 *   put:
 *     summary: Update an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; id: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }

    const body = await req.json();
    const validation = eventSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const { id } = await params;
    const event = await updateEvent(id, validation.data);
    return apiResponse("success", "Event updated successfully", event, null, null, 200);
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, null, null, 400);
    }
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}

/**
 * @swagger
 * /api/events/{eventId}/{id}:
 *   delete:
 *     summary: Delete an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; id: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }
    const { id } = await params;
    await deleteEvent(id);
    return apiResponse("success", "Event deleted successfully", null, null, null, 204);
  } catch {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}