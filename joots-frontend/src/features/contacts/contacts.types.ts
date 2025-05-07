import { User } from '@/features/user/user.types';

export interface ContactStore {
  // Liste des utilisateurs avec qui on a une conversation
  contactList: Set<string>;

  // État en ligne - uniquement pour les contacts
  onlineContacts: Set<string>;
  
  // Cache des utilisateurs - uniquement pour les contacts
  userCache: Record<string, User & { lastSeen: number }>;
  
  // Gestion des contacts
  addContact: (userId: string) => void;
  removeContact: (userId: string) => void;
  isContact: (userId: string) => boolean; 
  loadContacts: () => Promise<void>;
  
  // Gestion des états en ligne
  setUserOnlineStatus: (userId: string, isOnline: boolean) => void;
  isUserOnline: (userId: string) => boolean;
  
  // Gestion du cache utilisateurs
  cacheUser: (user: User) => void;
  getCachedUser: (userId: string) => (User & { lastSeen: number }) | undefined;
  
  // Synchronisation et nettoyage
  syncWithConversations: (participantIds: string[]) => void;
  purgeCacheOlderThan: (timestamp: number) => void;
}