import { NextRequest, NextResponse } from "next/server";
import { getGuestStatistics } from "@/lib/services/statisticsService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  await req.json().catch(() => ({})); // Await the request body to be parsed
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { eventId } = params;
    const statistics = await getGuestStatistics(eventId);
    return apiResponse(
      "success",
      "Statistics retrieved successfully",
      statistics,
      null,
      null,
      200
    );
  } catch (err) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}