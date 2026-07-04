'use client'

import { motion } from 'motion/react'
import { useTilt } from '@/hooks/use-scroll-3d'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  sensitivity?: number
  /** Whether to apply preserve-3d on children for depth layering */
  depth?: boolean
}

/**
 * A card that tilts in 3D following the mouse cursor.
 * Wraps children in a perspective container with spring-animated rotateX/Y.
 */
export function TiltCard({ children, className = '', sensitivity = 10, depth = true }: TiltCardProps) {
  const { cardRef, tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(sensitivity)

  return (
    <motion.div
      ref={cardRef}
      style={{
        ...tiltStyle,
        transformStyle: depth ? 'preserve-3d' as any : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * A child layer inside a TiltCard that sits at a given Z-depth.
 * Higher depthValue = pops out more toward the viewer.
 */
export function TiltLayer({
  children,
  depthValue = 16,
  className = '',
}: {
  children: React.ReactNode
  depthValue?: number
  className?: string
}) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${depthValue}px)` }}
    >
      {children}
    </div>
  )
}
