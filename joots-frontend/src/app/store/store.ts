import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string | null
  username: string
  email: string | null
  accessToken: string | null
  refreshToken: string | null
}

interface UserStore {
  user: User
  setUser: (userData: User) => void
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
}

const initialState: User = {
  id: null,
  username: "Invité",
  email: null,
  accessToken: null,
  refreshToken: null,
}

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialState,
      setUser: (userData) => set({ user: userData }),
      updateTokens: (tokens) => set((state) => ({
        user: {
          ...state.user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }
      })),
      logout: () => set({ user: initialState })
    }),
    {
      name: 'user-storage',
    }
  )
)