import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string | null
  username: string
  email: string | null
  accessToken: string | null
  refreshToken: string | null
  avatar?: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const initialState: User = {
  id: null,
  username: "Invité",
  email: null,
  accessToken: null,
  refreshToken: null,
  avatar: undefined
}

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateTokens: (tokens) => set((state) => ({
        user: state.user ? {
          ...state.user,
          ...tokens
        } : null
      })),
      logout: () => set({ user: null }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: 'user-storage',
    }
  )
)