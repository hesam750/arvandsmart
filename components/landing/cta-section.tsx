'use client'

import { motion } from 'framer-motion'
import { Zap, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 8, scaleRange: [0.95, 1] })
  const { t, language } = useLanguage()

  return (
    <section className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.02]" />
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div style={{ rotateX, scale, y }} className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Status indicator */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse" />
            <span className="data-text text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary/80">{t('cta.badge')}</span>
          </motion.div> */}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            {language === 'fa' || language === 'ar'
              ? t('cta.title')
              : <>
                  Ready to Transform{' '}
                  <span className="text-primary block sm:inline">Your Cooling Management?</span>
                </>
            }
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/70 leading-relaxed max-w-xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="#contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base group">
                <Zap className="w-4 h-4 me-2 group-hover:scale-110 transition-transform" />
                {t('cta.button')}
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base border-primary/20 hover:bg-primary/5">
                {t('cta.docs')}
                <ArrowRight className="w-4 h-4 ms-1.5 sm:ms-2 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
