import 'server-only'
import { Locale } from '@/types/i18n'

const dictionaries = {
  'fr-FR': () => import('./dictionaries/fr.json').then((module) => module.default),
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-ES': () => import('./dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries['fr-FR']()
} 