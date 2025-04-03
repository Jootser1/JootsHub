import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // UI state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // User status
  updateUserStatus: (isOnline: boolean) => void;
  updateChatAvailability: (isAvailable: boolean) => void;
}

const initialState: User = {
  id: "",
  username: "Invité",
  avatar: null,
  isOnline: false,
  isAvailableForChat: false
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      // UI state
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      // User status
      updateUserStatus: (isOnline) => 
        set((state) => ({
          user: state.user ? { ...state.user, isOnline } : null
        })),
      updateChatAvailability: (isAvailable) =>
        set((state) => ({
          user: state.user ? { ...state.user, isAvailableForChat: isAvailable } : null
        })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        mobileMenuOpen: state.mobileMenuOpen,
      }),
    }
  )
);