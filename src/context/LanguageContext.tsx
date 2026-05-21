import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Language, type Translations, t as translate } from '../data/translations'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: keyof Translations, vars?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  const t = useCallback(
    (key: keyof Translations, vars?: Record<string, string>) => translate(lang, key, vars),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
