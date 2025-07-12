import type { MetadataRoute } from 'next'

export default async function manifest({
  params,
}: {
  params: Promise<{ lang: 'en-US' | 'fr-FR' | 'es-ES' }>
}): Promise<MetadataRoute.Manifest> {
  const { lang } = await params

  // Déterminer la langue pour la description
  const descriptions = {
    'fr-FR': 'JOOTS est une application sociale qui vous permet de découvrir de nouvelles personnes pour qui elles sont vraiment et non à quoi elles ressemblent.',
    'en-US': 'JOOTS is a social app that allows you to discover new people for who they really are and not what they look like.',
    'es-ES': 'JOOTS es una aplicación social que te permite descubrir nuevas personas por quienes realmente son y no por cómo se ven.',
  }

  const names = {
    'fr-FR': 'JOOTS',
    'en-US': 'JOOTS',
    'es-ES': 'JOOTS',
  }

  return {
    name: names[lang] || names['fr-FR'],
    short_name: 'JOOTS',
    description: descriptions[lang] || descriptions['fr-FR'],
    start_url: `/${lang}/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5211CE',
    orientation: 'portrait',
    scope: `/${lang}/`,
    lang: lang.toLowerCase().replace('-', '_'), // fr_fr au lieu de fr-FR
    categories: ['social', 'networking'],
    screenshots: [
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ],
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
  }
} 