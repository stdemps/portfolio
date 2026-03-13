const hits = new Map<string, number[]>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 10

/**
 * Simple in-memory rate limiter keyed by IP address.
 * Returns `true` when the caller has exceeded the limit.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(ip, timestamps)
  return false
}
