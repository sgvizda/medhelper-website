import type { Metadata } from 'next'
import { getHomePage, getSettings } from '@/lib/cms'
import { buildPageMetadata } from '@/lib/seo'
import { RenderBlocks } from '@/components/sections/render-blocks'

// ISR: pages are static, refreshed on CMS change (revalidatePath hooks) and every 5 min as a safety net.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSettings()])
  return {
    ...buildPageMetadata(home.meta, {
      title: settings.seoTitle || settings.siteName,
      path: '/',
      description: settings.seoDescription,
    }),
    // Home uses the absolute site title (no template suffix).
    title: { absolute: home.meta?.title || settings.seoTitle || settings.siteName },
  }
}

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHomePage(), getSettings()])
  return <RenderBlocks blocks={home.layout ?? []} settings={settings} />
}
