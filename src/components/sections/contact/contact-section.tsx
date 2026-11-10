import * as React from 'react'
import { Mail, Phone, Send, MapPin } from 'lucide-react'
import type { ContactBlock, SiteSetting } from '@/payload-types'
import { SectionHeading } from '@/components/ui/section-heading'
import { ContactForm } from '@/components/forms/contact-form'

export function ContactSection({
  block,
  settings,
}: {
  block: ContactBlock
  settings: SiteSetting
}) {
  return (
    <section
      id={block.anchor ?? 'contact'}
      aria-labelledby="contact-heading"
      className="section relative overflow-hidden bg-surface-muted/30 border-t border-border"
    >
      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Contact info */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              id="contact-heading"
              eyebrow={block.eyebrow}
              heading={block.heading}
              description={block.description}
            />

            <div className="space-y-4 pt-2">
              <h4 className="font-semibold text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Прямі канали комунікації:
              </h4>

              <div className="space-y-3 text-sm">
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="surface-card flex items-center gap-3 rounded-xl p-3.5 border border-border transition-colors hover:border-teal/40"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground">Email</span>
                      <span className="font-medium text-foreground">{settings.email}</span>
                    </div>
                  </a>
                )}

                {settings.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                    className="surface-card flex items-center gap-3 rounded-xl p-3.5 border border-border transition-colors hover:border-teal/40"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground">Телефон</span>
                      <span className="font-medium text-foreground">{settings.phone}</span>
                    </div>
                  </a>
                )}

                {settings.telegram && (
                  <a
                    href={settings.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card flex items-center gap-3 rounded-xl p-3.5 border border-border transition-colors hover:border-teal/40"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                      <Send className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground">Telegram</span>
                      <span className="font-medium text-foreground">Написати в Telegram</span>
                    </div>
                  </a>
                )}

                {settings.address && (
                  <div className="surface-card flex items-center gap-3 rounded-xl p-3.5 border border-border">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground">Локація</span>
                      <span className="font-medium text-foreground">{settings.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
