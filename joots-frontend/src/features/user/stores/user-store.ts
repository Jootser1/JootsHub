import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@shared/user.types'
import { logger } from '@/utils/logger'
import axiosInstance from '@/app/api/axios-instance'
import { devtools } from 'zustand/middleware'
import { getSession } from 'next-auth/react'

interface UserStore {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void

  // UI state
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // User status
  setUserStatus: (isOnline: boolean, source?: 'socket' | 'redis') => void
  updateChatAvailability: (isAvailable: boolean) => void
  syncUserData: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      set => ({
        // User state
        user: null,
        setUser: user => set({ user }),
        logout: () => set({ user: null }),

        // UI state
        mobileMenuOpen: false,
        setMobileMenuOpen: open => set({ mobileMenuOpen: open }),

        // User status
        setUserStatus: (isOnline, source = 'socket') => {
          set(state => {
            if (!state.user) return state

            const newUser = { ...state.user, isOnline }
            return { user: newUser }
          })
        },
        updateChatAvailability: isAvailable =>
          set(state => {
            const newUser = state.user ? { ...state.user, isAvailableForChat: isAvailable } : null
            logger.info(
              `[UserStore] Disponibilité chat mise à jour: ${newUser?.username || 'Invité'} est maintenant ${isAvailable ? 'disponible' : 'indisponible'} pour le chat`
            )
            return { user: newUser }
          }),

        syncUserData: async () => {
          try {
            logger.info('syncUserData: Début de la synchronisation')
            const session = await getSession()
            logger.debug('syncUserData: Session récupérée', { session })
            
            if (!session?.user?.id) {
              logger.warn('syncUserData: Pas d\'ID utilisateur dans la session')
              return
            }

            logger.info('syncUserData: Appel API pour récupérer les données utilisateur', { userId: session.user.id })
            const response = await axiosInstance.get(`/users/${session.user.id}`)
            logger.debug('syncUserData: Réponse API reçue', { response: response.data })

            if (!response.data) {
              logger.error('syncUserData: Données utilisateur invalides reçues du serveur')
              return
            }

            const userData = {
              user_id: session.user.id,
              username: response.data.username,
              avatar: response.data.avatar,
              last_seen: response.data.last_seen,
            }

            logger.info('syncUserData: Mise à jour du store avec les données utilisateur', { userData })
            set({ user: userData })
            logger.info('syncUserData: Store mis à jour avec succès')
          } catch (error) {
            logger.error(
              'syncUserData: Erreur lors de la synchronisation des données utilisateur:',
              error instanceof Error ? error : new Error(String(error))
            )
          }
        },
      }),
      {
        name: 'user-storage',
        partialize: state => ({
          user: state.user,
          mobileMenuOpen: state.mobileMenuOpen,
        }),
      }
    )
  )
)
