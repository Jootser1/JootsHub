import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import axiosInstance from '@/app/api/axios-instance'
import { logger } from '@/utils/logger'
import { Conversation } from '@/features/conversations/conversation.types'

export function useConversation() {
  const { data: session } = useSession()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const conversationCache = useRef<Record<string, Conversation>>({})
  const pendingRequests = useRef<Record<string, Promise<Conversation>>>({})

  const fetchConversations = async () => {
    try {
      const response = await axiosInstance.get('/conversations')
      setConversations(response.data)
    } catch (error) {
      logger.error(
        'Error fetching conversations:',
        error instanceof Error ? error : new Error(String(error))
      )
      setError(error instanceof Error ? error : new Error('Failed to fetch conversations'))
    }
  }

  const createConversation = async (receiverId: string) => {
    try {
      logger.debug('Creating new conversation with:', receiverId)
      const response = await axiosInstance.post('/conversations', { receiverId })
      logger.debug('New conversation created:', response.data)
      setConversations(prev => [...prev, response.data])
      return response.data
    } catch (error) {
      logger.error(
        'Error creating conversation:',
        error instanceof Error ? error : new Error(String(error))
      )
      throw error
    }
  }

  const findConversation = useCallback(async (receiverId: string) => {
    // Si la conversation est déjà en cache, la retourner
    if (conversationCache.current[receiverId]) {
      return conversationCache.current[receiverId]
    }

    // Si une requête est déjà en cours pour ce receiverId, retourner la promesse existante
    const pendingRequest = pendingRequests.current[receiverId]
    if (pendingRequest) {
      return pendingRequest
    }

    try {
      logger.debug('Finding conversation with:', receiverId)
      // Stocker la promesse dans pendingRequests
      const request = axiosInstance
        .get(`/conversations/${receiverId}`)
        .then(response => {
          // Mettre en cache le résultat
          conversationCache.current[receiverId] = response.data
          // Nettoyer la requête en cours
          delete pendingRequests.current[receiverId]
          return response.data
        })
        .catch(error => {
          // Nettoyer la requête en cours en cas d'erreur
          delete pendingRequests.current[receiverId]
          logger.error(
            'Error finding conversation:',
            error instanceof Error ? error : new Error(String(error))
          )
          throw error
        })

      pendingRequests.current[receiverId] = request
      return request
    } catch (error) {
      logger.error(
        'Error finding conversation:',
        error instanceof Error ? error : new Error(String(error))
      )
      throw error
    }
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      fetchConversations()
    }
    setLoading(false)
  }, [session?.user?.id])

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    createConversation,
    findConversation,
  }
}
