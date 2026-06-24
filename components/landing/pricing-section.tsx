'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(true)
  const { t } = useLanguage()

  const plans = [
    {
      nameKey: 'pricing.starter.name',
      descriptionKey: 'pricing.starter.description',
      priceKey: 'pricing.starter.price',
      price: { monthly: 49, annual: 39 },
      features: [
        'pricing.starter.feature1',
        'pricing.starter.feature2',
        'pricing.starter.feature3',
        'pricing.starter.feature4',
        'pricing.starter.feature5',
      ],
      ctaKey: 'pricing.cta.starter',
      popular: false,
    },
    {
      nameKey: 'pricing.professional.name',
      descriptionKey: 'pricing.professional.description',
      priceKey: 'pricing.professional.price',
      price: { monthly: 149, annual: 119 },
      features: [
        'pricing.professional.feature1',
        'pricing.professional.feature2',
        'pricing.professional.feature3',
        'pricing.professional.feature4',
        'pricing.professional.feature5',
        'pricing.professional.feature6',
      ],
      ctaKey: 'pricing.cta.professional',
      popular: true,
      popularKey: 'pricing.professional.popular',
    },
    {
      nameKey: 'pricing.enterprise.name',
      descriptionKey: 'pricing.enterprise.description',
      priceKey: 'pricing.enterprise.price',
      price: { monthly: null, annual: null },
      features: [
        'pricing.enterprise.feature1',
        'pricing.enterprise.feature2',
        'pricing.enterprise.feature3',
        'pricing.enterprise.feature4',
        'pricing.enterprise.feature5',
        'pricing.enterprise.feature6',
      ],
      ctaKey: 'pricing.cta.enterprise',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="relative py-10 px-4" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            {t('pricing.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {t('pricing.title')}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 text-pretty">
            {t('pricing.subtitle')}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full glass glass-border">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isAnnual 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isAnnual 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.annually')}
              <span className="px-2 py-0.5 rounded-full bg-glow-green/20 text-glow-green text-xs">
                {t('pricing.save')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.nameKey}
              plan={plan}
              index={index}
              isInView={isInView}
              isAnnual={isAnnual}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  plan,
  index,
  isInView,
  isAnnual,
  t,
}: {
  plan: {
    nameKey: string
    descriptionKey: string
    priceKey: string
    price: { monthly: number | null; annual: number | null }
    features: string[]
    ctaKey: string
    popular: boolean
    popularKey?: string
  }
  index: number
  isInView: boolean
  isAnnual: boolean
  t: (key: string) => string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
    >
      {/* Popular badge */}
      {plan.popular && plan.popularKey && (
        <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-10">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium shadow-lg glow-cyan">
            <Sparkles className="w-4 h-4" />
            {t(plan.popularKey)}
          </div>
        </div>
      )}

      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`relative h-full rounded-2xl p-8 ${
          plan.popular
            ? 'glass gradient-border bg-gradient-to-b from-secondary/20 to-transparent'
            : 'glass glass-border'
        }`}
      >
        {/* Glow effect */}
        {plan.popular && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        )}

        <div className="relative">
          {/* Plan name */}
          <h3 className="text-xl font-semibold mb-2">{t(plan.nameKey)}</h3>
          <p className="text-sm text-muted-foreground mb-6">{t(plan.descriptionKey)}</p>

          {/* Price */}
          <div className="mb-8">
            {plan.price.monthly ? (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-muted-foreground">/{t('pricing.monthly').toLowerCase()}</span>
              </div>
            ) : (
              <div className="text-4xl font-bold">{t(plan.priceKey)}</div>
            )}
            {plan.price.monthly && isAnnual && (
              <div className="text-sm text-muted-foreground mt-1">
                ${((plan.price.annual || 0) * 12).toLocaleString()}/{t('pricing.annually').toLowerCase()}
              </div>
            )}
          </div>

          {/* CTA */}
          <Button
            className={`w-full mb-8 ${
              plan.popular
                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground glow-cyan'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
            size="lg"
          >
            {t(plan.ctaKey)}
          </Button>

          {/* Features */}
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-3 text-sm"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground">{t(feature)}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
