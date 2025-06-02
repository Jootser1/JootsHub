# Architecture Technique JootsHub - Guide Complet

## 📋 Vue d'ensemble du Projet

**Type** : Progressive Web App mobile-first  
**Package Manager** : npm  
**Langage Principal** : TypeScript (strict mode)  
**OS de Développement** : Windows 11 + WSL2  
**Éditeur** : Cursor (fork VS Code)  
**Containerisation** : Docker + Docker Compose  
**Hébergement** : OVH Cloud

### Méthodologie & Patterns Architecturaux
- ✅ **DDD (Domain-Driven Design)** : Organisation par domaines métier
- ✅ **Architecture modulaire** : Séparation claire des responsabilités
- ✅ **Singleton Pattern** : Socket Manager, Services partagés
- ✅ **Observer Pattern** : Système d'événements WebSocket
- ✅ **Repository Pattern** : Abstraction de l'accès aux données via Prisma

## 1. Stack Technique et Infrastructure

### 1.1 Backend - NestJS Architecture

#### Framework & Structure
- ✅ **NestJS** : Framework principal avec architecture modulaire TypeScript
- ✅ **Modularité par domaines** : users, conversations, icebreakers, questions
- ✅ **Décorateurs** : Controllers, Services, Guards, Interceptors

#### Base de Données
- ✅ **PostgreSQL** : Base de données principale relationnelle
- ✅ **Prisma ORM** : Génération automatique de types et migrations
- ✅ **Redis** : Cache pour sessions, statuts en ligne, états temporaires
- ✅ **Connection Pooling** : Gestion optimisée des connexions DB

#### Architecture des Services Backend
```typescript
// Gateways WebSocket
- UserGateway : Gestion des statuts utilisateur et contacts
- ChatGateway : Gestion des conversations et messages temps réel

// Services Métier
- UsersService : CRUD utilisateurs, statuts, sessions Redis
- ConversationsService : Gestion des conversations et participants
- MessagesService : CRUD messages, statuts de lecture
- IcebreakerService : Logique métier des questions-réponses
- QuestionService : Gestion des questions et réponses utilisateur
- UserContactsService : Gestion des contacts utilisateur

// Infrastructure
- PrismaService : ORM et accès base de données
- RedisService : Cache et données temporaires
```

### 1.2 Frontend - Next.js 14 + React 18

#### Framework & Architecture
- ✅ **Next.js 14** : App Router avec Server/Client Components
- ✅ **React 18** : Framework UI avec Concurrent Features
- ✅ **TypeScript strict** : Typage strict activé globalement

#### Structure des Dossiers
```
src/
├── app/                    # App Router Next.js 14
│   ├── api/               # API Routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── conversations/ # API conversations
│   │   └── users/         # API utilisateurs
│   ├── (protected)/       # Routes protégées
│   │   ├── hub/           # Page principale
│   │   ├── conversations/ # Chat interface
│   │   └── icebreaker/    # Interface icebreaker
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
│   ├── ui/               # Composants UI de base (Tailwind)
│   ├── dev/              # Outils de développement/debug
│   └── layout/           # Composants de mise en page
├── features/             # Fonctionnalités par domaine
│   ├── chat/
│   │   ├── components/   # Composants spécifiques au chat
│   │   ├── hooks/        # Hooks du chat
│   │   ├── services/     # Services métier chat
│   │   ├── sockets/      # Gestion WebSocket chat
│   │   └── stores/       # Store Zustand chat
│   ├── contacts/         # Gestion des contacts
│   ├── conversations/    # Logique conversations
│   ├── icebreakers/      # Système icebreaker
│   ├── questions/        # Gestion des questions
│   └── user/             # Profil utilisateur
├── hooks/                # Hooks React personnalisés globaux
├── lib/                  # Bibliothèques et configurations
│   ├── sockets/          # Architecture Socket.IO
│   └── auth/             # Configuration NextAuth
├── styles/               # Styles Tailwind et CSS
├── types/                # Types TypeScript globaux
└── utils/                # Fonctions utilitaires
```

#### Styles & UI
- ✅ **Tailwind CSS** : Framework CSS utility-first
- ✅ **Composants UI** : Bibliothèque de composants réutilisables
- ✅ **Responsive Design** : Mobile-first approach
- ✅ **Charte Graphique** : Couleurs et typographie cohérentes

