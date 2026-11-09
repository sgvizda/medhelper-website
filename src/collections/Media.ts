import type { CollectionConfig } from 'payload'
import { anyone, staff } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Медіафайл', plural: 'Медіа' },
  admin: { group: 'Контент' },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 900 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      label: 'Альтернативний текст',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 160,
    },
  ],
}
