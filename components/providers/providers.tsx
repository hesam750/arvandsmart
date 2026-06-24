"use client"

import { ThemeProvider } from "./theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { translations } from "@/lib/i18n/translations"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider translations={translations}>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
