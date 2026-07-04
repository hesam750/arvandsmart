'use client'

import { motion } from 'motion/react'
import {
  Cpu,
  BarChart3,
  Bell,
  Wifi,
  Shield,
  Database,
  Layers,
  Zap,
  Palette,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HoverEffect, type HoverItem } from '@/components/ui/card-hover-effect'

interface FeatureData {
  icon: typeof Cpu
  title: Record<string, string>
  description: Record<string, string>
  metric: string
  metricLabel: string
  color: string
}

const featuresList: FeatureData[] = [
  {
    icon: Cpu,
    title: { en: 'Real-Time Monitoring', fa: 'پایش لحظه‌ای', ar: 'المراقبة اللحظية' },
    description: { en: 'Real-time monitoring of all chillers and cooling equipment from a centralized dashboard', fa: 'پایش لحظه‌ای تمامی چیلرها و تجهیزات سرمایشی از یک داشبورد متمرکز', ar: 'مراقبة لحظية لجميع المبردات ومعدات التبريد من لوحة تحكم مركزية' },
    metric: '250+',
    metricLabel: 'DATA POINTS/SEC',
    color: 'text-chart-3',
  },
  {
    icon: BarChart3,
    title: { en: 'Energy Analytics', fa: 'تحلیل انرژی', ar: 'تحليل الطاقة' },
    description: { en: 'Energy consumption analysis and smart optimization with advanced algorithms', fa: 'تحلیل مصرف انرژی و بهینه‌سازی هوشمند با الگوریتم‌های پیشرفته', ar: 'تحليل استهلاك الطاقة والتحسين الذكي باستخدام خوارزميات متقدمة' },
    metric: '32%',
    metricLabel: 'AVG. SAVINGS',
    color: 'text-primary',
  },
  {
    icon: Bell,
    title: { en: 'Anomaly Detection', fa: 'تشخیص ناهنجاری', ar: 'كشف الشذوذ' },
    description: { en: 'Automatic anomaly detection and smart alerting before failures occur', fa: 'تشخیص خودکار ناهنجاری‌ها و هشداردهی هوشمند قبل از بروز خرابی', ar: 'كشف تلقائي للشذوذ وتنبيه ذكي قبل حدوث الأعطال' },
    metric: '99.7%',
    metricLabel: 'DETECTION RATE',
    color: 'text-chart-4',
  },
  {
    icon: Wifi,
    title: { en: 'IoT Connectivity', fa: 'اتصال IoT', ar: 'اتصال إنترنت الأشياء' },
    description: { en: 'Connect to all equipment via Modbus, BACnet and IoT protocols', fa: 'اتصال به تمامی تجهیزات از طریق پروتکل‌های Modbus، BACnet و IoT', ar: 'اتصل بجميع المعدات عبر بروتوكولات Modbus و BACnet وإنترنت الأشياء' },
    metric: '12+',
    metricLabel: 'PROTOCOLS',
    color: 'text-chart-2',
  },
  {
    icon: Shield,
    title: { en: 'Predictive Maintenance', fa: 'نگهداری پیش‌بینانه', ar: 'الصيانة التنبؤية' },
    description: { en: 'Predictive maintenance scheduling based on historical data analysis', fa: 'برنامه‌ریزی نگهداری پیش‌بینانه بر اساس تحلیل داده‌های تاریخی', ar: 'جدولة الصيانة التنبؤية بناءً على تحليل البيانات التاريخية' },
    metric: '94%',
    metricLabel: 'ACCURACY',
    color: 'text-chart-3',
  },
  {
    icon: Database,
    title: { en: 'Cloud Platform', fa: 'پلتفرم ابری', ar: 'منصة سحابية' },
    description: { en: 'Secure remote access to all data and equipment control from anywhere', fa: 'دسترسی امن از راه دور به تمامی داده‌ها و کنترل تجهیزات از هر مکان', ar: 'وصول آمن عن بعد إلى جميع البيانات والتحكم بالمعدات من أي مكان' },
    metric: '99.99%',
    metricLabel: 'UPTIME SLA',
    color: 'text-chart-2',
  },
  {
    icon: Layers,
    title: { en: 'Carel Expertise', fa: 'تخصص کرل', ar: 'خبرة كرل' },
    description: { en: 'Deep integration with Carel pCO, c.series, and all programmable controllers. Plus multi-brand support for Danfoss, Microtech and more.', fa: 'یکپارچگی عمیق با Carel pCO، c.series و تمامی کنترلرهای قابل برنامه‌ریزی. به همراه پشتیبانی از برندهای Danfoss، Microtech و سایر برندها.', ar: 'تكامل عميق مع Carel pCO و c.series وجميع وحدات التحكم القابلة للبرمجة. بالإضافة إلى دعم متعدد العلامات التجارية لـ Danfoss و Microtech والمزيد.' },
    metric: '50+',
    metricLabel: 'CAREL MODELS',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: { en: 'No Gateway Required', fa: 'بدون نیاز به گیت‌وی', ar: 'بدون حاجة لبوابة' },
    description: { en: 'Direct TCP/IP connection to chiller controllers. No extra hardware, no configuration headaches.', fa: 'اتصال مستقیم TCP/IP به کنترلر چیلر. بدون سخت‌افزار اضافه، بدون دردسر تنظیمات.', ar: 'اتصال مباشر عبر TCP/IP بوحدات تحكم المبردات. بدون أجهزة إضافية، بدون متاعب التكوين.' },
    metric: '0',
    metricLabel: 'GATEWAYS NEEDED',
    color: 'text-chart-3',
  },
  {
    icon: Palette,
    title: { en: 'White-Label Customization', fa: 'شخصی‌سازی برند سفید', ar: 'تخصيص العلامة البيضاء' },
    description: { en: 'Custom branding, custom domain, custom dashboards. The platform adapts to your company identity.', fa: 'برند اختصاصی، دامنه سفارشی، داشبورد شخصی‌سازی شده. پلتفرم با هویت سازمان شما تطبیق می‌یابد.', ar: 'علامة تجارية مخصصة، نطاق مخصص، لوحات تحكم مخصصة. المنصة تتكيف مع هوية شركتك.' },
    metric: '100%',
    metricLabel: 'CUSTOMIZABLE',
    color: 'text-chart-4',
  },
]

