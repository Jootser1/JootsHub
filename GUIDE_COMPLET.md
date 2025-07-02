# 🚀 Guide Complet JootsHub - Développement HTTPS & PWA

Guide unifié pour configurer et utiliser JootsHub en développement avec HTTPS et PWA.

## 🎯 Démarrage Ultra-Rapide

```bash
# 1. Configuration initiale (une seule fois)
./scripts/setup.sh

# 2. Démarrage de l'application
./scripts/start.sh

# 3. Ouvrir https://localhost ✨
```

**C'est tout !** 🎉 Votre application PWA avec HTTPS est prête.

## 🏗️ Architecture

```
Client (Navigateur)
      ↓ HTTPS (443)
┌─────────────────┐
│   Nginx Proxy   │ ← Certificats SSL
│   (Reverse)     │
└─────────────────┘
      ↓ HTTPS          ↓ HTTPS
┌──────────────┐  ┌─────────────┐
│  Frontend    │  │  Backend    │ ← Certificats SSL
│  Next.js     │  │  NestJS     │
│  (3000)      │  │  (4000)     │
└──────────────┘  └─────────────┘
       │                  │
   ┌─────────┐    ┌─────────────┐
   │ Service │    │ PostgreSQL  │
   │ Worker  │    │   + Redis   │
   └─────────┘    └─────────────┘
```

## 🔧 Configuration Automatique

### Ce que fait `./scripts/setup.sh` :

- ✅ **Certificats SSL** → Génère nginx.crt/key + backend.crt/key + frontend.crt/key
- ✅ **Variables d'environnement** → Crée .env avec clés sécurisées auto-générées  
- ✅ **Structure dossiers** → nginx/ssl/backend/, nginx/ssl/frontend/, nginx/logs/
- ✅ **Permissions** → Configure automatiquement les droits d'accès
- ✅ **Validation** → Vérifie que clés et certificats correspondent

### Variables d'environnement créées :

#### Frontend (`joots-frontend/.env`)
```env
# URLs HTTPS
NEXT_PUBLIC_API_URL=https://localhost/api
API_INTERNAL_URL=https://backend:4000
NEXTAUTH_URL=https://localhost
NEXT_PUBLIC_WS_URL=wss://localhost/socket.io
NEXT_PUBLIC_SW_URL=https://localhost

# Clés auto-générées
NEXTAUTH_SECRET=<32+ caractères aléatoires>

# Environnement
NODE_ENV=development
```

#### Backend (`joots-backend/.env`)
```env
# Base de données
DATABASE_URL=postgresql://postgres:password@postgres:5432/joots

# Redis
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379

# SSL Backend
SSL_KEY_PATH=/app/ssl/backend.key
SSL_CERT_PATH=/app/ssl/backend.crt
PORT=4000

# Clés auto-générées
JWT_SECRET=<32+ caractères aléatoires>
JWT_EXPIRES_IN=24h

# Environnement
NODE_ENV=development
SEED_DB=true
```

## 🚀 Utilisation

### Scripts Disponibles

```bash
# Configuration initiale
./scripts/setup.sh

# Démarrage développement (par défaut)
./scripts/start.sh

# Démarrage production
./scripts/start.sh prod
```

### Accès aux Services

- **🌐 Application PWA** : https://localhost
- **📱 Test PWA** : https://localhost/fr/pwa-test
- **🔧 API Backend** : https://localhost/api
- **📊 API Direct** : https://localhost:4000 (en cas de debug)

## 🔐 Certificats SSL

### Structure des Certificats
```
nginx/ssl/
├── nginx.crt + nginx.key      # Proxy frontend
├── backend/
│   ├── backend.crt + backend.key  # Service backend
└── frontend/
    └── frontend.crt + frontend.key # Service frontend (si nécessaire)
```

### Accepter les Certificats Auto-signés

**Chrome :** Tapez `thisisunsafe` sur la page d'erreur SSL  
**Firefox :** Cliquez "Avancé" > "Accepter le risque et continuer"  
**Safari :** Cliquez "Avancé" > "Visiter ce site web"

## 📱 Fonctionnalités PWA

### ✅ Fonctionnalités Activées
- **Service Worker** : Mise en cache et fonctionnement hors ligne
- **Push Notifications** : Notifications push (avec clés VAPID)
- **Installation** : Prompt "Ajouter à l'écran d'accueil"
- **HTTPS** : Requis pour PWA, configuré automatiquement
- **WebSocket Sécurisé** : WSS pour temps réel

