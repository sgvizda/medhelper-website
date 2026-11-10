import * as React from 'react'
import { Calculator, CheckCircle2 } from 'lucide-react'
import type { ScalesBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScalesCalculator } from '@/components/demos/scales/scales-calculator'

export function ScalesSection({
  block,
}: {
  block: ScalesBlock
  settings: SiteSetting
}) {
  const categories = block.categories ?? []
  const steps = block.steps ?? []

  return (
    <section
      id={block.anchor ?? 'scales'}
      aria-labelledby="scales-heading"
      className="section relative overflow-hidden"
    >
      <div className="container-page relative">
        <SectionHeading
          id="scales-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Categories and tool lists + Step sequence */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-h3 font-semibold text-foreground">
                Підтримувані шкали та формули
              </h3>
              <p className="text-sm text-muted-foreground">
                Вам не потрібно тримати в памʼяті десятки коефіцієнтів та формул —
                достатньо надати вхідні показники у довільному вигляді.
              </p>
            </div>

            {/* Category Cards */}
            <div className="space-y-4">
              {categories.map((cat, i) => (
                <div
                  key={cat.name || i}
                  className="surface-card rounded-xl p-4 border border-border"
                >
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary-soft text-primary-strong">
                      <Calculator className="size-3.5" />
                    </span>
                    {cat.name}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.tools?.map((tool, ti) => (
                      <span
                        key={tool.name || ti}
                        className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs font-mono font-medium text-foreground border border-border"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Process steps */}
            {steps.length > 0 && (
              <div className="rounded-2xl border border-teal/20 bg-primary-soft/30 p-5 space-y-3">
                <h4 className="text-xs font-semibold text-primary-strong uppercase tracking-wider">
                  Алгоритм обробки запиту:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {steps.map((st, si) => (
                    <div
                      key={st.text || si}
                      className="flex items-center gap-2 text-xs text-foreground font-medium"
                    >
                      <CheckCircle2 className="size-4 text-teal shrink-0" />
                      <span>{st.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Calculator */}
          <div className="lg:col-span-6">
            <ScalesCalculator />
          </div>
        </div>
      </div>
    </section>
  )
}
