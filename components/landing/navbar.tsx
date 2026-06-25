'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Monitor } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { ThemeLanguageSwitcher } from './theme-language-switcher'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.articles'), href: '#articles' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-command' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg group-hover:bg-primary/30 transition-all" />
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/30">
                <Monitor className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="hidden xs:block">
              <span className="text-sm font-bold tracking-tight">Arvand</span>
              <span className="text-sm font-bold text-primary">SmartControl</span>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              >
                {item.name}
              </Link>
            ))}
            <div className="ms-2 flex items-center gap-2">
              <ThemeLanguageSwitcher />
              <Link href="/admin">
                <Button size="sm">
                  {t('nav.admin')}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeLanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { opacity: 1, pointerEvents: 'auto' as const } : { opacity: 0, pointerEvents: 'none' as const }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-3 space-y-0.5 border-t border-border/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors active:bg-secondary/70"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 px-4 pb-1">
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="sm">{t('nav.admin')}</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
