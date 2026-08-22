'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import {
  Cpu,
  Network,
  Activity,
  Gauge,
  Thermometer,
  ShieldCheck,
  Zap,
  Server,
} from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: {
      en: 'CAREL pCO Controllers',
      fa: 'کنترلرهای CAREL pCO',
      ar: 'وحدات تحكم CAREL pCO',
    },
    desc: {
      en: 'Direct integration with CAREL pCO controller families for real-time monitoring and control.',
      fa: 'یکپارچه‌سازی مستقیم با خانواده کنترلرهای CAREL pCO برای پایش و کنترل لحظه‌ای.',
      ar: 'تكامل مباشر مع عائلات وحدات تحكم CAREL pCO للمراقبة والتحكم الفوري.',
    },
  },
  {
    icon: Network,
    title: {
      en: 'Modbus & BACnet',
      fa: 'Modbus و BACnet',
      ar: 'Modbus و BACnet',
    },
    desc: {
      en: 'Reliable communication through industrial protocols used across HVAC control systems.',
      fa: 'ارتباط پایدار از طریق پروتکل‌های صنعتی مورد استفاده در سیستم‌های کنترل HVAC.',
      ar: 'اتصال موثوق عبر البروتوكولات الصناعية المستخدمة في أنظمة التحكم HVAC.',
    },
  },
  {
    icon: Activity,
    title: {
      en: 'Real-Time Monitoring',
      fa: 'پایش لحظه‌ای',
      ar: 'المراقبة الفورية',
    },
    desc: {
      en: 'Monitor operating parameters, alarms, temperatures and system status in real time.',
      fa: 'پایش لحظه‌ای پارامترهای عملکرد، آلارم‌ها، دما و وضعیت سیستم.',
      ar: 'مراقبة معايير التشغيل والإنذارات ودرجات الحرارة وحالة النظام في الوقت الفعلي.',
    },
  },
  {
    icon: Gauge,
    title: {
      en: 'Energy Monitoring',
      fa: 'پایش مصرف انرژی',
      ar: 'مراقبة استهلاك الطاقة',
    },
    desc: {
      en: 'Track energy consumption and identify opportunities for improving system efficiency.',
      fa: 'اندازه‌گیری و تحلیل مصرف انرژی برای شناسایی فرصت‌های افزایش بهره‌وری سیستم.',
      ar: 'تتبع استهلاك الطاقة وتحديد فرص تحسين كفاءة النظام.',
    },
  },
  {
    icon: Thermometer,
    title: {
      en: 'Equipment Health',
      fa: 'سلامت تجهیزات',
      ar: 'سلامة المعدات',
    },
    desc: {
      en: 'Continuous visibility into equipment conditions to help detect abnormal operation early.',
      fa: 'پایش مستمر وضعیت تجهیزات برای شناسایی زودهنگام عملکرد غیرعادی.',
      ar: 'رؤية مستمرة لحالة المعدات للمساعدة في اكتشاف التشغيل غير الطبيعي مبكرًا.',
    },
  },
  {
    icon: ShieldCheck,
    title: {
      en: 'Secure Access',
      fa: 'دسترسی امن',
      ar: 'الوصول الآمن',
    },
    desc: {
      en: 'Role-based access allows different users to monitor and control systems securely.',
      fa: 'دسترسی مبتنی بر نقش به کاربران مختلف اجازه پایش و کنترل ایمن سیستم را می‌دهد.',
      ar: 'يتيح الوصول المستند إلى الأدوار للمستخدمين مراقبة الأنظمة والتحكم بها بأمان.',
    },
  },
]

export function BrandShowcaseSection() {
  const { t, language } = useLanguage()

  const {
    ref: scrollRef,
    rotateX,
    scale,
    y,
  } = useScroll3D({
    rotateRange: 5,
    scaleRange: [0.97, 1],
  })

  const dir = language === 'ar' || language === 'fa' ? 'rtl' : 'ltr'

  return (
    <section
      id="carel"
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
          {/* CAREL Label */}
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />

            <span className="text-[10px] sm:text-xs font-mono tracking-[0.15em] text-primary uppercase">
              CAREL Integration
            </span>
          </div> */}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.2]">
            <span className="text-foreground">
              {t('brands.title.part1')}
            </span>{' '}
            <span className="text-primary">
              {t('brands.title.part2')}
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
            {t('brands.subtitle')}
          </p>
        </motion.div>

        {/* Main CAREL Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] p-5 sm:p-8 mb-5"
          style={{ direction: dir }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            {/* Icon */}
            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  CAREL
                </h3>

                <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] sm:text-[10px] font-mono text-primary tracking-wider">
                  pCO
                </span>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-3xl">
                {language === 'fa'
                  ? 'اتصال و یکپارچه‌سازی با کنترلرهای CAREL برای پایش، کنترل، تحلیل مصرف انرژی و بررسی سلامت تجهیزات HVAC.'
                  : language === 'ar'
                    ? 'تكامل مع وحدات تحكم CAREL للمراقبة والتحكم وتحليل استهلاك الطاقة ومتابعة حالة معدات HVAC.'
                    : 'Integration with CAREL controllers for monitoring, control, energy analysis and HVAC equipment health.'}
              </p>
            </div>

            {/* Protocols */}
            <div className="flex flex-wrap gap-2 shrink-0" style={{ direction: 'ltr' }}>
              {['Modbus', 'BACnet'].map((protocol) => (
                <span
                  key={protocol}
                  className="px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-xs font-mono text-primary"
                >
                  {protocol}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.4,
                  delay: 0.06 * i,
                }}
                className="group card-command p-4 sm:p-5 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
                style={{ direction: dir }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground/90 mb-2">
                  {feature.title[language] || feature.title.en}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed">
                  {feature.desc[language] || feature.desc.en}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-7 sm:mt-9 text-center"
          style={{ direction: dir }}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground/50">
            <Server className="w-4 h-4" />
            <span>{t('brands.note')}</span>
          </div>

          <span className="hidden sm:block text-muted-foreground/20">
            •
          </span>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground/50">
            <Zap className="w-4 h-4" />
            <span>Industrial HVAC Integration</span>
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  )
}