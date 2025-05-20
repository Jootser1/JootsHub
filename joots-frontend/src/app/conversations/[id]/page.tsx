"use client"

import { useEffect, useState, use, useRef } from "react"
import axiosInstance from "@/app/api/axiosInstance"
import { AxiosError } from "axios"
import AppLayout from '@/components/AppLayout'
import { ChatContainer } from '@/features/chat/components/ChatContainer'
import { toast } from "sonner"
import { getOtherParticipantInConversation } from '@/features/conversations/utils/conversationUtils'
import { Conversation } from '@/features/conversations/conversation.types'
import { useChatStore } from '@/features/chat/stores/chatStore'
import { useUserStore } from "@/features/user/stores/userStore"
import { ExperienceLogo } from "@/components/ExperienceLogo"
import { ChatSocketHandler } from '@/features/chat/components/ChatSocketHandler'

// Définition du composant de contenu de conversation
function ConversationContent({ conversation }: { conversation: Conversation}) {
  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg flex flex-col h-full">
      <ChatContainer conversation={conversation} />
      <ExperienceLogo experience="icebreaker"/>
    </div>
  );
}

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const user = useUserStore((state) => state.user)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const fetchAttemptedRef = useRef(false);
  const conversationInitializedRef = useRef(false);
  
  useEffect(() => {
    const fetchConversation = async () => {
      // Éviter les appels multiples
      if (fetchAttemptedRef.current) return;
      fetchAttemptedRef.current = true;
      
      try {
        const response = await axiosInstance.get(`/conversations/${resolvedParams.id}`)
        const conversationData = response.data;
        setConversation(conversationData);
        
        // Ajout de la conversation entière au chatStore, une seule fois
        if (conversationData && !conversationInitializedRef.current) {
          conversationInitializedRef.current = true;
          useChatStore.getState().initializeConversation(conversationData);
          useChatStore.getState().setActiveConversation(conversationData.id);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Erreur lors du chargement de la conversation")
        } else {
          toast.error("Erreur lors du chargement de la conversation")
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Conversation non trouvée</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Utilisateur non connecté</p>
      </div>
    )
  }

  const otherUser = getOtherParticipantInConversation(conversation, user.id)

  if (!otherUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Utilisateur non trouvé</p>
      </div>
    )
  }

  return (
    <AppLayout>
      <ChatSocketHandler conversationId={conversation.id}>
        <ConversationContent conversation={conversation} />
      </ChatSocketHandler>
    </AppLayout>
  )
}