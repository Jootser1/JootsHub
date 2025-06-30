import { fr, enUS, es } from 'date-fns/locale'
import type { Locale } from '@/types/i18n'

export const getDateFnsLocale = (locale: Locale) => {
  switch (locale) {
    case 'fr-FR':
      return fr
    case 'en-US':
      return enUS
    case 'es-ES':
      return es
    default:
      return fr
  }
} 