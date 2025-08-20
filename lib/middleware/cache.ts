import { NextRequest, NextResponse } from 'next/server';
import { getCachedData, generateCacheKey, CACHE_TTL } from '../redis';

export interface CacheOptions {
  ttl?: number;
  keyGenerator?: (req: NextRequest) => string;
  skipCache?: (req: NextRequest) => boolean;
}

/**
 * Cache middleware for API routes
 */
export function withCache(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse>,
  options: CacheOptions = {}
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const {
      ttl = CACHE_TTL.STATISTICS,
      keyGenerator = defaultKeyGenerator,
      skipCache = () => false
    } = options;

    // Skip cache for non-GET requests or when explicitly skipped
    if (req.method !== 'GET' || skipCache(req)) {
      return handler(req, context);
    }

    try {
      const cacheKey = keyGenerator(req);
      
      const cachedResponse = await getCachedData(
        cacheKey,
        async () => {
          const response = await handler(req, context);
          
          // Only cache successful responses
          if (response.status === 200) {
            const responseData = await response.json();
            return {
              data: responseData,
              status: response.status,
              headers: Object.fromEntries(response.headers.entries())
            };
          }
          
          throw new Error(`Non-cacheable response: ${response.status}`);
        },
        ttl
      );

      // Return cached response
      return NextResponse.json(cachedResponse.data, {
        status: cachedResponse.status,
        headers: {
          ...cachedResponse.headers,
          'X-Cache': 'HIT',
          'Cache-Control': `public, max-age=${ttl}`
        }
      });
      
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Fallback to original handler
      const response = await handler(req, context);
      
      // Add cache miss header
      response.headers.set('X-Cache', 'MISS');
      return response;
    }
  };
}

/**
 * Default cache key generator
 */
function defaultKeyGenerator(req: NextRequest): string {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const searchParams = url.searchParams.toString();
  
  return generateCacheKey(
    'api',
    pathname.replace('/api/', ''),
    searchParams || 'no-params'
  );
}

/**
 * Statistics-specific cache key generator
 */
export function statisticsCacheKeyGenerator(req: NextRequest): string {
  const url = new URL(req.url);
  const eventId = url.pathname.split('/')[3]; // Extract eventId from path
  const searchParams = url.searchParams.toString();
  
  return generateCacheKey(
    'statistics',
    eventId,
    searchParams || 'all'
  );
}

/**
 * Events cache key generator
 */
export function eventsCacheKeyGenerator(req: NextRequest): string {
  const url = new URL(req.url);
  const searchParams = url.searchParams.toString();
  
  return generateCacheKey(
    'events',
    searchParams || 'all'
  );
}

/**
 * Guest categories cache key generator
 */
export function categoriesCacheKeyGenerator(req: NextRequest): string {
  const url = new URL(req.url);
  const eventId = url.pathname.split('/')[3]; // Extract eventId from path
  
  return generateCacheKey(
    'categories',
    eventId
  );
}

/**
 * Cache invalidation helper for mutations
 */
export async function invalidateRelatedCache(eventId?: string, type?: 'events' | 'statistics' | 'categories' | 'guests') {
  const { invalidateCache } = await import('../redis');
  
  if (type && eventId) {
    // Invalidate specific cache type for event
    await invalidateCache(`guestbook:${type}:${eventId}*`);
  } else if (eventId) {
    // Invalidate all cache for specific event
    await invalidateCache(`guestbook:*:${eventId}*`);
  } else {
    // Invalidate all cache (use sparingly)
    await invalidateCache('guestbook:*');
  }
}