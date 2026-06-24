'use client'

import Link from 'next/link'
import { Monitor, Linkedin, Twitter, Youtube, MapPin, Radio } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

export function Footer() {
  const { t, language } = useLanguage()

  const footerLinks = {
    [t('footer.products')]: [
      { name: t('footer.chillers'), href: '#products' },
      { name: t('footer.semiIndustrial'), href: '#products' },
      { name: t('footer.smartControl'), href: '#features' },
    ],
    [t('footer.company')]: [
      { name: t('footer.about'), href: '#about' },
      { name: t('footer.articles'), href: '#articles' },
      { name: t('footer.contact'), href: '#contact' },
      { name: t('footer.careers'), href: '#' },
    ],
    [t('footer.resources')]: [
      { name: t('footer.documents'), href: '#' },
      { name: t('footer.guides'), href: '#' },
      { name: t('footer.support'), href: '#' },
      { name: t('footer.faq'), href: '#' },
    ],
    [t('footer.legal')]: [
      { name: t('footer.privacy'), href: '#' },
      { name: t('footer.terms'), href: '#' },
    ],
  }

  return (
    <footer className="border-t border-border/40 bg-background">
      {/* Top bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg group-hover:bg-primary/30 transition-all" />
                <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                Arvand<span className="text-primary">SmartControl</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground/60 max-w-xs mb-6 leading-relaxed font-mono text-[13px]">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg border border-border/40 bg-card/40 flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold font-mono tracking-wider text-foreground/60 mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/40 data-text tracking-wider">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-muted-foreground/40 data-text tracking-wider">
              <MapPin className="w-3 h-3" />
              {t('contact.address')}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/30 data-text">
              <Radio className="w-3 h-3" />
              SYSTEM v3.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
