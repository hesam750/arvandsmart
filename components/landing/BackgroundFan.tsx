'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react'

/* ─── Radiant ripple config ─── */
// Each ripple expands outward from fan size to large, opacity fades to 0
const RIPPLES = [
  { duration: 4, delay: 0, startScale: 0.9, endScale: 1.8, blur: 50, color: '147,51,234' },      // purple
  { duration: 5, delay: 1.3, startScale: 0.85, endScale: 2.2, blur: 70, color: '34,211,238' },    // cyan
  { duration: 6, delay: 0.7, startScale: 0.95, endScale: 2.5, blur: 90, color: '168,85,247' },    // light purple
  { duration: 4.5, delay: 2.5, startScale: 0.9, endScale: 1.9, blur: 60, color: '45,212,191' },   // teal
  { duration: 5.5, delay: 3.2, startScale: 0.88, endScale: 2.8, blur: 100, color: '139,92,246' }, // violet
]

/* ─── Theme-aware colors ─── */
type ColorSet = {
  bgBase: string; bgStart: string; bgEnd: string
  metal1: string; metal2: string; metal3: string; metal4: string
  hub1: string; hub2: string; hub3: string
  ring: string; ringAccent: string; ringInner: string
  tick: string; hubDark: string; hubDarker: string; hubBlack: string; shroudGlow: string
}

const DM: ColorSet = {
  bgBase: '#0f172a', bgStart: '#0f172a', bgEnd: '#060d18',
  metal1: '#e2e8f0', metal2: '#94a3b8', metal3: '#64748b', metal4: '#cbd5e1',
  hub1: '#f1f5f9', hub2: '#cbd5e1', hub3: '#94a3b8',
  ring: '#334155', ringAccent: '#1e293b', ringInner: '#334155',
  tick: '#94a3b8', hubDark: '#1e293b', hubDarker: '#334155', hubBlack: '#0f172a', shroudGlow: '#94a3b8',
}

const LM: ColorSet = {
  bgBase: '#f1f5f9', bgStart: '#f1f5f9', bgEnd: '#e2e8f0',
  metal1: '#ffffff', metal2: '#cbd5e1', metal3: '#94a3b8', metal4: '#e2e8f0',
  hub1: '#ffffff', hub2: '#e2e8f0', hub3: '#cbd5e1',
  ring: '#cbd5e1', ringAccent: '#94a3b8', ringInner: '#cbd5e1',
  tick: '#64748b', hubDark: '#e5e7eb', hubDarker: '#d1d5db', hubBlack: '#9ca3af', shroudGlow: '#94a3b8',
}

/* ─── Single animated ripple ─── */
function RippleRing({ duration, startScale, endScale, blur, color, delay: initialDelay }: {
  duration: number; startScale: number; endScale: number; blur: number; color: string; delay: number
}) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(${color},0.12) 0%, rgba(${color},0.04) 40%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        willChange: 'transform, opacity',
      }}
      initial={{ scale: startScale, opacity: 0 }}
      animate={{
        scale: [startScale, startScale * 1.15, endScale],
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeOut',
        delay: initialDelay,
        times: [0, 0.15, 1],
      }}
    />
  )
}

