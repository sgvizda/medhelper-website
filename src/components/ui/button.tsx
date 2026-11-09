import * as React from 'react'
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,box-shadow,transform,color,border-color] duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-55 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-ink text-white shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_8px_24px_-10px_rgb(16_27_43/0.6)] hover:bg-graphite hover:shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_14px_30px_-12px_rgb(23_184_166/0.55)]',
        accent:
          'bg-teal text-primary-foreground shadow-[0_1px_0_rgb(255_255_255/0.35)_inset,0_10px_30px_-12px_rgb(23_184_166/0.8)] hover:bg-[color-mix(in_oklab,var(--brand-primary)_88%,white)]',
        secondary:
          'bg-surface text-foreground border border-border-strong shadow-soft hover:border-[color-mix(in_oklab,var(--brand-primary)_45%,var(--border-strong))] hover:bg-surface',
        ghost: 'text-foreground hover:bg-surface-muted',
        'outline-dark':
          'border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25',
        link: 'h-auto rounded-none px-0 text-primary-strong underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-[0.9375rem]',
        lg: 'h-12 px-6 text-base sm:h-13 sm:px-7',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)
Button.displayName = 'Button'
