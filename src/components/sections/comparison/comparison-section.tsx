import * as React from 'react'
import { Check, X } from 'lucide-react'
import type { ComparisonBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { Icon } from '@/components/ui/icon'
import { Stagger, StaggerItem } from '@/components/motion/reveal'

export function ComparisonSection({
  block,
}: {
  block: ComparisonBlock
  settings: SiteSetting
}) {
  const rows = block.rows ?? []

  return (
    <section
      id={block.anchor ?? 'difference'}
      aria-labelledby="comparison-heading"
      className="section relative overflow-hidden bg-surface-muted/20 border-t border-border"
    >
      <div className="container-page relative">
        <SectionHeading
          id="comparison-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-14 lg:mb-16"
        />

        <div className="max-w-4xl mx-auto">
          {/* Header row on desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3 mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
            <div className="col-span-4">Характеристика</div>
            <div className="col-span-4">{block.genericLabel || 'Універсальний AI-чат'}</div>
            <div className="col-span-4 text-primary-strong">
              {block.specializedLabel || 'Медичний AI-асистент'}
            </div>
          </div>

          {/* Comparison Rows */}
          <Stagger className="space-y-3">
            {rows.map((row, idx) => (
              <StaggerItem
                key={row.title || idx}
                className="surface-card rounded-xl p-4 md:p-4.5 border border-border transition-all hover:border-teal/30"
              >
                {/* Mobile view */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary-soft text-primary-strong">
                      <Icon name={row.icon} className="size-3.5" />
                    </span>
                    <span>{row.title}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-muted-foreground bg-surface-muted p-2.5 rounded-lg">
                      <X className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{row.generic}</span>
                    </div>
                    <div className="flex items-start gap-2 text-primary-strong bg-primary-soft/60 p-2.5 rounded-lg border border-teal/20 font-medium">
                      <Check className="size-3.5 text-teal shrink-0 mt-0.5" />
                      <span>{row.specialized}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop grid row */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center text-xs">
                  <div className="col-span-4 flex items-center gap-2 font-semibold text-foreground">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-strong">
                      <Icon name={row.icon} className="size-3.5" />
                    </span>
                    <span>{row.title}</span>
                  </div>

                  <div className="col-span-4 flex items-center gap-2 text-muted-foreground">
                    <X className="size-3.5 text-subtle-foreground shrink-0" />
                    <span>{row.generic}</span>
                  </div>

                  <div className="col-span-4 flex items-center gap-2 text-primary-strong font-medium">
                    <Check className="size-3.5 text-teal shrink-0" />
                    <span>{row.specialized}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
