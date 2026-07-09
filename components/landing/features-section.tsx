'use client'

import { motion } from 'motion/react'
import {
  HeartPulse,
  AlertTriangle,
  BarChart3,
  Thermometer,
  Zap,
  Wrench,
  Layers,
  Building2,
  Webhook,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HoverEffect, type HoverItem } from '@/components/ui/card-hover-effect'

interface FeatureData {
  icon: typeof HeartPulse
  title: Record<string, string>
  description: Record<string, string>
  metric: string
  metricLabel: string
  color: string
}

const featuresList: FeatureData[] = [
  {
    icon: HeartPulse,
    title: { en: 'Health Score System', fa: 'سیستم امتیاز سلامت', ar: 'نظام درجة الصحة' },
    description: { en: 'Proprietary 0–100 health score computed from four weighted sub-scores: compressor (35%), fan (20%), refrigerant (30%), and base status (15%). Know your chiller\'s true condition at a glance.', fa: 'امتیاز سلامت اختصاصی ۰–۱۰۰ از چهار زیرامتیاز وزنی: کمپرسور (۳۵٪)، فن (۲۰٪)، مبرد (۳۰٪) و وضعیت پایه (۱۵٪). وضعیت واقعی چیلر خود را در یک نگاه بدانید.', ar: 'درجة صحة ملكية ٠–١٠٠ تحسب من أربع درجات فرعية مرجحة: الضاغط (٣٥٪)، المروحة (٢٠٪)، المبرد (٣٠٪)، والحالة الأساسية (١٥٪). اعرف حالة مبردك الحقيقية بنظرة واحدة.' },
    metric: '0–100',
    metricLabel: 'HEALTH SCORE',
    color: 'text-chart-3',
  },
  {
    icon: AlertTriangle,
    title: { en: 'Z-Score Anomaly Detection', fa: 'تشخیص ناهنجاری Z-Score', ar: 'كشف الشذوذ بـ Z-Score' },
    description: { en: 'Real-time anomaly detection using Z-score analysis (>2.5 threshold) across supply/return temperature, power, and current. Plus hard-threshold monitoring for motor, IGBT, and discharge temperatures.', fa: 'تشخیص ناهنجاری لحظه‌ای با تحلیل Z-Score (آستانه >۲.۵) روی دمای رفت/برگشت، توان و جریان. به همراه پایش آستانه سخت برای دمای موتور، IGBT و تخلیه.', ar: 'كشف الشذوذ في الوقت الفعلي باستخدام تحليل Z-Score (عتبة >٢.٥) عبر درجة حرارة الإمداد/العودة والطاقة والتيار. بالإضافة إلى مراقبة العتبة الصلبة لدرجات حرارة المحرك وIGBT والتفريغ.' },
    metric: '>2.5σ',
    metricLabel: 'Z-SCORE THRESHOLD',
    color: 'text-chart-4',
  },
  {
    icon: BarChart3,
    title: { en: 'Energy & Tariff Analytics', fa: 'تحلیل انرژی و تعرفه', ar: 'تحليل الطاقة والتعرفة' },
    description: { en: 'Energy breakdown per chiller with tariff-based cost calculation supporting three tariff tiers. Monthly kWh aggregation and cost reporting — accurate enough for IRR-based billing.', fa: 'تفکیک انرژی به تفکیک چیلر با محاسبه هزینه مبتنی بر تعرفه با پشتیبانی از سه سطح تعرفه. تجمیع kWh ماهانه و گزارش هزینه — به اندازه کافی دقیق برای صورتحساب IRR.', ar: 'تفصيل الطاقة لكل مبرد مع حساب التكلفة القائم على التعرفة بدعم ثلاث مستويات تعرفة. تجميع kWh الشهري وتقارير التكلفة — دقة كافية للفوترة بالريال.' },
    metric: '3',
    metricLabel: 'TARIFF TIERS',
    color: 'text-primary',
  },
  {
    icon: Thermometer,
    title: { en: 'Real-Time Setpoint Control', fa: 'کنترل Setpoint لحظه‌ای', ar: 'التحكم اللحظي بنقطة الضبط' },
    description: { en: 'Remotely adjust temperature setpoints with ±0.1°C precision. Power chillers on/off, switch seasons (summer/winter), and change fan modes — all from the dashboard, all in real time.', fa: 'تنظیم از راه دور Setpoint دما با دقت ±۰.۱°C. روشن/خاموش کردن چیلرها، تغییر فصل (تابستان/زمستان) و تغییر حالت فن — همه از داشبورد، همه به صورت لحظه‌ای.', ar: 'ضبط نقاط الضبط عن بعد بدقة ±٠.١°م. تشغيل/إيقاف المبردات، تبديل الفصول (صيف/شتاء)، وتغيير أوضاع المروحة — كل ذلك من لوحة التحكم، في الوقت الفعلي.' },
    metric: '±0.1°C',
    metricLabel: 'SETPOINT PRECISION',
    color: 'text-chart-2',
  },
  {
    icon: Zap,
    title: { en: 'Direct TCP/IP Connection', fa: 'اتصال مستقیم TCP/IP', ar: 'اتصال مباشر TCP/IP' },
    description: { en: 'Connect directly to chiller controllers over standard Ethernet — no gateway, no extra hardware, no middleware. Our HTTP-based PLC reader communicates with Carel pCO, Danfoss MCX, and Microtech controllers natively.', fa: 'اتصال مستقیم به کنترلرهای چیلر از طریق Ethernet استاندارد — بدون گیت‌وی، بدون سخت‌افزار اضافه، بدون میان‌افزار. خواننده PLC مبتنی بر HTTP ما به طور بومی با کنترلرهای Carel pCO، Danfoss MCX و Microtech ارتباط برقرار می‌کند.', ar: 'اتصال مباشر بوحدات تحكم المبردات عبر Ethernet قياسي — بدون بوابة، بدون أجهزة إضافية، بدون برمجيات وسيطة. قارئ PLC المعتمد على HTTP يتواصل أصلاً مع وحدات تحكم Carel pCO و Danfoss MCX و Microtech.' },
    metric: '0',
    metricLabel: 'GATEWAYS NEEDED',
    color: 'text-chart-3',
  },
  {
    icon: Wrench,
    title: { en: 'Predictive Maintenance & Work Orders', fa: 'نگهداری پیش‌بینانه و دستور کار', ar: 'الصيانة التنبؤية وأوامر العمل' },
    description: { en: '15 preventive maintenance templates across compressor, fan, refrigerant, and electrical systems. Auto-generate and track work orders. Catch failures before they happen.', fa: '۱۵ الگوی نگهداری پیش‌گیرانه برای سیستم‌های کمپرسور، فن، مبرد و الکتریکال. تولید و پیگیری خودکار دستور کارها. خرابی‌ها را قبل از وقوع تشخیص دهید.', ar: '١٥ قالب صيانة وقائية عبر أنظمة الضاغط والمروحة والمبرد والكهرباء. إنشاء وتتبع أوامر العمل تلقائياً. اكتشف الأعطال قبل حدوثها.' },
    metric: '15',
    metricLabel: 'PM TEMPLATES',
    color: 'text-chart-2',
  },
  {
    icon: Layers,
    title: { en: 'Multi-Brand Compatible', fa: 'سازگاری چند برند', ar: 'متوافق مع علامات متعددة' },
    description: { en: 'Deep Carel pCO/c.series integration — 50+ controller models supported. Also compatible with Danfoss MCX/EKF, Microtech UC/EC, Siemens Climatix, and controllers from Honeywell, JCI, Schneider, and LG.', fa: 'یکپارچگی عمیق با Carel pCO/c.series — پشتیبانی از ۵۰+ مدل کنترلر. همچنین سازگار با Danfoss MCX/EKF، Microtech UC/EC، Siemens Climatix و کنترلرهای Honeywell، JCI، Schneider و LG.', ar: 'تكامل عميق مع Carel pCO/c.series — دعم لأكثر من ٥٠ نموذج وحدة تحكم. متوافق أيضاً مع Danfoss MCX/EKF و Microtech UC/EC و Siemens Climatix ووحدات تحكم Honeywell و JCI و Schneider و LG.' },
    metric: '50+',
    metricLabel: 'CONTROLLER MODELS',
    color: 'text-primary',
  },
  {
    icon: Building2,
    title: { en: 'Multi-Tenant Architecture', fa: 'معماری چندمستأجری', ar: 'معمارية متعددة المستأجرين' },
    description: { en: 'Organization-based isolation with role-based access (admin/viewer). Each tenant sees only their data. Perfect for facility management companies managing multiple client sites from one platform.', fa: 'ایزولاسیون مبتنی بر سازمان با دسترسی مبتنی بر نقش (مدیر/بیننده). هر مستأجر فقط داده‌های خود را می‌بیند. ایده‌آل برای شرکت‌های مدیریت تأسیسات که چندین سایت مشتری را از یک پلتفرم مدیریت می‌کنند.', ar: 'عزل قائم على المؤسسة مع وصول قائم على الدور (مدير/مشاهد). كل مستأجر يرى بياناته فقط. مثالي لشركات إدارة المرافق التي تدير مواقع عملاء متعددة من منصة واحدة.' },
    metric: 'RBAC',
    metricLabel: 'ACCESS CONTROL',
    color: 'text-chart-4',
  },
  {
    icon: Webhook,
    title: { en: 'Webhook & API Integration', fa: 'یکپارچه‌سازی Webhook و API', ar: 'تكامل Webhook و API' },
    description: { en: 'Real-time event-driven webhooks for anomaly alerts, health status changes, and data sync. Comprehensive REST API for custom integrations, automation, and third-party system connectivity.', fa: 'Webhook رویدادمحور لحظه‌ای برای هشدارهای ناهنجاری، تغییرات وضعیت سلامت و همگام‌سازی داده. REST API جامع برای یکپارچه‌سازی سفارشی، اتوماسیون و اتصال به سیستم‌های شخص ثالث.', ar: 'Webhook فوري مدفوعة بالأحداث لتنبيهات الشذوذ وتغييرات حالة الصحة ومزامنة البيانات. REST API شامل للتكاملات المخصصة والأتمتة والاتصال بأنظمة الطرف الثالث.' },
    metric: 'REST',
    metricLabel: 'FULL API',
    color: 'text-chart-3',
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
                { src: '/logo/LG-Electronics.jpg', name: 'LG' },
                { src: '/logo/Schneider.png', name: 'Schneider' },
                { src: '/logo/Johnson-Controls.png', name: 'Johnson Controls' },
                { src: '/logo/Honeywell.jpg', name: 'Honeywell' },
              ].map((brand) => (
                <div key={brand.name} className="flex items-center justify-center h-8 sm:h-10 mx-5 sm:mx-8 grayscale opacity-40 transition-all duration-500 marquee-logo">
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className="h-full w-auto object-contain"
                    loading="lazy"
                    decoding="async"
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
                { src: '/logo/LG-Electronics.jpg', name: 'LG' },
                { src: '/logo/Schneider.png', name: 'Schneider' },
                { src: '/logo/Johnson-Controls.png', name: 'Johnson Controls' },
                { src: '/logo/Honeywell.jpg', name: 'Honeywell' },
              ].map((brand) => (
                <div key={`dup-${brand.name}`} className="flex items-center justify-center h-8 sm:h-10 mx-5 sm:mx-8 grayscale opacity-40 transition-all duration-500 marquee-logo">
                  <img
                    src={brand.src}
                    alt={brand.name}
                    decoding="async"
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
