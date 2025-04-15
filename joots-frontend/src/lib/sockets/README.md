# Architecture des Sockets dans JootsHub

Ce document explique l'architecture des sockets dans l'application JootsHub et comment utiliser correctement les différentes fonctionnalités.

## Aperçu de l'architecture

```
┌─────────────────────────────────┐
│         COMPOSANTS              │
│                                 │
│  ┌─────────────┐ ┌────────────┐ │
│  │  Composants │ │ Composants │ │
│  │     Chat    │ │    User    │ │
│  └──────┬──────┘ └──────┬─────┘ │
└─────────┼───────────────┼───────┘
          │               │        
          ▼               ▼        
┌─────────────────┐ ┌────────────────┐
│  useChatSocket  │ │  useUserSocket │
│      (hook)     │ │     (hook)     │
└────────┬────────┘ └────────┬───────┘
         │                   │        
         ▼                   ▼        
┌────────────────────┐ ┌────────────────────┐
│  ChatSocketContext │ │ GlobalUserSocket   │
│     (Provider)     │ │   Context          │
└────────┬───────────┘ └────────┬───────────┘
         │                      │            
         │                      │            
         ▼                      ▼            
┌────────────────────┐ ┌────────────────────┐
│  chatSocketStore   │ │  userSocketStore   │
│     (Zustand)      │ │     (Zustand)      │
└────────┬───────────┘ └────────┬───────────┘
         │                      │            
         ▼                      ▼            
┌────────────────────┐ ┌────────────────────┐
│  ChatSocketService │ │  UserSocketService │
└────────┬───────────┘ └────────┬───────────┘
         │                      │            
         │                      │            
         ▼                      ▼            
    ┌─────────────────────────────┐          
    │       BaseSocketService     │          
    └─────────────┬───────────────┘          
                  │                          
                  ▼                          
            ┌───────────┐                    
            │ Socket.IO │                    
            └───────────┘                    
```

## Composants principaux

### 1. Services Socket
- `BaseSocketService`: Classe abstraite implémentant les fonctionnalités communes des sockets
- `UserSocketService`: Service pour les fonctionnalités liées à l'utilisateur (statut en ligne, contacts)
- `ChatSocketService`: Service pour les fonctionnalités liées aux messages et conversations

### 2. Stores (Zustand)
- `userSocketStore`: Gère l'état et les méthodes pour le socket utilisateur
- `chatSocketStore`: Gère l'état et les méthodes pour le socket chat

### 3. Providers React
- `GlobalUserSocketProvider`: Fournit le contexte pour le socket utilisateur
- `ChatSocketProvider`: Fournit le contexte pour le socket de chat (spécifique à une conversation)

### 4. Hooks personnalisés
- `useUserSocket`: Facilite l'utilisation des fonctionnalités du socket utilisateur
- `useChatSocket`: Facilite l'utilisation des fonctionnalités du socket chat

## Comment utiliser les sockets dans vos composants

### Pour les fonctionnalités liées à l'utilisateur

```tsx
import { useUserSocket } from '@/app/sockets/user/useUserSocket';

function UserStatusComponent() {
  const { isConnected, service } = useUserSocket();
  
  // Vérifier si l'utilisateur est connecté
  if (isConnected) {
    // Utiliser les fonctionnalités du socket utilisateur
    console.log('Utilisateur connecté');
  }
  
  return <div>Status: {isConnected ? 'En ligne' : 'Hors ligne'}</div>;
}
```

### Pour les fonctionnalités liées au chat

```tsx
import { useChatSocket } from '@/app/sockets/chat/useChatSocket';

function ChatComponent() {
  const { isConnected, sendMessage, sendTypingStatus } = useChatSocket();
  
  const handleSendMessage = () => {
    if (isConnected) {
      sendMessage('conversation-id', 'Hello!', 'user-id');
    }
  };
  
  const handleTyping = (isTyping) => {
    if (isConnected) {
      sendTypingStatus('conversation-id', isTyping);
    }
  };
  
  return (
    <div>
      {/* Interface de chat */}
    </div>
  );
}
```

## Comment configurer les sockets au niveau de l'application

### Socket utilisateur
Assurez-vous que votre application est enveloppée par le `GlobalUserSocketProvider`:

```tsx
// Dans votre layout principal
import { GlobalUserSocketProvider } from '@/app/sockets/user/GlobalUserSocketProvider';

export default function AppLayout({ children }) {
  return (
    <GlobalUserSocketProvider>
      {children}
    </GlobalUserSocketProvider>
  );
}
```

### Socket chat
Pour une conversation spécifique, enveloppez vos composants avec le `ChatSocketProvider`:

```tsx
import { ChatSocketProvider } from '@/app/sockets/chat/ChatSocketProvider';

function ConversationPage({ conversation }) {
  return (
    <ChatSocketProvider conversation={conversation}>
      <ChatInterface />
    </ChatSocketProvider>
  );
}
```

## Bonnes pratiques

1. **Séparation des responsabilités**: Utilisez le socket approprié pour chaque tâche (user pour les statuts, chat pour les messages)
2. **Gestion des connexions**: Laissez les providers gérer les connexions/déconnexions
3. **Utilisez les hooks**: Préférez toujours les hooks `useUserSocket` et `useChatSocket` plutôt que d'accéder directement aux stores
4. **Vérifiez la connexion**: Toujours vérifier `isConnected` avant d'utiliser les fonctionnalités du socket

---

Pour toute question sur l'architecture des sockets, référez-vous à ce document ou contactez l'équipe de développement. 