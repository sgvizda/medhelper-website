import * as React from 'react'
import { FileText, CheckCircle2, ShieldCheck } from 'lucide-react'
import type { DocumentsBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { DocumentsPreview } from '@/components/demos/documents/doc-preview'

export function DocumentsSection({
  block,
}: {
  block: DocumentsBlock
  settings: SiteSetting
}) {
  const documents = block.documents ?? []
  const highlights = block.highlights ?? []

  return (
    <section
      id={block.anchor ?? 'documents'}
      aria-labelledby="documents-heading"
      className="section relative overflow-hidden bg-surface-muted/20 border-t border-border"
    >
      <div className="container-page relative">
        <SectionHeading
          id="documents-heading"
          eyebrow={block.eyebrow}
          heading={block.heading}
          description={block.description}
          align="center"
          className="mb-12 lg:mb-16"
        />

        {/* 4 Cards of supported forms */}
        {documents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {documents.map((doc, idx) => (
              <div
                key={doc.code || idx}
                className="surface-card rounded-xl p-4 border border-border transition-all hover:border-teal/40"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                    <FileText className="size-4" />
                  </span>
                  <span className="font-mono text-xs font-bold text-primary-strong">
                    {doc.code}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-foreground mt-2.5">
                  {doc.title}
                </h4>
                {doc.description && (
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {doc.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Live Transformation Demo */}
        <DocumentsPreview />

        {/* Highlights & Essential Note */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Highlights */}
          <div className="lg:col-span-7 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map((h, i) => (
              <div
                key={h.text || i}
                className="inline-flex items-center gap-2 text-xs font-medium text-foreground"
              >
                <CheckCircle2 className="size-4 text-teal shrink-0" />
                <span>{h.text}</span>
              </div>
            ))}
          </div>

          {/* Prominent Ethical Note */}
          {block.note && (
            <div className="lg:col-span-5 rounded-xl border border-teal/30 bg-primary-soft/40 p-4 text-xs text-primary-strong leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="size-4 shrink-0 mt-0.5 text-teal" />
              <span>
                <strong>Принцип достовірності: </strong>
                {block.note}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
