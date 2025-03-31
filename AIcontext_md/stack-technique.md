# Stack Technique   

Pour le package manager, tu choisiras npm.   
Typescript sera privilégié à Javascript.
Le système d'exploitation est sur Windows 11. L'éditeur de code utilisé est Visual Studio Code.   
Le projet sera containerisé dans Docker.
D'autres outils pourront être suggéré s'ils facilitent grandement le développement ou l'intégration, mais ils devront être de faible coût.   
L'hébergement se fera sur Scaleway.   
   
# Environnement de travail   
   
## 1️⃣ Backend (API & Services)   
Le backend devra être **modulaire** avec des services indépendants pour chaque fonctionnalité (Socioscopy, Revelio, Icebreaker), tout en partageant un **compte utilisateur unique** et une **base de données centralisée**.   
   
### ✅ Méthodologie & Architecture** :**   
- DDD : Domain-Driven Design   
- Architecture hexagonale   
   
   
### ✅ **Langage & Framework :**   
- **Node.js (NestJS)** – Modulaire, scalable, idéal pour une architecture **microservices**.   
   
   
### ✅ **Base de données :**   
- **PostgreSQL** avec **Prisma ORM** – Relationnelle, robuste, idéale pour gérer les profils, interactions et données des trois expériences.   
- **Redis** – Pour le caching et les données en temps réel (scores, chat, sessions actives).   
   
   
📌 E**xemples concrets dans Joots2 :   
- **PostgreSQL** : Stocke les **profils utilisateurs, résultats de défis, historiques de discussions**.   
- **Redis** : Gère les **scores en temps réel, sessions actives, notifications push**.   
- **Redis comme cache pour PostgreSQL** : Accélère les requêtes fréquentes (ex. résultats des débats de Socioscopy déjà calculés).   
   
   
### ✅ **Architecture & Scalabilité :**   
- **Microservices** avec **GraphQL (Apollo)** ou **REST API (Fastify)** pour une gestion flexible des fonctionnalités.   
    💡 U**ne approche mixte est idéale :   
    1. **REST API** pour les endpoints critiques, simples et à forte volumétrie :   
        - Authentification, sessions, notifications push.   
        - Données statiques : règles du jeu Revelio, configuration des défis.   
        - Stockage des fichiers médias (AWS S3, CDN).   
    2. **GraphQL** pour des requêtes **modulaires et optimisées** :   
        - Récupération des profils utilisateur avec des données dynamiques (points, historique, préférences).   
        - Aggregation des résultats de Socioscopy (ex: voir ses réponses et les tendances en une seule requête).   
        - Gestion fine des **discussions Icebreaker** (ex: requêter plusieurs messages avec leur contexte).   
    3. **WebSockets (via GraphQL Subscriptions ou REST + Socket.io)** :   
        - **Temps réel** pour les **défis Revelio live** et **conversations Icebreaker**.   
        - Notifications de **votes et réactions sur Socioscopy**.   
   
   
- **Event-Driven Architecture** avec **Kafka ou RabbitMQ** pour la communication entre modules (ex. un utilisateur termine un débat sur Socioscopy → il peut recevoir un défi sur Revelio).   
   
   
  ### 🎯 Recommandation hybride : Kafka + RabbitMQ   
  💡 L**es deux technologies peuvent être combinées pour maximiser les performances **:   
  ✔️ **Kafka** pour **le streaming d’événements** et les fonctionnalités en **temps réel** :   
  - Tracking des votes sur Socioscopy et mise à jour des tendances.   
  - Suivi des scores en direct pour Revelio.   
  - Historisation des discussions Icebreaker (permet de reconstruire des conversations à partir d’événements passés).   
   
  ✔️ **RabbitMQ** pour la **messagerie entre microservices** :   
  - Gestion des notifications push et e-mails transactionnels.   
  - Traitement des actions utilisateur (ex: lorsqu’un joueur termine un défi, informer le backend).   
  - Orchestration des services (ex: demande de vérification de session d’un utilisateur).   
 --- 
   
  ### 📌 Architecture recommandée pour Joots2   
  📊 A**rchitecture hybride Kafka + RabbitMQ   
  ```

css

CopierModifier
[ FRONTEND ]  →  [ API Gateway ]  →  [ RabbitMQ ]  →  [ Microservices ]
                      ↓
                  [ Kafka ] → [ Data Analytics, Temps réel ]


```
  - **RabbitMQ** → Gestion des **actions utilisateur immédiates** (notification, traitement de messages, orchestration).   
  - **Kafka** → Gestion du **streaming d’événements** (chat, votes, logs d’activité).   
   
