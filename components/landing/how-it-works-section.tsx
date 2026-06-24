'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, Cpu, TrendingUp, Rocket } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { language } = useLanguage()

  const steps = [
    {
      number: '01',
      icon: Database,
      title: 'Connect & Collect',
      title_fa: 'اتصال و جمع‌آوری',
      desc: 'Connect your chillers via Modbus, BACnet, or IoT gateway. Data flows automatically to the cloud.',
      desc_fa: 'چیلرهای خود را از طریق Modbus، BACnet یا دروازه IoT متصل کنید. داده‌ها به طور خودکار به ابر منتقل می‌شوند.',
    },
    {
      number: '02',
      icon: Cpu,
      title: 'Real-Time Monitoring',
      title_fa: 'پایش لحظه‌ای',
      desc: 'Live dashboards display every metric from temperature to power consumption in real time.',
      desc_fa: 'داشبوردهای زنده تمام معیارها را از دما تا مصرف برق به صورت لحظه‌ای نمایش می‌دهند.',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Analyze & Optimize',
      title_fa: 'تحلیل و بهینه‌سازی',
      desc: 'AI-powered analytics identify inefficiencies and recommend optimizations automatically.',
      desc_fa: 'تحلیل مبتنی بر هوش مصنوعی ناکارآمدی‌ها را شناسایی و بهینه‌سازی‌ها را به طور خودکار توصیه می‌کند.',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Scale & Succeed',
      title_fa: 'توسعه و موفقیت',
      desc: 'Add more units, users, and facilities seamlessly. Your platform grows with your business.',
      desc_fa: 'واحدها، کاربران و تأسیسات بیشتری را به طور یکپارچه اضافه کنید. پلتفرم شما با کسب و کارتان رشد می‌کند.',
    },
  ]

  return (
    <section id="how-it-works" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            {language === 'fa' ? 'چهار گام ساده تا' : 'Four Simple Steps to'}{' '}
            <span className="text-primary block sm:inline">
              {language === 'fa' ? 'مدیریت هوشمند' : 'Smart Management'}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            From setup to full control — get your cooling systems online and optimized in no time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="card-command p-6 sm:p-8 relative group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                {/* Step number */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold font-mono text-primary/30">{step.number}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-foreground/90">
                  {language === 'fa' ? step.title_fa : step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed">
                  {language === 'fa' ? step.desc_fa : step.desc}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 start-0 w-1/3 h-0.5 bg-gradient-to-r from-primary/40 to-transparent group-hover:w-2/3 transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
