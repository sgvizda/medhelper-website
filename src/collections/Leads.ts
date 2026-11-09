import type { CollectionConfig } from 'payload'
import { staff, superAdmin } from '@/access'

/**
 * Contact form submissions. Created only server-side through the `submitLead`
 * server action (local API with overrideAccess) — public REST/GraphQL create is denied.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'name',
    group: 'Заявки',
    defaultColumns: ['name', 'email', 'position', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'organization'],
  },
  defaultSort: '-createdAt',
  access: {
    create: () => false,
    read: staff,
    update: staff,
    delete: superAdmin,
  },
  fields: [
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      required: true,
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Нова', value: 'new' },
        { label: 'В роботі', value: 'in-progress' },
        { label: 'Опрацьована', value: 'done' },
        { label: 'Спам', value: 'spam' },
      ],
    },
    { name: 'adminNote', label: 'Нотатка адміністратора', type: 'textarea', admin: { position: 'sidebar' } },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Імʼя', type: 'text', required: true, admin: { readOnly: true } },
        { name: 'email', label: 'Email', type: 'email', required: true, admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'organization', label: 'Медичний заклад', type: 'text', admin: { readOnly: true } },
        { name: 'position', label: 'Посада / спеціальність', type: 'text', admin: { readOnly: true } },
        { name: 'phone', label: 'Телефон', type: 'text', admin: { readOnly: true } },
      ],
    },
    { name: 'message', label: 'Повідомлення', type: 'textarea', required: true, admin: { readOnly: true } },
    { name: 'consent', label: 'Згода на обробку ПД', type: 'checkbox', admin: { readOnly: true } },
    {
      name: 'meta',
      label: 'Технічні дані',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        { name: 'source', label: 'Сторінка', type: 'text' },
        { name: 'ipHash', label: 'IP (хеш)', type: 'text' },
        { name: 'userAgent', label: 'User agent', type: 'text' },
        { name: 'emailSent', label: 'Email надіслано', type: 'checkbox' },
      ],
    },
  ],
}
