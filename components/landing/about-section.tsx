'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Eye, Target, Shield, Lightbulb, Rocket, Award } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()

  const pillars = [
    {
      icon: Eye,
      title: t('about.vision.title'),
      text: t('about.vision.text'),
    },
    {
      icon: Target,
      title: t('about.mission.title'),
      text: t('about.mission.text'),
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      text: language === 'fa'
        ? 'پلتفرم آروانداسمارت‌کنترل با رعایت استانداردهای امنیتی ISO 27001 و معماری مدرن مبتنی بر میکروسرویس طراحی شده است.'
        : language === 'ar'
          ? 'منصة أرواند للتحكم الذكي مصممة وفقاً لمعايير الأمان ISO 27001 وهندسة الخدمات المصغرة الحديثة.'
          : 'The ArvandSmartControl platform is designed with ISO 27001 security standards and modern microservice architecture.',
    },
  ]

  return (
    <section id="about" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/3 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/3 blur-[120px] rounded-full" />

      <div className="section-glow max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs data-text tracking-wider uppercase mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('about.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            {t('about.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="card-command p-8 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 border border-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground/90">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  {pillar.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
