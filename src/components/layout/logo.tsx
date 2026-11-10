import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

/** Brand mark: CMS logo if uploaded, otherwise the built-in vector mark + product name. */
export function Logo({
  name,
  logo,
  dark,
  className,
}: {
  name: string
  logo?: number | Media | null
  dark?: boolean
  className?: string
}) {
  const media = logo && typeof logo === 'object' && logo.url ? logo : null
  return (
    <Link
      href="/"
      aria-label={`${name} — на головну`}
      className={cn('group inline-flex items-center gap-2.5 rounded-lg', className)}
    >
      {media ? (
        <Image
          src={media.url!}
          alt={media.alt || name}
          width={media.width ?? 140}
          height={media.height ?? 32}
          className="h-8 w-auto"
          priority
        />
      ) : (
        <>
          <LogoMark />
          <span className={cn('text-[1.0625rem] font-semibold tracking-tight', dark ? 'text-white' : 'text-foreground')}>
            {name}
          </span>
        </>
      )}
    </Link>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-ink shadow-[0_6px_16px_-6px_rgb(23_184_166/0.6)]',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-8">
        <defs>
          <linearGradient id="mh-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8DE4D1" />
            <stop offset="1" stopColor="#17B8A6" />
          </linearGradient>
        </defs>
        {/* Cross formed by two rounded bars + a neural pulse */}
        <rect x="13.5" y="7" width="5" height="18" rx="2.5" fill="url(#mh-g)" opacity="0.9" />
        <rect x="7" y="13.5" width="18" height="5" rx="2.5" fill="url(#mh-g)" opacity="0.55" />
        <circle cx="16" cy="16" r="2.2" fill="#fff" />
      </svg>
    </span>
  )
}
