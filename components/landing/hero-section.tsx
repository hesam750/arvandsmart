'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Activity, Zap, Thermometer, Radio } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep ambient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.6 0.2 225 / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.6 0.2 225 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px] hidden sm:block" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-[100px] hidden sm:block" />
        <div className="absolute top-2/3 left-1/3 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-chart-2/5 blur-[80px]" />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{ backgroundImage: `var(--scanline)` }}
      />

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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left: Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8"
            >
              <span className="glow-dot text-chart-3 w-1 sm:w-1.5 h-1 sm:h-1.5" />
              <span className="data-text text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary/80">SYSTEM ONLINE</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">— v3.0</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.0] sm:leading-[0.95] mb-4 sm:mb-6">
              <span className="text-foreground">{t('hero.title')}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl">
              {t('hero.description')}
            </p>

            {/* CTAs - stacked on mobile, side by side on larger */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.cta.primary')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground data-text">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse flex-shrink-0" />
                All Systems Nominal
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Live Data Feed
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                24 Units Online
              </span>
            </div>
          </motion.div>

          {/* Right: Dashboard — hidden on mobile, shown on tablet+ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-chart-2/10 to-transparent rounded-3xl blur-3xl" />

              <div className="relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-border/40 bg-background/30">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-destructive/50" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-chart-4/50" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-chart-3/50" />
                  </div>
                  <span className="ms-2 sm:ms-3 text-[9px] sm:text-[10px] data-text text-muted-foreground/60 truncate">ARVAND_CONTROL_TERMINAL v3.0</span>
                  <span className="ms-auto text-[9px] sm:text-[10px] data-text text-muted-foreground/40 flex-shrink-0">───● ONLINE</span>
                </div>

                {/* Dashboard body */}
                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  {/* Metric cards row */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { label: 'CHILLERS', value: '24', sub: '+2 today', color: 'text-chart-3' },
                      { label: 'ENERGY SAVED', value: '32%', sub: 'avg. reduction', color: 'text-primary' },
                      { label: 'UPTIME', value: '99.7%', sub: '30-day avg', color: 'text-chart-3' },
                    ].map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="rounded-xl border border-border/40 bg-background/40 p-2 sm:p-3"
                      >
                        <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/60 tracking-widest mb-1">{m.label}</div>
                        <div className={`text-base sm:text-lg md:text-xl font-bold ${m.color}`}>{m.value}</div>
                        <div className="text-[9px] sm:text-[10px] text-muted-foreground/50 mt-0.5">{m.sub}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="rounded-xl border border-border/40 bg-background/40 p-3 sm:p-4"
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-[9px] sm:text-[10px] data-text text-muted-foreground/60 tracking-wider">ENERGY CONSUMPTION</span>
                      <span className="text-[8px] sm:text-[9px] data-text text-muted-foreground/40">7-DAY ROLLING</span>
                    </div>
                    <div className="h-16 sm:h-20 flex items-end gap-1 sm:gap-1.5">
                      {[48, 62, 45, 70, 55, 78, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-1 rounded-sm bg-gradient-to-t from-primary/80 to-primary/30 relative group"
                        >
                          <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] data-text text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}kWh</div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1.5 sm:mt-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                        <span key={d} className="text-[7px] sm:text-[8px] data-text text-muted-foreground/40">{d}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="rounded-xl border border-border/40 bg-background/40 p-2 sm:p-3"
                    >
                      <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/60 mb-1 sm:mb-1.5">SYSTEM HEALTH</div>
                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '94%' }}
                          transition={{ delay: 1.3, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-chart-3 to-primary"
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[8px] sm:text-[9px] data-text text-chart-3">94%</span>
                        <span className="text-[8px] sm:text-[9px] data-text text-muted-foreground/40">OPTIMAL</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="rounded-xl border border-border/40 bg-background/40 p-2 sm:p-3"
                    >
                      <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/60 mb-1 sm:mb-1.5">ALERTS</div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-base sm:text-lg font-bold text-chart-3">2</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground/50">minor</span>
                        <span className="ms-auto text-[8px] sm:text-[9px] data-text text-chart-4">0 critical</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
