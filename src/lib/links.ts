import type { SiteSetting } from '@/payload-types'
import { isExternal } from '@/lib/utils'

export type CmsLink = {
  label?: string | null
  type?: 'platform' | 'login' | 'internal' | 'external' | null
  url?: string | null
}

export type ResolvedLink = { href: string; label: string; external: boolean }

/** Resolves a CMS link group to a concrete href using central Site Settings. */
export function resolveLink(
  link: CmsLink | null | undefined,
  settings: Pick<SiteSetting, 'platformUrl' | 'loginUrl'>,
  fallbackLabel = '',
): ResolvedLink | null {
  if (!link) return null
  const label = link.label || fallbackLabel
  if (!label) return null
  let href: string
  switch (link.type) {
    case 'login':
      href = settings.loginUrl || settings.platformUrl
      break
    case 'internal':
    case 'external':
      href = link.url || '/'
      break
    case 'platform':
    default:
      href = settings.platformUrl
  }
  return { href, label, external: isExternal(href) }
}

/** Anchor-only hrefs ("#faq") become "/#faq" so they work from any page. */
export const normalizeHref = (href: string) => (href.startsWith('#') ? `/${href}` : href)
