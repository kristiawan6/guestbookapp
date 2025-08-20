import { NextRequest } from "next/server";
import { getGuestStatistics } from "@/lib/services/statisticsService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export const dynamic = "force-dynamic";

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
    
    // Get statistics directly from database
    const statistics = await getGuestStatistics(eventId);
    
    return apiResponse(
      "success",
      "Statistics retrieved successfully",
      statistics,
      null,
      null,
      200
    );
  } catch (err: unknown) {
    const error = err as { name?: string; code?: string };
    if (error.name === "JWTExpired" || error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" || error.code === "ERR_JWS_INVALID") {
      return apiResponse("error", "Unauthorized", null, [], null, 401);
    }
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 500);
    }
    return apiResponse(
      "error",
      "An unknown error occurred",
      null,
      [],
      null,
      500
    );
  }
}