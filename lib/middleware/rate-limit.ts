import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: NextRequest) => string; // Custom key generator
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
  keyGenerator: (req) => getClientIP(req),
};

/**
 * Extract client IP address from request
 */
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

/**
 * Rate limiting middleware using Redis
 */
export function createRateLimit(config: Partial<RateLimitConfig> = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  return async function rateLimit(req: NextRequest): Promise<NextResponse | null> {
    try {
      const redis = await getRedisClient();
      if (!redis) {
        // If Redis is not available, allow the request
        console.warn('Redis not available for rate limiting');
        return null;
      }
      
      const key = finalConfig.keyGenerator!(req);
      const redisKey = `rate_limit:${key}`;
      
      // Get current count
      const current = await redis.get(redisKey);
      const count = current ? parseInt(current, 10) : 0;
      
      // Check if limit exceeded
      if (count >= finalConfig.maxRequests) {
        const ttl = await redis.ttl(redisKey);
        const resetTime = new Date(Date.now() + (ttl * 1000));
        
        return new NextResponse(
          JSON.stringify({
            error: 'Too Many Requests',
            message: `Rate limit exceeded. Try again after ${resetTime.toISOString()}`,
            retryAfter: ttl,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': resetTime.toISOString(),
              'Retry-After': ttl.toString(),
            },
          }
        );
      }
      
      // Increment counter
      const pipeline = redis.pipeline();
      pipeline.incr(redisKey);
      
      // Set expiration only if this is the first request
      if (count === 0) {
        pipeline.expire(redisKey, Math.ceil(finalConfig.windowMs / 1000));
      }
      
      await pipeline.exec();
      
      // Add rate limit headers to track usage
      const remaining = Math.max(0, finalConfig.maxRequests - count - 1);
      const resetTime = new Date(Date.now() + finalConfig.windowMs);
      
      // Store headers in request for later use
      (req as any).rateLimitHeaders = {
        'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toISOString(),
      };
      
      return null; // Allow request to proceed
    } catch (error) {
      console.error('Rate limiting error:', error);
      // On error, allow the request to proceed
      return null;
    }
  };
}

/**
 * Predefined rate limiters for different use cases
 */
export const rateLimiters = {
  // Strict rate limiting for authentication endpoints
  auth: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
  }),
  
  // Standard rate limiting for API endpoints
  api: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  }),
  
  // Lenient rate limiting for public endpoints
  public: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200, // 200 requests per minute
  }),
  
  // Strict rate limiting for file uploads
  upload: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 uploads per minute
  }),
  
  // Email/SMS rate limiting
  messaging: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20, // 20 messages per minute
  }),
};

/**
 * Higher-order function to apply rate limiting to API routes
 */
export function withRateLimit(
  handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>,
  rateLimit: ReturnType<typeof createRateLimit>
) {
  return async function rateLimitedHandler(
    req: NextRequest,
    ...args: any[]
  ): Promise<NextResponse> {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(req);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    // Execute the original handler
    const response = await handler(req, ...args);
    
    // Add rate limit headers to successful responses
    const rateLimitHeaders = (req as any).rateLimitHeaders;
    if (rateLimitHeaders) {
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value as string);
      });
    }
    
    return response;
  };
}

/**
 * Utility function to clear rate limit for a specific key
 */
export async function clearRateLimit(key: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    if (redis) {
      await redis.del(`rate_limit:${key}`);
    }
  } catch (error) {
    console.error('Error clearing rate limit:', error);
  }
}

/**
 * Utility function to get current rate limit status
 */
export async function getRateLimitStatus(
  key: string,
  maxRequests: number
): Promise<{
  count: number;
  remaining: number;
  resetTime: Date | null;
}> {
  try {
    const redis = await getRedisClient();
    if (!redis) {
      return { count: 0, remaining: maxRequests, resetTime: null };
    }
    
    const redisKey = `rate_limit:${key}`;
    const count = parseInt((await redis.get(redisKey)) || '0', 10);
    const ttl = await redis.ttl(redisKey);
    
    return {
      count,
      remaining: Math.max(0, maxRequests - count),
      resetTime: ttl > 0 ? new Date(Date.now() + ttl * 1000) : null,
    };
  } catch (error) {
    console.error('Error getting rate limit status:', error);
    return { count: 0, remaining: maxRequests, resetTime: null };
  }
}