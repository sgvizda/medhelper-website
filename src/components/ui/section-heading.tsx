import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

type Props = {
  eyebrow?: string | null
  heading: string
  description?: string | null
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
  /** Heading level; sections use h2 by default. */
  as?: 'h1' | 'h2'
  id?: string
}

/** Consistent editorial section heading: eyebrow → title → lead. */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  dark,
  className,
  as: H = 'h2',
  id,
}: Props) {
  return (
    <Reveal
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase',
            dark ? 'text-mint' : 'text-primary-strong',
          )}
        >
          <span aria-hidden className={cn('h-px w-6', dark ? 'bg-mint/60' : 'bg-primary/60')} />
          {eyebrow}
        </p>
      ) : null}
      <H id={id} className={cn('text-h2', dark ? 'text-white' : 'text-foreground')}>
        {heading}
      </H>
      {description ? (
        <p className={cn('text-lead max-w-2xl', dark && 'text-[#a9b7c7]')}>{description}</p>
      ) : null}
    </Reveal>
  )
}
