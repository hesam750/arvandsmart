'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const MagicRings = dynamic(() => import('./MagicRings'), {
  ssr: false,
})

/**
 * ترکیب خلاقانه: حلقه‌های نئونی + فن صنعتی در مرکز
 */
export default function MagicRingsBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-background">
      {/* حلقه‌های متحرک — موس می‌گیره برای افکت تعاملی */}
      <MagicRings
        color="#a855f7"
        colorTwo="#22d3ee"
        speed={0.8}
        ringCount={5}
        attenuation={12}
        lineThickness={2.5}
        baseRadius={0.22}
        radiusStep={0.1}
        scaleRate={0.06}
        opacity={0.5}
        noiseAmount={0.04}
        rotation={25}
        ringGap={1.4}
        fadeIn={0.8}
        fadeOut={0.5}
        followMouse={true}
        mouseInfluence={0.12}
        hoverScale={1.2}
        parallax={0.02}
        clickBurst={true}
      />

      {/* فن در مرکز — pointer-events-none تا موس به حلقه‌ها برسه */}
      <FanInCenter />
    </div>
  )
}

/**
 * فن SVG در مرکز صفحه، روی حلقه‌ها سوار می‌شه
 */
function FanInCenter() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDark = theme === 'dark'

  // Light-mode colors: warm silver/chrome that pops on white bg
  const LM = {
    bgBase: '#f1f5f9',
    metal1: '#ffffff',
    metal2: '#cbd5e1',
    metal3: '#94a3af',
    metal4: '#e2e8f0',
    hub1: '#ffffff',
    hub2: '#e2e8f0',
    hub3: '#cbd5e1',
    ring: '#cbd5e1',
    ringAccent: '#94a3b8',
    tick: '#64748b',
    hubDark: '#e5e7eb',
    hubDarker: '#d1d5db',
    hubBlack: '#9ca3af',
  }

  // Dark-mode colors: industrial slate
  const DM = {
    bgBase: '#0f172a',
    metal1: '#e2e8f0',
    metal2: '#94a3b8',
    metal3: '#64748b',
    metal4: '#cbd5e1',
    hub1: '#f1f5f9',
    hub2: '#cbd5e1',
    hub3: '#94a3b8',
    ring: '#334155',
    ringAccent: '#1e293b',
    tick: '#94a3b8',
    hubDark: '#1e293b',
    hubDarker: '#334155',
    hubBlack: '#0f172a',
  }

  const c = isDark ? DM : LM
  const opacity = isDark ? 'opacity-35' : 'opacity-25'

  if (!isMounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[min(55vw,400px)] h-[min(55vw,400px)] rounded-full opacity-20 bg-slate-900" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <div
        className={`relative w-[min(55vw,400px)] h-[min(55vw,400px)] rounded-full flex items-center justify-center ${opacity}`}
        suppressHydrationWarning
      >
        {/* Radial halo behind fan */}
        <div className="absolute inset-[15%] rounded-full bg-linear-to-br from-primary/5 via-chart-2/5 to-transparent blur-3xl animate-pulse" />

        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            <linearGradient id="fanMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c.metal1} />
              <stop offset="35%" stopColor={c.metal2} />
              <stop offset="65%" stopColor={c.metal3} />
              <stop offset="100%" stopColor={c.metal4} />
            </linearGradient>

            <radialGradient id="fanHub" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c.hub1} />
              <stop offset="60%" stopColor={c.hub2} />
              <stop offset="100%" stopColor={c.hub3} />
            </radialGradient>

            <filter id="fanGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="fanClipInner">
              <circle cx="60" cy="60" r="52" />
            </clipPath>
          </defs>

          {/* Base circle */}
          <circle cx="60" cy="60" r="58" fill={c.bgBase} />

          {/* Outer ring */}
          <circle cx="60" cy="60" r="56" fill="none" stroke={c.ring} strokeWidth="3" opacity="0.6" />
          <circle cx="60" cy="60" r="56" fill="none" stroke={c.metal1} strokeWidth="0.3" opacity="0.2" />

          {/* Inner ring */}
          <circle cx="60" cy="60" r="51" fill="none" stroke={c.ringAccent} strokeWidth="0.6" opacity="0.5" />
          <circle cx="60" cy="60" r="48" fill="none" stroke={c.ring} strokeWidth="0.4" opacity="0.3" />

          {/* Tick marks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180
            const isMajor = i % 3 === 0
            const r1 = 53
            const r2 = isMajor ? 50.5 : 51.8
            const x1 = parseFloat((60 + r1 * Math.cos(angle)).toFixed(10))
            const y1 = parseFloat((60 + r1 * Math.sin(angle)).toFixed(10))
            const x2 = parseFloat((60 + r2 * Math.cos(angle)).toFixed(10))
            const y2 = parseFloat((60 + r2 * Math.sin(angle)).toFixed(10))
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={c.tick}
                strokeWidth={isMajor ? '0.5' : '0.3'}
                opacity={isMajor ? '0.4' : '0.2'}
              />
            )
          })}

          {/* Spinning blades */}
          <g
            className="origin-center animate-[spin_8s_linear_infinite]"
            style={{ transformOrigin: '60px 60px' }}
            clipPath="url(#fanClipInner)"
            filter="url(#fanGlow)"
          >
            <g transform="translate(60,60) scale(0.80)">
              <g id="blade6" fill="url(#fanMetal)">
                <path d="M 2 -18 C 8 -30, 22 -40, 34 -42 C 45 -44, 50 -42, 52 -38 C 54 -33, 49 -27, 42 -24 C 33 -20, 22 -15, 14 -9 C 6 -3, 0 4, -2 10 C -4 15, -6 18, -10 18 C -14 18, -16 14, -16 10 C -16 2, -10 -8, 2 -18 Z" />
              </g>
              <use href="#blade6" transform="rotate(0)" />
              <use href="#blade6" transform="rotate(60)" />
              <use href="#blade6" transform="rotate(120)" />
              <use href="#blade6" transform="rotate(180)" />
              <use href="#blade6" transform="rotate(240)" />
              <use href="#blade6" transform="rotate(300)" />
            </g>
          </g>

          {/* Hub outer */}
          <circle cx="60" cy="60" r="13.5" fill={c.bgBase} stroke={c.ring} strokeWidth="1" />
          {/* Hub */}
          <circle cx="60" cy="60" r="11.5" fill="url(#fanHub)" stroke={c.tick} strokeWidth="0.6" />
          {/* Hub detail */}
          <circle cx="60" cy="60" r="8" fill="none" stroke={c.tick} strokeWidth="0.3" opacity="0.5" />
          <circle cx="60" cy="60" r="4.5" fill={c.hubDark} stroke={c.hubDarker} strokeWidth="0.4" />
          <circle cx="60" cy="60" r="2" fill={c.hubBlack} />
        </svg>
      </div>
    </div>
  )
}
