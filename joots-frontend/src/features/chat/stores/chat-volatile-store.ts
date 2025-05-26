import { create } from 'zustand'
import { ChatSocketService } from '@/features/chat/sockets/chat-socket-service'

interface VolatileChatState {
  isChatConnected: boolean
  isUserConnected: boolean
  setIsChatConnected: (value: boolean) => void
  setIsUserConnected: (value: boolean) => void
  chatSocketRef: ChatSocketService | null
  setChatSocketRef: (socket: ChatSocketService | null) => void
}

export const useVolatileChatStore = create<VolatileChatState>(set => ({
  isChatConnected: false,
  isUserConnected: false,
  chatSocketRef: null,
  setIsChatConnected: value => set({ isChatConnected: value }),
  setIsUserConnected: value => set({ isUserConnected: value }),
  setChatSocketRef: socket => set({ chatSocketRef: socket }),
}))
