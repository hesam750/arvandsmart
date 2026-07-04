"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTheme } from "next-themes"
import { useLanguage, type Language } from "@/lib/i18n/language-context"
import { Sun, Moon, Globe, Check } from "lucide-react"

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "fa", name: "Persian", nativeName: "فارسی" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
]

export function ThemeLanguageSwitcher() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isLangOpen, setIsLangOpen] = useState(false)

  const currentLang = languages.find((l) => l.code === language)

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-secondary"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-4 w-4 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-4 w-4 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Language Switcher */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex h-9 items-center gap-2 rounded-lg border bg-card px-3 transition-colors hover:bg-secondary"
        >
          <Globe className="h-4 w-4 text-foreground" />
          <span className="text-sm font-medium text-foreground">
            {currentLang?.nativeName}
          </span>
        </motion.button>

        <AnimatePresence>
          {isLangOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-border/50 bg-card/95 shadow-xl backdrop-blur-xl"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsLangOpen(false)
                    }}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-start text-sm transition-colors hover:bg-muted"
                  >
                    <span className="text-foreground">{lang.nativeName}</span>
                    {language === lang.code && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
