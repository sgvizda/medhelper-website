import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, clearRateLimitStore } from '@/lib/rate-limit'

describe('checkRateLimit sliding window', () => {
  beforeEach(() => {
    clearRateLimitStore()
  })

  it('allows requests up to the limit', () => {
    const key = 'test-ip-1'
    const limit = 3

    expect(checkRateLimit({ key, limit }).success).toBe(true)
    expect(checkRateLimit({ key, limit }).success).toBe(true)
    expect(checkRateLimit({ key, limit }).success).toBe(true)
  })

  it('blocks requests exceeding the limit', () => {
    const key = 'test-ip-2'
    const limit = 2

    expect(checkRateLimit({ key, limit }).success).toBe(true)
    expect(checkRateLimit({ key, limit }).success).toBe(true)

    const blocked = checkRateLimit({ key, limit })
    expect(blocked.success).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it('handles independent keys separately', () => {
    const keyA = 'ip-a'
    const keyB = 'ip-b'
    const limit = 1

    expect(checkRateLimit({ key: keyA, limit }).success).toBe(true)
    expect(checkRateLimit({ key: keyA, limit }).success).toBe(false)

    // keyB is unaffected
    expect(checkRateLimit({ key: keyB, limit }).success).toBe(true)
  })
})
