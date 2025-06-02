This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Architecture des Sockets

L'application utilise une architecture de sockets qui permet à chaque utilisateur d'être connecté à plusieurs conversations simultanément à travers un socket unique.

### Modèle de Socket Unique par Utilisateur

Nous avons migré d'un modèle avec un socket par conversation à un modèle avec un socket unique par utilisateur gérant plusieurs conversations. Cela offre plusieurs avantages :

1. **Performance** : Moins de connexions WebSocket, réduisant la surcharge réseau
2. **Stabilité** : Une seule connexion à maintenir, simplifiant la gestion des reconnexions
3. **UX améliorée** : Notifications et mises à jour en temps réel pour toutes les conversations, même celles en arrière-plan

### Composants Clés

- **ChatSocketService** : Service singleton maintenant une connexion WebSocket unique pour l'utilisateur connecté. Gère un ensemble de conversations actives et assure que les messages et événements sont routés vers les bonnes conversations.

- **ChatSocketStore** : Store Zustand qui expose les méthodes pour interagir avec le service de socket, notamment pour rejoindre/quitter des conversations, envoyer des messages, et gérer les statuts de frappe et d'icebreaker.

- **ChatGateway (Backend)** : Point d'entrée côté serveur qui automatiquement joint un utilisateur à toutes ses conversations lors de la connexion et synchronise leur état.

### Fonctionnalités

- **Connexion Unique** : Un seul socket est créé par utilisateur, qui rejoint automatiquement toutes ses conversations
- **Multi-conversations** : Gestion simultanée de plusieurs conversations actives
- **Auto-reconnexion** : En cas de déconnexion, le système tente de se reconnecter et de rejoindre à nouveau les conversations
- **Synchronisation d'état** : À la connexion, l'état de toutes les conversations est synchronisé (messages non lus, statuts de frappe, icebreakers, etc.)

### Implémentation

Le code implémente cette architecture à travers les classes et hooks suivants :
- `ChatSocketService` : Gestion de la connexion socket et des conversations
- `ChatSocketStore` : Store d'état pour les sockets de chat
- `useChatSocket` : Hook pour accéder facilement aux fonctionnalités de chat dans les composants
- `ChatSocketProvider` : Fournit le contexte de connexion global

Cette architecture permet une expérience utilisateur fluide avec plusieurs conversations actives simultanément, tout en optimisant l'utilisation des ressources.
