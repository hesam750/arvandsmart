'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, Monitor, ArrowRight, Gauge, Cpu, Wifi, Webhook } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'all',
    label: { en: 'All Modules', fa: 'همه ماژول‌ها', ar: 'جميع الوحدات' },
  },
  {
    id: 'monitoring',
    label: { en: 'Monitoring', fa: 'پایش', ar: 'المراقبة' },
  },
  {
    id: 'analytics',
    label: { en: 'Analytics', fa: 'تحلیل', ar: 'التحليلات' },
  },
  {
    id: 'control',
    label: { en: 'Control', fa: 'کنترل', ar: 'التحكم' },
  },
  {
    id: 'integration',
    label: { en: 'Integration', fa: 'یکپارچه‌سازی', ar: 'التكامل' },
  },
]

const products = [
  {
    id: 1,
    name: 'Live Monitoring Hub',
    subtitle: { en: 'Real-Time Chiller Dashboard', fa: 'داشبورد لحظه‌ای چیلر', ar: 'لوحة تحكم المبردات اللحظية' },
    category: 'monitoring',
    description: { en: 'WebSocket-powered live dashboards with sub-second latency. View all chillers in one screen with group tabs, individual chiller cards, temperature gauges, and real-time status indicators.', fa: 'داشبوردهای زنده مبتنی بر WebSocket با تأخیر زیر ثانیه. مشاهده تمام چیلرها در یک صفحه با تب‌های گروهی، کارت‌های چیلر، دماسنج‌ها و نشانگرهای وضعیت لحظه‌ای.', ar: 'لوحات تحكم حية مدعومة من WebSocket بزمن استجابة تحت الثانية. عرض جميع المبردات في شاشة واحدة مع علامات تبويب المجموعات وبطاقات المبردات الفردية ومقاييس الحرارة ومؤشرات الحالة اللحظية.' },
    specs: ['WebSocket real-time', 'Chiller group tabs', 'Temperature gauges', 'Status indicators'],
    icon: Monitor,
  },
  {
    id: 2,
    name: 'Health Score Engine',
    subtitle: { en: '0–100 Chiller Health Analytics', fa: 'تحلیل سلامت چیلر ۰–۱۰۰', ar: 'تحليلات صحة المبرد ٠–١٠٠' },
    category: 'analytics',
    description: { en: 'Proprietary algorithm computing a 0–100 health score from four weighted sub-scores. Includes Z-score anomaly detection, energy breakdown with tariff cost calculation, and 15 PM templates.', fa: 'الگوریتم اختصاصی محاسبه امتیاز سلامت ۰–۱۰۰ از چهار زیرامتیاز وزنی. شامل تشخیص ناهنجاری Z-Score، تفکیک انرژی با محاسبه هزینه تعرفه و ۱۵ الگوی نگهداری.', ar: 'خوارزمية ملكية تحسب درجة صحة ٠–١٠٠ من أربع درجات فرعية مرجحة. تشمل كشف الشذوذ Z-Score وتفصيل الطاقة مع حساب تكلفة التعرفة و١٥ قالب صيانة وقائية.' },
    specs: ['Health Score 0–100', 'Z-score >2.5σ', 'Energy tariff calc', '15 PM templates'],
    icon: Gauge,
  },
  {
    id: 3,
    name: 'Remote Control Suite',
    subtitle: { en: 'Precision Setpoint & Mode Control', fa: 'کنترل Setpoint دقیق و حالت', ar: 'التحكم الدقيق بنقطة الضبط والوضع' },
    category: 'control',
    description: { en: 'Remotely adjust temperature setpoints with ±0.1°C precision. Power chillers on/off, switch between summer/winter seasons, change fan modes, and manage work orders — all from the dashboard.', fa: 'تنظیم از راه دور Setpoint دما با دقت ±۰.۱°C. روشن/خاموش کردن چیلرها، تغییر بین فصل تابستان/زمستان، تغییر حالت فن و مدیریت دستور کارها — همه از داشبورد.', ar: 'ضبط نقاط الضبط عن بعد بدقة ±٠.١°م. تشغيل/إيقاف المبردات، التبديل بين فصلي الصيف/الشتاء، تغيير أوضاع المروحة، وإدارة أوامر العمل — كل ذلك من لوحة التحكم.' },
    specs: ['±0.1°C precision', 'On/Off control', 'Season switching', 'Fan mode control'],
    icon: Cpu,
  },
  {
    id: 4,
    name: 'API & Webhook Gateway',
    subtitle: { en: 'REST API + Event-Driven Webhooks', fa: 'REST API + Webhook رویدادمحور', ar: 'REST API + Webhook مدفوعة بالأحداث' },
    category: 'integration',
    description: { en: 'Comprehensive REST API for custom integrations and automation. Real-time event-driven webhooks for anomaly alerts, health status changes, and data sync. Multi-tenant with role-based access control.', fa: 'REST API جامع برای یکپارچه‌سازی سفارشی و اتوماسیون. Webhook رویدادمحور لحظه‌ای برای هشدارهای ناهنجاری، تغییرات وضعیت سلامت و همگام‌سازی داده. چندمستأجری با کنترل دسترسی مبتنی بر نقش.', ar: 'REST API شامل للتكاملات المخصصة والأتمتة. Webhook فوري مدفوعة بالأحداث لتنبيهات الشذوذ وتغييرات حالة الصحة ومزامنة البيانات. متعدد المستأجرين مع التحكم في الوصول القائم على الدور.' },
    specs: ['REST API', 'Event webhooks', 'Multi-tenant', 'Role-based access'],
    icon: Webhook,
  },
]

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 6, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div style={{ rotateX, scale, y }} className="section-glow max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('products.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('products.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('products.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {cat.label[language] || cat.label.en}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-primary -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card-command p-5 sm:p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm sm:text-base">{product.name}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground/70 data-text tracking-wider">
                        {product.subtitle[language] || product.subtitle.en}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed mb-4 sm:mb-5 flex-1">
                    {product.description[language] || product.description.en}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                    {product.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground/60">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-chart-3 flex-shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <Link href="#contact">
                    <Button variant="outline" className="w-full text-xs sm:text-sm border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground">
                      {t('products.request')}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ms-1.5 sm:ms-2 rtl:rotate-180" />
                    </Button>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