### 1.3 Containerisation Docker
```yaml
# docker-compose.yml structure
services:
  - postgres : Base de données principale
  - redis : Cache et sessions
  - backend : API NestJS
  - frontend : Application Next.js
```

**Environnements** :
- ✅ **Development** : Docker Compose local
- ✅ **Production** : OVH Cloud deployment
- ✅ **Variables d'environnement** : Configuration sécurisée

## 2. Gestion de l'État et Communication

### 2.1 State Management - Zustand

#### Stores par Domaine
- **`useUserStore`** : Utilisateur connecté, statut, profil
- **`useChatStore`** : Conversations, messages, participants
- **`useContactStore`** : Contacts, statuts en ligne

#### Principes d'Architecture
- **Separation par domaine** : Chaque store a une responsabilité unique
- **Organisation modulaire** : Stores organisés par domaine fonctionnel
- **Sécurité** : Jamais d'informations d'authentification sensibles (tokens, mots de passe)
- **Persistance** : Utilisation de `persist` middleware uniquement pour données non sensibles
- **Performance** : Éviter les re-rendus inutiles via gestion d'état optimisée

#### Séparation des Préoccupations
- **Stores** : Gèrent uniquement l'état de l'application
- **Services** : Contiennent la logique métier
- **Composants React** : Logique d'affichage et d'interaction utilisateur uniquement
- **Hooks** : Logique réutilisable entre composants

### 2.2 Communication Client-Serveur

#### WebSocket Architecture avec Socket.IO
- ✅ **Namespaces** : Séparation par fonctionnalité (`/user`, `/chat`)
- ✅ **Rooms** : Gestion fine des groupes (conversations, contacts)
- ✅ **Authentification** : Middleware JWT pour toutes les connexions
- ✅ **Reconnexion** : Gestion automatique avec exponential backoff
- ✅ **Heartbeat** : Système de ping/pong pour détecter les déconnexions

#### Architecture Socket Manager (Frontend)
```typescript
class SocketManager {
  // Singleton pattern pour gérer toutes les connexions
  - userSocket: UserSocketService
  - chatSocket: ChatSocketService
  
  // Gestion des événements centralisée
  + onStateChange(): EventCallback
  + connectUserSocket(): Promise<UserSocketService>
  + connectChatSocket(): Promise<ChatSocketService>
  + disconnectAll()
  + getUserSocketStatus(): SocketConnectionStatus
  + getChatSocketStatus(): SocketConnectionStatus
}

// Services Spécialisés héritant de BaseSocketService
- UserSocketService : Statuts utilisateur, contacts, rooms
- ChatSocketService : Messages, conversations, typing
```

#### Événements WebSocket Implémentés
```typescript
// Événements Utilisateur
- 'userStatusChange' : Changement de statut en ligne/hors ligne
- 'userProfileChange' : Modification de profil

// Événements Chat
- 'newMessage' : Nouveau message reçu
- 'messageStatus' : Statut de livraison/lecture
- 'typing' : Indicateur de saisie
- 'participantOnline' : Statut participant conversation

// Événements Icebreaker
- 'icebreakerReady' : Utilisateur prêt pour question
- 'icebreakerQuestion' : Question envoyée aux participants
- 'icebreakerResponses' : Réponses des participants
```

#### API REST
- ✅ **Next.js API Routes** : Endpoints côté frontend
- ✅ **NestJS Controllers** : Endpoints côté backend avec décorateurs
- ✅ **Structure RESTful** : Respect des conventions HTTP
- ✅ **Validation** : Schémas stricts avec class-validator
- ✅ **Error Handling** : Gestion cohérente avec status codes appropriés
- ✅ **Middleware** : Authentification et logging sur toutes les routes

## 3. Authentification et Sécurité

### 3.1 Gestion des Tokens
- **NextAuth.js** : Gestionnaire exclusif des tokens d'authentification
- **Sécurité** : Tokens jamais stockés dans les stores Zustand
- **Transport** : Tokens transmis via cookies HTTP-only sécurisés
- **Usage** : Tokens utilisés pour requêtes HTTP et connexions WebSocket
- **JWT Security** : Tokens avec expiration et validation stricte

### 3.2 Chiffrement et Validation
- **argon2** : Hashage des mots de passe avec salt
- **class-validator** : Validation stricte côté serveur
- **Middleware JWT** : Protection de toutes les routes sensibles
- **CORS** : Configuration stricte des origines autorisées

