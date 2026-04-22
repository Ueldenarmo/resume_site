type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

type RateLimitOptions = {
  maxRequests: number;
  windowMs: number;
};

export function checkRateLimit(
  key: string,
  options: RateLimitOptions = { maxRequests: 5, windowMs: 60_000 }
) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + options.windowMs
    });

    return { allowed: true, remaining: options.maxRequests - 1 };
  }

  if (existing.count >= options.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  buckets.set(key, existing);

  return { allowed: true, remaining: options.maxRequests - existing.count };
}
