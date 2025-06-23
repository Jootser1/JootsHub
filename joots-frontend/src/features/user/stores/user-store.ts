import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '@shared/user.types'
import { logger } from '@/utils/logger'
import { getSession } from 'next-auth/react'
import axiosInstance from '@/app/api/axios-instance'

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
            const newUser = { ...state.user, is_online: isOnline }
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
            const session = await getSession()
            logger.debug('syncUserData: Session récupérée', { session })
            
            if (!session?.user?.id) {
              logger.warn('syncUserData: Pas d\'ID utilisateur dans la session')
              return
            }

            const response = await axiosInstance.get(`/users/${session.user.id}`)

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

            set({ user: userData })
            
          } catch (error) {
            logger.error(
              'syncUserData: Erreur lors de la synchronisation des données utilisateur:',
              error instanceof Error ? error : new Error(String(error))
            )
          }
        },

        // Socket state
        resetSocketState: () => {
          logger.debug('[UserStore] État socket réinitialisé')
        }
      }),
      {
        name: 'user-store',
        partialize: state => ({
          user: state.user,
          mobileMenuOpen: state.mobileMenuOpen
        })
      }
    )
  )
)
