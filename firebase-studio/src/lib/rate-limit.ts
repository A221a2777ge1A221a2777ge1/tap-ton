import { serverEnv } from './env';

type Key = string;

const hits = new Map<Key, { count: number; resetAt: number }>();

export function rateLimitKey(key: Key) {
  const now = Date.now();
  const windowMs = serverEnv.RATE_LIMIT_WINDOW_MS;
  const max = serverEnv.RATE_LIMIT_MAX;
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }
  if (entry.count >= max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  entry.count += 1;
  return { allowed: true, remaining: max - entry.count, resetAt: entry.resetAt };
}

