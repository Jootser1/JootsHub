import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { logger } from '@/utils/logger';
import axiosInstance from '@/app/api/axiosInstance';

interface UserStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // UI state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // User status
  updateUserStatus: (isOnline: boolean, source?: 'socket' | 'redis') => void;
  updateChatAvailability: (isAvailable: boolean) => void;
  syncUserStatus: () => Promise<void>;
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
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      // UI state
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      // User status
      updateUserStatus: (isOnline, source = 'socket') => {
        set((state) => {
          if (!state.user) return state;
          
          const newUser = { ...state.user, isOnline };
          logger.info(
            `[UserStore] Statut utilisateur mis à jour (${source}): ${newUser.username} est maintenant ${isOnline ? 'en ligne' : 'hors ligne'}`
          );
          
          return { user: newUser };
        });
      },
      updateChatAvailability: (isAvailable) =>
        set((state) => {
          const newUser = state.user ? { ...state.user, isAvailableForChat: isAvailable } : null;
          logger.info(`[UserStore] Disponibilité chat mise à jour: ${newUser?.username || 'Invité'} est maintenant ${isAvailable ? 'disponible' : 'indisponible'} pour le chat`);
          return { user: newUser };
        }),
      syncUserStatus: async () => {
        const { user } = get();
        if (!user) return;
        
        try {
          const response = await axiosInstance.get(`/users/${user.id}/status`);
          const redisStatus = response.data.status;
          
          set((state) => {
            if (!state.user) return state;
            
            const newUser = { ...state.user, isOnline: redisStatus === 'online' };
            logger.info(
              `[UserStore] Synchronisation avec Redis: ${newUser.username} est ${redisStatus}`
            );
            
            return { user: newUser };
          });
        } catch (error) {
          logger.error('[UserStore] Erreur lors de la synchronisation du statut:', error);
        }
      },
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