'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle,
  Gauge,
  Thermometer,
  Zap,
} from 'lucide-react'

const caseStudy = {
  company: {
    en: 'Fanap Tech Factory',
    fa: 'کارخانه فناپ‌تک',
    ar: 'مصنع فناپ‌تك',
  },

  location: {
    en: 'Iran',
    fa: 'ایران',
    ar: 'إيران',
  },

  equipment: {
    en: '10 Rooftop Package Units',
    fa: '۱۰ پکیج سرمایشی روفتاپ',
    ar: '١٠ وحدات تبريد روفتوب',
  },

  challenge: {
    en: 'Managing multiple rooftop package units across an industrial facility requires continuous visibility into temperature, operating conditions, alarms and energy consumption. Without centralized monitoring, identifying abnormal equipment behavior and responding to issues can become dependent on manual inspections.',

    fa: 'مدیریت چندین پکیج سرمایشی روفتاپ در یک مجموعه صنعتی، نیازمند دید مداوم نسبت به دما، شرایط عملکرد، هشدارها و مصرف انرژی است. بدون پایش متمرکز، شناسایی رفتار غیرعادی تجهیزات و واکنش به مشکلات می‌تواند وابسته به بازدیدهای دستی باشد.',

    ar: 'تتطلب إدارة وحدات تبريد روفتوب متعددة في منشأة صناعية رؤية مستمرة لدرجات الحرارة وظروف التشغيل والإنذارات واستهلاك الطاقة. وبدون المراقبة المركزية، قد يعتمد اكتشاف السلوك غير الطبيعي للمعدات والاستجابة للمشكلات على عمليات الفحص اليدوي.',
  },

  solution: {
    en: 'ArvandSmartControl provides centralized monitoring and control for all 10 rooftop package units. Operating parameters, temperatures, equipment status, alarms and energy-related data can be monitored from a unified interface, providing facility teams with real-time visibility into the cooling system.',

    fa: 'ArvandSmartControl امکان پایش و کنترل متمرکز هر ۱۰ پکیج سرمایشی روفتاپ را فراهم می‌کند. پارامترهای عملکرد، دما، وضعیت تجهیزات، هشدارها و داده‌های مرتبط با مصرف انرژی از طریق یک رابط یکپارچه قابل مشاهده هستند و تیم فنی دید لحظه‌ای نسبت به سیستم سرمایش خواهد داشت.',

    ar: 'يوفر ArvandSmartControl مراقبة وتحكماً مركزياً لجميع وحدات التبريد الروفتوب العشر. ويمكن مراقبة معايير التشغيل ودرجات الحرارة وحالة المعدات والإنذارات والبيانات المتعلقة بالطاقة من خلال واجهة موحدة، مما يمنح فرق التشغيل رؤية فورية لنظام التبريد.',
  },

  results: [
    {
      icon: Building2,
      label: {
        en: 'Rooftop Units',
        fa: 'پکیج سرمایشی روفتاپ',
        ar: 'وحدات روفتوب',
      },
      value: '10',
    },
    {
      icon: Activity,
      label: {
        en: 'Centralized Monitoring',
        fa: 'پایش متمرکز',
        ar: 'مراقبة مركزية',
      },
      value: '24/7',
    },
    {
      icon: Thermometer,
      label: {
        en: 'Temperature Monitoring',
        fa: 'پایش دما',
        ar: 'مراقبة الحرارة',
      },
      value: 'Real-Time',
    },
    {
      icon: Zap,
      label: {
        en: 'Energy Monitoring',
        fa: 'پایش انرژی',
        ar: 'مراقبة الطاقة',
      },
      value: 'Active',
    },
  ],
}

