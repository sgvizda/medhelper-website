import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Faq, Footer, Header, HomePage, Page, SiteSetting } from '@/payload-types'
import { defaultFaqs, defaultFooter, defaultHeader, defaultHomeLayout, defaultSettings } from '@/content/defaults'
import { defaultLocale, type Locale } from '@/i18n/config'

export const getPayloadClient = cache(() => getPayload({ config }))

/** Current request locale. Single active locale for now; extend when /en etc. are enabled. */
export const getLocale = (): Locale => defaultLocale

async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') console.error(`[cms] ${label} failed, using defaults:`, (err as Error).message)
    return fallback
  }
}

const isEmpty = (v: unknown) => v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)

/** Fill empty CMS fields with defaults so the layout never breaks. */
function withDefaults<T extends object>(data: Partial<T> | null | undefined, defaults: T): T {
  const out = { ...defaults } as Record<string, unknown>
  if (data) for (const [k, v] of Object.entries(data)) if (!isEmpty(v)) out[k] = v
  return out as T
}

export const getSettings = cache(async (): Promise<SiteSetting> => {
  const data = await safe(
    async () => (await getPayloadClient()).findGlobal({ slug: 'site-settings', locale: getLocale(), depth: 1 }),
    null,
    'site-settings',
  )
  return withDefaults(data, defaultSettings as SiteSetting)
})

export const getHeader = cache(async (): Promise<Header> => {
  const data = await safe(
    async () => (await getPayloadClient()).findGlobal({ slug: 'header', locale: getLocale(), depth: 0 }),
    null,
    'header',
  )
  return withDefaults(data, defaultHeader as Header)
})

export const getFooter = cache(async (): Promise<Footer> => {
  const data = await safe(
    async () => (await getPayloadClient()).findGlobal({ slug: 'footer', locale: getLocale(), depth: 0 }),
    null,
    'footer',
  )
  return withDefaults(data, defaultFooter as Footer)
})

export const getHomePage = cache(async (): Promise<HomePage> => {
  const data = await safe(
    async () => (await getPayloadClient()).findGlobal({ slug: 'home-page', locale: getLocale(), depth: 1 }),
    null,
    'home-page',
  )
  return { id: 0, ...data, layout: data?.layout?.length ? data.layout : defaultHomeLayout } as HomePage
})

/** Published FAQs (or a specific selection, preserving its order). */
export const getFaqs = cache(async (selected?: (number | Faq)[] | null): Promise<Pick<Faq, 'question' | 'answer'>[]> => {
  const picked = (selected ?? []).filter((f): f is Faq => typeof f === 'object' && f !== null)
  if (picked.length) return picked.filter((f) => f.published !== false)
  const docs = await safe(
    async () =>
      (
        await (await getPayloadClient()).find({
          collection: 'faqs',
          locale: getLocale(),
          where: { published: { equals: true } },
          sort: 'order',
          limit: 50,
          depth: 0,
        })
      ).docs,
    [] as Faq[],
    'faqs',
  )
  return docs.length ? docs : defaultFaqs
})

export const getPageBySlug = cache(async (slug: string, draft = false): Promise<Page | null> => {
  return safe(
    async () => {
      const res = await (await getPayloadClient()).find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        locale: getLocale(),
        draft,
        limit: 1,
        depth: 1,
        overrideAccess: draft,
      })
      return res.docs[0] ?? null
    },
    null,
    `page:${slug}`,
  )
})

export const getAllPageSlugs = cache(async () =>
  safe(
    async () =>
      (
        await (await getPayloadClient()).find({
          collection: 'pages',
          where: { _status: { equals: 'published' } },
          limit: 500,
          depth: 0,
          select: { slug: true, updatedAt: true, meta: true },
        })
      ).docs as Pick<Page, 'slug' | 'updatedAt' | 'meta'>[],
    [] as Pick<Page, 'slug' | 'updatedAt' | 'meta'>[],
    'page-slugs',
  ),
)
