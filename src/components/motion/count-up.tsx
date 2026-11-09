'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Number that counts up when scrolled into view. Final value is rendered for SSR/no-JS. */
export function CountUp({
  to,
  decimals = 0,
  duration = 1.2,
  className,
  suffix = '',
}: {
  to: number
  decimals?: number
  duration?: number
  className?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(to)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || reduce || started.current) return
    started.current = true
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {value.toFixed(decimals).replace('.', ',')}
      {suffix}
    </span>
  )
}
