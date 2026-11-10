import * as React from 'react'
import { FileCheck2, PenLine } from 'lucide-react'
import type { OcrBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { OcrDemo } from '@/components/demos/ocr/ocr-demo'

export function OcrSection({
  block,
}: {
  block: OcrBlock
  settings: SiteSetting
}) {
  const printed = block.printed?.items ?? []
  const handwritten = block.handwritten?.items ?? []

  return (
    <section
      id={block.anchor ?? 'ocr'}
      aria-labelledby="ocr-heading"
      className="section relative overflow-hidden"
    >
      <div className="container-page relative">
        <SectionHeading
          id="ocr-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-12 lg:mb-16"
        />

        {/* Categories: Printed & Handwritten Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {/* Printed */}
          <div className="surface-card rounded-2xl p-5 border border-border">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                <FileCheck2 className="size-4" />
              </span>
              {block.printed?.title || 'Друковані документи'}
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {printed.map((item, idx) => (
                <span
                  key={item.text || idx}
                  className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground border border-border"
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Handwritten */}
          <div className="surface-card rounded-2xl p-5 border border-border">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                <PenLine className="size-4" />
              </span>
              {block.handwritten?.title || 'Рукописні записи'}
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {handwritten.map((item, idx) => (
                <span
                  key={item.text || idx}
                  className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground border border-border"
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live OCR Demo */}
        <div className="max-w-4xl mx-auto">
          <OcrDemo />
        </div>
      </div>
    </section>
  )
}
