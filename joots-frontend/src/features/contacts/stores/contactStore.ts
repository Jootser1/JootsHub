import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/features/user/user.types';
import { devtools } from 'zustand/middleware';
interface ContactStore {
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

export const useContactStore = create<ContactStore>()(
  devtools(
  persist(
    (set, get) => ({
      contactList: new Set<string>(),
      onlineContacts: new Set<string>(),
      userCache: {},
      
      // Fonctions de gestion des contacts
      addContact: (userId) => 
        set((state) => {
          const updatedContacts = new Set(state.contactList);
          updatedContacts.add(userId);
          return { contactList: updatedContacts };
        }),
      removeContact: (userId) => 
        set((state) => {
          const updatedContacts = new Set(state.contactList);
          updatedContacts.delete(userId);
          
          // Nettoyage des données associées
          const updatedOnlineContacts = new Set(state.onlineContacts);
          updatedOnlineContacts.delete(userId);
          const { [userId]: _, ...remainingUserCache } = state.userCache;
          
          return { 
            contactList: updatedContacts,
            onlineContacts: updatedOnlineContacts,
            userCache: remainingUserCache
          };
        }),
      isContact: (userId) => get().contactList.has(userId),
      
      // Fonctions d'état en ligne - uniquement pour les contacts
      setUserOnlineStatus: (userId, isOnline) => {
        const isContact = get().isContact(userId);
        if (!isContact) return; // Ignorer les non-contacts
        
        set((state) => {
          const updatedOnlineContacts = new Set(state.onlineContacts);
          if (isOnline) {
            updatedOnlineContacts.add(userId);
          } else {
            updatedOnlineContacts.delete(userId);
          }
          return { onlineContacts: updatedOnlineContacts };
        });
      },

      isUserOnline: (userId) => {
        const isContact = get().isContact(userId);
        if (!isContact) return false;
        return get().onlineContacts.has(userId);
      },
      
      // Fonctions de cache - uniquement pour les contacts
      cacheUser: (user) => {
        const isContact = get().isContact(user.id);
        if (!isContact) {
          get().addContact(user.id); // Ajouter automatiquement aux contacts
        }
        
        set((state) => ({
          userCache: {
            ...state.userCache,
            [user.id]: { ...user, lastSeen: Date.now() }
          }
        }));
      },
      getCachedUser: (userId) => {
        const isContact = get().isContact(userId);
        if (!isContact) return undefined;
        return get().userCache[userId];
      },
      
      // Synchronisation avec les conversations actives
      syncWithConversations: (participantIds) => 
        set((state) => {
          const updatedContacts = new Set(participantIds);
          return { contactList: updatedContacts };
        }),
      
      // Nettoyage du cache
      purgeCacheOlderThan: (timestamp) => 
        set((state) => {
          const newCache = { ...state.userCache };
          Object.entries(newCache).forEach(([id, user]) => {
            if (user.lastSeen < timestamp) {
              delete newCache[id];
            }
          });
          return { userCache: newCache };
        }),
    }),
    {
      name: 'contact-storage',
      partialize: (state) => ({
        // Nous persistons la liste des contacts et leur cache
        contactList: Array.from(state.contactList),
        onlineContacts: Array.from(state.onlineContacts),
        userCache: state.userCache,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (Array.isArray(state.contactList)) {
            state.contactList = new Set(state.contactList);
          }
          if (Array.isArray(state.onlineContacts)) {
              state.onlineContacts = new Set(state.onlineContacts);
          }
        }
      },
    }
  )
)); 