/* ─── Fan SVG ─── */
function FanSVG({ c, isDark }: { c: ColorSet; isDark: boolean }) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bfMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.metal1} />
          <stop offset="35%" stopColor={c.metal2} />
          <stop offset="65%" stopColor={c.metal3} />
          <stop offset="100%" stopColor={c.metal4} />
        </linearGradient>
        <radialGradient id="bfHub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.hub1} />
          <stop offset="60%" stopColor={c.hub2} />
          <stop offset="100%" stopColor={c.hub3} />
        </radialGradient>
        <radialGradient id="bfBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.bgStart} />
          <stop offset="70%" stopColor={c.bgEnd} />
          <stop offset="100%" stopColor={c.bgEnd} />
        </radialGradient>
        <linearGradient id="bfRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.ring} />
          <stop offset="50%" stopColor={c.ringAccent} />
          <stop offset="100%" stopColor={c.ring} />
        </linearGradient>
        <filter id="bfBladeGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="bfClip"><circle cx="60" cy="60" r="52" /></clipPath>
      </defs>

      <circle cx="60" cy="60" r="58" fill="url(#bfBg)" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="url(#bfRing)" strokeWidth="3.5" />
      <circle cx="60" cy="60" r="51" fill="none" stroke={c.ringAccent} strokeWidth="0.8" opacity="0.8" />
      <circle cx="60" cy="60" r="48" fill="none" stroke={c.ringInner} strokeWidth="0.5" opacity="0.5" />

      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180
        const isMajor = i % 3 === 0
        const r1 = 53, r2 = isMajor ? 50.5 : 51.8
        return (
          <line key={i}
            x1={+(60 + r1 * Math.cos(angle)).toFixed(10)}
            y1={+(60 + r1 * Math.sin(angle)).toFixed(10)}
            x2={+(60 + r2 * Math.cos(angle)).toFixed(10)}
            y2={+(60 + r2 * Math.sin(angle)).toFixed(10)}
            stroke={c.tick} strokeWidth={isMajor ? '0.6' : '0.35'} opacity={isMajor ? '0.5' : '0.25'}
          />
        )
      })}

      <g className="origin-center animate-[spin_8s_linear_infinite]" style={{ transformOrigin: '60px 60px' }} clipPath="url(#bfClip)" filter="url(#bfBladeGlow)">
        <g transform="translate(60,60) scale(0.80)">
          <g id="bfBlade" fill="url(#bfMetal)">
            <path d="M 2 -18 C 8 -30, 22 -40, 34 -42 C 45 -44, 50 -42, 52 -38 C 54 -33, 49 -27, 42 -24 C 33 -20, 22 -15, 14 -9 C 6 -3, 0 4, -2 10 C -4 15, -6 18, -10 18 C -14 18, -16 14, -16 10 C -16 2, -10 -8, 2 -18 Z" />
          </g>
          <use href="#bfBlade" transform="rotate(0)" />
          <use href="#bfBlade" transform="rotate(60)" />
          <use href="#bfBlade" transform="rotate(120)" />
          <use href="#bfBlade" transform="rotate(180)" />
          <use href="#bfBlade" transform="rotate(240)" />
          <use href="#bfBlade" transform="rotate(300)" />
        </g>
      </g>

      <circle cx="60" cy="60" r="13.5" fill={c.hubBlack} stroke={c.ring} strokeWidth="1" />
      <circle cx="60" cy="60" r="11.5" fill="url(#bfHub)" stroke={c.tick} strokeWidth="0.6" />
      <circle cx="60" cy="60" r="8" fill="none" stroke={c.tick} strokeWidth="0.4" opacity="0.6" />
      <circle cx="60" cy="60" r="4.5" fill={c.hubDark} stroke={c.hubDarker} strokeWidth="0.5" />
      <circle cx="60" cy="60" r="2" fill={c.hubBlack} />
    </svg>
  )
}

/* ─── Main Export ─── */
export default function BackgroundFan() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const c = isDark ? DM : LM
  const opacityClass = isDark ? 'opacity-40' : 'opacity-25'

  useEffect(() => { setIsMounted(true) }, [])

  // 3D mouse-follow tilt
  const tiltX = useMotionValue(0.5)
  const tiltY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(tiltX, [0, 1], [5, -5]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(tiltY, [0, 1], [-5, 5]), { stiffness: 180, damping: 22 })
  const tiltScale = useSpring(useTransform(tiltX, [0, 0.5, 1], [0.97, 1, 0.97]), { stiffness: 100, damping: 20 })

  // Scroll-based subtle rotation
  const { scrollYProgress } = useScroll()
  const scrollRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 12]), { stiffness: 40, damping: 25 })

  const containerRef = useRef<HTMLDivElement>(null!)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    tiltX.set((e.clientX - rect.left) / rect.width)
    tiltY.set((e.clientY - rect.top) / rect.height)
  }
  const handleMouseLeave = () => { tiltX.set(0.5); tiltY.set(0.5) }

  // Staggered floating animation for SVG inner rings
  const svgPulse = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 0.98]), { stiffness: 40, damping: 20 })

  if (!isMounted) {
    return (
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="relative w-[min(50vw,500px)] h-[min(50vw,500px)] rounded-full opacity-15 bg-slate-900" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      {/* ===== Animated radiant ripple rings ===== */}
      {RIPPLES.map((r, i) => (
        <RippleRing key={i} {...r} />
      ))}

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, scale: tiltScale, rotateZ: scrollRotate }}
        className="relative w-[min(50vw,500px)] h-[min(50vw,500px)]"
      >
        {/* Ambient glow behind fan — slow pulse */}
        <motion.div
          className="absolute inset-[5%] rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.05)'} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            translateZ: '-15px',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Fan */}
        <motion.div
          className={`relative w-full h-full rounded-full flex items-center justify-center ${opacityClass}`}
          style={{ scale: svgPulse, translateZ: '0px' }}
        >
          <FanSVG c={c} isDark={isDark} />
        </motion.div>

        {/* Front glow — slow breathing */}
        <motion.div
          className="absolute inset-[10%] rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${isDark ? 'rgba(34,211,238,0.05)' : 'rgba(34,211,238,0.03)'} 0%, transparent 60%)`,
            filter: 'blur(40px)',
            translateZ: '10px',
          }}
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 rounded-full pointer-events-none opacity-20"
          style={{
            background: `repeating-radial-gradient(circle at 50% 50%, ${c.tick}22 0_1px, transparent 1px_12px)`,
            translateZ: '5px',
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 30%, ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'} 100%)`,
            translateZ: '8px',
          }}
        />
      </motion.div>
    </div>
  )
}
