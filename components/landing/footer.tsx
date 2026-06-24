'use client'

import { Monitor, Github, Linkedin, Twitter } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Product',
    title_fa: 'محصولات',
    links: [
      { label: 'ASC-2000', href: '#products' },
      { label: 'ASC-1000', href: '#products' },
      { label: 'Arvand Cloud', href: '#products' },
      { label: 'Pricing', label_fa: 'قیمت‌گذاری', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    title_fa: 'شرکت',
    links: [
      { label: 'About', label_fa: 'درباره ما', href: '#about' },
      { label: 'Blog', label_fa: 'وبلاگ', href: '#articles' },
      { label: 'Careers', label_fa: 'فرصت‌های شغلی', href: '#' },
      { label: 'Contact', label_fa: 'تماس', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    title_fa: 'منابع',
    links: [
      { label: 'Documentation', label_fa: 'مستندات', href: '#' },
      { label: 'API Reference', label_fa: 'مرجع API', href: '#' },
      { label: 'Support', label_fa: 'پشتیبانی', href: '#contact' },
      { label: 'Status', label_fa: 'وضعیت', href: '#' },
    ],
  },
  {
    title: 'Legal',
    title_fa: 'قانونی',
    links: [
      { label: 'Privacy Policy', label_fa: 'حریم خصوصی', href: '#' },
      { label: 'Terms of Service', label_fa: 'شرایط استفاده', href: '#' },
      { label: 'Cookie Policy', label_fa: 'سیاست کوکی', href: '#' },
      { label: 'License', label_fa: 'مجوز', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        {/* Top section: Logo + Social */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-14">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Monitor className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-foreground leading-tight">
                Arvand<span className="text-primary">SmartControl</span>
              </div>
              <div className="data-text text-[8px] sm:text-[9px] text-muted-foreground/30 tracking-[0.15em]">SYSTEM v3.0</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-border/60 bg-card flex items-center justify-center text-muted-foreground/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs sm:text-sm font-bold text-foreground/80 mb-3 sm:mb-4 data-text tracking-wider">
                {language === 'fa' ? group.title_fa : group.title}
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {language === 'fa' && link.label_fa ? link.label_fa : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground/40 data-text">
            &copy; {new Date().getFullYear()} ArvandSmartControl. {language === 'fa' ? 'تمام حقوق محفوظ است.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] data-text text-muted-foreground/30 tracking-wider">
            <span>SYSTEM v3.0</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span>BUILD 2024.12</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-chart-3 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
