'use client'

import { ReactNode, useEffect, useCallback, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { logger } from '@/utils/logger'
import { socketManager } from '@/lib/sockets/socket-manager'
import axiosInstance from '@/app/api/axios-instance'
import { useChatStore } from '@/features/chat/stores/chat-store'
import { json } from 'stream/consumers'

interface ChatSocketProviderProps {
  children: ReactNode
}

//Composant qui établit et maintient une connexion socket chat pour l'utilisateur connecté
export function ChatSocketProvider({ children }: ChatSocketProviderProps) {
  const { data: session, status } = useSession()
  const chatSetupDoneRef = useRef(false)
  const lastChatSessionIdRef = useRef<string | null>(null)
  const isChatConnectingRef = useRef(false)
  const setupTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ✅ Optimisation : Mémoriser les conversations pour éviter les re-calculs
  const conversationsCache = useRef<string[]>([])

  // ✅ Optimisation : Récupération des conversations avec cache et debouncing
  const fetchUserConversations = useCallback(async () => {
    try {
      // Vérifier le cache d'abord
      if (conversationsCache.current.length > 0) {
        logger.debug('ChatSocketProvider: Utilisation du cache des conversations')
        return conversationsCache.current
      }

      let conversationIds = useChatStore.getState().conversationsIds
      if (conversationIds.length > 0) {
        conversationsCache.current = conversationIds
        return conversationIds
      }

      // ✅ Optimisation : Requête avec timeout pour éviter les blocages
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      try {
        const response = await axiosInstance.get('/conversations', {
          signal: controller.signal
        })
        clearTimeout(timeoutId)

        const conversations = response.data.map((conv: { 
          conversation_id: string, 
          participants: string[], 
          last_message?: { 
            message_id: string, 
            content: string, 
            created_at: string, 
            sender_id: string, 
            is_read: boolean 
          } 
        }) => ({
          conversation_id: conv.conversation_id,
          participants: conv.participants,
          lastMessage: conv.last_message ? {
            id: conv.last_message.message_id,
            content: conv.last_message.content,
            createdAt: conv.last_message.created_at,
            senderId: conv.last_message.sender_id,
            isRead: conv.last_message.is_read
          } : null
        }))
        const conversationIds = conversations.map((conv: { conversation_id: string }) => conv.conversation_id)
        useChatStore.getState().setConversationsIds(conversationIds)

        
        // Add ConversationIds into cache
        conversationsCache.current = conversationIds
        
        logger.info('ChatSocketProvider: Conversations chargées avec succès', { count: conversationIds.length })
        return conversationIds
      } catch (error) {
        clearTimeout(timeoutId)
        logger.error('ChatSocketProvider: Erreur détaillée lors du chargement des conversations:', {
          error: error instanceof Error ? {
            message: error.message,
            stack: error.stack,
            name: error.name
          } : error
        })
        throw error
      }
    } catch (error) {
      logger.error('ChatSocketProvider: Erreur lors du chargement des conversations:', error as Error)
      return []
    }
  }, [])

  // ✅ Optimisation : Connexion chat avec gestion asynchrone améliorée
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
        // ✅ Optimisation : Attente non-bloquante du socket utilisateur
        const waitForUserSocket = async (maxWaitTime = 8000): Promise<boolean> => {
          const startTime = Date.now()
          
          while (!socketManager.isUserSocketConnected()) {
            if (Date.now() - startTime > maxWaitTime) {
              logger.warn('ChatSocketProvider: Timeout - Socket utilisateur non connecté après 8s')
              return false
            }
            
            // ✅ Optimisation : Attente plus courte pour réduire le blocage
            await new Promise(resolve => setTimeout(resolve, 200))
          }
          
          return true
        }

        const userSocketReady = await waitForUserSocket()
        if (!userSocketReady) {
          logger.error('ChatSocketProvider: Impossible de connecter le chat - socket utilisateur non disponible')
          return false
        }

        logger.debug('ChatSocketProvider: Socket utilisateur prêt, connexion du chat...')

        // ✅ Optimisation : Récupération des conversations en parallèle
        const [conversationIds] = await Promise.all([
          fetchUserConversations(),
          // Petite pause pour éviter la surcharge
          new Promise(resolve => setTimeout(resolve, 50))
        ])

        // ✅ Optimisation : Connexion socket avec credentials pré-configurés
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

  // ✅ Optimisation : Mémoriser les dépendances pour éviter les re-renders
  const sessionData = useMemo(() => ({
    userId: session?.user?.id,
    accessToken: session?.accessToken,
    status
  }), [session?.user?.id, session?.accessToken, status])

  // ✅ Optimisation : Setup avec debouncing pour éviter les appels multiples
  useEffect(() => {
    // Reset si changement d'utilisateur
    if (sessionData.userId !== lastChatSessionIdRef.current) {
      chatSetupDoneRef.current = false
      conversationsCache.current = [] // Vider le cache
    }

    const setupChatSocket = async () => {
      // Conditions préalables non remplies
      if (sessionData.status !== 'authenticated' || !sessionData.userId) {
        return
      }

      // Éviter les configurations multiples pour la même session
      if (chatSetupDoneRef.current && lastChatSessionIdRef.current === sessionData.userId) {
        return
      }

      // Éviter les appels simultanés
      if (isChatConnectingRef.current) {
        return
      }

      // ✅ Optimisation : Debouncing pour éviter les appels rapides successifs
      if (setupTimeoutRef.current) {
        clearTimeout(setupTimeoutRef.current)
      }

      setupTimeoutRef.current = setTimeout(async () => {
        try {
          const success = await connectChat(sessionData.userId!, sessionData.accessToken!)
          if (success) {
            chatSetupDoneRef.current = true
          }
        } catch (error) {
          logger.error('ChatSocketProvider: Erreur lors du setup:', error as Error)
        }
        setupTimeoutRef.current = null
      }, 100) // Debounce de 100ms
    }

    setupChatSocket()

    // ✅ Cleanup du timeout
    return () => {
      if (setupTimeoutRef.current) {
        clearTimeout(setupTimeoutRef.current)
        setupTimeoutRef.current = null
      }
    }
  }, [sessionData, connectChat])

  // Rendre simplement les enfants
  return <>{children}</>
}
