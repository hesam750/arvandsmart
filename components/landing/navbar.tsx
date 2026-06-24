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
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-command' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg group-hover:bg-primary/30 transition-all" />
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/30">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight">Arvand</span>
              <span className="text-base font-bold text-primary">SmartControl</span>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              >
                {item.name}
              </Link>
            ))}
            <div className="ms-3 flex items-center gap-2">
              <ThemeLanguageSwitcher />
              <Link href="/admin">
                <Button size="sm">
                  {t('nav.admin')}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeLanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-1 border-t border-border mb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 px-4">
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
