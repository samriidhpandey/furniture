interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const cache = new Map<string, RateLimitRecord>();

/**
 * Basic in-memory rate limiter for server routes
 * @param key unique identifier (e.g. phone number or IP)
 * @param limit maximum requests allowed in window
 * @param windowMs window duration in milliseconds
 */
export function checkRateLimit(key: string, limit: number = 3, windowMs: number = 10 * 60 * 1000): {
  success: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = cache.get(key);

  // Clean up if expired
  if (!record || now > record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    cache.set(key, newRecord);
    return {
      success: true,
      remaining: limit - 1,
      resetAt: newRecord.resetAt,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetAt: record.resetAt,
  };
}
