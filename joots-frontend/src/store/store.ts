import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  onlineUsers: Set<string>;
  setOnlineUsers: (users: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      onlineUsers: new Set<string>(),
      setOnlineUsers: (users) => 
        set((state) => ({
          onlineUsers: typeof users === 'function' ? users(state.onlineUsers) : users
        })),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        onlineUsers: Array.from(state.onlineUsers),
      }),
      onRehydrateStorage: (state) => (state) => {
        if (state) {
          state.onlineUsers = new Set(state.onlineUsers);
        }
      },
    }
  )
);