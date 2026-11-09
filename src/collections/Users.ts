import type { CollectionConfig } from 'payload'
import { isSuperAdmin, staff, superAdmin, superAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Користувач', plural: 'Користувачі' },
  admin: { useAsTitle: 'email', group: 'Система', defaultColumns: ['email', 'name', 'roles'] },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    // First user can be created via /admin onboarding; afterwards only super admins.
    create: async ({ req }) => {
      if (isSuperAdmin(req.user as never)) return true
      const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
      return totalDocs === 0
    },
    read: staff,
    update: ({ req }) => {
      if (isSuperAdmin(req.user as never)) return true
      return req.user ? { id: { equals: req.user.id } } : false
    },
    delete: superAdmin,
    admin: staff,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // The very first user always becomes a super admin.
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
          if (totalDocs === 0) data.roles = ['super-admin']
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', label: 'Імʼя', type: 'text', maxLength: 80 },
    {
      name: 'roles',
      label: 'Ролі',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      access: { create: superAdminField, update: superAdminField },
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
