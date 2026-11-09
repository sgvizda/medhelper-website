'use client'

import * as React from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
  /** Animate once when 15% visible (default). */
  amount?: number
}

/**
 * Scroll-triggered reveal. Uses transform/opacity only (no layout shift).
 * With prefers-reduced-motion the content is rendered static.
 */
export function Reveal({ children, delay = 0, y = 18, amount = 0.15, ...rest }: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <motion.div {...rest}>{children}</motion.div>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  stagger = 0.07,
  delay = 0,
  ...rest
}: HTMLMotionProps<'div'> & { stagger?: number; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function StaggerItem({ children, ...rest }, ref) {
    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
        }}
        {...rest}
      >
        {children}
      </motion.div>
    )
  },
)

export { EASE }
