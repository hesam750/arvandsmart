'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useLanguage } from '@/lib/i18n/language-context'
import { BarChart3, TrendingDown, AlertTriangle, CheckCircle, ArrowUpRight, Building2, Building, Hotel } from 'lucide-react'
import { Button } from '@/components/ui/button'

const caseStudies = [
  {
    id: 'hotel-kish',
    icon: Hotel,
    company: { en: 'Kish Ocean Hotel', fa: 'هتل اقیانوس کیش', ar: 'فندق كيش أوشن' },
    location: { en: 'Kish Island, Iran', fa: 'جزیره کیش، ایران', ar: 'جزيرة كيش، إيران' },
    challenge: {
      en: 'The hotel was spending over $12,000/month on cooling across 18 chillers. Frequent compressor failures and no visibility into system performance made maintenance reactive and costly.',
      fa: 'هتل ماهانه بیش از ۳۵۰ میلیون تومان برای سرمایش ۱۸ چیلر هزینه می‌کرد. خرابی مکرر کمپرسور و عدم دید به عملکرد سیستم، نگهداری را واکنشی و پرهزینه کرده بود.',
      ar: 'كان الفندق ينفق أكثر من ١٢,٠٠٠ دولار شهرياً على التبريد عبر ١٨ مبرداً. أعطال الضاغط المتكررة وعدم الرؤية في أداء النظام جعلت الصيانة تفاعلية ومكلفة.',
    },
    solution: {
      en: 'Deployed ArvandSmartControl across all 18 chillers. Connected via direct TCP/IP to Danfoss MCX controllers. Set up real-time monitoring, anomaly detection, and automated alerts.',
      fa: 'نصب ArvandSmartControl روی همه ۱۸ چیلر. اتصال مستقیم TCP/IP به کنترلرهای Danfoss MCX. راه‌اندازی پایش لحظه‌ای، تشخیص ناهنجاری و هشدار خودکار.',
      ar: 'تم نشر ArvandSmartControl على جميع المبردات الـ ١٨. اتصال مباشر عبر TCP/IP بوحدات تحكم Danfoss MCX. إعداد المراقبة اللحظية وكشف الشذوذ والتنبيهات الآلية.',
    },
    results: [
      { icon: TrendingDown, label: { en: 'Energy Cost Reduction', fa: 'کاهش هزینه انرژی', ar: 'تخفيض تكلفة الطاقة' }, value: '32%', color: 'text-chart-3' },
      { icon: AlertTriangle, label: { en: 'Failures Prevented', fa: 'خرابی جلوگیری شده', ar: 'أعطال تم منعها' }, value: '2', color: 'text-primary' },
      { icon: BarChart3, label: { en: 'Annual Savings', fa: 'صرفه‌جویی سالانه', ar: 'توفير سنوي' }, value: '$46K', color: 'text-chart-3' },
      { icon: CheckCircle, label: { en: 'System Uptime', fa: 'آپتایم سیستم', ar: 'وقت تشغيل النظام' }, value: '99.8%', color: 'text-chart-2' },
    ],
  },
  {
    id: 'hospital-pars',
    icon: Building,
    company: { en: 'Pars Medical Center', fa: 'مرکز درمانی پارس', ar: 'مركز بارس الطبي' },
    location: { en: 'Tehran, Iran', fa: 'تهران، ایران', ar: 'طهران، إيران' },
    challenge: {
      en: 'A 300-bed hospital with critical cooling requirements for operating rooms and ICU. Legacy Carel controllers provided no remote access, and manual monitoring was error-prone with 24/7 staffing costs.',
      fa: 'بیمارستان ۳۰۰ تخته با نیاز سرمایشی حیاتی برای اتاق‌های عمل و ICU. کنترلرهای قدیمی Carel دسترسی از راه دور نداشتند و نظارت دسترسی با خطا و هزینه ۲۴/۷ همراه بود.',
      ar: 'مستشفى بـ ٣٠٠ سرير مع احتياجات تبريد حرجة لغرف العمليات والعناية المركزة. وحدات تحكم Carel القديمة لم توفر وصولاً عن بعد، والمراقبة اليدوية كانت عرضة للخطأ مع تكاليف تشغيل على مدار الساعة.',
    },
    solution: {
      en: 'Upgraded to ArvandSmartControl with BACnet integration for 12 Carel chillers. Implemented predictive maintenance, temperature zone monitoring, and automated compliance reporting.',
      fa: 'ارتقا به ArvandSmartControl با یکپارچه‌سازی BACnet برای ۱۲ چیلر Carel. پیاده‌سازی نگهداری پیش‌بینانه، پایش دمای زون‌ها و گزارش‌دهی خودکار انطباق.',
      ar: 'الترقية إلى ArvandSmartControl مع تكامل BACnet لـ ١٢ مبرداً من Carel. تنفيذ الصيانة التنبؤية ومراقبة مناطق درجة الحرارة وإعداد التقارير الآلية للامتثال.',
    },
    results: [
      { icon: TrendingDown, label: { en: 'Energy Cost Reduction', fa: 'کاهش هزینه انرژی', ar: 'تخفيض تكلفة الطاقة' }, value: '28%', color: 'text-chart-3' },
      { icon: AlertTriangle, label: { en: 'Critical Alerts', fa: 'هشدارهای بحرانی', ar: 'تنبيهات حرجة' }, value: '47', color: 'text-primary' },
      { icon: BarChart3, label: { en: 'Overtime Saved (hrs/mo)', fa: 'صرفه‌جویی اضافه‌کاری (ساعت/ماه)', ar: 'توفير ساعات العمل الإضافي (شهرياً)' }, value: '120h', color: 'text-chart-3' },
      { icon: CheckCircle, label: { en: 'Compliance Rate', fa: 'نرخ انطباق', ar: 'معدل الامتثال' }, value: '100%', color: 'text-chart-2' },
    ],
  },
  {
    id: 'tehran-mall',
    icon: Building2,
    company: { en: 'Tehran Grand Mall', fa: 'گرند مال تهران', ar: 'جراند مول طهران' },
    location: { en: 'Tehran, Iran', fa: 'تهران، ایران', ar: 'طهران، إيران' },
    challenge: {
      en: 'A large commercial complex with mixed-brand chillers (Microtech, LG, and Johnson Controls). No unified platform existed, and energy costs were 40% above industry benchmark.',
      fa: 'مجتمع تجاری بزرگ با چیلرهای برندهای مختلف (Microtech، LG و Johnson Controls). هیچ پلتفرم یکپارچه‌ای وجود نداشت و هزینه انرژی ۴۰٪ بالاتر از استاندارد صنعت بود.',
      ar: 'مجمع تجاري كبير بمبردات مختلطة العلامات (Microtech و LG و Johnson Controls). لم توجد منصة موحدة، وكانت تكاليف الطاقة أعلى بنسبة ٤٠٪ من معيار الصناعة.',
    },
    solution: {
      en: 'Deployed ArvandSmartControl across all 34 chillers (3 brands). Single dashboard, unified monitoring, and automated optimization schedules based on occupancy patterns.',
      fa: 'نصب ArvandSmartControl روی همه ۳۴ چیلر (۳ برند مختلف). یک داشبورد واحد، پایش یکپارچه و برنامه‌های بهینه‌سازی خودکار بر اساس الگوهای حضور.',
      ar: 'نشر ArvandSmartControl عبر جميع المبردات الـ ٣٤ (٣ علامات تجارية). لوحة تحكم واحدة ومراقبة موحدة وجداول تحسين آلية بناءً على أنماط الإشغال.',
    },
    results: [
      { icon: TrendingDown, label: { en: 'Energy Cost Reduction', fa: 'کاهش هزینه انرژی', ar: 'تخفيض تكلفة الطاقة' }, value: '38%', color: 'text-chart-3' },
      { icon: AlertTriangle, label: { en: 'Issues Detected Early', fa: 'مشکل کشف شده زودهنگام', ar: 'مشكلات مكتشفة مبكراً' }, value: '15', color: 'text-primary' },
      { icon: BarChart3, label: { en: 'Annual Savings', fa: 'صرفه‌جویی سالانه', ar: 'توفير سنوي' }, value: '$88K', color: 'text-chart-3' },
      { icon: CheckCircle, label: { en: 'ROI Achieved', fa: 'بازگشت سرمایه', ar: 'العائد على الاستثمار' }, value: '4 months', color: 'text-chart-2' },
    ],
  },
]

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)
  const study = caseStudies[activeIdx]

  return (
    <section id="case-studies" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('caseStudies.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('caseStudies.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {caseStudies.map((cs, i) => {
            const Icon = cs.icon
            return (
              <button
                key={cs.id}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeIdx === i
                    ? 'bg-primary/10 border border-primary/30 text-primary'
                    : 'bg-card border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cs.company[language] || cs.company.en}
              </button>
            )
          })}
        </div>

        {/* Active Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-5 gap-5 sm:gap-6"
          >
            {/* Left: Story */}
            <div className="lg:col-span-3 card-command p-5 sm:p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs data-text text-muted-foreground/50 tracking-wider uppercase">
                  {study.company[language] || study.company.en}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span className="text-xs text-muted-foreground/50">{study.location[language] || study.location.en}</span>
              </div>

              <div className="space-y-4 sm:space-y-5 flex-1">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold data-text tracking-wider text-destructive/80 mb-1.5">
                    {language === 'fa' ? 'چالش' : language === 'ar' ? 'التحدي' : 'The Challenge'}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {study.challenge[language] || study.challenge.en}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold data-text tracking-wider text-chart-3/80 mb-1.5">
                    {language === 'fa' ? 'راه‌حل' : language === 'ar' ? 'الحل' : 'The Solution'}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {study.solution[language] || study.solution.en}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/30">
                <Button variant="outline" size="sm" className="text-xs border-primary/20 text-muted-foreground hover:text-foreground">
                  {t('caseStudies.readMore')}
                  <ArrowUpRight className="w-3 h-3 ms-1" />
                </Button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 content-start">
              {study.results.map((r, j) => {
                const RIcon = r.icon
                return (
                  <motion.div
                    key={r.label.en}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + j * 0.1 }}
                    className="card-command p-4 sm:p-5 text-center flex flex-col items-center justify-center"
                  >
                    <RIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${r.color} mb-1.5`} />
                    <div className={`text-xl sm:text-2xl font-bold font-mono ${r.color}`}>{r.value}</div>
                    <div className="text-[9px] sm:text-[10px] data-text text-muted-foreground/50 mt-0.5 text-center leading-tight">
                      {r.label[language] || r.label.en}
                    </div>
                  </motion.div>
                )
              })}

              {/* Industry tags */}
              <div className="col-span-2 flex flex-wrap gap-1.5 justify-center mt-1">
                {['Hospitality', 'Healthcare', 'Commercial'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary/50 text-[9px] sm:text-[10px] data-text text-muted-foreground/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
