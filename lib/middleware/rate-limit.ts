import { NextRequest, NextResponse } from 'next/server';

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

// In-memory storage for rate limiting
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

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
 * Clean up expired entries from the store
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Rate limiting middleware using in-memory storage
 */
export function createRateLimit(config: Partial<RateLimitConfig> = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  return async function rateLimit(req: NextRequest): Promise<NextResponse | null> {
    try {
      const key = finalConfig.keyGenerator!(req);
      const now = Date.now();
      const resetTime = now + finalConfig.windowMs;
      
      // Clean up expired entries periodically
      if (Math.random() < 0.1) { // 10% chance to cleanup
        cleanupExpiredEntries();
      }
      
      let entry = rateLimitStore.get(key);
      
      if (!entry || now > entry.resetTime) {
        // Create new entry or reset expired entry
        entry = {
          count: 1,
          resetTime
        };
        rateLimitStore.set(key, entry);
      } else {
        // Increment existing entry
        entry.count++;
      }
      
      const remaining = Math.max(0, finalConfig.maxRequests - entry.count);
      const resetTimeDate = new Date(entry.resetTime);
      
      // Check if rate limit exceeded
      if (entry.count > finalConfig.maxRequests) {
        console.log(`🚫 Rate limit exceeded for ${key}: ${entry.count}/${finalConfig.maxRequests}`);
        
        return new NextResponse(
          JSON.stringify({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil((entry.resetTime - now) / 1000)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': resetTimeDate.toISOString(),
              'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
            },
          }
        );
      }
      
      console.log(`✅ Rate limit check passed for ${key}: ${entry.count}/${finalConfig.maxRequests}`);
      
      // Rate limit not exceeded, continue
      return null;
    } catch (error) {
      console.error('❌ Rate limiting error:', error);
      // On error, allow the request to continue
      return null;
    }
  };
}

// Pre-configured rate limiters
export const rateLimiters = {
  // Authentication endpoints
  auth: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
  }),
  
  // General API endpoints
  api: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  }),
  
  // Public endpoints
  public: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200, // 200 requests per minute
  }),
  
  // File upload endpoints
  upload: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 uploads per minute
  }),
  
  // Messaging endpoints
  messaging: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20, // 20 messages per minute
  }),
};

/**
 * Higher-order function to wrap API handlers with rate limiting
 */
export function withRateLimit(
  handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>,
  rateLimit: ReturnType<typeof createRateLimit>
) {
  return async function(req: NextRequest, ...args: any[]): Promise<NextResponse> {
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(req);
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    // Rate limit passed, execute the original handler
    try {
      const response = await handler(req, ...args);
      
      // Add rate limit headers to successful responses
      const key = getClientIP(req);
      const entry = rateLimitStore.get(key);
      
      if (entry) {
        response.headers.set('X-RateLimit-Limit', '100');
        response.headers.set('X-RateLimit-Remaining', Math.max(0, 100 - entry.count).toString());
        response.headers.set('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
      }
      
      return response;
    } catch (error) {
      console.error('Handler error:', error);
      throw error;
    }
  };
}

/**
 * Clear rate limit for a specific key (for testing or admin purposes)
 */
export async function clearRateLimit(key: string): Promise<void> {
  try {
    rateLimitStore.delete(key);
    console.log(`🧹 Cleared rate limit for key: ${key}`);
  } catch (error) {
    console.error('❌ Error clearing rate limit:', error);
  }
}

/**
 * Get current rate limit status for a key
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
    const entry = rateLimitStore.get(key);
    
    if (!entry || Date.now() > entry.resetTime) {
      return {
        count: 0,
        remaining: maxRequests,
        resetTime: null,
      };
    }
    
    return {
      count: entry.count,
      remaining: Math.max(0, maxRequests - entry.count),
      resetTime: new Date(entry.resetTime),
    };
  } catch (error) {
    console.error('❌ Error getting rate limit status:', error);
    return {
      count: 0,
      remaining: maxRequests,
      resetTime: null,
    };
  }
}