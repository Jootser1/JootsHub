'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { Dictionary, Locale } from '@/types/i18n'

interface TranslationContextType {
  dictionary: Dictionary
  locale: Locale
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({
  children,
  dictionary,
  locale,
}: {
  children: ReactNode
  dictionary: Dictionary
  locale: Locale
}) {
  return (
    <TranslationContext.Provider value={{ dictionary, locale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationProvider')
  }
  return context
} 