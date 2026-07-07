'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/providers/theme-provider'
import { Ripple } from '@/components/ui/ripple'

/* ─── Theme-aware fan SVG ─── */
function FanSVG({ isDark }: { isDark: boolean }) {
  // Light: darker metals for contrast on light bg / Dark: lighter metals for contrast on dark bg
  const metal1 = isDark ? '#e2e8f0' : '#475569'
  const metal2 = isDark ? '#94a3b8' : '#64748b'
  const metal3 = isDark ? '#64748b' : '#94a3b8'
  const metal4 = isDark ? '#cbd5e1' : '#334155'
  const hub1 = isDark ? '#f1f5f9' : '#94a3b8'
  const hub2 = isDark ? '#cbd5e1' : '#64748b'
  const hub3 = isDark ? '#94a3b8' : '#475569'
  const ring = isDark ? '#334155' : '#94a3b8'
  const ringAccent = isDark ? '#1e293b' : '#64748b'
  const ringInner = isDark ? '#334155' : '#94a3b8'
  const tick = isDark ? '#94a3b8' : '#64748b'
  const hubDark = isDark ? '#1e293b' : '#475569'
  const hubDarker = isDark ? '#334155' : '#64748b'
  const hubBlack = isDark ? '#0f172a' : '#334155'
  const bgStart = isDark ? '#0f172a' : '#e2e8f0'
  const bgEnd = isDark ? '#060d18' : '#cbd5e1'

  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="cbMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={metal1} />
          <stop offset="35%" stopColor={metal2} />
          <stop offset="65%" stopColor={metal3} />
          <stop offset="100%" stopColor={metal4} />
        </linearGradient>
        <radialGradient id="cbHub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={hub1} />
          <stop offset="60%" stopColor={hub2} />
          <stop offset="100%" stopColor={hub3} />
        </radialGradient>
        <radialGradient id="cbBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={bgStart} />
          <stop offset="70%" stopColor={bgEnd} />
          <stop offset="100%" stopColor={bgEnd} />
        </radialGradient>
        <linearGradient id="cbRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ring} />
          <stop offset="50%" stopColor={ringAccent} />
          <stop offset="100%" stopColor={ring} />
        </linearGradient>
        <filter id="cbBladeGlow">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="cbClip"><circle cx="60" cy="60" r="52" /></clipPath>
      </defs>

      {/* Base background circle */}
      <circle cx="60" cy="60" r="58" fill="url(#cbBg)" />

      {/* Outer shroud ring */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="url(#cbRing)" strokeWidth="3.5" />

      {/* Mid accent ring */}
      <circle cx="60" cy="60" r="51" fill="none" stroke={ringAccent} strokeWidth="0.8" opacity="0.8" />

      {/* Inner ring */}
      <circle cx="60" cy="60" r="48" fill="none" stroke={ringInner} strokeWidth="0.5" opacity="0.5" />

      {/* Tick marks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180
        const isMajor = i % 3 === 0
        const r1 = 53
        const r2 = isMajor ? 50.5 : 51.8
        return (
          <line
            key={i}
            x1={+(60 + r1 * Math.cos(angle)).toFixed(10)}
            y1={+(60 + r1 * Math.sin(angle)).toFixed(10)}
            x2={+(60 + r2 * Math.cos(angle)).toFixed(10)}
            y2={+(60 + r2 * Math.sin(angle)).toFixed(10)}
            stroke={tick}
            strokeWidth={isMajor ? '0.6' : '0.35'}
            opacity={isMajor ? '0.5' : '0.25'}
          />
        )
      })}

      {/* Spinning blades */}
      <g
        className="origin-center animate-[spin_8s_linear_infinite]"
        style={{ transformOrigin: '60px 60px' }}
        clipPath="url(#cbClip)"
        filter="url(#cbBladeGlow)"
      >
        <g transform="translate(60,60) scale(0.80)">
          <g id="cbBlade" fill="url(#cbMetal)">
            <path d="M 2 -18 C 8 -30, 22 -40, 34 -42 C 45 -44, 50 -42, 52 -38 C 54 -33, 49 -27, 42 -24 C 33 -20, 22 -15, 14 -9 C 6 -3, 0 4, -2 10 C -4 15, -6 18, -10 18 C -14 18, -16 14, -16 10 C -16 2, -10 -8, 2 -18 Z" />
          </g>
          <use href="#cbBlade" transform="rotate(0)" />
          <use href="#cbBlade" transform="rotate(60)" />
          <use href="#cbBlade" transform="rotate(120)" />
          <use href="#cbBlade" transform="rotate(180)" />
          <use href="#cbBlade" transform="rotate(240)" />
          <use href="#cbBlade" transform="rotate(300)" />
        </g>
      </g>

      {/* Hub outer ring */}
      <circle cx="60" cy="60" r="13.5" fill={hubBlack} stroke={ring} strokeWidth="1" />

      {/* Hub center */}
      <circle cx="60" cy="60" r="11.5" fill="url(#cbHub)" stroke={tick} strokeWidth="0.6" />

      {/* Hub detail rings */}
      <circle cx="60" cy="60" r="8" fill="none" stroke={tick} strokeWidth="0.4" opacity="0.6" />
      <circle cx="60" cy="60" r="4.5" fill={hubDark} stroke={hubDarker} strokeWidth="0.5" />
      <circle cx="60" cy="60" r="2" fill={hubBlack} />
    </svg>
  )
}

/* ─── Combined Background (just the fan + vignette) ─── */
export function CombinedBackground() {
  const [mounted, setIsMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => { setIsMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[min(35vw,400px)] h-[min(35vw,400px)] rounded-full opacity-[0.08] bg-slate-900" />
        </div>
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" suppressHydrationWarning>
      {/* Layer 1: Fan — centered */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        <div className="w-[min(55vw,420px)] h-[min(55vw,420px)] opacity-[0.35] dark:opacity-[0.20] transition-opacity duration-500">
          <FanSVG isDark={isDark} />
        </div>
      </div>

      {/* Layer 2: Ripple — expanding concentric waves from center */}
      <Ripple
        mainCircleSize={40}
        mainCircleOpacity={0.2}
        numCircles={5}
        className="z-[2]"
      />

      {/* Layer 3: Vignette — soft edge fade */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, var(--background) 100%)`,
        }}
      />
    </div>
  )
}