### 🧪 Test PWA
1. Ouvrir https://localhost
2. F12 → Onglet "Application" → Service Workers
3. Vérifier que le SW s'enregistre
4. Tester l'installation (menu navigateur ou prompt)
5. Tester les notifications sur /fr/pwa-test

## 🔄 Développement

### Hot Reload & Fast Refresh
- ✅ **Frontend** : Hot Module Replacement via WebSocket
- ✅ **Backend** : Redémarrage automatique NestJS
- ✅ **Nginx** : Pas de redémarrage nécessaire

### Workflow de Développement
```bash
# Modifier le code frontend/backend
# → Changements appliqués automatiquement

# Voir les logs en temps réel
docker-compose logs -f [service]

# Redémarrer un service spécifique
docker-compose restart [service]

# Tout redémarrer
./scripts/start.sh
```

## 🔍 Diagnostics & Dépannage

### Vérifications Automatiques

Le script `start.sh` vérifie automatiquement :
- ✅ Présence des certificats SSL
- ✅ Fichiers .env configurés
- ✅ Services démarrés correctement
- ✅ Connectivité HTTPS frontend et API

### Logs Utiles

```bash
# Voir les logs SSL du backend
docker-compose logs backend | grep -i ssl

# Résultat attendu : "SSL activé: ✅"

# Voir tous les logs
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f [nginx|frontend|backend|postgres|redis]
```

### Problèmes Courants

#### 🔴 "SSL routines: wrong version number"
**Cause :** Tentative de connexion HTTPS sur un service HTTP  
**Solution :** Automatiquement résolue par la configuration HTTPS complète

#### 🔴 Service Worker ne s'installe pas
```bash
# Vérifier l'accès au Service Worker
curl -k https://localhost/sw.js

# Vérifier les logs nginx
docker-compose logs nginx
```

#### 🔴 Hot Reload ne fonctionne pas
```bash
# Vérifier les WebSockets
docker-compose logs frontend | grep -i websocket
```

#### 🔴 Notifications ne fonctionnent pas
- Vérifier les permissions dans le navigateur
- Vérifier que les clés VAPID sont configurées (automatique avec setup.sh)

### Tests de Connectivité

```bash
# Test complet automatique
./scripts/start.sh

# Tests manuels
curl -k https://localhost                # Frontend
curl -k https://localhost/api/health     # API via Nginx  
curl -k https://localhost:4000/health    # Backend direct
```

## 🚢 Déploiement Production

La configuration de développement est **identique à la production**, sauf :
- Certificats SSL → Remplacer par des certificats valides
- `NODE_ENV=production` dans les .env
- Domaines réels au lieu de localhost

## 📋 Checklist de Validation

Après `./scripts/start.sh`, vous devriez avoir :

- [ ] ✅ https://localhost accessible sans erreur majeure
- [ ] ✅ Backend démarre avec "SSL activé: ✅"
- [ ] ✅ Service Worker s'enregistre (F12 → Application)
- [ ] ✅ Authentication fonctionne
- [ ] ✅ WebSocket temps réel fonctionne (WSS)
- [ ] ✅ Notifications PWA fonctionnent
- [ ] ✅ Installation PWA proposée
- [ ] ✅ Aucune erreur Mixed Content dans la console

## 🎯 Avantages de Cette Configuration

- **🔐 Sécurité** : HTTPS end-to-end, certificats validés
- **📱 PWA Complète** : Toutes les fonctionnalités PWA testables
- **⚡ Productivité** : Hot reload préservé, setup automatisé
- **🚀 Production-Ready** : Configuration identique à la production
- **🧪 Tests Réalistes** : Environnement proche de la vraie utilisation
- **👥 Équipe** : Configuration partagée, documentation unique

---

## 📚 Ancienne Documentation

Cette documentation remplace et unifie :
- ~~`DEV_PWA_SETUP.md`~~ → Intégré ci-dessus
- ~~`HTTPS_SETUP_GUIDE.md`~~ → Intégré ci-dessus  
- ~~`README_HTTPS_SOLUTION.md`~~ → Intégré ci-dessus

**✨ Un seul guide, plus simple, plus complet !** 