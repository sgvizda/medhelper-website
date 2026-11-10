import * as React from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import type { HeroBlock, SiteSetting } from '@/payload-types'
import { resolveLink } from '@/lib/links'
import { LinkButton } from '@/components/ui/link-button'
import { HeroWorkspaceDemo } from '@/components/demos/hero/workspace-demo'

export function HeroSection({
  block,
  settings,
}: {
  block: HeroBlock
  settings: SiteSetting
}) {
  const primary = resolveLink(block.primaryCta, settings, 'Спробувати асистента')
  const secondary = resolveLink(block.secondaryCta, settings, 'Дізнатися більше')

  const highlight = block.highlight?.trim()
  const heading = block.heading

  // Render heading with highlighted gradient span
  const renderHeading = () => {
    if (!highlight || !heading.includes(highlight)) {
      return heading
    }
    const parts = heading.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-gradient-dark font-extrabold">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    )
  }

  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 lg:pt-[calc(var(--header-h)+4rem)] lg:pb-24">
      {/* Background patterns */}
      <div
        aria-hidden
        className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-teal/10 blur-[130px]"
      />

      <div className="container-page relative">
        {/* Editorial Text Block - No opacity:0 for perfect LCP */}
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {block.eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-primary-soft/80 px-4 py-1.5 text-xs font-semibold text-primary-strong shadow-sm backdrop-blur-sm">
              <span className="size-2 rounded-full bg-teal" />
              <span>{block.eyebrow}</span>
            </div>
          )}

          <h1 className="text-display text-foreground font-bold tracking-tight">
            {renderHeading()}
          </h1>

          {block.subheading && (
            <p className="text-lead mx-auto max-w-2xl text-muted-foreground">
              {block.subheading}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {primary && (
              <LinkButton
                link={primary}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />}
              />
            )}
            {secondary && (
              <LinkButton
                link={secondary}
                variant="secondary"
                size="lg"
                externalIcon={false}
              />
            )}
          </div>

          {/* Badges */}
          {block.badges && block.badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 text-xs text-muted-foreground font-medium">
              {block.badges.map((b, i) => (
                <div key={b.text || i} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-teal" />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Workspace Demo */}
        <div className="mt-12 lg:mt-16">
          <HeroWorkspaceDemo />
        </div>
      </div>
    </section>
  )
}
