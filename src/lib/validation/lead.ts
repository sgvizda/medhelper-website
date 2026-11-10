import { z } from 'zod'

const phoneRegex = /^(\+?[0-9\s\-()]{7,22})?$/

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Вкажіть ваше імʼя (щонайменше 2 символи)' })
    .max(80, { message: 'Імʼя занадто довге (максимум 80 символів)' }),
  organization: z
    .string()
    .trim()
    .max(120, { message: 'Назва закладу не повинна перевищувати 120 символів' })
    .optional()
    .or(z.literal('')),
  position: z
    .string()
    .trim()
    .min(2, { message: 'Вкажіть посаду або спеціальність (напр. лікар-кардіолог)' })
    .max(80, { message: 'Посада занадто довга (максимум 80 символів)' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Введіть коректну адресу електронної пошти' })
    .max(120, { message: 'Email занадто довгий' }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { message: 'Введіть коректний номер телефону (напр. +380501234567)' })
    .max(25, { message: 'Номер телефону занадто довгий' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Повідомлення має містити щонайменше 10 символів' })
    .max(2000, { message: 'Повідомлення занадто довге (максимум 2000 символів)' }),
  consent: z.literal(true, {
    message: 'Необхідно надати згоду на обробку персональних даних',
  }),
  // Anti-spam fields
  website: z.string().max(0, { message: 'Spam detected' }).optional().or(z.literal('')),
  startedAt: z.number().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
