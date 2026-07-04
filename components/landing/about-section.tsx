'use client'

import { motion } from 'motion/react'
import { Eye, Target, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'

const pillars = [
  {
    icon: Eye,
    title: { en: 'Our Vision', fa: 'چشم‌انداز ما', ar: 'رؤيتنا' },
    desc: { en: 'To be the global standard in intelligent cooling management, driving efficiency and sustainability across every industry that relies on climate control.', fa: 'تبدیل شدن به استاندارد جهانی در مدیریت هوشمند سرمایش، افزایش بهره‌وری و پایداری در تمام صنایع وابسته به کنترل آب و هوا.', ar: 'أن نكون المعيار العالمي في الإدارة الذكية للتبريد، دافعين للكفاءة والاستدامة عبر كل صناعة تعتمد على التحكم في المناخ.' },
    stat: '15+',
    statLabel: { en: 'Years Experience', fa: 'سال تجربه', ar: 'سنوات خبرة' },
  },
  {
    icon: Target,
    title: { en: 'Our Mission', fa: 'رسالت ما', ar: 'رسالتنا' },
    desc: { en: 'Empower facility managers with real-time data, predictive analytics, and seamless control — reducing energy waste and operational risk.', fa: 'توانمندسازی مدیران تأسیسات با داده‌های لحظه‌ای، تحلیل پیش‌بینانه و کنترل یکپارچه - کاهش اتلاف انرژی و ریسک عملیاتی.', ar: 'تمكين مدراء المرافق ببيانات لحظية وتحليلات تنبؤية وتحكم سلس — تقليل هدر الطاقة والمخاطر التشغيلية.' },
    stat: '10k+',
    statLabel: { en: 'Units Shipped', fa: 'دستگاه ارسال شده', ar: 'وحدة تم شحنها' },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Quality Assurance', fa: 'تضمین کیفیت', ar: 'ضمان الجودة' },
    desc: { en: 'Every product undergoes rigorous testing under extreme conditions. Our ISO-certified processes ensure reliability in the harshest environments.', fa: 'هر محصول تحت آزمایش‌های سختگیرانه در شرایط بحرانی قرار می‌گیرد. فرآیندهای دارای گواهی ISO قابلیت اطمینان را تضمین می‌کند.', ar: 'كل منتج يخضع لاختبارات صارمة في ظروف قاسية. عملياتنا المعتمدة من ISO تضمن الاعتمادية في أقسى البيئات.' },
    stat: '99.9%',
    statLabel: { en: 'Quality Score', fa: 'امتیاز کیفیت', ar: 'درجة الجودة' },
  },
]

export function AboutSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 6, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()

  return (
    <section id="about" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div style={{ rotateX, scale, y }} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — no badge, just heading for variety */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('why.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('why.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('about.subtitle.simple')}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-command p-6 sm:p-8 flex flex-col group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div className="text-end ms-2">
                    <div className="text-lg sm:text-xl font-bold font-mono text-primary">{pillar.stat}</div>
                    <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/40 tracking-widest">
                      {pillar.statLabel[language] || pillar.statLabel.en}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground/90">
                  {pillar.title[language] || pillar.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed flex-1">
                  {pillar.desc[language] || pillar.desc.en}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
