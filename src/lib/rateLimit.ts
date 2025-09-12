const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max: number, windowMs: number) {
	const now = Date.now();
	const bucket = buckets.get(key);
	if (!bucket || now > bucket.resetAt) {
		buckets.set(key, { count: 1, resetAt: now + windowMs });
		return { allowed: true };
	}
	if (bucket.count >= max) return { allowed: false, retryAfterMs: bucket.resetAt - now } as const;
	bucket.count += 1;
	return { allowed: true } as const;
}