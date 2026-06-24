'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section className="relative py-28 px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.6 0.2 225 / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.6 0.2 225 / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 bg-accent/5 blur-[150px] rounded-full" />

      {/* Scanline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `var(--scanline)` }}
      />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          {/* Floating data indicators */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse" />
            <span className="text-[9px] data-text text-muted-foreground/30 tracking-widest">READY FOR CONNECTION</span>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card/30 p-12 sm:p-16 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-[1.15]">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#contact">
                <Button size="lg" className="px-8 py-6 text-base group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {t('cta.button')}
                  </span>
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground/40 data-text tracking-wider">
              {t('cta.note')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
