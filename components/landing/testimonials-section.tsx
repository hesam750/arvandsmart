'use client'

import { motion } from 'motion/react'
import {
  Building2,
  Wrench,
  Settings2,
  MonitorCog,
  CheckCircle2,
} from 'lucide-react'

import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'

const team = [
  {
    name: 'حمیدرضا سعدی',
    role: {
      fa: 'مدیر کارخانه',
      en: 'Factory Manager',
      ar: 'مدير المصنع',
    },
    icon: Building2,
    color: 'blue',
    description: {
      fa: 'دید مدیریتی نسبت به وضعیت کلی سیستم سرمایش، عملکرد تجهیزات و دسترسی سریع به اطلاعات مورد نیاز برای تصمیم‌گیری.',
      en: 'A management-level view of the overall cooling system, equipment performance, and quick access to operational information for decision-making.',
      ar: 'رؤية إدارية شاملة لنظام التبريد وأداء المعدات والوصول السريع إلى المعلومات التشغيلية اللازمة لاتخاذ القرار.',
    },
    focus: {
      fa: ['وضعیت کلی سیستم سرمایش', 'دسترسی به اطلاعات', 'تصمیم‌گیری سریع'],
      en: ['Cooling system overview', 'Data visibility', 'Faster decisions'],
      ar: ['نظرة عامة على التبريد', 'وضوح البيانات', 'قرارات أسرع'],
    },
  },

  {
    name: 'حسین کارجو',
    role: {
      fa: 'سرپرست تأمین و نگهداری',
      en: 'Maintenance & Procurement Supervisor',
      ar: 'مشرف التوريد والصيانة',
    },
    icon: Wrench,
    color: 'violet',
    description: {
      fa: 'تمرکز بر وضعیت تجهیزات، پیگیری فرآیند نگهداری و ایجاد دید بهتر نسبت به نیازهای سرویس و تعمیرات.',
      en: 'Focused on equipment condition, maintenance workflows, and improving visibility into service and repair requirements.',
      ar: 'التركيز على حالة المعدات وسير عمليات الصيانة وتحسين الرؤية حول متطلبات الخدمة والإصلاح.',
    },
    focus: {
      fa: ['پیگیری تجهیزات', 'مدیریت نگهداری', 'سرویس و تعمیرات'],
      en: ['Equipment tracking', 'Maintenance management', 'Service & repair'],
      ar: ['متابعة المعدات', 'إدارة الصيانة', 'الخدمة والإصلاح'],
    },
  },

  {
    name: 'سیدطاهر محمدی اصل',
    role: {
      fa: 'مدیر تأسیسات',
      en: 'Facility Manager',
      ar: 'مدير المرافق',
    },
    icon: Settings2,
    color: 'emerald',
    description: {
      fa: 'پایش پارامترهای عملکردی، دما، وضعیت تجهیزات و هشدارها برای کنترل بهتر سیستم سرمایش کارخانه.',
      en: 'Monitoring operating parameters, temperatures, equipment status, and alarms for better control of the factory cooling system.',
      ar: 'مراقبة معايير التشغيل ودرجات الحرارة وحالة المعدات والإنذارات لتحسين التحكم في نظام تبريد المصنع.',
    },
    focus: {
      fa: ['پایش لحظه‌ای', 'پارامترهای عملکرد', 'هشدارها'],
      en: ['Real-time monitoring', 'Operating parameters', 'Alarms'],
      ar: ['المراقبة الفورية', 'معايير التشغيل', 'الإنذارات'],
    },
  },

  {
    name: 'محمد بیننده',
    role: {
      fa: 'اپراتور و متخصص سیستم‌های سرمایشی',
      en: 'Cooling Systems Operator & Specialist',
      ar: 'مشغل ومتخصص أنظمة التبريد',
    },
    icon: MonitorCog,
    color: 'amber',
    description: {
      fa: 'دسترسی مستقیم به اطلاعات عملکرد پکیج‌های سرمایشی و امکان بررسی سریع شرایط کاری و وضعیت هر دستگاه.',
      en: 'Direct access to rooftop package operating data, making it easier to monitor working conditions and the status of each unit.',
      ar: 'الوصول المباشر إلى بيانات تشغيل وحدات الروفتوب، مما يسهل متابعة ظروف العمل وحالة كل وحدة.',
    },
    focus: {
      fa: ['وضعیت هر دستگاه', 'شرایط کاری', 'پایش تجهیزات'],
      en: ['Unit status', 'Operating conditions', 'Equipment monitoring'],
      ar: ['حالة الوحدة', 'ظروف التشغيل', 'مراقبة المعدات'],
    },
  },
]

