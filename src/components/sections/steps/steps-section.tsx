import * as React from 'react'
import type { StepsBlock, SiteSetting } from '@/payload-types'
import { resolveLink } from '@/lib/links'
import { SectionHeading } from '@/components/ui/section-heading'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Icon } from '@/components/ui/icon'
import { LinkButton } from '@/components/ui/link-button'

export function StepsSection({
  block,
  settings,
}: {
  block: StepsBlock
  settings: SiteSetting
}) {
  const steps = block.steps ?? []
  const cta = resolveLink(block.cta, settings, 'Перейти до асистента')

  return (
    <section
      id={block.anchor ?? 'how-it-works'}
      aria-labelledby="steps-heading"
      className="section relative overflow-hidden bg-surface-muted/30 border-y border-border"
    >
      <div className="container-page relative">
        <SectionHeading
          id="steps-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-14 lg:mb-20"
        />

        {/* Steps container */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting line on desktop */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-teal/20 via-teal to-teal/20 -z-0"
          />

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, idx) => (
              <StaggerItem
                key={step.title || idx}
                className="flex flex-col items-center text-center group"
              >
                {/* Step badge with Number & Icon */}
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-surface border-2 border-border-strong shadow-card transition-all duration-300 group-hover:border-teal group-hover:scale-105">
                  <Icon name={step.icon} className="size-6 text-teal" />
                  <span className="absolute -top-2.5 -right-2.5 flex size-6 items-center justify-center rounded-full bg-ink text-white font-mono text-xs font-bold border-2 border-surface">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mt-5">
                  {step.title}
                </h3>

                {step.description && (
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Optional CTA */}
        {cta && (
          <div className="mt-14 text-center">
            <LinkButton link={cta} size="lg" variant="primary" />
          </div>
        )}
      </div>
    </section>
  )
}
