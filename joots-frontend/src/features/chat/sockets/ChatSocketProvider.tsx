'use client'

import { ReactNode, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { logger } from '@/utils/logger'
import { socketManager } from '@/lib/sockets/socket-manager'
import axiosInstance from '@/app/api/axios-instance'
import { useChatStore } from '@/features/chat/stores/chat-store'

interface ChatSocketProviderProps {
  children: ReactNode
}

//Composant qui établit et maintient une connexion socket chat pour l'utilisateur connecté
export function ChatSocketProvider({ children }: ChatSocketProviderProps) {
  const { data: session, status } = useSession()
  const chatSetupDoneRef = useRef(false)
  const lastChatSessionIdRef = useRef<string | null>(null)
  const isChatConnectingRef = useRef(false) // Nouveau verrou

  // Récupération des conversations de l'utilisateur
  const fetchUserConversations = useCallback(async () => {
    try {
      let conversationIds = useChatStore.getState().conversationsIds
      if (conversationIds.length > 0) {
        return conversationIds
      }
      const response = await axiosInstance.get('/conversations')
      conversationIds = response.data.map((conv: { id: string }) => conv.id)
      const chatStore = useChatStore.getState()
      chatStore.setConversationsIds(conversationIds)
      return conversationIds
    } catch (error) {
      logger.error('ChatSocketProvider: Erreur lors du chargement des conversations:', error as Error)
      return []
    }
  }, [])

  // Fonction mémorisée pour connecter le socket chat DIRECTEMENT
  const connectChat = useCallback(
    async (userId: string, token: string): Promise<boolean> => {
      // Vérifier si une connexion est déjà en cours
      if (isChatConnectingRef.current) {
        logger.debug('ChatSocketProvider: Connexion chat déjà en cours, attente...')
        return socketManager.isChatSocketConnected()
      }

      // Éviter les connexions multiples pour la même session
      if (lastChatSessionIdRef.current === userId && socketManager.isChatSocketConnected()) {
        logger.debug('ChatSocketProvider: Socket chat déjà connecté pour cette session')
        return true
      }

      isChatConnectingRef.current = true

      try {
        // Attendre que le socket utilisateur soit connecté (avec timeout)
        const waitForUserSocket = async (maxWaitTime = 10000): Promise<boolean> => {
          const startTime = Date.now()
          
          while (!socketManager.isUserSocketConnected()) {
            if (Date.now() - startTime > maxWaitTime) {
              logger.warn('ChatSocketProvider: Timeout - Socket utilisateur non connecté après 10s')
              return false
            }
            
            logger.debug('ChatSocketProvider: Attente du socket utilisateur...')
            await new Promise(resolve => setTimeout(resolve, 500))
          }
          
          return true
        }

        const userSocketReady = await waitForUserSocket()
        if (!userSocketReady) {
          logger.error('ChatSocketProvider: Impossible de connecter le chat - socket utilisateur non disponible')
          return false
        }

        logger.debug('ChatSocketProvider: Socket utilisateur prêt, connexion du chat...')

        // Récupérer les conversations
        const conversationIds = await fetchUserConversations()

        // Connecter le socket chat directement
        socketManager.setCredentials(userId, token)
        const chatSocket = await socketManager.connectChatSocket(conversationIds)
        
        lastChatSessionIdRef.current = userId
        logger.info(`ChatSocketProvider: Socket chat connecté avec ${conversationIds.length} conversations`)
        return chatSocket.isConnected()
      } catch (error) {
        logger.error('ChatSocketProvider: Erreur lors de la connexion au socket chat', error as Error)
        return false
      } finally {
        isChatConnectingRef.current = false
      }
    },
    [fetchUserConversations]
  )

  // Effet principal pour établir la connexion socket
  useEffect(() => {
    // Reset si changement d'utilisateur
    if (session?.user?.id !== lastChatSessionIdRef.current) {
      chatSetupDoneRef.current = false
    }

    const setupChatSocket = async () => {
      // Conditions préalables non remplies
      if (status !== 'authenticated' || !session?.user?.id) {
        return
      }

      // Éviter les configurations multiples pour la même session
      if (chatSetupDoneRef.current && lastChatSessionIdRef.current === session.user.id) {
        return
      }

      // Éviter les appels simultanés
      if (isChatConnectingRef.current) {
        return
      }

      const success = await connectChat(session.user.id, session.accessToken)
      if (success) {
        chatSetupDoneRef.current = true
      }
    }

    setupChatSocket()

    // Pas de nettoyage spécifique ici - géré par GlobalUserSocketProvider
  }, [session?.user?.id, session?.accessToken, status, connectChat])

  // Rendre simplement les enfants
  return <>{children}</>
}
