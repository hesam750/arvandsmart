'use client'

import { motion } from 'motion/react'
import { Database, Cpu, TrendingUp, Rocket } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'

export function HowItWorksSection() {
  const { t, language } = useLanguage()
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })

  const steps = [
    {
      number: '01',
      icon: Database,
      title: { en: 'Connect & Collect', fa: 'اتصال و جمع‌آوری', ar: 'اتصال وجمع' },
      desc: { en: 'Connect your Carel chillers (pCO, c.series) via Modbus, BACnet, or IoT gateway. Data flows automatically to the cloud.', fa: 'چیلرهای Carel خود (pCO، c.series) را از طریق Modbus، BACnet یا دروازه IoT متصل کنید. داده‌ها به طور خودکار به ابر منتقل می‌شوند.', ar: 'قم بتوصيل مبردات Carel الخاصة بك (pCO، c.series) عبر Modbus أو BACnet أو بوابة IoT. تتدفق البيانات تلقائياً إلى السحابة.' },
    },
    {
      number: '02',
      icon: Cpu,
      title: { en: 'Real-Time Monitoring', fa: 'پایش لحظه‌ای', ar: 'مراقبة لحظية' },
      desc: { en: 'Live dashboards display every metric from temperature to power consumption in real time.', fa: 'داشبوردهای زنده تمام معیارها را از دما تا مصرف برق به صورت لحظه‌ای نمایش می‌دهند.', ar: 'لوحات المعلومات الحية تعرض كل مقياس من درجة الحرارة إلى استهلاك الطاقة في الوقت الفعلي.' },
    },
    {
      number: '03',
      icon: TrendingUp,
      title: { en: 'Analyze & Optimize', fa: 'تحلیل و بهینه‌سازی', ar: 'تحليل وتحسين' },
      desc: { en: 'AI-powered analytics identify inefficiencies and recommend optimizations automatically.', fa: 'تحلیل مبتنی بر هوش مصنوعی ناکارآمدی‌ها را شناسایی و بهینه‌سازی‌ها را به طور خودکار توصیه می‌کند.', ar: 'تحليلات مدعومة بالذكاء الاصطناعي تحدد أوجه القصور وتوصي بالتحسينات تلقائياً.' },
    },
    {
      number: '04',
      icon: Rocket,
      title: { en: 'Scale & Succeed', fa: 'توسعه و موفقیت', ar: 'توسع ونجاح' },
      desc: { en: 'Add more units, users, and facilities seamlessly. Your platform grows with your business.', fa: 'واحدها، کاربران و تأسیسات بیشتری را به طور یکپارچه اضافه کنید. پلتفرم شما با کسب و کارتان رشد می‌کند.', ar: 'أضف المزيد من الوحدات والمستخدمين والمرافق بسلاسة. منصتك تنمو مع عملك.' },
    },
  ]

  return (
    <section id="how-it-works" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <motion.div
        style={{ rotateX, scale, y }}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            {t('howItWorks.title.part1')}{' '}
            <span className="text-primary block sm:inline">
              {t('howItWorks.title.part2')}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('howItWorks.subtitle')}
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
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
                  {step.title[language] || step.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed">
                  {step.desc[language] || step.desc.en}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 start-0 w-1/3 h-0.5 bg-gradient-to-r from-primary/40 to-transparent group-hover:w-2/3 transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
