import * as React from 'react'
import type { AudienceBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Icon } from '@/components/ui/icon'

export function AudienceSection({
  block,
}: {
  block: AudienceBlock
  settings: SiteSetting
}) {
  const items = block.items ?? []

  return (
    <section
      id={block.anchor ?? 'audience'}
      aria-labelledby="audience-heading"
      className="section relative overflow-hidden"
    >
      <div className="container-page relative">
        <SectionHeading
          id="audience-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-14 lg:mb-16"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item, idx) => {
            const isFirst = idx === 0

            return (
              <StaggerItem
                key={item.title || idx}
                className={`${
                  isFirst
                    ? 'sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary-soft/40 via-surface to-primary-soft/20 border-teal/30'
                    : 'bg-surface'
                } surface-card rounded-2xl p-6 border transition-all duration-300 hover:border-teal/50 hover:shadow-card flex items-start gap-4`}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong border border-teal/20">
                  <Icon name={item.icon} className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-base">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
