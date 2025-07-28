import { NextRequest } from "next/server";
import { createMessage, getMessages } from "@/lib/services/messageService";
import { apiResponse } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const sortKey = req.nextUrl.searchParams.get("sortKey");
    const sortOrder = req.nextUrl.searchParams.get("sortOrder");
    const messages = await getMessages(
      (await params).eventId,
      search || undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      sortKey || undefined,
      sortOrder || undefined
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
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const body = await req.json();
    const { eventId } = await params;
    const message = await createMessage(eventId, body);
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