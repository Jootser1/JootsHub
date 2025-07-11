import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joots - Connectez-vous autrement',
  description: 'Joots révolutionne vos interactions sociales avec une plateforme innovante qui privilégie l\'authenticité et les connexions significatives.',
  keywords: ['joots', 'social', 'connexions', 'authentique', 'plateforme sociale'],
  authors: [{ name: 'Joots' }],
  creator: 'Joots',
  publisher: 'Joots',
  openGraph: {
    title: 'Joots - Connectez-vous autrement',
    description: 'Joots révolutionne vos interactions sociales avec une plateforme innovante qui privilégie l\'authenticité et les connexions significatives.',
    url: 'https://www.joots.com',
    siteName: 'Joots',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joots - Connectez-vous autrement',
    description: 'Joots révolutionne vos interactions sociales avec une plateforme innovante qui privilégie l\'authenticité et les connexions significatives.',
    creator: '@joots',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full antialiased">
        {children}
      </body>
    </html>
  );
} 