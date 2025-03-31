import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string | null
  username: string
  email: string | null
  avatar?: string
  isAvailableForChat?: boolean
  isOnline?: boolean
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const initialState: User = {
  id: null,
  username: "Invité",
  email: null,
  avatar: undefined
}

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: 'user-storage',
    }
  )
)