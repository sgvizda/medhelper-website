import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { publishedOrStaff, staff } from '@/access'
import { pageBlocks } from '@/blocks'
import { seoGroup } from '@/fields'

const RESERVED = ['admin', 'api', 'media', 'sitemap.xml', 'robots.txt', 'next']

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc) => `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${doc?.slug ?? ''}`,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrStaff, create: staff, update: staff, delete: staff },
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath(`/${doc.slug}`)
          revalidatePath('/sitemap.xml')
        } catch {
          /* outside Next request context (e.g. seed) */
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Назва',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 110,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 80,
      admin: { position: 'sidebar', description: 'Напр. "privacy" → /privacy' },
      validate: (v: unknown) => {
        const s = String(v ?? '')
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) return 'Лише малі латинські літери, цифри та дефіси'
        if (RESERVED.includes(s)) return 'Цей slug зарезервовано'
        return true
      },
    },
    {
      name: 'intro',
      label: 'Вступ (під заголовком)',
      type: 'textarea',
      localized: true,
      maxLength: 300,
    },
    {
      name: 'layout',
      label: 'Блоки сторінки',
      type: 'blocks',
      blocks: pageBlocks,
    },
    seoGroup,
  ],
}