### ✅ **Authentification & Sécurité :**   
- **Auth0 ou Firebase Authentication** pour gérer **login social, OAuth, JWT**.   
- **OWASP Best Practices** pour sécuriser les échanges (XSS, CSRF, hashing des mots de passe).   
 --- 
   
##    
   
   
## 2️⃣ Frontend (Application Web)   
L’interface doit être **fluide et interactive**, permettant aux utilisateurs de naviguer facilement entre les expériences.   
✅ **Framework :**   
- **Next.js (React)** – Performant pour le SSR/SSG, facilite le SEO et offre une excellente **expérience utilisateur**.   
   
✅ **UI & Animation :**   
- **Tailwind CSS** – Léger, rapide, parfait pour un design **moderne et modulaire**.   
- **Framer Motion** – Pour des **animations fluides** et un aspect interactif soigné.   
   
✅ **État & Gestion des Données :**   
- **React Query (TanStack)** – Optimisé pour **fetcher** les données et réduire les appels API.   
- **Zustand** ou **Recoil** – Léger et efficace pour la gestion de l’état global.   
   
✅ **Optimisation Mobile :**   
- **PWA (Progressive Web App)** – Permet d’avoir une **expérience mobile fluide** sans forcément passer par une application native.   
- ✅ **PWA Service Worker** (Workbox) → Gestion du **cache offline** et des performances améliorées
✅ **Firebase Cloud Messaging (FCM)** → Notifications push sur Android, mais limité sur iOS
✅ **Capacitor.js** (optionnel) → Ajout d’un pont vers les fonctionnalités natives (si nécessaire plus tard)   
 --- 
   
### 4️⃣ Gamification & Temps Réel   
L’engagement des utilisateurs repose sur des **mécaniques de jeu, défis et interactions sociales**.   
✅ **Temps réel & Chat :**   
- **WebSockets avec Socket.io** (Node.js) ou **Pusher** – Pour les **défis en live et le chat Icebreaker**.   
- **Firebase Firestore ou Supabase** – Alternative NoSQL temps réel pour stocker les interactions.   
   
✅ **Gamification :**   
- **Badge & Points System** → Base de données relationnelle (PostgreSQL).   
- **Notifications push (FCM pour Firebase ou OneSignal)** – Engagement utilisateur sur mobile.   
- **Leaderboards & Statistiques** → **Redis** pour un accès rapide aux classements.   
 --- 
   
### 5️⃣ Déploiement & Infrastructure   
Joots2 nécessitera une **infrastructure scalable et flexible**.   
✅ **Hébergement & Cloud :**   
- **AWS (EC2, Lambda, RDS, S3, Cognito)**   
- **Vercel (Frontend Next.js) + Supabase (DB & Auth)**   
- **Docker & Kubernetes (K8s)** – Pour un **déploiement scalable** et une gestion des microservices.   
   
✅ **CI/CD & Tests :**   
- **GitHub Actions / GitLab CI/CD** – Automatisation des builds & déploiements.   
- **Cypress & Jest** – Tests UI & unitaires.   
   
✅ **Monitoring & Analytics :**   
- **Datadog ou New Relic** – Performance & logs serveurs.   
- **Amplitude ou Mixpanel** – Analyse du comportement utilisateur.   
 --- 
   
### 🎯 Synthèse de la Stack   
|        **Composant** |          **Technologie Recommandée** |
|:---------------------|:-------------------------------------|
|          **Backend** |         Node.js (NestJS) ou Go (Gin) |
|  **Base de Données** |                   PostgreSQL + Redis |
|              **API** |   GraphQL (Apollo) ou REST (Fastify) |
| **Authentification** |                Auth0 / Firebase Auth |
|     **Frontend Web** |           Next.js (React) + Tailwind |
|           **Mobile** |       React Native (Expo) ou Flutter |
|       **Temps Réel** |    WebSockets (Socket.io) + Firebase |
|      **Déploiement** |              AWS / Vercel / Supabase |
|            **CI/CD** |              GitHub Actions + Docker |
|     **Gamification** | Points, Badges, Leaderboards (Redis) |
|       **Monitoring** |       Datadog / Mixpanel / Amplitude |

### 🛠️ Pourquoi cette stack ?   
✅ **Scalabilité** – Microservices + AWS + Kubernetes = **capacité à grandir sans problème**.
✅ **Performance** – PostgreSQL pour les données relationnelles, Redis pour le **temps réel**.
✅ **Expérience fluide** – Next.js (SSR) pour le web, React Native ou Flutter pour le mobile.
✅ **Facilité de maintenance** – NestJS & Prisma simplifient **l’évolutivité du backend**.
✅ **Sécurité** – Auth0 / Firebase pour **éviter de gérer l’authentification soi-même**.   
   
   
   
