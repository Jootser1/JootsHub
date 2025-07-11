'use client'

import { useParams } from 'next/navigation'
import type { Locale } from '@/types/i18n'

// Hook pour récupérer la locale actuelle côté client
export function useLocale(): Locale {
  const params = useParams()
  return (params?.lang as Locale) || 'fr-FR'
}

// Helper pour construire des URLs avec la locale
export function useLocalizedPath() {
  const locale = useLocale()
  
  return (path: string) => {
    // Supprime le slash initial s'il existe
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `/${locale}/${cleanPath}`
  }
} 