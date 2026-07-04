'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Monitor, ArrowRight, Gauge, Cpu, Wifi, Thermometer } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'all',
    label: { en: 'All Products', fa: 'همه محصولات', ar: 'جميع المنتجات' },
  },
  {
    id: 'chillers',
    label: { en: 'Chillers', fa: 'چیلرها', ar: 'المبردات' },
  },
  {
    id: 'controllers',
    label: { en: 'Controllers', fa: 'کنترلرها', ar: 'وحدات التحكم' },
  },
  {
    id: 'software',
    label: { en: 'Software', fa: 'نرم‌افزار', ar: 'البرمجيات' },
  },
]

const products = [
  {
    id: 1,
    name: 'ASC-2000',
    subtitle: { en: 'Industrial Chiller Controller', fa: 'کنترلر چیلر صنعتی', ar: 'وحدة تحكم مبرد صناعي' },
    category: 'controllers',
    description: { en: 'Advanced industrial controller with real-time monitoring, multi-protocol support, and predictive analytics engine.', fa: 'کنترلر صنعتی پیشرفته با پایش لحظه‌ای، پشتیبانی از چندین پروتکل و موتور تحلیل پیش‌بینانه.', ar: 'وحدة تحكم صناعية متقدمة مع مراقبة لحظية ودعم متعدد البروتوكولات ومحرك تحليلات تنبؤية.' },
    specs: ['8 analog inputs', '4 PID loops', 'Modbus TCP/RTU', 'Ethernet/IP'],
    icon: Cpu,
  },
  {
    id: 2,
    name: 'ASC-1000',
    subtitle: { en: 'Commercial Chiller Controller', fa: 'کنترلر چیلر تجاری', ar: 'وحدة تحكم مبرد تجاري' },
    category: 'controllers',
    description: { en: 'Cost-effective controller for commercial applications with built-in energy optimization algorithms.', fa: 'کنترلر مقرون‌به‌صرفه برای کاربردهای تجاری با الگوریتم‌های بهینه‌سازی انرژی داخلی.', ar: 'وحدة تحكم اقتصادية للتطبيقات التجارية مع خوارزميات تحسين الطاقة المدمجة.' },
    specs: ['4 analog inputs', '2 PID loops', 'BACnet MS/TP', 'Built-in display'],
    icon: Thermometer,
  },
  {
    id: 3,
    name: 'Arvand Cloud',
    subtitle: { en: 'IoT & Analytics Platform', fa: 'پلتفرم IoT و تحلیل', ar: 'منصة إنترنت الأشياء والتحليلات' },
    category: 'software',
    description: { en: 'Cloud-based monitoring platform with real-time dashboards, anomaly detection, and mobile alerts.', fa: 'پلتفرم نظارت ابری با داشبوردهای لحظه‌ای، تشخیص ناهنجاری و هشدارهای موبایل.', ar: 'منصة مراقبة سحابية مع لوحات معلومات لحظية وكشف الشذوذ وتنبيهات الجوال.' },
    specs: ['Unlimited devices', '30-day history', 'API access', 'White-label'],
    icon: Monitor,
  },
  {
    id: 4,
    name: 'ASC-3000',
    subtitle: { en: 'Premium Modular Controller', fa: 'کنترلر مدولار ممتاز', ar: 'وحدة تحكم معيارية متميزة' },
    category: 'controllers',
    description: { en: 'Modular controller for large installations with redundant power, hot-swap I/O, and advanced security.', fa: 'کنترلر مدولار برای تأسیسات بزرگ با برق اضافی، I/O قابل تعویض و امنیت پیشرفته.', ar: 'وحدة تحكم معيارية للمنشآت الكبيرة مع طاقة احتياطية وإدخال/إخراج قابل للتبديل السريع وأمان متقدم.' },
    specs: ['16 analog inputs', '8 PID loops', 'All protocols', 'Redundant power'],
    icon: Gauge,
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
