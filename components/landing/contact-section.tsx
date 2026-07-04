'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Phone, MapPin, Mail, Send, CheckCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const contactInfo = [
  {
    icon: Phone,
    title: { en: 'Phone', fa: 'تلفن', ar: 'هاتف' },
    value: { en: '+989021584678', fa: '+989021584678', ar: '+989021584678' },
    href: 'tel:+989165760896',
  },
  {
    icon: Mail,
    title: { en: 'Email', fa: 'ایمیل', ar: 'بريد إلكتروني' },
    value: { en: 'hesamnaderi75@gmail.com', fa: 'hesamnaderi75@gmail.com', ar: 'hesamnaderi75@gmail.com' },
    href: 'hesamnaderi75@gmail.com',
  },
  {
    icon: MapPin,
    title: { en: 'Address', fa: 'آدرس', ar: 'العنوان' },
    value: { en: 'Tehran, Iran', fa: 'تهران، ایران', ar: 'طهران، إيران' },
  },
]

export function ContactSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div style={{ rotateX, scale, y }} className="section-glow max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('contact.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5 sm:gap-6">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-command p-5 sm:p-6 flex items-center gap-4 sm:gap-5 group hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 flex-shrink-0">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs data-text text-muted-foreground/50 tracking-wider mb-0.5">{info.title[language] || info.title.en}</div>
                    <div
                      className="text-sm sm:text-base text-foreground/80 font-medium truncate"
                      dir={info.icon === Phone || info.icon === Mail ? 'ltr' : undefined}
                    >
                      {info.value[language] || info.value.en}
                    </div>
                  </div>
                </motion.div>
              )

              return info.href ? (
                <a key={info.title.en} href={info.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={info.title.en}>{content}</div>
              )
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 card-command p-5 sm:p-6 md:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 sm:py-14">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-chart-3 mb-4 sm:mb-5" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {t('contact.success')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/70 text-center max-w-sm">
                  {t('contact.success.desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5 sm:mb-2">
                      {t('contact.name')} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      required
                      placeholder={t('contact.name')}
                      className="bg-background/50 border-border/40 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5 sm:mb-2">
                      {t('contact.email')} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder={t('contact.email')}
                      className="bg-background/50 border-border/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5 sm:mb-2">
                    {t('contact.subject')}
                  </label>
                  <Input
                    placeholder={t('contact.subject')}
                    className="bg-background/50 border-border/40 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5 sm:mb-2">
                    {t('contact.message')} <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder={t('contact.message')}
                    className="bg-background/50 border-border/40 text-sm resize-none"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full text-sm">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 me-2 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 me-2" />
                      {t('contact.submit')}
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
