import { NextRequest } from "next/server";
import {
  createGuestCategory,
  getGuestCategories,
} from "@/lib/services/guestCategoryService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { guestCategorySchema } from "@/lib/validations";
import { getCachedData, generateCacheKey, CACHE_TTL, invalidateCache } from "@/lib/redis";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

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
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const sortKey = req.nextUrl.searchParams.get("sortKey");
    const sortOrder = req.nextUrl.searchParams.get("sortOrder");
    
    // Generate cache key including query parameters
    const queryParams = [search, page, limit, sortKey, sortOrder].filter(Boolean).join('-');
    const cacheKey = generateCacheKey('categories', eventId, queryParams || 'default');
    
    // Get guest categories with Redis caching
    const guestCategories = await getCachedData(
      cacheKey,
      () => getGuestCategories(
        eventId,
        search || undefined,
        page ? Number(page) : 1,
        limit ? Number(limit) : 10,
        sortKey || undefined,
        sortOrder || undefined
      ),
      CACHE_TTL.GUEST_CATEGORIES
    );
    
    const response = apiResponse(
      "success",
      "Guest categories retrieved successfully",
      guestCategories.data,
      null,
      guestCategories.meta,
      200
    );
    
    // Add cache headers
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TTL.GUEST_CATEGORIES}`);
    response.headers.set('X-Cache-TTL', CACHE_TTL.GUEST_CATEGORIES.toString());
    
    return response;
  } catch {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const validation = guestCategorySchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const { eventId } = await params;
    const guestCategory = await createGuestCategory(eventId, validation.data);
    
    // Invalidate related cache after creating new category
    await invalidateCache(`guestbook:categories:${eventId}*`);
    await invalidateCache(`guestbook:statistics:${eventId}*`);
    
    return apiResponse(
      "success",
      "Guest category created successfully",
      guestCategory,
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