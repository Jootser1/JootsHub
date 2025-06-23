'use client'

import { useEffect, useState, use, useRef } from 'react'
import axiosInstance from '@/app/api/axios-instance'
import { AxiosError } from 'axios'
import { AppLayout } from '@/components/AppLayout'
import { ChatContainer } from '@/features/chat/components/ChatContainer'
import { toast } from 'sonner'
import { getOtherParticipant } from '@/features/conversations/utils/conversation-utils'
import { ConversationWithXpAndLevel, Conversation } from '@shared/conversation.types'
import { useChatStore } from '@/features/chat/stores/chat-store'
import { useUserStore } from '@/features/user/stores/user-store'
import { ExperienceLogo } from '@/components/ExperienceLogo'
import { xp_and_level } from '@shared/conversation.types'
import { logger } from '@/utils/logger'
// ChatSocketHandler supprimé - redondant avec ChatSocketProvider

// Définition du composant de contenu de conversation
function ConversationContent({ conversation, xpAndLevel }: { conversation: ConversationWithXpAndLevel, xpAndLevel?: xp_and_level | null }) {
  return (
    <div className='max-w-md w-full mx-auto bg-white shadow-lg flex flex-col h-full'>
      <ChatContainer conversation={conversation} xpAndLevel={xpAndLevel} />
      <ExperienceLogo experience='icebreaker' />
    </div>
  )
}

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const user = useUserStore(state => state.user)
  const [conversation, setConversation] = useState<ConversationWithXpAndLevel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const fetchAttemptedRef = useRef(false)
  const conversationInitializedRef = useRef(false)
  const [xpAndLevel, setXpAndLevel] = useState<xp_and_level | null>(null)
  
  // Appel inconditionnel du Hook
  const otherUser = conversation ? getOtherParticipant({ ...conversation, current_poll: null }, user?.user_id || '') : null

  useEffect(() => {
    const fetchConversation = async () => {
      // Éviter les appels multiples
      if (fetchAttemptedRef.current) return
      fetchAttemptedRef.current = true

      try {
        const conversation = await axiosInstance.get(`/conversations/${resolvedParams.id}`)
        const xpAndLevel = conversation.data.xpAndLevel
        logger.debug('Conversation data received:', conversation.data)
        setConversation(conversation.data)
        setXpAndLevel(xpAndLevel)
        // Ajout de la conversation entière au chatStore, une seule fois
        if (conversation.data && !conversationInitializedRef.current) {
          console.log('Initializing conversation in chatStore')
          conversationInitializedRef.current = true
          // Définir d'abord l'ID de conversation actif
          useChatStore.getState().setActiveConversation(conversation.data.conversation_id)
          // Puis initialiser la conversation
          useChatStore.getState().initializeConversation(conversation.data)
          // Ajouter les données XP au store si elles existent
          if (xpAndLevel) {
            useChatStore.getState().updateConversationXpAndLevel(conversation.data.conversation_id, xpAndLevel)
          }
        }
      } catch (error: unknown) {
        console.error('Error fetching conversation:', error)
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || 'Erreur lors du chargement de la conversation'
          )
        } else {
          toast.error('Erreur lors du chargement de la conversation')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (user && resolvedParams.id && !fetchAttemptedRef.current) {
      fetchConversation()
    } 
  }, [user, resolvedParams.id])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p>Conversation non trouvée</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p>Utilisateur non connecté</p>
      </div>
    )
  }

  if (!otherUser) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p>Utilisateur non trouvé</p>
      </div>
    )
  }

  return (
    <AppLayout>
      <ConversationContent conversation={conversation} xpAndLevel={xpAndLevel} />
    </AppLayout>
  )
}
