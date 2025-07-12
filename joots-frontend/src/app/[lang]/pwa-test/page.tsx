import { PushNotificationManager, InstallPrompt } from '@/components/PWAComponents'

export default function PWATestPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Test PWA - JOOTS</h1>
        <p className="text-gray-600">
          Testez les fonctionnalités de votre Progressive Web App
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <InstallPrompt />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Notifications Push</h2>
          <PushNotificationManager />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions :</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Assurez-vous que les clés VAPID sont configurées dans .env.local</li>
          <li>• Testez en mode développement avec HTTPS : <code className="bg-blue-100 px-1 rounded">next dev --experimental-https</code></li>
          <li>• Acceptez les permissions de notifications quand demandées</li>
          <li>• Sur mobile, ajoutez l'app à l'écran d'accueil pour tester</li>
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">Fonctionnalités PWA activées :</h3>
        <ul className="text-green-700 space-y-1 text-sm">
          <li>✅ Manifest web app configuré</li>
          <li>✅ Service Worker avec notifications push</li>
          <li>✅ Installation sur l'écran d'accueil</li>
          <li>✅ Headers de sécurité configurés</li>
          <li>✅ Icônes optimisées</li>
        </ul>
      </div>
    </div>
  )
} 