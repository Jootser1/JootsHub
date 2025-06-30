'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocalizedPath, useLocale } from './useTranslations'

export function useSettingsNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const getLocalizedPath = useLocalizedPath()

  const navigateToSettings = () => {
    // Extraire le chemin sans la locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    // Ne pas sauvegarder si on est déjà sur Settings (évite les boucles)
    if (pathWithoutLocale !== '/settings') {
      // Sauvegarder dans sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('settings-previous-path', pathWithoutLocale)
      }
    }
    
    // Naviguer vers Settings
    router.push(getLocalizedPath('/settings'))
  }

  return { navigateToSettings }
} 