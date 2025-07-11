import { NextRequest, NextResponse } from "next/server";
import { createMessage, getMessages } from "@/lib/services/messageService";
import { apiResponse } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const messages = await getMessages(
      params.eventId,
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    );
    return apiResponse(
      "success",
      "Messages retrieved successfully",
      messages.data,
      null,
      messages.meta,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Internal Server Error", null, [], null, 500);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const body = await req.json();
    const message = await createMessage(params.eventId, body);
    return apiResponse(
      "success",
      "Message created successfully",
      message,
      null,
      null,
      201
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Internal Server Error", null, [], null, 500);
  }
}