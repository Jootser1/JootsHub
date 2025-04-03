import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnlineUsersStore {
  onlineUsers: Set<string>;
  setOnlineUsers: (users: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  addOnlineUser: (userId: string) => void;
  removeOnlineUser: (userId: string) => void;
  isUserOnline: (userId: string) => boolean;
}

export const useOnlineUsersStore = create<OnlineUsersStore>()(
  persist(
    (set, get) => ({
      onlineUsers: new Set<string>(),
      setOnlineUsers: (users) => 
        set((state) => ({
          onlineUsers: typeof users === 'function' ? users(state.onlineUsers) : users
        })),
      addOnlineUser: (userId) =>
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId])
        })),
      removeOnlineUser: (userId) =>
        set((state) => {
          const newSet = new Set(state.onlineUsers);
          newSet.delete(userId);
          return { onlineUsers: newSet };
        }),
      isUserOnline: (userId) => get().onlineUsers.has(userId),
    }),
    {
      name: 'online-users-storage',
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