'use client'

import { motion } from 'motion/react'
import { Plug, Eye, Activity, Settings2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'

export function HowItWorksSection() {
  const { t, language } = useLanguage()
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })

  const steps = [
    {
      number: '01',
      icon: Plug,
      title: { en: 'Connect Directly', fa: 'اتصال مستقیم', ar: 'اتصال مباشر' },
      desc: { en: 'Connect your chiller controller directly over standard Ethernet — no gateway, no extra hardware. Our HTTP-based PLC reader communicates natively with Carel pCO, Danfoss MCX, Microtech UC, and 50+ controller models via TCP/IP.', fa: 'کنترلر چیلر خود را مستقیماً از طریق Ethernet استاندارد متصل کنید — بدون گیت‌وی، بدون سخت‌افزار اضافه. خواننده PLC مبتنی بر HTTP ما به طور بومی با Carel pCO، Danfoss MCX، Microtech UC و ۵۰+ مدل کنترلر از طریق TCP/IP ارتباط برقرار می‌کند.', ar: 'قم بتوصيل وحدة تحكم المبرد مباشرة عبر Ethernet قياسي — بدون بوابة، بدون أجهزة إضافية. قارئ PLC المعتمد على HTTP يتواصل أصلاً مع Carel pCO و Danfoss MCX و Microtech UC وأكثر من ٥٠ نموذج وحدة تحكم عبر TCP/IP.' },
    },
    {
      number: '02',
      icon: Eye,
      title: { en: 'Real-Time Monitoring', fa: 'پایش لحظه‌ای', ar: 'مراقبة لحظية' },
      desc: { en: 'WebSocket-powered live dashboards display supply/return temperatures, pressure, power consumption, current, and system status — updating with sub-second latency. Every chiller, every metric, one screen.', fa: 'داشبوردهای زنده مبتنی بر WebSocket دمای رفت/برگشت، فشار، مصرف برق، جریان و وضعیت سیستم را نمایش می‌دهند — با تأخیر زیر ثانیه به‌روزرسانی می‌شوند. هر چیلر، هر معیار، یک صفحه.', ar: 'لوحات تحكم حية مدعومة من WebSocket تعرض درجات حرارة الإمداد/العودة والضغط واستهلاك الطاقة والتيار وحالة النظام — تتحدث بزمن استجابة تحت الثانية. كل مبرد، كل مقياس، شاشة واحدة.' },
    },
    {
      number: '03',
      icon: Activity,
      title: { en: 'Analyze & Detect', fa: 'تحلیل و تشخیص', ar: 'تحليل واكتشاف' },
      desc: { en: 'Proprietary Health Score (0–100) and Z-score anomaly detection (>2.5σ) analyze compressor, fan, refrigerant, and electrical data in real time. Get instant alerts and clear health insights for every chiller.', fa: 'امتیاز سلامت اختصاصی (۰–۱۰۰) و تشخیص ناهنجاری Z-Score (>۲.۵σ) داده‌های کمپرسور، فن، مبرد و الکتریکال را به صورت لحظه‌ای تحلیل می‌کنند. هشدارهای فوری و بینش سلامت واضح برای هر چیلر دریافت کنید.', ar: 'درجة الصحة الملكية (٠–١٠٠) وكشف الشذوذ Z-Score (>٢.٥σ) يحللان بيانات الضاغط والمروحة والمبرد والكهرباء في الوقت الفعلي. احصل على تنبيهات فورية ورؤى صحية واضحة لكل مبرد.' },
    },
    {
      number: '04',
      icon: Settings2,
      title: { en: 'Control & Scale', fa: 'کنترل و توسعه', ar: 'تحكم وتوسع' },
      desc: { en: 'Adjust setpoints with ±0.1°C precision, switch seasons, change fan modes, and manage work orders — all remotely. Add unlimited chillers, users, and sites. Integrate via REST API and webhooks.', fa: 'تنظیم Setpoint با دقت ±۰.۱°C، تغییر فصل، تغییر حالت فن و مدیریت دستور کارها — همه از راه دور. افزودن چیلرها، کاربران و سایت‌های نامحدود. یکپارچه‌سازی از طریق REST API و Webhook.', ar: 'اضبط نقاط الضبط بدقة ±٠.١°م، بدّل الفصول، غيّر أوضاع المروحة، وأدر أوامر العمل — كل ذلك عن بعد. أضف مبردات ومستخدمين ومواقع غير محدودة. التكامل عبر REST API و Webhook.' },
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
