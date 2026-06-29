'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

const testimonials = [
  {
    name: 'Mohammad Rezaei',
    role: { en: 'Facility Manager', fa: 'مدیر تأسیسات', ar: 'مدير المرافق' },
    company: { en: 'Tehran Commercial Complex', fa: 'مجتمع تجاری تهران', ar: 'المجمع التجاري بطهران' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: { en: 'ArvandSmartControl has transformed how we manage our cooling systems. We reduced energy costs by 28% in the first three months.', fa: 'ارونداسمارت‌کنترل نحوه مدیریت سیستم‌های سرمایشی ما را متحول کرد. در سه ماه اول ۲۸٪ هزینه انرژی را کاهش دادیم.', ar: 'أرواند سمارت كونترول غيرت طريقة إدارة أنظمة التبريد لدينا. خفضنا تكاليف الطاقة بنسبة ٢٨٪ في الأشهر الثلاثة الأولى.' },
  },
  {
    name: 'Sara Ahmadi',
    role: { en: 'Chief Engineer', fa: 'مهندس ارشد', ar: 'كبير المهندسين' },
    company: { en: 'Pars Hospital', fa: 'بیمارستان پارس', ar: 'مستشفى بارس' },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: { en: 'The predictive maintenance feature is a game-changer. We caught a critical compressor failure before it happened.', fa: 'ویژگی نگهداری پیش‌بینانه یک تغییر بزرگ است. یک خرابی بحرانی کمپرسور را قبل از وقوع تشخیص دادیم.', ar: 'ميزة الصيانة التنبؤية هي تغيير جذري. اكتشفنا عطلاً حرجاً في الضاغط قبل حدوثه.' },
  },
  {
    name: 'Ali Karimi',
    role: { en: 'Technical Director', fa: 'مدیر فنی', ar: 'المدير الفني' },
    company: { en: 'Kish Hotel', fa: 'هتل کیش', ar: 'فندق كيش' },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote: { en: 'Having all our chillers on a single dashboard with real-time data is incredible. The anomaly detection alerts us instantly.', fa: 'داشتن تمام چیلرهای ما روی یک داشبورد با داده‌های لحظه‌ای فوق‌العاده است. تشخیص ناهنجاری به محض بروز مشکل هشدار می‌دهد.', ar: 'وجود جميع مبرداتنا على لوحة تحكم واحدة ببيانات لحظية أمر لا يصدق. كشف الشذوذ ينبهنا فوراً.' },
  },
  {
    name: 'Fatemeh Hosseini',
    role: { en: 'Energy Manager', fa: 'مدیر انرژی', ar: 'مدير الطاقة' },
    company: { en: 'Iran Mall', fa: 'ایران مال', ar: 'إيران مول' },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: { en: 'The energy analytics module helped us identify inefficiencies we didn\'t know existed. We saved 35% on cooling costs.', fa: 'ماژول تحلیل انرژی به ما کمک کرد ناکارآمدی‌هایی را که نمی‌دانستیم شناسایی کنیم. ۳۵٪ در هزینه‌های سرمایش صرفه‌جویی کردیم.', ar: 'وحدة تحليلات الطاقة ساعدتنا في تحديد أوجه القصور التي لم نكن نعرفها. وفرنا ٣٥٪ على تكاليف التبريد.' },
  },
]

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()

  return (
    <section className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/3 blur-[120px]" />

      <div className="section-glow max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('testimonials.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-6 leading-[1.1]">
            {t('testimonials.title.part1')} <span className="text-primary block sm:inline">{t('testimonials.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('testimonials.subtitle')}
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
            className="!pb-12 sm:!pb-14"
          >
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={i}>
                <div className="card-command p-5 sm:p-6 md:p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-chart-4 text-chart-4" />
                    ))}
                  </div>
                  <p className="text-muted-foreground/80 leading-relaxed mb-4 sm:mb-6 flex-1 text-xs sm:text-sm">
                    &ldquo;{testimonial.quote[language] || testimonial.quote.en}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/40">
                    <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full overflow-hidden bg-secondary ring-1 ring-border/50 flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs sm:text-sm text-foreground/80 truncate">{testimonial.name}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground/50 data-text tracking-wider truncate">
                        {testimonial.role[language] || testimonial.role.en}
                        {' — '}
                        {testimonial.company[language] || testimonial.company.en}
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
