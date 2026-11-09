import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { anyone, staff } from '@/access'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'Питання FAQ', plural: 'FAQ' },
  admin: { useAsTitle: 'question', group: 'Контент', defaultColumns: ['question', 'order', 'published'] },
  defaultSort: 'order',
  access: { read: anyone, create: staff, update: staff, delete: staff },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath('/', 'layout')
        } catch {
          /* noop */
        }
      },
    ],
  },
  fields: [
    {
      name: 'question',
      label: 'Питання',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 140,
    },
    {
      name: 'answer',
      label: 'Відповідь',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 1200,
    },
    { name: 'order', label: 'Порядок', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'published',
      label: 'Опубліковано',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
