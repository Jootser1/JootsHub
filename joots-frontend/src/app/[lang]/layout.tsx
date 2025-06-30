import { Providers } from '../Providers'
import '@/styles/globals.css'
import React, { ReactNode } from 'react'
import { TranslationProvider } from '@/contexts/TranslationContext'
import { getDictionary } from './dictionaries'

// Génération des paramètres statiques pour les locales supportées
export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'fr-FR' }, { lang: 'es-ES' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ lang: 'en-US' | 'fr-FR' | 'es-ES' }>
}>) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  
  return (
    <html lang={lang}>
      <body>
        <Providers>
          <TranslationProvider dictionary={dictionary} locale={lang}>
            {children}
          </TranslationProvider>
        </Providers>
      </body>
    </html>
  )
} 