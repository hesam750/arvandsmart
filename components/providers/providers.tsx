"use client"

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'
import { LanguageProvider } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <LanguageProvider translations={translations}>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
