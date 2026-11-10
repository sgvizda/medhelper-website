import { describe, it, expect } from 'vitest'
import { leadSchema } from '@/lib/validation/lead'

describe('leadSchema validation', () => {
  it('accepts valid input with all fields', () => {
    const valid = {
      name: 'Олена Ковальчук',
      organization: 'КНП «Міська клінічна лікарня»',
      position: 'Лікар-кардіолог',
      email: 'olena.kovalchuk@example.com',
      phone: '+380501234567',
      message: 'Доброго дня! Цікавить підключення відділення до платформи.',
      consent: true,
      website: '',
    }

    const res = leadSchema.safeParse(valid)
    expect(res.success).toBe(true)
  })

  it('accepts valid input without optional organization and phone', () => {
    const minimal = {
      name: 'Тарас',
      position: 'Медичний статистик',
      email: 'taras@example.ua',
      message: 'Потрібна консультація щодо кодування АКМІ.',
      consent: true,
    }

    const res = leadSchema.safeParse(minimal)
    expect(res.success).toBe(true)
  })

  it('rejects short name or short message', () => {
    const invalid = {
      name: 'A',
      position: 'Лікар',
      email: 'test@example.com',
      message: 'Коротко',
      consent: true,
    }

    const res = leadSchema.safeParse(invalid)
    expect(res.success).toBe(false)
    if (!res.success) {
      const paths = res.error.issues.map((i) => i.path[0])
      expect(paths).toContain('name')
      expect(paths).toContain('message')
    }
  })

  it('rejects invalid email address', () => {
    const invalid = {
      name: 'Іван Петренко',
      position: 'Хірург',
      email: 'not-an-email',
      message: 'Детальний опис клінічного запиту на платформу.',
      consent: true,
    }

    const res = leadSchema.safeParse(invalid)
    expect(res.success).toBe(false)
    if (!res.success) {
      expect(res.error.issues[0]?.path[0]).toBe('email')
    }
  })

  it('rejects submission without consent', () => {
    const invalid = {
      name: 'Іван Петренко',
      position: 'Хірург',
      email: 'ivan@example.com',
      message: 'Детальний опис клінічного запиту на платформу.',
      consent: false,
    }

    const res = leadSchema.safeParse(invalid)
    expect(res.success).toBe(false)
  })

  it('detects honeypot bot trap', () => {
    const bot = {
      name: 'Bot Spammer',
      position: 'Bot',
      email: 'bot@spam.com',
      message: 'Buy cheap medicine here now!',
      consent: true,
      website: 'http://spam-link.ru',
    }

    const res = leadSchema.safeParse(bot)
    expect(res.success).toBe(false)
  })
})
