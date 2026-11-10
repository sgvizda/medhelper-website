'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Thin reading-progress bar at the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-teal via-[#3fd0bd] to-mint"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  )
}
