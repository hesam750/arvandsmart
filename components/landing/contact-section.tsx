'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/lib/i18n/language-context'
import { submitContact } from '@/lib/data-service'

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await submitContact(formState)
      setSent(true)
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      // ignore
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

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
            {t('contact.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed font-mono">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="card-command p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/10">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] data-text text-muted-foreground/50 tracking-widest mb-0.5">{t('contact.phone.label')}</div>
                <div className="font-semibold font-mono text-sm">+98 21 1234 5678</div>
              </div>
            </div>
            <div className="card-command p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/10">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] data-text text-muted-foreground/50 tracking-widest mb-0.5">{t('contact.email.label')}</div>
                <div className="font-semibold font-mono text-sm">info@arvandchiller.com</div>
              </div>
            </div>
            <div className="card-command p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] data-text text-muted-foreground/50 tracking-widest mb-0.5">{t('contact.address.label')}</div>
                <div className="font-semibold font-mono text-sm">{t('contact.address')}</div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-command p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-chart-3 mb-4" />
                  <h3 className="text-xl font-bold mb-2 font-mono text-foreground/80">{t('contact.success')}</h3>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider mb-1.5">{t('contact.name')}</label>
                      <Input name="name" value={formState.name} onChange={e => setFormState(p => ({ ...p, name: e.target.value }))} required className="bg-background/50 border-border/40" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider mb-1.5">{t('contact.email')}</label>
                      <Input name="email" type="email" value={formState.email} onChange={e => setFormState(p => ({ ...p, email: e.target.value }))} required className="bg-background/50 border-border/40" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider mb-1.5">{t('contact.phone')}</label>
                      <Input name="phone" value={formState.phone} onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))} className="bg-background/50 border-border/40" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider mb-1.5">{t('contact.subject')}</label>
                      <Input name="subject" value={formState.subject} onChange={e => setFormState(p => ({ ...p, subject: e.target.value }))} required className="bg-background/50 border-border/40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider mb-1.5">{t('contact.message')}</label>
                    <Textarea name="message" value={formState.message} onChange={e => setFormState(p => ({ ...p, message: e.target.value }))} required rows={5} className="resize-none bg-background/50 border-border/40" />
                  </div>
                  <Button type="submit" disabled={sending} className="w-full py-5">
                    {sending ? (
                      <><Loader2 className="w-4 h-4 me-2 animate-spin" />{t('contact.sending')}</>
                    ) : (
                      <><Send className="w-4 h-4 me-2" />{t('contact.submit')}</>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
