'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Monitor } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { ThemeLanguageSwitcher } from './theme-language-switcher'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((p) => !p)

  // Stable ref avoids re-registering the scroll listener on every open/close
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  // ── Scroll: update bg + auto-close menu on scroll ──────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      if (isOpenRef.current) setIsOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Lock body scroll while menu is open ────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ── Escape key closes menu ─────────────────────────────────
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const navItems = [
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.articles'), href: '#articles' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  // ── Measure content height for smooth slide animation ──────
  const [menuHeight, setMenuHeight] = useState(0)
  const menuContentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (menuContentRef.current) {
      setMenuHeight(menuContentRef.current.scrollHeight)
    } else {
      setMenuHeight(0)
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop overlay — tap anywhere to close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

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

            {/* Desktop nav (hidden below md) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {item.name}
                </Link>
              ))}
              <div className="ms-2 flex items-center gap-2">
                <ThemeLanguageSwitcher />
                <Link href="/admin">
                  <Button size="sm">{t('nav.admin')}</Button>
                </Link>
              </div>
            </nav>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-1">
              <ThemeLanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="active:scale-90 transition-transform"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu — slides down with measured height */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: menuHeight || 0, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2 },
                }}
                className="md:hidden overflow-hidden"
              >
                <div ref={menuContentRef} className="py-3 space-y-0.5 border-t border-border/50">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors active:bg-secondary/70"
                      onClick={close}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 px-4 pb-1">
                    <Link href="/admin" onClick={close}>
                      <Button className="w-full" size="sm">{t('nav.admin')}</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
