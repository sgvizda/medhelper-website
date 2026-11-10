import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, MessageSquareText } from 'lucide-react'
import type { FaqBlock, SiteSetting } from '@/payload-types'
import { getFaqs } from '@/lib/cms'
import { SectionHeading } from '@/components/ui/section-heading'
import { FaqAccordion } from './faq-accordion'
import { faqJsonLd } from './faq-jsonld'

export async function FaqSection({
  block,
}: {
  block: FaqBlock
  settings: SiteSetting
}) {
  const faqs = await getFaqs(block.faqs)
  const jsonLdData = faqJsonLd(faqs)

  return (
    <section
      id={block.anchor ?? 'faq'}
      aria-labelledby="faq-heading"
      className="section relative overflow-hidden"
    >
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, '\\u003c'),
        }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading + Help Card */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              id="faq-heading"
              eyebrow={block.eyebrow}
              heading={block.heading}
              description={block.description}
            />

            <div className="surface-card rounded-2xl p-6 border border-border space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
                <MessageSquareText className="size-5" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">
                Маєте інше запитання?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Якщо ви не знайшли відповіді на своє питання або бажаєте
                дізнатися про умови підключення вашого медичного закладу,
                напишіть нам.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-strong hover:text-foreground transition-colors pt-1"
              >
                <span>Перейти до форми звʼязку</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  )
}
