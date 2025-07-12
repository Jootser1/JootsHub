'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerSW()
    }
  }, [])

  async function registerSW() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    await subscribeUser(sub)
    toast.success('Abonné aux notifications push!')
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
    toast.success('Désabonné des notifications push!')
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
      toast.success('Notification envoyée!')
    }
  }

  if (!isSupported) {
    return <p>Les notifications Push ne sont pas supportées dans ce navigateur.</p>
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Notifications Push</h3>
      
      {subscription ? (
        <>
          <p className="text-green-600">✅ Abonné aux notifications</p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Message de test"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="space-x-2">
              <Button 
                onClick={sendTestNotification}
                disabled={!message.trim()}
              >
                Envoyer notification test
              </Button>
              <Button 
                onClick={unsubscribeFromPush}
                variant="outline"
              >
                Se désabonner
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600">Pas encore abonné aux notifications</p>
          <Button onClick={subscribeToPush}>
            S'abonner aux notifications
          </Button>
        </>
      )}
    </div>
  )
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        toast.success('Application installée!')
      }
    }
  }

  if (isStandalone) {
    return null // Ne pas afficher le bouton d'installation si déjà installé
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Installer l'Application</h3>
      
      {deferredPrompt && (
        <Button onClick={installApp} className="w-full">
          📱 Ajouter à l'écran d'accueil
        </Button>
      )}
      
      {isIOS && !deferredPrompt && (
        <div className="space-y-2">
          <Button disabled className="w-full">
            📱 Ajouter à l'écran d'accueil
          </Button>
          <p className="text-sm text-gray-600">
            Pour installer cette app sur votre appareil iOS, appuyez sur le bouton de partage
            <span role="img" aria-label="share icon"> ⎋ </span>
            puis "Ajouter à l'écran d'accueil"
            <span role="img" aria-label="plus icon"> ➕ </span>.
          </p>
        </div>
      )}
      
      {!isIOS && !deferredPrompt && (
        <p className="text-sm text-gray-600">
          Votre navigateur ne supporte pas l'installation automatique. 
          Vous pouvez utiliser les options de votre navigateur pour ajouter cette page à votre écran d'accueil.
        </p>
      )}
    </div>
  )
} 