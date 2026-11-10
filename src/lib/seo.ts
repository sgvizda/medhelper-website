import type { Metadata } from 'next'
import type { Media, SiteSetting } from '@/payload-types'
import { defaultLocale, getLocaleMeta } from '@/i18n/config'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export const absoluteUrl = (path = '/') => (path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`)

export const mediaUrl = (m: number | Media | null | undefined, size?: 'og' | 'card'): string | undefined => {
  if (!m || typeof m !== 'object') return undefined
  const url = (size && m.sizes?.[size]?.url) || m.url
  return url ? absoluteUrl(url) : undefined
}

type MetaInput = {
  title?: string | null
  description?: string | null
  image?: number | Media | null
  canonical?: string | null
  noindex?: boolean | null
} | null | undefined

export function buildRootMetadata(settings: SiteSetting): Metadata {
  const title = settings.seoTitle || settings.siteName
  const description = settings.seoDescription || settings.tagline || undefined
  const og = mediaUrl(settings.ogImage, 'og')
  const locale = getLocaleMeta(defaultLocale)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: settings.titleTemplate || `%s — ${settings.siteName}` },
    description,
    applicationName: settings.siteName,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName: settings.siteName,
      locale: locale.ogLocale,
      title,
      description,
      url: SITE_URL,
      ...(og ? { images: [{ url: og, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(og ? { images: [og] } : {}) },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  }
}

/** Per-page metadata from a CMS `meta` group. */
export function buildPageMetadata(meta: MetaInput, fallback: { title: string; path: string; description?: string | null }): Metadata {
  const title = meta?.title || fallback.title
  const description = meta?.description || fallback.description || undefined
  const canonical = meta?.canonical || fallback.path
  const og = mediaUrl(meta?.image, 'og')
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: absoluteUrl(fallback.path), ...(og ? { images: [{ url: og, width: 1200, height: 630 }] } : {}) },
    twitter: { title, description, ...(og ? { images: [og] } : {}) },
    robots: meta?.noindex ? { index: false, follow: true } : { index: true, follow: true },
  }
}
