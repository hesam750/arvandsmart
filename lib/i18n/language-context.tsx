"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export type Language = "en" | "fa" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  dir: "ltr" | "rtl"
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
  translations: Record<Language, Record<string, string>>
}

export function LanguageProvider({ children, translations }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("fa")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language
    if (saved && ["en", "fa", "ar"].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }, [])

  const dir = language === "en" ? "ltr" : "rtl"

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key
  }, [language, translations])

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = dir
      document.documentElement.lang = language
    }
  }, [dir, language, mounted])

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