### 3.3 Sécurité WebSocket & API
- **JWT Validation** : Validation token sur chaque connexion
- **Room Authorization** : Vérification des droits d'accès aux rooms
- **Rate Limiting** : Protection contre spam/abuse
- **Input Validation** : Validation stricte tous inputs
- **SQL Injection Protection** : Via Prisma ORM
- **Sanitization** : Nettoyage des données utilisateur

## 4. Base de Données et Persistance

### 4.1 Structure PostgreSQL (via Prisma)
```sql
-- Utilisateurs et authentification
Auth (id, email, password, accessToken, refreshToken, userId)
User (id, username, userNumber, isOnline, avatar, bio, isAvailableForChat, role, languages...)
UserAttribute (id, userId, key, value, levelRevealed...)
UserContact (userId, contactId, createdAt)

-- Conversations et messages
Conversation (id, locale, xpPoint, difficulty...)
ConversationParticipant (conversationId, userId, hasGivenAnswer, isIcebreakerReady...)
Message (id, conversationId, senderId, content, messageType, isRead, userAAnswer, userBAnswer...)

-- Questions et réponses Icebreaker
QuestionGroup (id, type, isModerated, pinned, enabled, authorId...)
Question (id, groupId, question, locale)
QuestionOption (id, groupId, label, order, locale)
Category (id) + CategoryTranslation (categoryId, locale, label)
QuestionGroupCategory (questionGroupId, categoryId)
UserAnswer (id, userId, questionGroupId, questionOptionId, conversationId, note, isFlagged...)
UserQuestionPreference (userId, categoryId, enabled...)
LevelingConfig (level, difficulty, xpRequired, reward, photoRevealPercent...)
```

### 4.2 Cache Redis - Structure
```javascript
// Sessions utilisateur
'online_users' : Set des IDs utilisateurs connectés
'user:{userId}:last_seen' : Timestamp dernière activité

// États temporaires Icebreaker
'icebreaker:{conversationId}:ready' : État préparation participants
'icebreaker:{conversationId}:question' : Question courante
'icebreaker:{conversationId}:answers' : Réponses temporaires

// Cache performances
- TTL automatique pour données temporaires
- Pub/Sub pour communication entre instances
```

### 4.3 Optimisations Base de Données
- **Index** : Sur champs fréquemment requêtés
- **Transactions** : Utilisation pour opérations critiques
- **Query Optimization** : Requêtes optimisées avec Prisma
- **Connection Pooling** : Gestion optimisée des connexions

## 5. Performance et Monitoring

### 5.1 Optimisations Frontend
- ✅ **Monitoring** : `PerformanceMonitor` pour traquer violations
- ✅ **Core Web Vitals** : Mesure LCP, FID, CLS
- ✅ **Debouncing** : Évitement des appels API redondants
- ✅ **Memoization** : `useMemo`, `useCallback` pour optimisations
- ✅ **Lazy Loading** : Import dynamique des composants lourds
- ✅ **Bundle Splitting** : Code splitting par route
- ✅ **Image Optimization** : Next.js Image avec lazy loading

### 5.2 Métriques Surveillées
- ✅ **Socket Connections** : Nombre de connexions actives
- ✅ **Message Throughput** : Débit des messages
- ✅ **API Response Times** : Temps de réponse endpoints
- ✅ **Database Queries** : Performance requêtes SQL
- ✅ **Redis Operations** : Performance cache

### 5.3 Outils de Debug & Monitoring
- **`PerformanceDebugger`** : Monitoring temps réel des performances
- **`ContactsDebugger`** : Visualisation contacts et statuts
- **Socket Monitoring** : Surveillance des connexions WebSocket
- **Error Tracking** : Logging centralisé des erreurs
- **Niveaux de logging** : DEBUG, INFO, WARN, ERROR avec contexte

## 6. Gestion des Types TypeScript

### 6.1 Configuration Strict Mode
- **TypeScript Strict** : Mode strict activé dans tsconfig.json
- **Types partagés** : Interfaces communes frontend/backend
- **Validation runtime** : Cohérence entre types TS et validation serveur
- **Documentation** : JSDoc pour types complexes

### 6.2 Types par Domaine
- **Socket Events** : Types pour tous les événements WebSocket
- **API Responses** : Types pour toutes les réponses API
- **Database Models** : Types générés automatiquement par Prisma
- **Store States** : Types pour tous les états Zustand

