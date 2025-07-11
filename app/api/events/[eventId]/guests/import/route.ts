import { NextRequest, NextResponse } from "next/server";
import { importGuests } from "@/lib/services/guestService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await importGuests(params.eventId, buffer);
    return apiResponse(
      "success",
      "Guests imported successfully",
      result,
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