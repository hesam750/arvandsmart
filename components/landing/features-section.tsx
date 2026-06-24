'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Cpu,
  Wifi,
  BarChart3,
  Bell,
  Shield,
  Cloud,
  ArrowRight,
  Gauge,
  Radar,
  Database,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const featuresList = [
  {
    icon: Cpu,
    title: 'Real-Time Monitoring',
    desc_fa: 'پایش لحظه‌ای تمامی چیلرها و تجهیزات سرمایشی از یک داشبورد متمرکز',
    desc_en: 'Real-time monitoring of all chillers and cooling equipment from a centralized dashboard',
    metric: '250+',
    metricLabel: 'DATA POINTS/SEC',
    color: 'text-chart-3',
  },
  {
    icon: BarChart3,
    title: 'Energy Analytics',
    desc_fa: 'تحلیل مصرف انرژی و بهینه‌سازی هوشمند با الگوریتم‌های پیشرفته',
    desc_en: 'Energy consumption analysis and smart optimization with advanced algorithms',
    metric: '32%',
    metricLabel: 'AVG. SAVINGS',
    color: 'text-primary',
  },
  {
    icon: Bell,
    title: 'Anomaly Detection',
    desc_fa: 'تشخیص خودکار ناهنجاری‌ها و هشداردهی هوشمند قبل از بروز خرابی',
    desc_en: 'Automatic anomaly detection and smart alerting before failures occur',
    metric: '99.7%',
    metricLabel: 'DETECTION RATE',
    color: 'text-chart-4',
  },
  {
    icon: Wifi,
    title: 'IoT Connectivity',
    desc_fa: 'اتصال به تمامی تجهیزات از طریق پروتکل‌های Modbus، BACnet و IoT',
    desc_en: 'Connect to all equipment via Modbus, BACnet and IoT protocols',
    metric: '12+',
    metricLabel: 'PROTOCOLS',
    color: 'text-chart-2',
  },
  {
    icon: Shield,
    title: 'Predictive Maintenance',
    desc_fa: 'برنامه‌ریزی نگهداری پیش‌بینانه بر اساس تحلیل داده‌های تاریخی',
    desc_en: 'Predictive maintenance scheduling based on historical data analysis',
    metric: '94%',
    metricLabel: 'ACCURACY',
    color: 'text-chart-3',
  },
  {
    icon: Database,
    title: 'Cloud Platform',
    desc_fa: 'دسترسی امن از راه دور به تمامی داده‌ها و کنترل تجهیزات از هر مکان',
    desc_en: 'Secure remote access to all data and equipment control from anywhere',
    metric: '99.99%',
    metricLabel: 'UPTIME SLA',
    color: 'text-chart-2',
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs data-text tracking-wider uppercase mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            CORE CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-foreground">Everything You Need to</span>{' '}
            <span className="text-primary">Control Your Cooling</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed font-mono">
            A comprehensive platform for monitoring, analyzing, and optimizing your chiller systems
            with real-time data and intelligent automation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuresList.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group card-command p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default"
              >
                {/* Metric badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors border border-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold font-mono ${feature.color}`}>{feature.metric}</div>
                    <div className="text-[8px] data-text text-muted-foreground/40 tracking-widest">{feature.metricLabel}</div>
                  </div>
                </div>

                <h3 className="text-base font-bold mb-2 text-foreground/90 group-hover:text-foreground transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  {language === 'fa' ? feature.desc_fa : feature.desc_en}
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
          className="text-center mt-12"
        >
          <Link href="#products">
            <Button variant="outline" className="px-6 border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground">
              {language === 'fa' ? 'مشاهده همه قابلیت‌ها' : 'View All Capabilities'}
              <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
