import { redirect } from 'next/navigation'
import { getDictionary } from './dictionaries'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: 'en-US' | 'fr-FR' | 'es-ES' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  // On garde la redirection mais maintenant avec la locale
  redirect(`/${lang}/login`)
  return null
} 