'use server'

import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { leadSchema, type LeadInput } from '@/lib/validation/lead'
import { checkRateLimit } from '@/lib/rate-limit'
import { getPayloadClient } from '@/lib/cms'
import { sendLeadNotification } from '@/lib/email'

export type SubmitLeadResult =
  | { ok: true }
  | {
      ok: false
      error: string
      fieldErrors?: Record<string, string>
    }

export async function submitLead(data: LeadInput): Promise<SubmitLeadResult> {
  try {
    // 1. Zod Validation
    const parsed = leadSchema.safeParse(data)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const path = issue.path[0]
        if (path && typeof path === 'string') {
          fieldErrors[path] = issue.message
        }
      }
      return {
        ok: false,
        error: 'Будь ласка, перевірте правильність заповнення полів форми.',
        fieldErrors,
      }
    }

    const {
      name,
      email,
      organization,
      position,
      phone,
      message,
      consent,
      website,
      startedAt,
    } = parsed.data

    // 2. Anti-spam checks (honeypot & time-trap)
    const isBotHoneypot = Boolean(website && website.trim() !== '')
    const isBotSpeed = Boolean(startedAt && Date.now() - startedAt < 3000)

    if (isBotHoneypot || isBotSpeed) {
      // Fake success for bots to prevent them adapting
      return { ok: true }
    }

    // 3. Extract request metadata
    const headerList = await headers()
    const ip =
      headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headerList.get('x-real-ip') ||
      '127.0.0.1'

    const userAgent = headerList.get('user-agent')?.slice(0, 300) || ''
    const referer = headerList.get('referer')?.slice(0, 300) || '/'

    // Hash the IP with the secret so no raw IP is permanently stored
    const secret = process.env.PAYLOAD_SECRET || 'dev-secret'
    const ipHash = createHash('sha256')
      .update(`${ip}:${secret}`)
      .digest('hex')
      .slice(0, 32)

    // 4. Rate Limiting
    const limit = Number(process.env.LEAD_RATE_LIMIT) || 5
    const rateCheck = checkRateLimit({ key: ipHash, limit })

    if (!rateCheck.success) {
      return {
        ok: false,
        error:
          'Забагато спроб відправлення. Будь ласка, зачекайте декілька хвилин перед наступним зверненням.',
      }
    }

    // 5. Store lead in database
    const payload = await getPayloadClient()
    const doc = await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        name,
        email,
        organization: organization || null,
        position: position || null,
        phone: phone || null,
        message,
        consent: Boolean(consent),
        status: 'new',
        meta: {
          source: referer,
          ipHash,
          userAgent,
          emailSent: false,
        },
      },
    })

    // 6. Send optional email notification
    const emailSent = await sendLeadNotification({
      payload,
      lead: {
        name,
        email,
        organization,
        position,
        phone,
        message,
      },
    })

    if (emailSent && doc.id) {
      try {
        await payload.update({
          collection: 'leads',
          id: doc.id,
          overrideAccess: true,
          data: {
            meta: {
              source: referer,
              ipHash,
              userAgent,
              emailSent: true,
            },
          },
        })
      } catch {
        // Non-critical update
      }
    }

    return { ok: true }
  } catch (err) {
    console.error('[submitLead] Unexpected error:', err)
    return {
      ok: false,
      error: 'Сталася неочікувана помилка при відправленні. Спробуйте пізніше.',
    }
  }
}
