'use client'

import * as React from 'react'
import { Accordion } from 'radix-ui'
import { Plus } from 'lucide-react'
import type { Faq } from '@/payload-types'

export function FaqAccordion({
  faqs,
}: {
  faqs: Pick<Faq, 'question' | 'answer'>[]
}) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {faqs.map((f, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="surface-card rounded-2xl border border-border px-5 py-2 transition-all data-[state=open]:border-teal/40 data-[state=open]:shadow-card"
        >
          <Accordion.Header className="flex">
            <Accordion.Trigger className="group flex flex-1 items-center justify-between py-3 text-left font-semibold text-foreground text-sm sm:text-base transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-teal">
              <span>{f.question}</span>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-muted transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-primary-soft group-data-[state=open]:text-primary-strong">
                <Plus className="size-4" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p>{f.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
