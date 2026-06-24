'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
}

export function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0,
  })

  const display = useTransform(spring, (current) => 
    Math.round(current)
  )

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, spring, value, hasAnimated])

  return (
    <motion.span ref={ref}>
      {isInView ? (
        <motion.span>{display}</motion.span>
      ) : (
        '0'
      )}
    </motion.span>
  )
}
