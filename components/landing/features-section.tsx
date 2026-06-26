'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Cpu,
  Wifi,
  BarChart3,
  Bell,
  Shield,
  ArrowRight,
  Database,
  Layers,
  Zap,
  Palette,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const featuresList = [
  {
    icon: Cpu,
    title: { en: 'Real-Time Monitoring', fa: 'پایش لحظه‌ای', ar: 'المراقبة اللحظية' },
    desc: { en: 'Real-time monitoring of all chillers and cooling equipment from a centralized dashboard', fa: 'پایش لحظه‌ای تمامی چیلرها و تجهیزات سرمایشی از یک داشبورد متمرکز', ar: 'مراقبة لحظية لجميع المبردات ومعدات التبريد من لوحة تحكم مركزية' },
    metric: '250+',
    metricLabel: 'DATA POINTS/SEC',
    color: 'text-chart-3',
  },
  {
    icon: BarChart3,
    title: { en: 'Energy Analytics', fa: 'تحلیل انرژی', ar: 'تحليل الطاقة' },
    desc: { en: 'Energy consumption analysis and smart optimization with advanced algorithms', fa: 'تحلیل مصرف انرژی و بهینه‌سازی هوشمند با الگوریتم‌های پیشرفته', ar: 'تحليل استهلاك الطاقة والتحسين الذكي باستخدام خوارزميات متقدمة' },
    metric: '32%',
    metricLabel: 'AVG. SAVINGS',
    color: 'text-primary',
  },
  {
    icon: Bell,
    title: { en: 'Anomaly Detection', fa: 'تشخیص ناهنجاری', ar: 'كشف الشذوذ' },
    desc: { en: 'Automatic anomaly detection and smart alerting before failures occur', fa: 'تشخیص خودکار ناهنجاری‌ها و هشداردهی هوشمند قبل از بروز خرابی', ar: 'كشف تلقائي للشذوذ وتنبيه ذكي قبل حدوث الأعطال' },
    metric: '99.7%',
    metricLabel: 'DETECTION RATE',
    color: 'text-chart-4',
  },
  {
    icon: Wifi,
    title: { en: 'IoT Connectivity', fa: 'اتصال IoT', ar: 'اتصال إنترنت الأشياء' },
    desc: { en: 'Connect to all equipment via Modbus, BACnet and IoT protocols', fa: 'اتصال به تمامی تجهیزات از طریق پروتکل‌های Modbus، BACnet و IoT', ar: 'اتصل بجميع المعدات عبر بروتوكولات Modbus و BACnet وإنترنت الأشياء' },
    metric: '12+',
    metricLabel: 'PROTOCOLS',
    color: 'text-chart-2',
  },
  {
    icon: Shield,
    title: { en: 'Predictive Maintenance', fa: 'نگهداری پیش‌بینانه', ar: 'الصيانة التنبؤية' },
    desc: { en: 'Predictive maintenance scheduling based on historical data analysis', fa: 'برنامه‌ریزی نگهداری پیش‌بینانه بر اساس تحلیل داده‌های تاریخی', ar: 'جدولة الصيانة التنبؤية بناءً على تحليل البيانات التاريخية' },
    metric: '94%',
    metricLabel: 'ACCURACY',
    color: 'text-chart-3',
  },
  {
    icon: Database,
    title: { en: 'Cloud Platform', fa: 'پلتفرم ابری', ar: 'منصة سحابية' },
    desc: { en: 'Secure remote access to all data and equipment control from anywhere', fa: 'دسترسی امن از راه دور به تمامی داده‌ها و کنترل تجهیزات از هر مکان', ar: 'وصول آمن عن بعد إلى جميع البيانات والتحكم بالمعدات من أي مكان' },
    metric: '99.99%',
    metricLabel: 'UPTIME SLA',
    color: 'text-chart-2',
  },
  {
    icon: Layers,
    title: { en: 'Multi-Brand Support', fa: 'پشتیبانی از برندهای مختلف', ar: 'دعم متعدد العلامات' },
    desc: { en: 'Connect Carel, Danfoss, Microtech and more — all from a single dashboard. Not locked to one brand.', fa: 'اتصال چیلرهای Carel، Danfoss، Microtech و سایر برندها — همه از یک داشبورد. محدود به یک برند نیستید.', ar: 'قم بتوصيل Carel وDanfoss وMicrotech والمزيد — كل ذلك من لوحة تحكم واحدة. لست مقيداً بعلامة تجارية واحدة.' },
    metric: '5+',
    metricLabel: 'BRANDS SUPPORTED',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: { en: 'No Gateway Required', fa: 'بدون نیاز به گیت‌وی', ar: 'بدون حاجة لبوابة' },
    desc: { en: 'Direct TCP/IP connection to chiller controllers. No extra hardware, no configuration headaches.', fa: 'اتصال مستقیم TCP/IP به کنترلر چیلر. بدون سخت‌افزار اضافه، بدون دردسر تنظیمات.', ar: 'اتصال مباشر عبر TCP/IP بوحدات تحكم المبردات. بدون أجهزة إضافية، بدون متاعب التكوين.' },
    metric: '0',
    metricLabel: 'GATEWAYS NEEDED',
    color: 'text-chart-3',
  },
  {
    icon: Palette,
    title: { en: 'White-Label Customization', fa: 'شخصی‌سازی برند سفید', ar: 'تخصيص العلامة البيضاء' },
    desc: { en: 'Custom branding, custom domain, custom dashboards. The platform adapts to your company identity.', fa: 'برند اختصاصی، دامنه سفارشی، داشبورد شخصی‌سازی شده. پلتفرم با هویت سازمان شما تطبیق می‌یابد.', ar: 'علامة تجارية مخصصة، نطاق مخصص، لوحات تحكم مخصصة. المنصة تتكيف مع هوية شركتك.' },
    metric: '100%',
    metricLabel: 'CUSTOMIZABLE',
    color: 'text-chart-4',
  },
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()

  return (
    <section id="features" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-px h-96 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
      </div>

      {/* Section glow */}
      <div className="section-glow relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('features.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('features.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('features.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featuresList.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group card-command p-5 sm:p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default"
              >
                {/* Metric badge */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors border border-primary/10">
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  </div>
                  <div className="text-end ms-2">
                    <div className={`text-base sm:text-lg font-bold font-mono ${feature.color}`}>{feature.metric}</div>
                    <div className="text-[7px] sm:text-[8px] data-text text-muted-foreground/40 tracking-widest">{feature.metricLabel}</div>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 text-foreground/90 group-hover:text-foreground transition-colors">{feature.title[language] || feature.title.en}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed">
                  {feature.desc[language] || feature.desc.en}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link href="#products">
            <Button variant="outline" className="px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground">
              {t('features.viewAll')}
              <ArrowRight className="w-4 h-4 ms-1.5 sm:ms-2 rtl:rotate-180" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
