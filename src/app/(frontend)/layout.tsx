import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import type { CSSProperties } from 'react'
import { Toaster } from 'sonner'
import { getFooter, getHeader, getLocale, getSettings } from '@/lib/cms'
import { getLocaleMeta } from '@/i18n/config'
import { buildRootMetadata } from '@/lib/seo'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ScrollProgress } from '@/components/layout/scroll-progress'
import { JsonLd, organizationJsonLd, softwareJsonLd } from '@/components/seo/json-ld'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#F7F9FC',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata(await getSettings())
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, header, footer] = await Promise.all([getSettings(), getHeader(), getFooter()])
  const locale = getLocaleMeta(getLocale())

  // Optional brand colour overrides from CMS → CSS variables.
  const style = {
    ...(settings.colors?.primary ? { '--brand-primary': settings.colors.primary } : {}),
    ...(settings.colors?.accent ? { '--brand-accent': settings.colors.accent } : {}),
    ...(settings.colors?.ink ? { '--brand-ink': settings.colors.ink } : {}),
  } as CSSProperties

  return (
    <html lang={locale.htmlLang} className={`${GeistSans.variable} ${GeistMono.variable}`} style={style}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Перейти до основного вмісту
        </a>
        <ScrollProgress />
        <SiteHeader header={header} settings={settings} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter footer={footer} settings={settings} header={header} />
        <Toaster position="bottom-right" richColors closeButton />
        <JsonLd data={[organizationJsonLd(settings), softwareJsonLd(settings)]} />
      </body>
    </html>
  )
}
