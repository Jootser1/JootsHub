'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from '@/hooks/useTranslations'
import type { Locale } from '@/types/i18n'

const languages = {
  'fr-FR': { name: 'Français', flag: '🇫🇷' },
  'en-US': { name: 'English', flag: '🇺🇸' },
  'es-ES': { name: 'Español', flag: '🇪🇸' },
} as const

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleLanguageChange = (newLocale: Locale) => {
    // Remplace la locale actuelle dans l'URL
    const segments = pathname.split('/')
    segments[1] = newLocale // La locale est toujours le premier segment après /
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {Object.entries(languages).map(([locale, config]) => (
          <option key={locale} value={locale}>
            {config.flag} {config.name}
          </option>
        ))}
      </select>
    </div>
  )
} 