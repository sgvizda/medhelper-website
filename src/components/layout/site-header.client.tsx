'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Dialog, NavigationMenu } from 'radix-ui'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import type { Media } from '@/payload-types'
import type { ResolvedLink } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { LinkButton } from '@/components/ui/link-button'
import { Logo } from './logo'

export type NavItem = { label: string; href: string; description: string }
export type MegaItem = { kind: string; title: string; description: string; href: string }

const kindIcon: Record<string, string> = {
  clinical: 'activity',
  nhsu: 'shield-check',
  docs: 'file-text',
  scales: 'calculator',
  ocr: 'scan-text',
}

type Props = {
  siteName: string
  logo: number | Media | null
  nav: NavItem[]
  mega: MegaItem[]
  login: ResolvedLink | null
  cta: ResolvedLink | null
}

export function HeaderClient({ siteName, logo, nav, mega, login, cta }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))
  useEffect(() => setScrolled(window.scrollY > 12), [])
  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300',
          scrolled
            ? 'border-b border-border/80 bg-background/80 shadow-[0_8px_30px_-20px_rgb(16_27_43/0.35)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Logo name={siteName} logo={logo} />

          <DesktopNav nav={nav} mega={mega} />

          <div className="flex items-center gap-2">
            {login ? (
              <LinkButton link={login} variant="ghost" size="sm" externalIcon={false} className="hidden md:inline-flex" />
            ) : null}
            {cta ? (
              <LinkButton link={cta} variant="primary" size="sm" className="hidden sm:inline-flex" externalIcon={false} icon={<ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />} />
            ) : null}
            <MobileMenu
              open={open}
              setOpen={setOpen}
              nav={nav}
              login={login}
              cta={cta}
              siteName={siteName}
              logo={logo}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function DesktopNav({ nav, mega }: { nav: NavItem[]; mega: MegaItem[] }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <NavigationMenu.Root className="relative hidden lg:block" aria-label="Основна навігація" delayDuration={80}>
      <NavigationMenu.List className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {nav.map((item, i) => {
          const isMega = mega.length > 0 && item.href.endsWith('#features')
          const pill =
            hovered === i ? (
              <motion.span
                layoutId={reduce ? undefined : 'nav-pill'}
                className="absolute inset-0 -z-10 rounded-full bg-surface-muted"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : null
          const base =
            'relative inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-[0.9rem] font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=open]:text-foreground'
          return (
            <NavigationMenu.Item key={item.href + i} onMouseEnter={() => setHovered(i)}>
              {isMega ? (
                <>
                  <NavigationMenu.Trigger className={base} onFocus={() => setHovered(i)}>
                    {pill}
                    {item.label}
                    <ChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 [[data-state=open]_&]:rotate-180" />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-full left-0 w-[min(680px,90vw)] pt-3 data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[state=open]:fade-in data-[state=closed]:fade-out">
                    <div className="surface-card grid grid-cols-2 gap-1 p-2 shadow-float">
                      {mega.map((m) => (
                        <NavigationMenu.Link asChild key={m.title}>
                          <Link
                            href={m.href}
                            className="group/m flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-primary-soft text-primary-strong">
                              <Icon name={kindIcon[m.kind]} className="size-[18px]" />
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                                {m.title}
                                <ArrowRight aria-hidden className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover/m:translate-x-0 group-hover/m:opacity-100" />
                              </span>
                              <span className="mt-0.5 line-clamp-2 text-[0.8125rem] leading-snug text-muted-foreground">
                                {m.description}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      ))}
                      <NavigationMenu.Link asChild>
                        <Link
                          href={item.href}
                          className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-graphite"
                        >
                          Усі можливості асистента
                          <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                  </NavigationMenu.Content>
                </>
              ) : (
                <NavigationMenu.Link asChild>
                  <Link href={item.href} className={base} onFocus={() => setHovered(i)}>
                    {pill}
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
          )
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

function MobileMenu({
  open,
  setOpen,
  nav,
  login,
  cta,
  siteName,
  logo,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  nav: NavItem[]
  login: ResolvedLink | null
  cta: ResolvedLink | null
  siteName: string
  logo: number | Media | null
}) {
  const reduce = useReducedMotion()
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground shadow-soft transition-colors hover:bg-surface-muted lg:hidden"
          aria-label="Відкрити меню"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-x-0 top-0 z-[80] max-h-dvh overflow-y-auto rounded-b-[1.75rem] bg-background shadow-float"
                initial={reduce ? { opacity: 0 } : { y: '-100%' }}
                animate={reduce ? { opacity: 1 } : { y: 0 }}
                exit={reduce ? { opacity: 0 } : { y: '-100%' }}
                transition={{ type: 'spring', stiffness: 380, damping: 40 }}
              >
                <Dialog.Title className="sr-only">Меню навігації</Dialog.Title>
                <div className="container-page flex h-[var(--header-h)] items-center justify-between">
                  <Logo name={siteName} logo={logo} />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border-strong bg-surface"
                      aria-label="Закрити меню"
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Мобільна навігація" className="container-page pb-6">
                  <ul className="divide-y divide-border border-y border-border">
                    {nav.map((item, i) => (
                      <motion.li
                        key={item.href + i}
                        initial={reduce ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between gap-4 py-4"
                        >
                          <span>
                            <span className="block text-lg font-semibold tracking-tight">{item.label}</span>
                            {item.description ? (
                              <span className="block text-sm text-muted-foreground">{item.description}</span>
                            ) : null}
                          </span>
                          <ArrowRight className="size-4 text-subtle-foreground" aria-hidden />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 grid gap-3">
                    {cta ? <LinkButton link={cta} size="lg" className="w-full" /> : null}
                    {login ? <LinkButton link={login} variant="secondary" size="lg" className="w-full" /> : null}
                  </div>
                </nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
