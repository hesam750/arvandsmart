'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Snowflake, Check, ArrowLeft, ArrowRight, Gauge, Thermometer, Zap, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import type { Product } from '@/lib/types'
import { getProducts } from '@/lib/data-service'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

export function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then(res => {
      if (res.success && res.data) setProducts(res.data)
    })
  }, [])

  return (
    <section id="products" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute bottom-1/3 left-0 w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
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
            {t('products.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            {t('products.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed font-mono">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Products Carousel */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-4"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="card-command p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    {/* Product header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/10">
                        <Snowflake className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground/90">{product.name}</h3>
                        <p className="text-xs text-muted-foreground/60 data-text tracking-wider">
                          {language === 'fa' ? product.tagline : product.tagline_en}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground/70 mb-5 flex-1 leading-relaxed">
                      {language === 'fa' ? product.description : product.description_en}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {product.specs.slice(0, 4).map((spec) => (
                        <div key={spec.label} className="rounded-lg border border-border/30 bg-background/30 p-2.5">
                          <div className="text-[10px] data-text text-muted-foreground/40 tracking-widest">
                            {language === 'fa' ? spec.label : spec.label_en}
                          </div>
                          <div className="text-sm font-mono font-semibold mt-0.5 text-foreground/90">{spec.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5">
                      {(language === 'fa' ? product.features : product.features_en).slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground/70">
                          <Check className="w-3.5 h-3.5 text-chart-3 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button className="swiper-prev w-10 h-10 rounded-full border border-border/40 bg-card/50 flex items-center justify-center hover:bg-card transition-colors text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground/50 data-text tracking-wider">
                {language === 'fa' ? 'کشیدن برای مشاهده' : 'SWIPE TO EXPLORE'}
              </span>
              <button className="swiper-next w-10 h-10 rounded-full border border-border/40 bg-card/50 flex items-center justify-center hover:bg-card transition-colors text-muted-foreground hover:text-foreground">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
