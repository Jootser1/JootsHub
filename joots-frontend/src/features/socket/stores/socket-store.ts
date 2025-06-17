import { create } from 'zustand'
import { logger } from '@/utils/logger'

interface SocketState {
  isUserConnected: boolean
  isChatConnected: boolean
  setUserConnected: (isConnected: boolean) => void
  setChatConnected: (isConnected: boolean) => void
  reset: () => void
}

export const useSocketStore = create<SocketState>((set) => ({
  isUserConnected: false,
  isChatConnected: false,
  
  setUserConnected: (isConnected) => {
    set({ isUserConnected: isConnected })
    logger.debug(`SocketStore: État de connexion utilisateur mis à jour: ${isConnected}`)
  },
  
  setChatConnected: (isConnected) => {
    set({ isChatConnected: isConnected })
    logger.debug(`SocketStore: État de connexion chat mis à jour: ${isConnected}`)
  },
  
  reset: () => {
    set({ isUserConnected: false, isChatConnected: false })
    logger.debug('SocketStore: État réinitialisé')
  }
})) 