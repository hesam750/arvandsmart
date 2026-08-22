'use client'

import { Monitor, Github, Linkedin } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'

type FooterLink = {
  label: string
  label_fa?: string
  href: string
  tKey?: string
}

type FooterLinkGroup = {
  title: string
  title_fa: string
  titleAr: string
  links: FooterLink[]
}

const footerLinks: FooterLinkGroup[] = [
  {
    title: 'Products',
    title_fa: 'محصولات',
    titleAr: 'المنتجات',
    links: [
      { label: 'Live Monitoring Hub', href: '#products' },
      { label: 'Health Score Engine', href: '#products' },
      { label: 'Remote Control Suite', href: '#products' },
      { label: 'API & Webhook Gateway', href: '#products' },
    ],
  },
  {
    title: 'Company',
    title_fa: 'شرکت',
    titleAr: 'الشركة',
    links: [
      { label: 'About', label_fa: 'درباره ما', href: '#about', tKey: 'footer.about' },
      { label: 'Blog', label_fa: 'وبلاگ', href: '/blog', tKey: 'footer.articles' },
      { label: 'Contact', label_fa: 'تماس', href: '#contact', tKey: 'footer.contact' },
      { label: 'Support', label_fa: 'پشتیبانی', href: '#contact', tKey: 'footer.support' },
    ],
  },
  // {
  //   title: 'Resources',
  //   title_fa: 'منابع',
  //   titleAr: 'الموارد',
  //   links: [
  //     { label: 'FAQ', label_fa: 'سوالات متداول', href: '#faq', tKey: 'footer.link.faq' },
  //   ],
  // },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/hesam750', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hesam-naderi-4252a4367', label: 'LinkedIn' },
]

export function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10">
        {/* Top section: Logo + Social */}
        {/* Top section: Logo + Social */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 mb-10 sm:mb-12 lg:mb-14">

  {/* Full Logo */}
  <Link
    href="/"
    className="inline-flex items-center group"
    aria-label="ArvandSmartControl"
  >
    <img
      src="/logo/arvandsmart.png"
      alt="ArvandSmartControl"
      className="
        w-auto
        h-14
        sm:h-16
        lg:h-[72px]
        max-w-[280px]
        sm:max-w-[340px]
        lg:max-w-[380px]
        object-contain
        object-left
        transition-all
        duration-300
        group-hover:scale-[1.02]
      "
      loading="eager"
      decoding="async"
    />
  </Link>

  {/* Social Links */}
  <div className="flex items-center gap-2">
    {socialLinks.map((social) => {
      const Icon = social.icon

      return (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-9 h-9
            sm:w-10 sm:h-10
            rounded-lg
            border border-border/60
            bg-card
            flex items-center justify-center
            text-muted-foreground/50
            hover:text-primary
            hover:border-primary/30
            hover:bg-primary/5
            transition-all
          "
          aria-label={social.label}
        >
          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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
                {group.titleAr && language === 'ar' ? group.titleAr : language === 'fa' ? group.title_fa : group.title}
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {link.tKey ? t(link.tKey) : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        {/* <div className="pt-6 sm:pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground/40 data-text">
            &copy; {new Date().getFullYear()} ArvandSmartControl. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] data-text text-muted-foreground/30 tracking-wider">
            <span>{t('footer.status')}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span>{t('footer.build')}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-chart-3 animate-pulse" />
              {t('footer.online')}
            </span>
          </div>
        </div> */}
      </div>
    </footer>
  )
}