export function CaseStudiesSection() {
  const { language } = useLanguage()

  const {
    ref: scrollRef,
    rotateX,
    scale,
    y,
  } = useScroll3D({
    rotateRange: 6,
    scaleRange: [0.97, 1],
  })

  const dir = language === 'fa' || language === 'ar' ? 'rtl' : 'ltr'

  const getText = (
    value: {
      en: string
      fa: string
      ar: string
    }
  ) => value[language] || value.en

  return (
    <section
      id="case-studies"
      className="relative section-py px-4 overflow-hidden"
      ref={scrollRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div
        style={{ rotateX, scale, y }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
          style={{ direction: dir }}
        >
          {/* Label */}
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />

            <span className="text-[10px] sm:text-xs font-mono tracking-[0.15em] text-primary uppercase">
              {language === 'fa'
                ? 'مطالعه موردی'
                : language === 'ar'
                  ? 'دراسة حالة'
                  : 'CASE STUDY'}
            </span>
          </div> */}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.2]">
            <span className="text-foreground">
              {language === 'fa'
                ? 'کارخانه'
                : language === 'ar'
                  ? 'مصنع'
                  : 'Fanap Tech'}
            </span>{' '}

            <span className="text-primary">
              {language === 'fa'
                ? 'فناپ‌تک'
                : language === 'ar'
                  ? 'فناپ‌تك'
                  : 'Cooling System'}
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
            {language === 'fa'
              ? 'پایش و مدیریت متمرکز ۱۰ پکیج سرمایشی روفتاپ با ArvandSmartControl'
              : language === 'ar'
                ? 'مراقبة وإدارة مركزية لـ ١٠ وحدات تبريد روفتوب باستخدام ArvandSmartControl'
                : 'Centralized monitoring and management of 10 rooftop package units with ArvandSmartControl'}
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] p-5 sm:p-7 mb-5"
          style={{ direction: dir }}
        >
          {/* Glow */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">

            {/* Company */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>

              <div>
                <div className="text-xs text-muted-foreground/50 mb-1">
                  {language === 'fa'
                    ? 'مجموعه'
                    : language === 'ar'
                      ? 'المنشأة'
                      : 'FACILITY'}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  {getText(caseStudy.company)}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground/60 mt-1">
                  {getText(caseStudy.location)}
                </p>
              </div>
            </div>

            {/* Equipment */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/30 bg-card/40">
              <Gauge className="w-5 h-5 text-primary" />

              <div>
                <div className="text-[10px] text-muted-foreground/50">
                  {language === 'fa'
                    ? 'تجهیزات تحت پایش'
                    : language === 'ar'
                      ? 'المعدات الخاضعة للمراقبة'
                      : 'MONITORED EQUIPMENT'}
                </div>

                <div className="text-sm font-semibold text-foreground/90">
                  {getText(caseStudy.equipment)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenge / Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-5 mb-5"
          style={{ direction: dir }}
        >
          {/* Challenge */}
          <div className="card-command p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 border border-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive/80" />
              </div>

              <h3 className="text-sm sm:text-base font-bold">
                {language === 'fa'
                  ? 'چالش'
                  : language === 'ar'
                    ? 'التحدي'
                    : 'The Challenge'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-7">
              {getText(caseStudy.challenge)}
            </p>
          </div>

          {/* Solution */}
          <div className="card-command p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>

              <h3 className="text-sm sm:text-base font-bold">
                {language === 'fa'
                  ? 'راه‌حل'
                  : language === 'ar'
                    ? 'الحل'
                    : 'The Solution'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-7">
              {getText(caseStudy.solution)}
            </p>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {caseStudy.results.map((result, i) => {
            const Icon = result.icon

            return (
              <motion.div
                key={result.label.en}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  margin: '-100px',
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + i * 0.08,
                }}
                className="card-command p-4 sm:p-6 text-center flex flex-col items-center justify-center"
                style={{ direction: dir }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2" />

                <div className="text-lg sm:text-2xl font-bold font-mono text-primary">
                  {result.value}
                </div>

                <div className="text-[9px] sm:text-[10px] text-muted-foreground/50 mt-1 text-center leading-tight">
                  {getText(result.label)}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.5,
            delay: 0.7,
          }}
          className="flex flex-wrap justify-center gap-2 mt-7 sm:mt-9"
          style={{ direction: 'ltr' }}
        >
          {[
            'Rooftop Package',
            'HVAC Monitoring',
            'Energy Monitoring',
            'Equipment Health',
            'Real-Time Data',
          ].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-secondary/50 border border-border/20 text-[9px] sm:text-[10px] font-mono text-muted-foreground/50"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}