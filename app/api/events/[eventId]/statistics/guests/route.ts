import { NextRequest } from "next/server";
import { getGuestStatistics } from "@/lib/services/statisticsService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { getCachedData, generateCacheKey, CACHE_TTL } from "@/lib/redis";

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
    
    // Generate cache key for statistics
    const cacheKey = generateCacheKey('statistics', eventId, 'guests');
    
    // Get statistics with Redis caching
    const statistics = await getCachedData(
      cacheKey,
      () => getGuestStatistics(eventId),
      CACHE_TTL.STATISTICS
    );
    
    const response = apiResponse(
      "success",
      "Statistics retrieved successfully",
      statistics,
      null,
      null,
      200
    );
    
    // Add cache headers
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TTL.STATISTICS}`);
    response.headers.set('X-Cache-TTL', CACHE_TTL.STATISTICS.toString());
    
    return response;
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