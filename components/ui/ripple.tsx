import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  /** CSS var or color value for the ripple rings */
  color?: string
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  color = 'var(--primary)',
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = Math.max(0, mainCircleOpacity - i * 0.025)
        const animationDelay = `${i * 0.12}s`
        const blurPx = 1 + i * 0.5

        return (
          <div
            key={i}
            className="absolute rounded-full animate-ripple"
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                background: `radial-gradient(circle at 50% 50%, color-mix(in oklch, ${color} 45%, transparent) 0%, color-mix(in oklch, ${color} 22%, transparent) 50%, transparent 72%)`,
                boxShadow: `0 0 ${blurPx * 6}px color-mix(in oklch, ${color} 25%, transparent), inset 0 0 ${blurPx * 3}px color-mix(in oklch, ${color} 18%, transparent)`,
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"