export function FeaturesSection() {
  const { t, language } = useLanguage()
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 6, scaleRange: [0.97, 1] })

  const items: HoverItem[] = featuresList.map((f) => ({
    icon: f.icon,
    title: f.title[language] || f.title.en,
    description: f.description[language] || f.description.en,
    metric: f.metric,
    metricLabel: f.metricLabel,
    color: f.color,
  }))

  return (
    <section id="features" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-px h-96 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
      </div>

      {/* Section glow */}
      <motion.div
        style={{ rotateX, scale, y }}
        className="section-glow relative z-10 max-w-7xl mx-auto"
      >
        {/* Marquee keyframes */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee 50s linear infinite;
            width: max-content;
          }
          .marquee-holder:hover .marquee-track {
            animation-play-state: paused;
          }
          .marquee-holder:hover .marquee-logo {
            filter: grayscale(0) !important;
            opacity: 1 !important;
          }
        `}</style>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('features.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('features.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Hover Effect Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HoverEffect items={items} />
        </motion.div>

        {/* Brand logos — animated loop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 sm:mt-16 pt-8 sm:pt-10 border-t border-border/30"
        >
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground/50 tracking-widest uppercase mb-6 sm:mb-8">
            {t('features.marqueeHeading')}
          </p>
          <div className="relative overflow-hidden marquee-holder">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

            <div className="flex marquee-track transition-all duration-500">
              {/* First set */}
              {[
                { src: '/logo/Carel.png', name: 'Carel' },
                { src: '/logo/Danfoss.png', name: 'Danfoss' },
                { src: '/logo/Microtech.png', name: 'Microtech' },
                { src: '/logo/Siemens.jpg', name: 'Siemens' },
                { src: '/logo/LG%20Electronics.jpg', name: 'LG' },
                { src: '/logo/Schneider.png', name: 'Schneider' },
                { src: '/logo/Johnson%20Controls.png', name: 'Johnson Controls' },
                { src: '/logo/Honeywell.jpg', name: 'Honeywell' },
              ].map((brand) => (
                <div key={brand.name} className="flex items-center justify-center h-8 sm:h-10 mx-5 sm:mx-8 grayscale opacity-40 transition-all duration-500 marquee-logo">
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className="h-full w-auto object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { src: '/logo/Carel.png', name: 'Carel' },
                { src: '/logo/Danfoss.png', name: 'Danfoss' },
                { src: '/logo/Microtech.png', name: 'Microtech' },
                { src: '/logo/Siemens.jpg', name: 'Siemens' },
                { src: '/logo/LG%20Electronics.jpg', name: 'LG' },
                { src: '/logo/Schneider.png', name: 'Schneider' },
                { src: '/logo/Johnson%20Controls.png', name: 'Johnson Controls' },
                { src: '/logo/Honeywell.jpg', name: 'Honeywell' },
              ].map((brand) => (
                <div key={`dup-${brand.name}`} className="flex items-center justify-center h-8 sm:h-10 mx-5 sm:mx-8 grayscale opacity-40 transition-all duration-500 marquee-logo">
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className="h-full w-auto object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8 sm:mt-10"
        >
          <Link href="#products">
            <Button variant="outline" className="px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground">
              {t('features.viewAll')}
              <span className="inline-block ms-1.5 sm:ms-2 rtl:rotate-180">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
