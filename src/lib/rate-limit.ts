/**
 * In-memory sliding window rate limiter.
 * Suitable for single-container / small-scale instances.
 * In a distributed multi-node production deployment, replace with Redis or Upstash.
 */

type RecordEntry = {
  timestamps: number[]
}

const store = new Map<string, RecordEntry>()

// Clean up stale entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 10 * 60 * 1000 // 10 minutes

let lastCleanup = Date.now()

function cleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now

  const cutoff = now - windowMs
  for (const [key, entry] of store.entries()) {
    const valid = entry.timestamps.filter((ts) => ts > cutoff)
    if (valid.length === 0) {
      store.delete(key)
    } else {
      entry.timestamps = valid
    }
  }
}

export function checkRateLimit({
  key,
  limit = 5,
  windowMs = 10 * 60 * 1000,
}: {
  key: string
  limit?: number
  windowMs?: number
}): { success: boolean; remaining: number; resetTime: number } {
  cleanup(windowMs)

  const now = Date.now()
  const cutoff = now - windowMs

  let entry = store.get(key)
  if (!entry) {
    entry = { timestamps: [] }
    store.set(key, entry)
  }

  // Filter timestamps within current window
  entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff)

  if (entry.timestamps.length >= limit) {
    const oldest = entry.timestamps[0] || now
    return {
      success: false,
      remaining: 0,
      resetTime: oldest + windowMs,
    }
  }

  entry.timestamps.push(now)

  return {
    success: true,
    remaining: limit - entry.timestamps.length,
    resetTime: now + windowMs,
  }
}

export function clearRateLimitStore() {
  store.clear()
}
