import { NextRequest } from "next/server";
import { createEvent, getEvents } from "@/lib/services/eventService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { eventSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortKey
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, [], null, 403);
    }

    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const sortKey = req.nextUrl.searchParams.get("sortKey");
    const sortOrder = req.nextUrl.searchParams.get("sortOrder");
    const events = await getEvents(
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      sortKey || undefined,
      sortOrder || undefined
    );
    return apiResponse(
      "success",
      "Events retrieved successfully",
      events.data,
      null,
      events.meta,
      200
    );
  } catch {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, [], null, 403);
    }

    const body = await req.json();
    const validation = eventSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const event = await createEvent(validation.data);
    return apiResponse(
      "success",
      "Event created successfully",
      event,
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