'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SitePreloader } from '@/components/landing/site-preloader'

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR / first paint, render children directly so content appears in HTML
  if (!mounted) return <>{children}</>

  return (
    <>
      {/* Preloader overlay — removed from tree after exit animation */}
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {!done && <SitePreloader onFinish={() => setDone(true)} />}
      </AnimatePresence>

      {/* Site content — hidden until preloader finishes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
