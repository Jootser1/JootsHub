import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import axiosInstance from '@/app/api/axios-instance'
import { logger } from '@/utils/logger'
import { ContactStore } from '@/features/contacts/contacts.types'

interface ContactResponse {
  contact: {
    user_id: string
    username: string
    avatar: string | null
    last_seen: string
  }
}

export const useContactStore = create<ContactStore>()(
  devtools(
    persist(
      (set, get) => ({
        contactList: new Set<string>(),
        onlineContacts: new Set<string>(),
        userCache: {},
        lastSyncTime: 0,

        // Fonctions de gestion des contacts
        addContact: userId =>
          set(state => {
            const updatedContacts = new Set(state.contactList)
            updatedContacts.add(userId)
            return { contactList: updatedContacts }
          }),
        removeContact: userId =>
          set(state => {
            const updatedContacts = new Set(state.contactList)
            updatedContacts.delete(userId)

            // Nettoyage des données associées
            const updatedOnlineContacts = new Set(state.onlineContacts)
            updatedOnlineContacts.delete(userId)
            const remainingUserCache = { ...state.userCache }
            delete remainingUserCache[userId]

            return {
              contactList: updatedContacts,
              onlineContacts: updatedOnlineContacts,
              userCache: remainingUserCache,
            }
          }),

        resetContacts: () => {
          set({
            contactList: new Set<string>(),
            onlineContacts: new Set<string>(),
            userCache: {},
            lastSyncTime: 0,
          })
        },

        loadContacts: async () => {
          try {
            const response = await axiosInstance.get('/users/me/contacts')
            console.log('RESPONSE', response)
            set(() => {
              const newContactList = new Set<string>()
              response.data.forEach((contact: ContactResponse) => {
                if (contact.contact.user_id) {
                  newContactList.add(contact.contact.user_id)
                }
              })
              return {
                contactList: newContactList,
                lastSyncTime: Date.now(),
              }
            })
            logger.info(`${response.data.length} contact(s) récupérés depuis la bdd et syncstore`)
          } catch (error) {
            logger.error(
              'Erreur lors du chargement des contacts vers le ContactStore',
              error instanceof Error ? error : new Error(String(error))
            )
          }
        },

        isContact: userId => get().contactList.has(userId),

        // Fonctions d'état en ligne - uniquement pour les contacts
        setUserOnlineStatus: (userId, isOnline) => {
          const isContact = get().isContact(userId)
          if (!isContact) return // Ignorer les non-contacts

          set(state => {
            const updatedOnlineContacts = new Set(state.onlineContacts)
            if (isOnline) {
              updatedOnlineContacts.add(userId)
            } else {
              updatedOnlineContacts.delete(userId)
            }
            return { onlineContacts: updatedOnlineContacts }
          })
        },

        isUserOnline: userId => {
          const isContact = get().isContact(userId)
          if (!isContact) return false
          return get().onlineContacts.has(userId)
        },

        // Fonctions de cache - uniquement pour les contacts
        cacheUser: user => {
          const isContact = get().isContact(user.user_id) // Correction de 'user.user_id' à 'user.id'
          if (!isContact) return // Ne pas ajouter automatiquement aux contacts

          set(state => ({
            userCache: {
              ...state.userCache,
              [user.user_id]: { ...user, lastSeen: Date.now() },
            },
          }))
        },
        getCachedUser: userId => {
          const isContact = get().isContact(userId)
          if (!isContact) return undefined
          return get().userCache[userId]
        },

        // Synchronisation avec les conversations actives
        syncWithConversations: participantIds =>
          set(() => {
            const updatedContacts = new Set(participantIds)
            return { contactList: updatedContacts }
          }),

        // Nettoyage du cache
        purgeCacheOlderThan: timestamp =>
          set(() => {
            const newCache = { ...get().userCache }
            Object.entries(newCache).forEach(([id, user]) => {
              if (user.lastSeen < timestamp) {
                delete newCache[id]
              }
            })
            return { userCache: newCache }
          }),
      }),
      {
        name: 'contact-storage',
        partialize: state => ({
          // Nous persistons la liste des contacts et leur cache
          contactList: Array.from(state.contactList),
          onlineContacts: Array.from(state.onlineContacts),
          userCache: state.userCache,
          lastSyncTime: state.lastSyncTime,
        }),
        onRehydrateStorage: () => state => {
          if (state) {
            if (Array.isArray(state.contactList)) {
              state.contactList = new Set(state.contactList)
            }
            if (Array.isArray(state.onlineContacts)) {
              state.onlineContacts = new Set(state.onlineContacts)
            }
          }
        },
      }
    )
  )
)
