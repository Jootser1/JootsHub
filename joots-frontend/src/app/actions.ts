'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:contact@joots.app',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

let subscription: PushSubscription | null = null

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  // Dans un environnement de production, vous voudriez stocker l'abonnement dans une base de données
  // Par exemple: await db.subscriptions.create({ data: sub })
  return { success: true }
}

export async function unsubscribeUser() {
  subscription = null
  // Dans un environnement de production, vous voudriez supprimer l'abonnement de la base de données
  // Par exemple: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('Aucun abonnement disponible')
  }

  try {
    await webpush.sendNotification(
      subscription as any,
      JSON.stringify({
        title: 'JOOTS',
        body: message,
        icon: '/web-app-manifest-192x192.png',
        badge: '/web-app-manifest-192x192.png',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification push:', error)
    return { success: false, error: 'Échec de l\'envoi de la notification' }
  }
} 