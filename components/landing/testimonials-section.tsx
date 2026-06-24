'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

const testimonials = [
  {
    name: 'Mohammad Rezaei',
    role: 'Facility Manager',
    role_fa: 'مدیر تأسیسات',
    company: 'Tehran Commercial Complex',
    company_fa: 'مجتمع تجاری تهران',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'ArvandSmartControl has transformed how we manage our cooling systems. We reduced energy costs by 28% in the first three months.',
    quote_fa: 'آروانداسمارت‌کنترل نحوه مدیریت سیستم‌های سرمایشی ما را متحول کرد. در سه ماه اول ۲۸٪ هزینه انرژی را کاهش دادیم.',
  },
  {
    name: 'Sara Ahmadi',
    role: 'Chief Engineer',
    role_fa: 'مهندس ارشد',
    company: 'Pars Hospital',
    company_fa: 'بیمارستان پارس',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'The predictive maintenance feature is a game-changer. We caught a critical compressor failure before it happened, saving millions in downtime.',
    quote_fa: 'ویژگی نگهداری پیش‌بینانه یک تغییر بزرگ است. یک خرابی بحرانی کمپرسور را قبل از وقوع تشخیص دادیم و میلیون‌ها تومان از توقف کار جلوگیری کرد.',
  },
  {
    name: 'Ali Karimi',
    role: 'Technical Director',
    role_fa: 'مدیر فنی',
    company: 'Kish Hotel',
    company_fa: 'هتل کیش',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote: 'Having all our chillers on a single dashboard with real-time data is incredible. The anomaly detection alerts us instantly when something is wrong.',
    quote_fa: 'داشتن تمام چیلرهای ما روی یک داشبورد با داده‌های لحظه‌ای فوق‌العاده است. تشخیص ناهنجاری به محض بروز مشکل به ما هشدار می‌دهد.',
  },
  {
    name: 'Fatemeh Hosseini',
    role: 'Energy Manager',
    role_fa: 'مدیر انرژی',
    company: 'Iran Mall',
    company_fa: 'ایران مال',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'The energy analytics module helped us identify inefficiencies we didn\'t know existed. We optimized our scheduling and saved 35% on cooling costs.',
    quote_fa: 'ماژول تحلیل انرژی به ما کمک کرد ناکارآمدی‌هایی را که نمی‌دانستیم وجود دارند شناسایی کنیم. برنامه‌ریزی را بهینه کردیم و ۳۵٪ در هزینه‌های سرمایش صرفه‌جویی کردیم.',
  },
]

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { language } = useLanguage()

  return (
    <section className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/3 blur-[120px]" />

      <div className="section-glow max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs data-text tracking-wider uppercase mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            CLIENT VOICES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            Trusted by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed font-mono">
            Hear from our clients about how ArvandSmartControl has improved their operations.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
            className="!pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="card-command p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 fill-chart-4 text-chart-4" />
                    ))}
                  </div>
                  <p className="text-muted-foreground/80 leading-relaxed mb-6 flex-1 text-sm">
                    &ldquo;{language === 'fa' ? t.quote_fa : t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-secondary ring-1 ring-border/50">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground/80">{t.name}</div>
                      <div className="text-xs text-muted-foreground/50 data-text tracking-wider">
                        {language === 'fa' ? t.role_fa : t.role}
                        {' — '}
                        {language === 'fa' ? t.company_fa : t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
