# Règles d'Architecture du Projet JootsHub

## 1. Gestion de l'État (State Management)

### 1.1 Stores Zustand
- Chaque store doit avoir une responsabilité unique et claire
- Les stores sont organisés par domaine fonctionnel (user, chat, onlineUsers, etc.)
- Les stores ne doivent jamais contenir d'informations d'authentification sensibles (tokens, mots de passe, etc.)
- Utilisation de `persist` middleware uniquement pour les données non sensibles

### 1.2 Séparation des Préoccupations
- Les stores gèrent uniquement l'état de l'application
- La logique métier doit être dans les services
- Les composants React ne doivent contenir que la logique d'affichage et d'interaction utilisateur

## 2. Authentification et Sécurité

### 2.1 Gestion des Tokens
- Les tokens d'authentification sont gérés exclusivement par NextAuth.js
- Les tokens ne doivent jamais être stockés dans les stores Zustand
- Les tokens sont transmis via les cookies HTTP-only
- Les tokens sont utilisés uniquement pour les requêtes HTTP et les connexions WebSocket

### 2.2 Sécurité des Données
- Les mots de passe ne sont jamais stockés en clair
- Les informations sensibles ne sont jamais exposées côté client
- Les requêtes API doivent toujours inclure le token d'authentification

## 3. Architecture Frontend

### 3.1 Structure des Dossiers
```
src/
├── app/                 # Pages et routes Next.js
├── components/         # Composants React réutilisables
│   ├── ui/            # Composants UI de base
│   ├── layout/        # Composants de mise en page
│   └── [feature]/     # Composants spécifiques aux fonctionnalités
├── stores/            # Stores Zustand
├── services/          # Services et logique métier
├── hooks/             # Hooks React personnalisés
├── types/             # Types TypeScript
└── utils/             # Fonctions utilitaires
```

### 3.2 Composants React
- Utilisation de la directive "use client" pour les composants côté client
- Les composants doivent être des fonctions pures
- Les composants doivent suivre le principe de responsabilité unique
- Les composants doivent être typés avec TypeScript

## 4. Communication Client-Serveur

### 4.1 WebSocket
- Les connexions WebSocket sont authentifiées via le token NextAuth
- Les événements WebSocket doivent être typés
- La gestion des reconnexions doit être implémentée
- Les erreurs de connexion doivent être gérées et affichées à l'utilisateur

#### 4.1.1 Socket.IO
- Utilisation de Socket.IO pour la communication en temps réel
- Configuration du serveur Socket.IO avec Next.js
- Gestion des rooms pour les conversations privées et les groupes
- Implémentation des événements personnalisés avec typage TypeScript
- Gestion des middlewares Socket.IO pour l'authentification
- Mise en place d'un système de heartbeat pour la détection des déconnexions
- Gestion des événements système (connect, disconnect, error, reconnect)
- Implémentation d'un système de queue pour les messages non délivrés
- Gestion des timeouts et des tentatives de reconnexion
- Logging des événements Socket.IO pour le debugging

### 4.2 API REST
- Utilisation de Next.js API Routes pour les endpoints
- Les réponses doivent être typées
- Les erreurs doivent être gérées de manière cohérente
- Les requêtes doivent inclure le token d'authentification

## 5. Gestion des Types

### 5.1 TypeScript
- Tous les fichiers doivent être typés
- Les types doivent être exportés depuis le dossier `types/`
- Les types doivent être réutilisables et maintenables
- Les types doivent être documentés avec des commentaires JSDoc

## 6. Performance

### 6.1 Optimisations
- Utilisation de `memo` pour les composants qui le nécessitent
- Lazy loading des composants lourds
- Optimisation des images avec Next.js Image
- Minimisation des re-rendus inutiles

### 6.2 Caching
- Mise en cache des données non sensibles
- Invalidation appropriée du cache
- Utilisation de SWR ou React Query pour la gestion du cache

## 7. Tests

### 7.1 Tests Unitaires
- Tests des composants React
- Tests des hooks personnalisés
- Tests des services
- Tests des stores Zustand

### 7.2 Tests d'Intégration
- Tests des flux d'authentification
- Tests des interactions WebSocket
- Tests des formulaires et validations

## 8. Documentation

### 8.1 Code
- Commentaires JSDoc pour les fonctions complexes
- Documentation des types TypeScript
- Documentation des props des composants

### 8.2 Architecture
- Documentation des décisions d'architecture
- Documentation des patterns utilisés
- Documentation des conventions de nommage

## 9. Gestion des Erreurs

### 9.1 Frontend
- Gestion des erreurs de requêtes API
- Gestion des erreurs de connexion WebSocket
- Affichage des messages d'erreur utilisateur
- Logging des erreurs pour le debugging

### 9.2 Backend
- Gestion des erreurs HTTP
- Validation des données
- Logging des erreurs serveur
- Monitoring des erreurs

## 10. Accessibilité

### 10.1 Standards
- Respect des normes WCAG
- Support du mode sombre
- Support du clavier
- Support des lecteurs d'écran

### 10.2 Internationalisation
- Support multilingue
- Formatage des dates et nombres
- Gestion des fuseaux horaires 