self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/web-app-manifest-192x192.png',
      badge: '/web-app-manifest-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('Clic sur la notification reçu.')
  event.notification.close()
  event.waitUntil(clients.openWindow('https://joots.app'))
})

self.addEventListener('install', function (event) {
  console.log('Service Worker installé')
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  console.log('Service Worker activé')
  event.waitUntil(clients.claim())
}) 