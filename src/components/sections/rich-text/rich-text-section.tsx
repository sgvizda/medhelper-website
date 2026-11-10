import * as React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { RichTextBlock as RichTextBlockType, SiteSetting } from '@/payload-types'

export function RichTextSection({
  block,
}: {
  block: RichTextBlockType
  settings: SiteSetting
}) {
  return (
    <section className="section py-12 sm:py-16">
      <div className="container-page">
        <div className="prose-content mx-auto">
          {block.heading && (
            <h2 className="text-h2 font-semibold text-foreground mb-8">
              {block.heading}
            </h2>
          )}
          {block.content && (
            <RichText data={block.content as never} />
          )}
        </div>
      </div>
    </section>
  )
}