## 7. Fonctionnalités Implémentées

### 7.1 Système de Chat Temps Réel
- ✅ **Messages temps réel** : WebSocket + persistance DB
- ✅ **Statuts de lecture** : Double coche (envoyé/lu)
- ✅ **Indicateur de saisie** : Typing indicators
- ✅ **Statuts en ligne** : Présence utilisateurs
- ✅ **Édition/suppression** : Messages modifiables

### 7.2 Système Icebreaker
- ✅ **Questions aléatoires** : Sélection intelligente évitant les répétitions
- ✅ **Réponses synchrones** : Attente des 2 participants
- ✅ **Affichage résultats** : Messages spéciaux avec réponses des deux participants
- ✅ **Progression** : Système XP et niveaux par conversation
- ✅ **Catégories** : Questions organisées par thématiques
- ✅ **Préférences** : Utilisateurs peuvent choisir leurs catégories

### 7.3 Gestion Contacts
- ✅ **Liste contacts** : CRUD complet
- ✅ **Statuts en ligne** : Temps réel via WebSocket
- ✅ **Rooms système** : Notifications statuts contacts automatiques

## 8. Tests et Qualité

### 8.1 Tests Unitaires
- **Services** : Tests de la logique métier
- **Hooks** : Tests des hooks personnalisés
- **Stores** : Tests des mutations d'état
- **Utils** : Tests des fonctions utilitaires

### 8.2 Tests d'Intégration
- **Socket Events** : Tests des flux WebSocket complets
- **Authentication** : Tests des flux d'authentification
- **API Endpoints** : Tests des endpoints REST

## 9. Architecture Future et Évolutivité

### 9.1 Microservices Ready
- **Modular Design** : Architecture préparée pour la séparation
- **Event-Driven** : Communication par événements
- **Scalability** : Préparation pour montée en charge

### 9.2 Prochaines Étapes Techniques
- 🔄 **Microservices** : Séparation services métier
- 🔄 **CDN** : Optimisation assets statiques
- 🔄 **Database Sharding** : Scaling horizontal
- 🔄 **Message Queue** : RabbitMQ/Kafka pour async processing

### 9.3 Fonctionnalités Futures
- 🔄 **PWA** : Service Worker, offline mode
- 🔄 **Push Notifications** : FCM integration
- 🔄 **File Upload** : Images, documents
- 🔄 **Voice Messages** : WebRTC integration
- 🔄 **Plugin System** : Architecture modulaire pour nouvelles features
- 🔄 **API Versioning** : Support des versions multiples
- 🔄 **Feature Flags** : Activation/désactivation de fonctionnalités
- 🔄 **Support Multilingue** : i18n complet

## 📊 Synthèse Stack Technique

| **Composant** | **Technologie** | **Status** |
|:--------------|:----------------|:-----------|
| **Backend API** | NestJS + TypeScript | ✅ Implémenté |
| **Database** | PostgreSQL + Prisma | ✅ Implémenté |
| **Cache** | Redis | ✅ Implémenté |
| **Frontend** | Next.js 14 + React 18 | ✅ Implémenté |
| **State Management** | Zustand | ✅ Implémenté |
| **Styling** | Tailwind CSS | ✅ Implémenté |
| **Real-time** | Socket.IO | ✅ Implémenté |
| **Authentication** | NextAuth.js + JWT | ✅ Implémenté |
| **Containerization** | Docker + Docker Compose | ✅ Implémenté |
| **Monitoring** | Custom Performance Tools | ✅ Implémenté |

### 🛠️ Pourquoi cette stack ?
✅ **Scalabilité** – Architecture modulaire + microservices ready = capacité à grandir sans problème  
✅ **Performance** – PostgreSQL pour les données relationnelles, Redis pour le temps réel  
✅ **Expérience fluide** – Next.js (SSR) + React pour une UX optimale  
✅ **Facilité de maintenance** – NestJS & Prisma simplifient l'évolutivité du backend  
✅ **Sécurité** – NextAuth.js + JWT pour une authentification robuste  
✅ **Developer Experience** – TypeScript strict + outils de debug avancés

Cette architecture offre une base solide, scalable et maintenable pour l'évolution future de JootsHub vers un écosystème complet incluant Socioscopy et Revelio.

