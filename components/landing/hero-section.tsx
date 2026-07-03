'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Activity, Zap, Thermometer, Radio, Layers, Palette, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import TextType from './TextType'
import { MonitorSlider } from './monitor-slider'

/** Reusable monitor frame with title bar */
function MonitorFrame({ label, status, children, contentHeight = 'max-h-56' }: { label: string; status: string; children: React.ReactNode; contentHeight?: string }) {
  return (
    <div className="relative rounded-xl sm:rounded-2xl border border-border/15 bg-[#0c0c0e] p-1 sm:p-1.25 shadow-lg shadow-black/40">
      <div className="relative rounded-[8px] sm:rounded-[11px] bg-[#111113] overflow-hidden shadow-inner shadow-black/30">
        {/* Title bar */}
        <div className="absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-linear-to-b from-black/60 to-transparent">
          <div className="flex gap-0.5 sm:gap-1">
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-destructive/60" />
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-chart-4/60" />
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-chart-3/60" />
          </div>
          <span className="text-[5px] sm:text-[7px] font-mono text-white/35 tracking-widest truncate">{label}</span>
          <span className="ms-auto text-[5px] sm:text-[7px] font-mono text-chart-3/50 tracking-widest">{status}</span>
        </div>
        {/* Content */}
        <div className={`w-full h-auto ${contentHeight}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      {/* شفاف برای نمایش فن پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/95" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px] hidden sm:block" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-[100px] hidden sm:block" />
      <div className="absolute top-2/3 left-1/3 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-chart-2/5 blur-[80px]" />

      {/* Data particles row */}
      <div className="absolute top-24 sm:top-32 inset-x-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ x: ['-20vw', '120vw'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="absolute bottom-32 sm:bottom-40 inset-x-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-16 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          animate={{ x: ['120vw', '-20vw'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left: Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Status badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8"
            >
              <span className="glow-dot text-chart-3 w-1 sm:w-1.5 h-1 sm:h-1.5" />
              <span className="data-text text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary/80">{t('hero.badge.status')}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">— v3.0</span>
            </motion.div> */}

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.0] sm:leading-[0.95] mb-4 sm:mb-6">
              <span className="text-foreground">{t('hero.title')}</span>
            </h1>

            {/* Animated tagline — types through key value propositions */}
            <div className="min-h-[2.5rem] sm:min-h-[3rem] mb-4 sm:mb-5">
              <TextType
                text={
                  language === 'fa'
                    ? [
                        'پایش لحظه‌ای چیلرها',
                        'اتصال مستقیم — بدون گیت‌وی',
                        'کاهش مصرف انرژی',
                        'نگهداری پیش‌بینانه',
                      ]
                    : language === 'ar'
                      ? [
                          'مراقبة لحظية للمبردات',
                          'اتصال مباشر — بدون بوابة',
                          'تقليل استهلاك الطاقة',
                          'صيانة تنبؤية',
                        ]
                      : [
                          'Real-time Chiller Monitoring',
                          'Direct Connection — No Gateway',
                          'Energy & Cost Optimization',
                          'Predictive Maintenance',
                        ]
                }
                as="p"
                typingSpeed={60}
                deletingSpeed={35}
                pauseDuration={3000}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                cursorBlinkDuration={0.4}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-mono"
                textColors={['var(--primary)', 'var(--chart-3)', 'var(--chart-2)', 'var(--chart-4)']}
                startOnVisible={true}
              />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl">
              {t('hero.description')}
            </p>

            {/* Key differentiators — bold selling points */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-[11px] sm:text-xs font-medium text-primary/90">
                <Zap className="w-3 h-3" />
                {t('hero.noGateway')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-[11px] sm:text-xs font-medium text-primary/90">
                <Layers className="w-3 h-3" />
                {t('hero.multiBrand')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-chart-4/15 bg-chart-4/5 text-[11px] sm:text-xs font-medium text-chart-4">
                <Palette className="w-3 h-3" />
                {t('hero.customizable')}
              </span>
            </div>

            {/* CTAs - stacked on mobile, side by side on larger */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.cta.primary')}
                    {/* <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                  </span>
                </Button>
              </Link>
              <Link href="#articles" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base border-primary/20 hover:bg-primary/5">
                  {t('hero.cta.secondary')}
                </Button>
              </Link>
            </div>

            {/* System status bar */}
            {/* <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground data-text">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse flex-shrink-0" />
                {t('hero.status.nominal')}
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {t('hero.status.datafeed')}
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {t('hero.status.units')}
              </span>
            </div> */}
          </motion.div>

          {/* Right: Dual monitor stack — hidden on mobile, shown on tablet+ */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Ambient glow behind monitors */}
              <div className="absolute -inset-4 sm:-inset-10 bg-linear-to-br from-primary/8 via-chart-2/6 to-transparent rounded-[20px] sm:rounded-[40px] blur-xl sm:blur-3xl" />

              {/* Monitor rack frame */}
              <div className="relative w-full max-w-xs sm:max-w-md space-y-0">
                {/* === TOP MONITOR: Dashboard === */}
                <MonitorFrame label="ARVAND_CONTROL_TERMINAL" status="● ONLINE">
                  <MonitorSlider />
                </MonitorFrame>

                {/* TV-style stand/console */}
                <div className="mx-auto mt-1 sm:mt-1.5 w-full">
                  {/* Top surface — thin accent line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {/* Main stand body — like a media console */}
                  <div className="flex justify-center">
                    <div className="w-[70%] sm:w-[60%] h-5 sm:h-7 bg-linear-to-b from-[#1c1c1e] to-[#0c0c0e] rounded-b-lg border-x border-b border-border/10 shadow-inner shadow-black/40">
                      {/* Vent lines / detail */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3 h-full">
                        <div className="w-5 sm:w-8 h-px bg-white/4 rounded-full" />
                        <div className="w-3 sm:w-5 h-px bg-white/4 rounded-full" />
                        <div className="w-2 sm:w-3 h-px bg-white/4 rounded-full" />
                      </div>
                    </div>
                  </div>
                  {/* Feet */}
                  <div className="flex justify-between mx-auto w-[75%] sm:w-[65%]">
                    <div className="w-3 sm:w-4 h-1 sm:h-1.5 bg-[#0c0c0e] rounded-b-full border-x border-b border-border/10" />
                    <div className="w-3 sm:w-4 h-1 sm:h-1.5 bg-[#0c0c0e] rounded-b-full border-x border-b border-border/10" />
                  </div>
                </div>
              </div>

              {/* Subtle reflection below the stand */}
              <div className="absolute -bottom-6 inset-x-10 h-6 bg-linear-to-t from-primary/5 to-transparent blur-xl rounded-full opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
