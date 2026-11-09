import type { Access, FieldAccess } from 'payload'

type UserLike = { roles?: string[] | null } | null | undefined

export const isSuperAdmin = (user: UserLike) => Boolean(user?.roles?.includes('super-admin'))
export const isStaff = (user: UserLike) =>
  Boolean(user?.roles?.some((r) => r === 'super-admin' || r === 'editor'))

export const anyone: Access = () => true
export const staff: Access = ({ req }) => isStaff(req.user as UserLike)
export const superAdmin: Access = ({ req }) => isSuperAdmin(req.user as UserLike)
export const superAdminField: FieldAccess = ({ req }) => isSuperAdmin(req.user as UserLike)

/** Public can read only published docs; staff sees drafts too. */
export const publishedOrStaff: Access = ({ req }) => {
  if (isStaff(req.user as UserLike)) return true
  return { _status: { equals: 'published' } }
}
