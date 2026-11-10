import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPageSlugs, getPageBySlug, getSettings } from '@/lib/cms'
import { buildPageMetadata } from '@/lib/seo'
import { RenderBlocks, type AnyBlock } from '@/components/sections/render-blocks'

export const revalidate = 300
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const pages = await getAllPageSlugs()
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return { title: 'Сторінку не знайдено', robots: { index: false } }
  return buildPageMetadata(page.meta, { title: page.title, path: `/${slug}`, description: page.intro })
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  const [page, settings] = await Promise.all([getPageBySlug(slug), getSettings()])
  if (!page) notFound()

  const blocks = (page.layout ?? []) as AnyBlock[]
  const startsWithHero = blocks[0]?.blockType === 'hero'

  return (
    <>
      {!startsWithHero ? (
        <header className="relative overflow-hidden border-b border-border pt-[calc(var(--header-h)+3.5rem)] pb-12 sm:pb-16">
          <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
          <div className="container-page relative">
            <h1 className="text-h2 max-w-3xl">{page.title}</h1>
            {page.intro ? <p className="text-lead mt-4 max-w-2xl">{page.intro}</p> : null}
            <p className="mt-6 text-xs text-subtle-foreground">
              Оновлено: {new Date(page.updatedAt).toLocaleDateString('uk-UA', { dateStyle: 'long' })}
            </p>
          </div>
        </header>
      ) : null}
      <RenderBlocks blocks={blocks} settings={settings} />
    </>
  )
}
