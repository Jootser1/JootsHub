import { useState, useCallback, useEffect, useRef } from 'react'
import { socketManager } from '@/lib/sockets/socket-manager'
import { logger } from '@/utils/logger'
import { ChatSocketService } from '@/features/chat/sockets/chat-socket-service'

interface SocketState {
  isUserConnected: boolean
  isChatConnected: boolean
}

/**
 * Hook personnalisé pour accéder aux fonctionnalités du socketManager
 * VERSION OPTIMISÉE - Utilise le système d'événements du socket manager
 */
export function useSocketManager() {
  const [socketState, setSocketState] = useState<SocketState>(() => ({
    isUserConnected: socketManager.isUserSocketConnected(),
    isChatConnected: socketManager.isChatSocketConnected()
  }))
  const mountedRef = useRef(true)

  // ✅ Abonnement direct au socket manager (plus efficace que le polling)
  useEffect(() => {
    mountedRef.current = true

    // S'abonner aux changements d'état du socket manager
    const unsubscribe = socketManager.onStateChange((isUserConnected, isChatConnected) => {
      if (mountedRef.current) {
        const newState = { isUserConnected, isChatConnected }
        
        // ✅ Seulement mettre à jour si l'état a vraiment changé
        setSocketState(prevState => {
          if (
            prevState.isUserConnected !== newState.isUserConnected ||
            prevState.isChatConnected !== newState.isChatConnected
          ) {
            const changes: string[] = []
            
            if (prevState.isUserConnected !== newState.isUserConnected) {
              changes.push(`utilisateur: ${newState.isUserConnected}`)
            }
            
            if (prevState.isChatConnected !== newState.isChatConnected) {
              changes.push(`chat: ${newState.isChatConnected}`)
            }

            logger.debug(`useSocketManager: États mis à jour - ${changes.join(', ')}`)
            return newState
          }
          
          return prevState
        })
      }
    })

    return () => {
      mountedRef.current = false
      unsubscribe()
    }
  }, []) // ✅ Pas de dépendances - évite les re-abonnements

  // ✅ Cleanup au démontage
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

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
    // ✅ Pas besoin de forcer la mise à jour - le système d'événements s'en charge
  }, [])

  const disconnectChatSocket = useCallback(() => {
    socketManager.disconnectChatSocket()
    // ✅ Pas besoin de forcer la mise à jour - le système d'événements s'en charge
  }, [])

  const disconnectAll = useCallback(() => {
    socketManager.disconnectAll()
    // ✅ Pas besoin de forcer la mise à jour - le système d'événements s'en charge
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

  // Retourner l'interface publique (SANS fonctions de connexion)
  return {
    // États
    isUserConnected: socketState.isUserConnected,
    isChatConnected: socketState.isChatConnected,
    
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
