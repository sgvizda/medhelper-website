import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CapabilitiesBlock, SiteSetting } from '@/payload-types'
import { normalizeHref } from '@/lib/links'
import { SectionHeading } from '@/components/ui/section-heading'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import {
  ClinicalBentoVisual,
  NhsuBentoVisual,
  DocsBentoVisual,
  ScalesBentoVisual,
  OcrBentoVisual,
} from '@/components/demos/bento/bento-visuals'

export function CapabilitiesSection({
  block,
}: {
  block: CapabilitiesBlock
  settings: SiteSetting
}) {
  const items = block.items ?? []

  const renderVisual = (kind: string) => {
    switch (kind) {
      case 'clinical':
        return <ClinicalBentoVisual />
      case 'nhsu':
        return <NhsuBentoVisual />
      case 'docs':
        return <DocsBentoVisual />
      case 'scales':
        return <ScalesBentoVisual />
      case 'ocr':
        return <OcrBentoVisual />
      default:
        return null
    }
  }

  return (
    <section
      id={block.anchor ?? 'features'}
      aria-labelledby="capabilities-heading"
      className="section relative overflow-hidden"
    >
      <div className="container-page relative">
        <SectionHeading
          id="capabilities-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-12 lg:mb-16"
        />

        {/* Bento Grid layout */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isDark = item.kind === 'nhsu'
            const isWide = item.kind === 'clinical'

            return (
              <StaggerItem
                key={item.title || idx}
                className={`${isWide ? 'lg:col-span-2' : ''} ${
                  isDark
                    ? 'theme-dark bg-ink text-white border-white/10 shadow-float'
                    : 'surface-card bg-surface'
                } relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 lg:p-7 border transition-all duration-300 hover:shadow-glow hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-mint' : 'text-primary-strong'
                      }`}
                    >
                      {item.kind === 'nhsu'
                        ? 'НСЗУ / ПМГ'
                        : item.kind === 'clinical'
                        ? 'Клінічний інтелект'
                        : item.kind === 'docs'
                        ? 'Документація'
                        : item.kind === 'scales'
                        ? 'Калькулятори'
                        : 'OCR сканування'}
                    </span>

                    {item.href && (
                      <Link
                        href={normalizeHref(item.href)}
                        className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
                          isDark
                            ? 'text-mint hover:text-white'
                            : 'text-primary-strong hover:text-foreground'
                        }`}
                      >
                        <span>{item.linkLabel || 'Детальніше'}</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    )}
                  </div>

                  <h3
                    className={`text-h3 mt-3 font-semibold ${
                      isDark ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {item.description && (
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isDark ? 'text-[#a9b7c7]' : 'text-muted-foreground'
                      }`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Unique Micro visual demo */}
                <div className="mt-4">{renderVisual(item.kind)}</div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
