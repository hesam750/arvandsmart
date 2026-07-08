'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/lib/i18n/language-context'
import { ThemeLanguageSwitcher } from '@/components/landing/theme-language-switcher'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Menu,
  X,
  LogOut,
  Home,
  Loader2,
} from 'lucide-react'

export default function AdminShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t, dir } = useLanguage()
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const loading = status === 'loading'

  useEffect(() => {
    setIsMounted(true)
    setIsDesktop(window.innerWidth >= 1024)
    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  // Noindex admin pages from search engines (client-side fallback)
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', 'noindex, nofollow')
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground font-mono tracking-wider">AUTHENTICATING...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { name: t('admin.dashboard'), href: '/admin', icon: LayoutDashboard },
    { name: t('admin.articles'), href: '/admin/articles', icon: FileText },
    { name: t('admin.products'), href: '/admin/products', icon: Package },
    { name: t('admin.messages'), href: '/admin/messages', icon: MessageSquare },
    { name: t('admin.settings'), href: '/admin/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 bottom-0 start-0 z-40 hidden lg:flex flex-col border-e border-border/40 bg-card/40"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/30">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 border border-primary/20">
              <Monitor className="w-5 h-5 text-primary" />
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-base font-bold tracking-tight overflow-hidden whitespace-nowrap"
                >
                  Arvand<span className="text-primary">SmartControl</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            ) : (
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                    active
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'text-muted-foreground/70 hover:text-foreground hover:bg-secondary/50 border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium overflow-hidden whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 space-y-1.5">
          <Link href="/">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all text-sm border border-transparent">
              <Home className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium overflow-hidden whitespace-nowrap"
                  >
                    {t('admin.backToSite')}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground/70 hover:text-destructive hover:bg-destructive/5 transition-all text-sm border border-transparent"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium overflow-hidden whitespace-nowrap"
                >
                  {t('admin.logout')}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 start-0 end-0 z-40 flex items-center justify-between h-16 px-4 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 border border-primary/20">
            <Monitor className="w-5 h-5 text-primary" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Arvand<span className="text-primary">SmartControl</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeLanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-16 start-0 end-0 z-30 p-4 border-b border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                        active
                          ? 'bg-primary/15 text-primary border border-primary/20'
                          : 'text-muted-foreground/70 hover:text-foreground hover:bg-secondary/50 border border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                )
              })}
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all text-sm border border-transparent">
                  <Home className="w-5 h-5" />
                  <span className="font-medium">{t('admin.backToSite')}</span>
                </div>
              </Link>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground/70 hover:text-destructive hover:bg-destructive/5 transition-all text-sm border border-transparent"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{t('admin.logout')}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{
          marginInlineStart: isDesktop
            ? (isSidebarOpen ? 280 : 80)
            : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-16 lg:pt-0"
      >
        {/* Top Bar */}
        <div className="hidden lg:flex items-center justify-between h-16 px-6 border-b border-border/30 bg-background/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
            <h1 className="text-base font-semibold">{t('admin.title')}</h1>
          </div>
          <ThemeLanguageSwitcher />
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </motion.main>
    </div>
  )
}
