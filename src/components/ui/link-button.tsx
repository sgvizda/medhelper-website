import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { ResolvedLink } from '@/lib/links'
import { normalizeHref } from '@/lib/links'

type Props = Omit<ButtonProps, 'asChild'> & {
  link: ResolvedLink | null
  /** Show ↗ icon for external links (default true). */
  externalIcon?: boolean
  icon?: React.ReactNode
} & Pick<ComponentProps<typeof Link>, 'prefetch'>

/** A Button that renders a real link (internal via next/link, external with rel/target). */
export function LinkButton({ link, externalIcon = true, icon, children, ...props }: Props) {
  if (!link) return null
  const content = (
    <>
      {children ?? link.label}
      {icon ?? (link.external && externalIcon ? <ArrowUpRight className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> : null)}
    </>
  )
  if (link.external) {
    return (
      <Button asChild {...props}>
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {content}
          <span className="sr-only"> (відкриється в новій вкладці)</span>
        </a>
      </Button>
    )
  }
  return (
    <Button asChild {...props}>
      <Link href={normalizeHref(link.href)}>{content}</Link>
    </Button>
  )
}
