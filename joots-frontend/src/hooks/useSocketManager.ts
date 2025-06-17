import { useCallback } from 'react'
import { socketManager } from '@/lib/sockets/socket-manager'
import { logger } from '@/utils/logger'
import { ChatSocketService } from '@/features/chat/sockets/chat-socket-service'
import { useSocketStore } from '@/features/socket/stores/socket-store'

/**
 * Hook personnalisé pour accéder aux fonctionnalités du socketManager
 * VERSION OPTIMISÉE - Utilise le store Zustand
 */
export function useSocketManager() {
  const { isUserConnected, isChatConnected } = useSocketStore()

  // ========================================
  // FONCTIONS PUREMENT RÉACTIVES (sans connexion)
  // ========================================

  // Fonction pour vérifier si une conversation est active
  const isConversationActive = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService
    return chatSocket ? chatSocket.isInConversation(conversationId) : false
  }, [])

  // Fonction pour rejoindre une conversation
  const joinConversation = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket()
    if (chatSocket?.isConnected()) {
      if (!isConversationActive(conversationId)) {
        chatSocket.joinConversation(conversationId)
        // Log déjà fait dans chat-socket-service.ts
      } else {
        logger.debug(`useSocketManager: Déjà dans la conversation: ${conversationId}`)
      }
    } else {
      logger.warn(
        `useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`
      )
    }
  }, [isConversationActive])

  // ========================================
  // FONCTIONS UTILITAIRES (PUREMENT RÉACTIVES)
  // ========================================

  const disconnectUserSocket = useCallback(() => {
    socketManager.disconnectUserSocket()
  }, [])

  const disconnectChatSocket = useCallback(() => {
    socketManager.disconnectChatSocket()
  }, [])

  const disconnectAll = useCallback(() => {
    socketManager.disconnectAll()
  }, [])

  const leaveConversation = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket()
    if (chatSocket?.isConnected()) {
      chatSocket.leaveConversation(conversationId)
    }
  }, [])

  const joinMultipleConversations = useCallback((conversationIds: string[]) => {
    const chatSocket = socketManager.getChatSocket()
    if (chatSocket?.isConnected() && conversationIds.length > 0) {
      chatSocket.joinAllConversations(conversationIds)
      // Log déjà fait dans chat-socket-service.ts
    }
  }, [])

  const getActiveConversations = useCallback(() => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService
    return chatSocket ? chatSocket.getActiveConversations() : []
  }, [])

  // Fonctions pour les messages
  const sendChatMessage = useCallback((conversationId: string, content: string, userId: string) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService
    if (!chatSocket) {
      logger.warn("useSocketManager: Impossible d'envoyer le message: socket non initialisé")
      return false
    }

    if (!chatSocket.isConnected()) {
      logger.warn("useSocketManager: Impossible d'envoyer le message: socket non connecté")
      return false
    }

    if (!isConversationActive(conversationId)) {
      chatSocket.joinConversation(conversationId)
      // Log déjà fait dans chat-socket-service.ts
    }

    return chatSocket.sendMessage(conversationId, content, userId)
  }, [isConversationActive])

  const sendTypingStatus = useCallback((conversationId: string, isTyping: boolean) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService
    if (!chatSocket?.isConnected()) {
      logger.warn(
        `useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`
      )
      return
    }

    if (!isConversationActive(conversationId)) {
      chatSocket.joinConversation(conversationId)
      // Log déjà fait dans chat-socket-service.ts
    }

    chatSocket.sendTypingStatus(conversationId, isTyping)
  }, [isConversationActive])

  const sendIcebreakerReady = useCallback((conversationId: string, isReady: boolean) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService
    const userId = socketManager.getUserId()

    if (!chatSocket?.isConnected()) {
      logger.warn(
        "useSocketManager: Impossible d'envoyer le statut icebreaker: socket non connecté"
      )
      return false
    }

    if (!userId) {
      logger.warn(
        "useSocketManager: Impossible d'envoyer le statut icebreaker: utilisateur non identifié"
      )
      return false
    }

    if (!isConversationActive(conversationId)) {
      chatSocket.joinConversation(conversationId)
      // Log déjà fait dans chat-socket-service.ts
    }

    chatSocket.sendIcebreakerReady(conversationId, userId, isReady)
    return true
  }, [isConversationActive])

  // Retourner l'interface publique
  return {
    // États
    isUserConnected,
    isChatConnected,
    
    // Fonctions utilitaires
    disconnectUserSocket,
    disconnectChatSocket,
    disconnectAll,
    
    // Fonctions de conversation
    joinConversation,
    leaveConversation,
    joinMultipleConversations,
    isConversationActive,
    getActiveConversations,
    
    // Fonctions de message
    sendChatMessage,
    sendTypingStatus,
    sendIcebreakerReady,
  }
}
