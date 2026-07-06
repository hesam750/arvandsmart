'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import { SpiralAnimation } from './spiral-animation'

/* ─── Simple typewriter that reveals text char by char ─── */
function TypewriterLine({
  text,
  speed = 60,
  onComplete,
}: {
  text: string
  speed?: number
  onComplete: () => void
}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayed('')

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        onComplete()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[1.5px] h-[1em] bg-white/60 ml-0.5 align-middle"
      />
    </span>
  )
}

/* ─── Preloader ─── */
interface Props {
  onFinish: () => void
}

export function SitePreloader({ onFinish }: Props) {
  const [phase, setPhase] = useState<'title' | 'typing' | 'reveal'>('title')
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  // Phase transitions on fixed timers
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('typing'), 2500)  // start typewriter at 2.5s
    const t2 = setTimeout(() => setPhase('reveal'), 7000)   // start exit at 7s

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // When done, wait for exit animation then call onFinish
  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => onFinishRef.current(), 900)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Canvas animation — full background */}
      <SpiralAnimation />

      {/* Soft overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />

      {/* Text content */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none select-none px-6">
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6"
        />

        {/* Main title — smaller, lighter, elegant */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] leading-none"
        >
          <span className="text-white/80">ARVAND</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-blue-400 font-semibold tracking-normal">
            SMART CONTROL
          </span>
        </motion.h1>

        {/* Decorative separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-5 mb-5"
        />

        {/* Subtitle typewriter */}
        {(phase === 'typing' || phase === 'reveal') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs sm:text-sm md:text-base text-white/40 font-light tracking-[0.3em] uppercase">
              {phase === 'typing' && (
                <TypewriterLine
                  text="The Creator of Smart Solutions"
                  speed={40}
                  onComplete={() => {
                    /* typewriter finished — nothing extra */
                  }}
                />
              )}
              {phase === 'reveal' && (
                <span>
                  The Creator of Smart Solutions
                  <span className="inline-block w-[1.5px] h-[1em] bg-white/60 ml-0.5 align-middle animate-pulse" />
                </span>
              )}
            </p>
          </motion.div>
        )}

        {/* Bottom loading hint — very subtle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 sm:bottom-10 text-[9px] sm:text-[10px] text-white/10 tracking-[0.4em] uppercase font-mono"
        >
          Initializing ...
        </motion.p>
      </div>
    </motion.div>
  )
}
