import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/features/user/user.types'
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
            const session = await getSession()
            if (!session?.user?.id) return

            const response = await axiosInstance.get(`/users/${session.user.id}`)

            if (!response.data) {
              logger.error('Données utilisateur invalides reçues du serveur')
              return
            }

            const userData = {
              id: response.data.id,
              username: response.data.username,
              avatar: response.data.avatar,
              bio: response.data.bio || '',
              isOnline: true,
              isAvailableForChat: response.data.isAvailableForChat,
            }

            set({ user: userData })
          } catch (error) {
            logger.error(
              'Erreur lors de la synchronisation des données utilisateur:',
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
