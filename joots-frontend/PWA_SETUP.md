# Configuration PWA pour JOOTS

## ✅ Fonctionnalités PWA Implémentées

### 1. Manifest Web App
- **Fichier** : `src/app/manifest.ts`
- Application installable sur l'écran d'accueil
- Icônes optimisées (192x192, 512x512)
- Mode standalone pour une expérience native

### 2. Service Worker
- **Fichier** : `public/sw.js`
- Gestion des notifications push
- Installation automatique
- Événements de clic sur notifications

### 3. Notifications Push
- **Composant** : `src/components/PWAComponents.tsx`
- **Actions** : `src/app/actions.ts`
- Abonnement/désabonnement aux notifications
- Envoi de notifications de test

### 4. Configuration Next.js
- **Fichier** : `next.config.js`
- Plugin `next-pwa` configuré
- Headers de sécurité pour PWA
- Service worker généré automatiquement en production

## 🔧 Configuration Requise

### 1. Variables d'Environnement
Créez le fichier `.env.local` avec vos clés VAPID :

```env
# Clés VAPID pour les notifications push
NEXT_PUBLIC_VAPID_PUBLIC_KEY=votre_clé_publique_ici
VAPID_PRIVATE_KEY=votre_clé_privée_ici
```

### 2. Installation des Dépendances
```bash
npm install web-push @types/web-push
```

## 🧪 Test de la PWA

### Page de Test
Accédez à : `/fr/pwa-test` (ou votre langue par défaut)

### Test en Développement
```bash
# Lancer avec HTTPS (requis pour les notifications)
npm run dev -- --experimental-https
```

### Vérifications
1. **Installation** : Vérifiez que le prompt d'installation apparaît
2. **Notifications** : Testez l'abonnement et l'envoi de notifications
3. **Service Worker** : Vérifiez dans DevTools > Application > Service Workers
4. **Manifest** : Vérifiez dans DevTools > Application > Manifest

## 📱 Test sur Mobile

### iOS (16.4+)
- Ajoutez l'app à l'écran d'accueil via Safari
- Les notifications push fonctionnent uniquement depuis l'écran d'accueil

### Android
- Prompt d'installation automatique
- Notifications push depuis le navigateur et l'app installée

## 🚀 Déploiement

### Vérifications Avant Production
- [ ] Clés VAPID configurées
- [ ] HTTPS activé sur le domaine
- [ ] Service worker accessible sur `/sw.js`
- [ ] Manifest accessible sur `/manifest.json`

### Test de Build
```bash
npm run build
npm start
```

## 🔍 Débogage

### Outils Utiles
- **Lighthouse** : Audit PWA
- **DevTools** : Application > Service Workers, Manifest
- **Chrome** : chrome://inspect/#service-workers

### Problèmes Courants
1. **Notifications ne marchent pas** : Vérifiez HTTPS et permissions
2. **Service Worker ne s'installe pas** : Vérifiez la console pour erreurs
3. **Pas de prompt d'installation** : Vérifiez le manifest et HTTPS

## 📋 Prochaines Étapes

### Fonctionnalités Avancées
- [ ] Support offline avec cache
- [ ] Background sync
- [ ] Partage natif
- [ ] Raccourcis d'application

### Optimisations
- [ ] Stratégies de cache personnalisées
- [ ] Préchargement des ressources critiques
- [ ] Analytics PWA

---

**Note** : Cette configuration utilise `next-pwa` pour simplifier la gestion du service worker et du manifest. Pour une configuration plus avancée, consultez la documentation officielle de Next.js PWA. 