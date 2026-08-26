'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function HeroFadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

export function HighlightSweep({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute -inset-1 sm:-inset-2 bg-brutal-yellow -rotate-2 -z-0 origin-left"
        initial={reduce ? false : { scaleX: 0 }}
        animate={reduce ? undefined : { scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
      />
    </span>
  )
}
