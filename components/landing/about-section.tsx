'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Eye, Target, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const pillars = [
  {
    icon: Eye,
    title: 'Our Vision',
    title_fa: 'چشم‌انداز ما',
    desc: 'To be the global standard in intelligent cooling management, driving efficiency and sustainability across every industry that relies on climate control.',
    desc_fa: 'تبدیل شدن به استاندارد جهانی در مدیریت هوشمند سرمایش، افزایش بهره‌وری و پایداری در تمام صنایع وابسته به کنترل آب و هوا.',
    stat: '15+',
    statLabel: 'Years Experience',
    statLabel_fa: 'سال تجربه',
  },
  {
    icon: Target,
    title: 'Our Mission',
    title_fa: 'رسالت ما',
    desc: 'Empower facility managers with real-time data, predictive analytics, and seamless control — reducing energy waste and operational risk.',
    desc_fa: 'توانمندسازی مدیران تأسیسات با داده‌های لحظه‌ای، تحلیل پیش‌بینانه و کنترل یکپارچه - کاهش اتلاف انرژی و ریسک عملیاتی.',
    stat: '10k+',
    statLabel: 'Units Shipped',
    statLabel_fa: 'دستگاه ارسال شده',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    title_fa: 'تضمین کیفیت',
    desc: 'Every product undergoes rigorous testing under extreme conditions. Our ISO-certified processes ensure reliability in the harshest environments.',
    desc_fa: 'هر محصول تحت آزمایش‌های سختگیرانه در شرایط بحرانی قرار می‌گیرد. فرآیندهای دارای گواهی ISO قابلیت اطمینان را تضمین می‌کند.',
    stat: '99.9%',
    statLabel: 'Quality Score',
    statLabel_fa: 'امتیاز کیفیت',
  },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { language } = useLanguage()

  return (
    <section id="about" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — no badge, just heading for variety */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            {language === 'fa' ? 'چرا' : 'Why'}{' '}
            <span className="text-primary">ArvandSmartControl</span>?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {language === 'fa'
              ? 'ما در خط مقدم فناوری مدیریت سرمایش هستیم و راه‌حل‌های نوآورانه‌ای ارائه می‌دهیم که صنایع را متحول می‌کند.'
              : 'We are at the forefront of cooling management technology, delivering innovative solutions that transform industries.'}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-command p-6 sm:p-8 flex flex-col group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div className="text-right ms-2">
                    <div className="text-lg sm:text-xl font-bold font-mono text-primary">{pillar.stat}</div>
                    <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/40 tracking-widest">
                      {language === 'fa' ? pillar.statLabel_fa : pillar.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground/90">
                  {language === 'fa' ? pillar.title_fa : pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed flex-1">
                  {language === 'fa' ? pillar.desc_fa : pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