const colorClasses = {
  blue: {
    icon: 'bg-primary/10 border-primary/20 text-primary',
    badge: 'bg-primary/5 border-primary/10 text-primary',
  },
  violet: {
    icon: 'bg-chart-2/10 border-chart-2/20 text-chart-2',
    badge: 'bg-chart-2/5 border-chart-2/10 text-chart-2',
  },
  emerald: {
    icon: 'bg-chart-3/10 border-chart-3/20 text-chart-3',
    badge: 'bg-chart-3/5 border-chart-3/10 text-chart-3',
  },
  amber: {
    icon: 'bg-chart-4/10 border-chart-4/20 text-chart-4',
    badge: 'bg-chart-4/5 border-chart-4/10 text-chart-4',
  },
}

export function TestimonialsSection() {
  const { language } = useLanguage()

  const {
    ref: scrollRef,
    rotateX,
    scale,
    y,
  } = useScroll3D({
    rotateRange: 5,
    scaleRange: [0.97, 1],
  })

  const dir = language === 'fa' || language === 'ar' ? 'rtl' : 'ltr'

  const getText = (
    value: {
      fa: string
      en: string
      ar: string
    }
  ) => value[language] || value.en

  const sectionTitle = {
    fa: 'تیم فناپ‌تک',
    en: 'Fanap Tech',
    ar: 'فريق فناپ‌تك',
  }

  const sectionHighlight = {
    fa: 'و سیستم سرمایش',
    en: 'Cooling Team',
    ar: 'وفريق التبريد',
  }

  const sectionSubtitle = {
    fa: 'چهار نقش کلیدی؛ از مدیریت کارخانه تا اپراتوری سیستم‌های سرمایشی',
    en: 'Four key roles — from factory management to cooling system operation',
    ar: 'أربعة أدوار رئيسية — من إدارة المصنع إلى تشغيل أنظمة التبريد',
  }

  return (
    <section
      className="relative section-py px-4 overflow-hidden"
      ref={scrollRef}
      id="fanap-team"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-background pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/3 blur-[120px] pointer-events-none" />

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
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
          style={{ direction: dir }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />

            <span className="text-[10px] sm:text-xs font-mono tracking-wider text-primary uppercase">
              {language === 'fa'
                ? 'Fanap Tech • Project Team'
                : language === 'ar'
                  ? 'Fanap Tech • فريق المشروع'
                  : 'Fanap Tech • Project Team'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.2]">
            <span className="text-foreground">
              {getText(sectionTitle)}
            </span>{' '}
            <span className="text-primary block sm:inline">
              {getText(sectionHighlight)}
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
            {getText(sectionSubtitle)}
          </p>
        </motion.div>

        {/* Project Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/3 p-5 sm:p-6 mb-5"
          style={{ direction: dir }}
        >
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>

              <div>
                <div className="text-xs text-muted-foreground/50 mb-1">
                  {language === 'fa'
                    ? 'پروژه پایش و کنترل سرمایش'
                    : language === 'ar'
                      ? 'مشروع مراقبة وتحكم بالتبريد'
                      : 'Cooling Monitoring & Control Project'}
                </div>

                <div className="font-bold text-foreground/90">
                  {language === 'fa'
                    ? 'کارخانه فناپ‌تک'
                    : language === 'ar'
                      ? 'مصنع فناپ‌تك'
                      : 'Fanap Tech Factory'}
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10"
              style={{ direction: 'ltr' }}
            >
              <CheckCircle2 className="w-4 h-4 text-primary" />

              <span className="text-xs font-mono text-primary">
                10 Rooftop Package Units
              </span>
            </div>
          </div>
        </motion.div>

        {/* Team Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, index) => {
            const Icon = member.icon
            const colors =
              colorClasses[member.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="group card-command p-5 sm:p-6 flex flex-col hover:-translate-y-1 transition-all"
                style={{ direction: dir }}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${colors.icon}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-foreground/90 mb-1">
                  {member.name}
                </h3>

                {/* Role */}
                <div className="text-xs sm:text-sm text-primary font-medium mb-4">
                  {getText(member.role)}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed mb-5 flex-1">
                  {getText(member.description)}
                </p>

                {/* Focus */}
                <div className="pt-4 border-t border-border/30">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/40 mb-2">
                    {language === 'fa'
                      ? 'Focus'
                      : language === 'ar'
                        ? 'التركيز'
                        : 'Focus'}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {member.focus[language].map((item) => (
                      <span
                        key={item}
                        className={`px-2 py-1 rounded-md border text-[9px] sm:text-[10px] ${colors.badge}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.5,
            delay: 0.7,
          }}
          className="text-center mt-8 sm:mt-10"
          style={{ direction: dir }}
        >
          <p className="text-xs sm:text-sm text-muted-foreground/40">
            {language === 'fa'
              ? 'ArvandSmartControl • پایش، کنترل و تحلیل سیستم سرمایش کارخانه'
              : language === 'ar'
                ? 'ArvandSmartControl • مراقبة وتحكم وتحليل نظام تبريد المصنع'
                : 'ArvandSmartControl • Factory cooling monitoring, control & analytics'}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}