import * as React from 'react'
import { Check, Sparkles } from 'lucide-react'
import type { NhsuBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { NhsuCard } from '@/components/demos/nhsu/nhsu-card'

export function NhsuSection({
  block,
}: {
  block: NhsuBlock
  settings: SiteSetting
}) {
  const features = block.features ?? []

  return (
    <section
      id={block.anchor ?? 'nhsu'}
      aria-labelledby="nhsu-heading"
      className="section theme-dark relative overflow-hidden bg-ink text-white"
    >
      {/* Background dark grid and glow */}
      <div
        aria-hidden
        className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-20 size-[500px] rounded-full bg-teal/15 blur-[120px]"
      />

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Features + Highlight Box */}
          <div className="lg:col-span-6 space-y-8">
            <SectionHeading
              id="nhsu-heading"
              eyebrow={block.eyebrow}
              heading={block.heading}
              description={block.description}
              dark
            />

            {/* 8 Features compact list */}
            {features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {features.map((feat, idx) => (
                  <div
                    key={feat.title || idx}
                    className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-white/10"
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-mint/20 text-mint mt-0.5">
                      <Check className="size-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        {feat.title}
                      </h4>
                      {feat.description && (
                        <p className="mt-0.5 text-[0.75rem] text-[#a9b7c7] leading-relaxed">
                          {feat.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Highlight Box: Alternatives Analysis */}
            {(block.highlightTitle || block.highlightText) && (
              <div className="rounded-2xl border border-mint/20 bg-gradient-to-br from-mint/10 via-transparent to-transparent p-5">
                <div className="flex items-center gap-2 text-mint font-semibold text-sm">
                  <Sparkles className="size-4" />
                  <h4>{block.highlightTitle}</h4>
                </div>
                {block.highlightText && (
                  <p className="mt-2 text-xs leading-relaxed text-[#a9b7c7]">
                    {block.highlightText}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Interactive Card */}
          <div className="lg:col-span-6">
            <NhsuCard />
          </div>
        </div>
      </div>
    </section>
  )
}
