import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import type { CtaBlock, SiteSetting } from '@/payload-types'
import { resolveLink } from '@/lib/links'
import { LinkButton } from '@/components/ui/link-button'

export function CtaSection({
  block,
  settings,
}: {
  block: CtaBlock
  settings: SiteSetting
}) {
  const primary = resolveLink(block.primaryCta, settings, 'Перейти до AI-асистента')
  const secondary = resolveLink(block.secondaryCta, settings, 'Звʼязатися з нами')

  return (
    <section
      id={block.anchor ?? 'start'}
      aria-labelledby="cta-heading"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="theme-dark relative overflow-hidden rounded-[2rem] bg-ink text-white p-8 sm:p-14 lg:p-20 shadow-float border border-white/10 text-center">
          {/* Subtle background glow & grid */}
          <div
            aria-hidden
            className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-teal/20 blur-[130px]"
          />

          <div className="relative mx-auto max-w-3xl space-y-6">
            {block.eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1 font-mono text-xs font-semibold text-mint uppercase tracking-wider">
                <span className="size-2 rounded-full bg-mint" />
                <span>{block.eyebrow}</span>
              </span>
            )}

            <h2
              id="cta-heading"
              className="text-h2 font-bold tracking-tight text-white"
            >
              {block.heading}
            </h2>

            {block.description && (
              <p className="text-lead mx-auto max-w-2xl text-[#a9b7c7]">
                {block.description}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {primary && (
                <LinkButton
                  link={primary}
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />}
                />
              )}
              {secondary && (
                <LinkButton
                  link={secondary}
                  variant="outline-dark"
                  size="lg"
                  externalIcon={false}
                />
              )}
            </div>

            {settings.disclaimer && (
              <p className="pt-6 text-[0.725rem] text-[#8596aa] max-w-xl mx-auto leading-relaxed border-t border-white/10 mt-8">
                {settings.disclaimer}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
