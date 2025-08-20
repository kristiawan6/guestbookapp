import Redis from 'ioredis';

let redis: Redis | null = null;

// Redis configuration
const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
};

// TTL configurations (in seconds)
export const CACHE_TTL = {
  STATISTICS: 300, // 5 minutes
  EVENTS: 600, // 10 minutes
  GUEST_CATEGORIES: 300, // 5 minutes
  GUESTS: 180, // 3 minutes
} as const;

/**
 * Get Redis instance (singleton pattern)
 */
export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis(REDIS_CONFIG);
    
    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });
    
    redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
    });
    
    redis.on('close', () => {
      console.log('🔌 Redis connection closed');
    });
  }
  
  return redis;
}

/**
 * Check if Redis is available
 */
export async function isRedisAvailable(): Promise<boolean> {
  try {
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    console.warn('⚠️ Redis not available, falling back to direct DB queries');
    return false;
  }
}

/**
 * Generate cache key with prefix
 */
export function generateCacheKey(prefix: string, ...parts: (string | number)[]): string {
  return `guestbook:${prefix}:${parts.join(':')}`;
}

/**
 * Get cached data with fallback
 */
export async function getCachedData<T>(
  key: string,
  fallbackFn: () => Promise<T>,
  ttl: number = CACHE_TTL.STATISTICS
): Promise<T> {
  try {
    const isAvailable = await isRedisAvailable();
    if (!isAvailable) {
      return await fallbackFn();
    }

    const client = getRedisClient();
    const cached = await client.get(key);
    
    if (cached) {
      console.log(`🎯 Cache hit for key: ${key}`);
      return JSON.parse(cached);
    }
    
    console.log(`🔄 Cache miss for key: ${key}, fetching from source`);
    const data = await fallbackFn();
    
    // Cache the result
    await client.setex(key, ttl, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('❌ Cache operation failed:', error);
    // Fallback to direct execution
    return await fallbackFn();
  }
}

/**
 * Invalidate cache by pattern
 */
export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const isAvailable = await isRedisAvailable();
    if (!isAvailable) return;

    const client = getRedisClient();
    const keys = await client.keys(pattern);
    
    if (keys.length > 0) {
      await client.del(...keys);
      console.log(`🗑️ Invalidated ${keys.length} cache entries matching: ${pattern}`);
    }
  } catch (error) {
    console.error('❌ Cache invalidation failed:', error);
  }
}

/**
 * Close Redis connection
 */
export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('🔌 Redis connection closed');
  }
}

// Graceful shutdown
process.on('SIGINT', closeRedisConnection);
process.on('SIGTERM', closeRedisConnection);