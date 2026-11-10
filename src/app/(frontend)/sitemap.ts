import type { MetadataRoute } from 'next'
import { getAllPageSlugs } from '@/lib/cms'
import { SITE_URL } from '@/lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPageSlugs()
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1, lastModified: new Date() },
    ...pages
      .filter((p) => !p.meta?.noindex)
      .map((p) => ({
        url: `${SITE_URL}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
  ]
}
