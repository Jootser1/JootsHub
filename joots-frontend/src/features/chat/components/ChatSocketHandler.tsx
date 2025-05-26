import { ReactNode, useEffect, useRef } from 'react'
import { useSocketManager } from '@/hooks/useSocketManager'
import { logger } from '@/utils/logger'

interface ChatSocketHandlerProps {
  children: ReactNode
  conversationId: string
}

// Registre global statique pour suivre les conversations connectées
// et éviter les connexions multiples aux mêmes conversations
const connectedConversations = new Set<string>()

/**
 * Composant qui gère la connexion/déconnexion d'une conversation spécifique
 */
export function ChatSocketHandler({ children, conversationId }: ChatSocketHandlerProps) {
  const { isChatConnected, joinConversation, leaveConversation, isConversationActive } =
    useSocketManager()
  const hasJoinedRef = useRef(false)
  const conversationIdRef = useRef(conversationId)

  // Mettre à jour la référence si conversationId change
  useEffect(() => {
    conversationIdRef.current = conversationId
  }, [conversationId])

  // Rejoindre la conversation quand le composant est monté
  useEffect(() => {
    // Ne rien faire si on n'est pas connecté ou si on a déjà rejoint
    if (!isChatConnected || hasJoinedRef.current) return

    // Vérifier si la conversation est déjà connectée globalement
    if (connectedConversations.has(conversationId)) {
      logger.info(
        `ChatSocketHandler: La conversation ${conversationId} est déjà gérée par une autre instance`
      )
      return
    }

    // Rejoindre la conversation si on n'y est pas déjà
    if (!isConversationActive(conversationId)) {
      logger.debug(`ChatSocketHandler: Tentative de rejoindre la conversation ${conversationId}`)
      joinConversation(conversationId)
      hasJoinedRef.current = true
      connectedConversations.add(conversationId)
      logger.info(`ChatSocketHandler: Conversation ${conversationId} rejointe`)
    } else {
      // Marquer comme rejoint même si on était déjà dans la conversation
      logger.debug(`ChatSocketHandler: Conversation ${conversationId} déjà active, marquage comme rejoint`)
      hasJoinedRef.current = true
      connectedConversations.add(conversationId)
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (hasJoinedRef.current) {
        leaveConversation(conversationIdRef.current)
        hasJoinedRef.current = false
        connectedConversations.delete(conversationIdRef.current)
      }
    }
  }, [isChatConnected, joinConversation, leaveConversation, isConversationActive, conversationId])

  return <>{children}</>
}
