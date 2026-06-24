'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, Cpu, TrendingUp, Rocket } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      icon: Database,
      titleKey: 'howItWorks.step1.title',
      descriptionKey: 'howItWorks.step1.description',
    },
    {
      number: '02',
      icon: Cpu,
      titleKey: 'howItWorks.step2.title',
      descriptionKey: 'howItWorks.step2.description',
    },
    {
      number: '03',
      icon: TrendingUp,
      titleKey: 'howItWorks.step3.title',
      descriptionKey: 'howItWorks.step3.description',
    },
    {
      number: '04',
      icon: Rocket,
      titleKey: 'howItWorks.step4.title',
      descriptionKey: 'howItWorks.step4.description',
    },
  ]

  return (
    <section id="how-it-works" className="relative py-10 px-4 overflow-hidden" ref={containerRef}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          {/* <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            {t('howItWorks.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {t('howItWorks.title')}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute start-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-glow-green/50 hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <StepItem 
                key={step.number}
                step={step}
                index={index}
                isInView={isInView}
                isEven={index % 2 === 1}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepItem({
  step,
  index,
  isInView,
  isEven,
  t,
}: {
  step: {
    number: string
    icon: React.ComponentType<{ className?: string }>
    titleKey: string
    descriptionKey: string
  }
  index: number
  isInView: boolean
  isEven: boolean
  t: (key: string) => string
}) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 * index,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative lg:grid lg:grid-cols-2 lg:gap-12 items-center ${isEven ? 'lg:text-end' : ''}`}
    >
      {/* Content */}
      <div className={`${isEven ? 'lg:order-2 lg:text-start' : ''}`}>
        <div className={`relative p-8 rounded-2xl glass gradient-border ${isEven ? 'lg:ms-12' : 'lg:me-12'}`}>
          {/* Step number */}
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            className="absolute -top-4 -start-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground shadow-lg glow-cyan"
          >
            {step.number}
          </motion.span>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{t(step.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(step.descriptionKey)}
              </p>
            </div>
          </div>

          {/* Decorative element */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            className="absolute bottom-0 start-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent rtl:bg-gradient-to-l"
          />
        </div>
      </div>

      {/* Center node (desktop only) */}
      <div className={`hidden lg:flex justify-center absolute start-1/2 transform -translate-x-1/2 rtl:translate-x-1/2 ${isEven ? '' : ''}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.2, type: "spring" }}
          className="w-4 h-4 rounded-full bg-primary shadow-lg glow-cyan"
        />
      </div>

      {/* Empty space for alternating layout */}
      <div className={`hidden lg:block ${isEven ? 'lg:order-1' : ''}`} />
    </motion.div>
  )
}
