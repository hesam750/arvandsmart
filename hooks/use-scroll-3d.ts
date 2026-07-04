'use client'

import { useScroll, useTransform, useSpring, useMotionValue } from 'motion/react'
import { useRef } from 'react'

/**
 * Scroll-driven 3D transform values.
 * Gives a section spring-animated rotateX, rotateY, translateZ, and scale
 * based on how far through the viewport the element has scrolled.
 */
export function useScroll3D(
  options: {
    /** Perspective depth sensitivity — higher = more dramatic tilt (default 20) */
    rotateRange?: number
    /** Scale range — [min, max] as element scrolls through viewport */
    scaleRange?: [number, number]
    /** Spring stiffness (default 80) */
    stiffness?: number
    /** Spring damping (default 20) */
    damping?: number
  } = {},
) {
  const {
    rotateRange = 20,
    scaleRange = [0.92, 1],
    stiffness = 80,
    damping = 20,
  } = options

  const ref = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [rotateRange, 0, -rotateRange])
  const rawScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[0]])
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80])
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  const rotateX = useSpring(rawRotateX, { stiffness, damping })
  const scale = useSpring(rawScale, { stiffness: stiffness * 1.5, damping })
  const y = useSpring(rawY, { stiffness: stiffness * 0.6, damping: damping * 1.2 })

  return { ref, rotateX, scale, y, opacity: rawOpacity, scrollYProgress }
}

/**
 * Mouse-driven 3D tilt for cards.
 * Returns spring-animated rotateY and rotateX for use in `style`.
 */
export function useTilt(sensitivity: number = 10) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const cardRef = useRef<HTMLDivElement>(null!)

  const rawRotateY = useTransform(x, [0, 1], [sensitivity, -sensitivity])
  const rawRotateX = useTransform(y, [0, 1], [-sensitivity, sensitivity])

  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 25 })
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return {
    cardRef,
    tiltStyle: { rotateX, rotateY, perspective: 1200 },
    handleMouseMove,
    handleMouseLeave,
  }
}
