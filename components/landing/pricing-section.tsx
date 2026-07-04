'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import Link from 'next/link'

export function PricingSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 6, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()
  const currencySymbol = language === 'fa' ? 'ریال' : '$'
  const priceFactor = language === 'fa' ? 1_000_000 : 1
  const periodLabels = {
    monthly: language === 'fa' ? '/ماه' : language === 'ar' ? '/شهر' : '/mo',
    annually: language === 'fa' ? '/سال' : language === 'ar' ? '/سنة' : '/yr',
  }
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: { en: 'Starter', fa: 'شروع', ar: 'مبتدئ' },
      desc: { en: 'For small facilities and single-site monitoring.', fa: 'برای تأسیسات کوچک و نظارت تک‌مکانی.', ar: 'للمنشآت الصغيرة والمراقبة أحادية الموقع.' },
      price: { monthly: 49, annual: 100 },
      features: { en: ['Up to 5 chillers', 'Real-time monitoring', 'Email alerts', '7-day history', 'Basic analytics'], fa: ['تا ۵ چیلر', 'پایش لحظه‌ای', 'هشدار ایمیلی', 'تاریخچه ۷ روزه', 'تحلیل پایه'], ar: ['حتى ٥ مبردات', 'مراقبة لحظية', 'تنبيهات البريد الإلكتروني', 'سجل ٧ أيام', 'تحليلات أساسية'] },
      cta: { en: 'Get Started', fa: 'شروع کنید', ar: 'ابدأ الآن' },
      popular: false,
    },
    {
      name: { en: 'Professional', fa: 'حرفه‌ای', ar: 'احترافي' },
      desc: { en: 'For growing operations with multiple sites.', fa: 'برای عملیات رو به رشد با چندین مکان.', ar: 'للعمليات المتنامية مع مواقع متعددة.' },
      price: { monthly: 149, annual: 399 },
      features: { en: ['Up to 25 chillers', 'Advanced analytics', 'Predictive maintenance', '30-day history', 'API access', 'Priority support'], fa: ['تا ۲۵ چیلر', 'تحلیل پیشرفته', 'نگهداری پیش‌بینانه', 'تاریخچه ۳۰ روزه', 'دسترسی API', 'پشتیبانی اولویت‌دار'], ar: ['حتى ٢٥ مبرداً', 'تحليلات متقدمة', 'صيانة تنبؤية', 'سجل ٣٠ يوماً', 'الوصول إلى API', 'دعم ذو أولوية'] },
      cta: { en: 'Start Free Trial', fa: 'شروع آزمایشی رایگان', ar: 'ابدأ النسخة التجريبية' },
      popular: true,
    },
    {
      name: { en: 'Enterprise', fa: 'سازمانی', ar: 'مؤسسات' },
      desc: { en: 'Custom solutions for large-scale deployments.', fa: 'راه‌حل‌های سفارشی برای استقرار در مقیاس بزرگ.', ar: 'حلول مخصصة للنشر على نطاق واسع.' },
      price: { monthly: null, annual: null },
      features: { en: ['Unlimited chillers', 'Custom integrations', 'Dedicated account manager', 'Unlimited history', 'White-label option', '24/7 phone support'], fa: ['چیلر نامحدود', 'یکپارچه‌سازی سفارشی', 'مدیر حساب اختصاصی', 'تاریخچه نامحدود', 'گزینه برچسب سفید', 'پشتیبانی تلفنی ۲۴/۷'], ar: ['مبردات غير محدودة', 'تكاملات مخصصة', 'مدير حساب مخصص', 'سجل غير محدود', 'خيار العلامة البيضاء', 'دعم هاتفي ٢٤/٧'] },
      cta: { en: 'Contact Sales', fa: 'تماس با فروش', ar: 'اتصل بالمبيعات' },
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div style={{ rotateX, scale, y }} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            {t('pricing.title.part1')}{' '}
            <span className="text-primary block sm:inline">
              {t('pricing.title.part2')}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('pricing.subtitle')}
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
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                isAnnual
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.annually')}
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-chart-3/20 text-chart-3 text-[9px] sm:text-[10px] font-bold">
                {t('pricing.save')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
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
                    {t('pricing.popular')}
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 text-foreground/90">
                {plan.name[language] || plan.name.en}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground/70 mb-5 sm:mb-6">
                {plan.desc[language] || plan.desc.en}
              </p>

              {/* Price */}
              <div className="mb-6 sm:mb-8">
                {plan.price.monthly ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold font-mono">
                      {language === 'fa'
                        ? `${((isAnnual ? plan.price.annual : plan.price.monthly) * priceFactor).toLocaleString()} ${currencySymbol}`
                        : `${currencySymbol}${isAnnual ? plan.price.annual : plan.price.monthly}`
                      }
                    </span>
                    <span className="text-muted-foreground/60 text-xs sm:text-sm">{periodLabels.monthly}</span>
                  </div>
                ) : (
                  <div className="text-2xl sm:text-3xl font-bold font-mono">
                    {language === 'fa' ? 'تماس بگیرید' : language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                  </div>
                )}
                {plan.price.monthly && isAnnual && (
                  <div className="text-[11px] sm:text-xs text-muted-foreground/50 mt-1">
                    {language === 'fa'
                      ? `${((plan.price.annual || 0) * 12 * priceFactor).toLocaleString()} ${currencySymbol}${periodLabels.annually}`
                      : `${currencySymbol}${((plan.price.annual || 0) * 12).toLocaleString()}${periodLabels.annually}`
                    }
                  </div>
                )}
              </div>

              {/* CTA */}
              {plan.popular ? (
                <Link href="#contact" className="block mb-6 sm:mb-8">
                  <Button className="w-full text-xs sm:text-sm">
                    {plan.cta[language] || plan.cta.en}
                  </Button>
                </Link>
              ) : (
                <Link href="#contact" className="block mb-6 sm:mb-8">
                  <Button variant="outline" className="w-full text-xs sm:text-sm border-primary/30 hover:bg-primary/5">
                    {plan.cta[language] || plan.cta.en}
                  </Button>
                </Link>
              )}

              <ul className="space-y-2.5 sm:space-y-3 flex-1">
                {(plan.features[language] || plan.features.en).map((feature: string, i: number) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
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
      </motion.div>
    </section>
  )
}
