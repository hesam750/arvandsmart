'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(true)
  const { language } = useLanguage()

  const plans = [
    {
      name: 'Starter',
      name_fa: 'شروع',
      desc: 'For small facilities and single-site monitoring.',
      desc_fa: 'برای تأسیسات کوچک و نظارت تک‌مکانی.',
      price: { monthly: 49, annual: 39 },
      features: ['Up to 5 chillers', 'Real-time monitoring', 'Email alerts', '7-day history', 'Basic analytics'],
      cta: 'Get Started',
      cta_fa: 'شروع کنید',
      popular: false,
    },
    {
      name: 'Professional',
      name_fa: 'حرفه‌ای',
      desc: 'For growing operations with multiple sites.',
      desc_fa: 'برای عملیات رو به رشد با چندین مکان.',
      price: { monthly: 149, annual: 119 },
      features: ['Up to 25 chillers', 'Advanced analytics', 'Predictive maintenance', '30-day history', 'API access', 'Priority support'],
      cta: 'Start Free Trial',
      cta_fa: 'شروع آزمایشی رایگان',
      popular: true,
    },
    {
      name: 'Enterprise',
      name_fa: 'سازمانی',
      desc: 'Custom solutions for large-scale deployments.',
      desc_fa: 'راه‌حل‌های سفارشی برای استقرار در مقیاس بزرگ.',
      price: { monthly: null, annual: null },
      features: ['Unlimited chillers', 'Custom integrations', 'Dedicated account manager', 'Unlimited history', 'White-label option', '24/7 phone support'],
      cta: 'Contact Sales',
      cta_fa: 'تماس با فروش',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            {language === 'fa' ? 'قیمت‌گذاری' : 'Simple, Transparent'}{' '}
            <span className="text-primary block sm:inline">
              {language === 'fa' ? 'شفاف و مقرون به صرفه' : 'Pricing'}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {language === 'fa'
              ? 'بدون هزینه پنهان. بدون شگفتی. قیمت‌گذاری که با شما رشد می‌کند.'
              : 'No hidden costs. No surprises. Pricing that grows with you.'}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-border/60 bg-card mt-6 sm:mt-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                !isAnnual
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {language === 'fa' ? 'ماهانه' : 'Monthly'}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                isAnnual
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {language === 'fa' ? 'سالیانه' : 'Annually'}
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-chart-3/20 text-chart-3 text-[9px] sm:text-[10px] font-bold">
                {language === 'fa' ? '۲۰٪ تخفیف' : 'SAVE 20%'}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`card-command p-6 sm:p-8 flex flex-col relative ${
                plan.popular ? 'ring-1 ring-primary/30 shadow-lg shadow-primary/5' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 start-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold shadow-lg">
                    <Zap className="w-3 h-3" />
                    {language === 'fa' ? 'محبوب‌ترین' : 'MOST POPULAR'}
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 text-foreground/90">
                {language === 'fa' ? plan.name_fa : plan.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground/70 mb-5 sm:mb-6">
                {language === 'fa' ? plan.desc_fa : plan.desc}
              </p>

              {/* Price */}
              <div className="mb-6 sm:mb-8">
                {plan.price.monthly ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold font-mono">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground/60 text-xs sm:text-sm">/{language === 'fa' ? 'ماه' : 'mo'}</span>
                  </div>
                ) : (
                  <div className="text-2xl sm:text-3xl font-bold font-mono">
                    {language === 'fa' ? 'تماس بگیرید' : 'Contact Us'}
                  </div>
                )}
                {plan.price.monthly && isAnnual && (
                  <div className="text-[11px] sm:text-xs text-muted-foreground/50 mt-1">
                    ${((plan.price.annual || 0) * 12).toLocaleString()}/{language === 'fa' ? 'سالیانه' : 'year'}
                  </div>
                )}
              </div>

              {/* CTA */}
              {plan.popular ? (
                <Link href="#contact" className="block mb-6 sm:mb-8">
                  <Button className="w-full text-xs sm:text-sm">
                    {language === 'fa' ? plan.cta_fa : plan.cta}
                  </Button>
                </Link>
              ) : (
                <Link href="#contact" className="block mb-6 sm:mb-8">
                  <Button variant="outline" className="w-full text-xs sm:text-sm border-primary/30 hover:bg-primary/5">
                    {language === 'fa' ? plan.cta_fa : plan.cta}
                  </Button>
                </Link>
              )}

              {/* Features */}
              <ul className="space-y-2.5 sm:space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm"
                  >
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
