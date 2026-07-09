'use client'

import { motion } from 'motion/react'
import { Eye, Target, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'

const pillars = [
  {
    icon: Eye,
    title: { en: 'Carel Expertise', fa: 'تخصص Carel', ar: 'خبرة Carel' },
    desc: { en: 'Deep specialization in Carel pCO and c.series programmable controllers — with native support for 50+ controller models across 8 major brands. Our platform communicates directly via TCP/IP with no middleware or gateway.', fa: 'تخصص عمیق در کنترلرهای قابل برنامه‌ریزی Carel pCO و c.series — با پشتیبانی بومی از ۵۰+ مدل کنترلر در ۸ برند اصلی. پلتفرم ما مستقیماً از طریق TCP/IP بدون میان‌افزار یا گیت‌وی ارتباط برقرار می‌کند.', ar: 'تخصص عميق في وحدات التحكم القابلة للبرمجة Carel pCO و c.series — مع دعم أصلي لأكثر من ٥٠ نموذج وحدة تحكم عبر ٨ علامات تجارية رئيسية. منصتنا تتواصل مباشرة عبر TCP/IP بدون برمجيات وسيطة أو بوابة.' },
    stat: '50+',
    statLabel: { en: 'Controller Models', fa: 'مدل کنترلر', ar: 'نموذج وحدة تحكم' },
  },
  {
    icon: Target,
    title: { en: 'Proven Technology', fa: 'فناوری اثبات‌شده', ar: 'تقنية مثبتة' },
    desc: { en: 'Built on a production-grade stack: WebSocket live dashboards, proprietary Health Score algorithm, Z-score anomaly detection (>2.5σ), and tariff energy calculus — all battle-tested in real facilities across Iran.', fa: 'ساخته شده بر روی استک تولیدی: داشبوردهای زنده WebSocket، الگوریتم اختصاصی امتیاز سلامت، تشخیص ناهنجاری Z-Score (>۲.۵σ) و محاسبه انرژی تعرفه — همه در تأسیسات واقعی در سراسر ایران آزمایش شده‌اند.', ar: 'مبنية على مجموعة إنتاجية: لوحات تحكم حية WebSocket، خوارزمية درجة الصحة الملكية، كشف الشذوذ Z-Score (>٢.٥σ)، وحساب طاقة التعرفة — جميعها تم اختبارها في مرافق حقيقية في جميع أنحاء إيران.' },
    stat: '99.99%',
    statLabel: { en: 'Platform Uptime', fa: 'آپتایم پلتفرم', ar: 'وقت تشغيل المنصة' },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Secure & Scalable', fa: 'امن و مقیاس‌پذیر', ar: 'آمن وقابل للتوسع' },
    desc: { en: 'Multi-tenant architecture with organization-based isolation and role-based access (admin/viewer). TLS 1.3 in transit, AES-256 at rest, JWT + API Key + HMAC authentication. Scales from single-site monitoring to enterprise-level multi-facility deployments.', fa: 'معماری چندمستأجری با ایزولاسیون مبتنی بر سازمان و دسترسی مبتنی بر نقش (مدیر/بیننده). TLS 1.3 در انتقال، AES-256 در ذخیره، احراز هویت JWT + API Key + HMAC. مقیاس‌پذیری از نظارت تک‌مکانی تا استقرارهای چند تأسیساتی سازمانی.', ar: 'معمارية متعددة المستأجرين مع عزل قائم على المؤسسة ووصول قائم على الدور (مدخل/مشاهد). TLS 1.3 أثناء النقل، AES-256 عند التخزين، مصادقة JWT + API Key + HMAC. يتوسع من مراقبة موقع واحد إلى نشر مؤسسي متعدد المرافق.' },
    stat: '100%',
    statLabel: { en: 'Data Protection', fa: 'حفاظت از داده', ar: 'حماية البيانات' },
  },
]

export function AboutSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 6, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()

  return (
    <section id="about" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div style={{ rotateX, scale, y }} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — no badge, just heading for variety */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('why.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('why.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('about.subtitle.simple')}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-command p-6 sm:p-8 flex flex-col group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div className="text-end ms-2">
                    <div className="text-lg sm:text-xl font-bold font-mono text-primary">{pillar.stat}</div>
                    <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/40 tracking-widest">
                      {pillar.statLabel[language] || pillar.statLabel.en}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground/90">
                  {pillar.title[language] || pillar.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed flex-1">
                  {pillar.desc[language] || pillar.desc.en}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
