import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react'
import type { Footer, Header, SiteSetting } from '@/payload-types'
import { isExternal } from '@/lib/utils'
import { normalizeHref, resolveLink } from '@/lib/links'
import { LinkButton } from '@/components/ui/link-button'
import { Logo } from './logo'

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) =>
  isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#a9b7c7] transition-colors hover:text-white">
      {children}
      <ArrowUpRight aria-hidden className="size-3" />
    </a>
  ) : (
    <Link href={normalizeHref(href)} className="text-[#a9b7c7] transition-colors hover:text-white">
      {children}
    </Link>
  )

export function SiteFooter({ footer, settings, header }: { footer: Footer; settings: SiteSetting; header: Header }) {
  const cta = resolveLink(header.cta, settings, 'Спробувати асистента')
  const year = new Date().getFullYear()
  return (
    <footer className="theme-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo name={settings.siteName} logo={settings.logoDark ?? null} dark />
            {footer.description ? <p className="mt-5 text-sm leading-relaxed text-[#a9b7c7]">{footer.description}</p> : null}
            {cta ? (
              <LinkButton link={cta} variant="accent" size="md" className="mt-6">
                Перейти до платформи
              </LinkButton>
            ) : null}
            <ul className="mt-8 space-y-2.5 text-sm">
              {settings.email ? (
                <li>
                  <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 text-[#a9b7c7] hover:text-white">
                    <Mail aria-hidden className="size-4 text-mint" /> {settings.email}
                  </a>
                </li>
              ) : null}
              {settings.phone ? (
                <li>
                  <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 text-[#a9b7c7] hover:text-white">
                    <Phone aria-hidden className="size-4 text-mint" /> {settings.phone}
                  </a>
                </li>
              ) : null}
              {settings.telegram ? (
                <li>
                  <a href={settings.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a9b7c7] hover:text-white">
                    <Send aria-hidden className="size-4 text-mint" /> Telegram
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <nav aria-label="Навігація у підвалі" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {(footer.columns ?? []).map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-mint uppercase">{col.title}</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {(col.links ?? []).map((l) => (
                    <li key={l.href + l.label}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {settings.disclaimer ? (
          <p className="mt-14 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-[#a9b7c7]">
            <strong className="font-semibold text-white">Важливо. </strong>
            {settings.disclaimer}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#8596aa] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {(settings.socials ?? []).map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                {s.network}
              </a>
            ))}
            <Link href="/privacy" className="hover:text-white">
              Політика конфіденційності
            </Link>
            <Link href="/terms" className="hover:text-white">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
