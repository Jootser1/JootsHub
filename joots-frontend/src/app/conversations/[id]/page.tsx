"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import axiosInstance from "@/app/api/axiosInstance"
import Layout from '@/components/Layout'
import { ChatContainer } from '@/features/chat/components/ChatContainer'
import { toast } from "sonner"
import { getOtherParticipant } from '@/features/conversations/utils/conversationUtils'
import { Conversation } from '@/features/conversations/conversation.types'
import { ChatSocketProvider } from '@/features/chat/sockets/ChatSocketProvider'
import { useChatStore } from '@/features/chat/stores/chatStore'
import { useUserStore } from "@/features/user/stores/userStore"


export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const user = useUserStore((state) => state.user)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosInstance.get(`/conversations/${resolvedParams.id}`)
        const conversationData = response.data;
        setConversation(conversationData);
        
        // Ajout des messages historiques au chatStore
        if (conversationData.messages) {
          useChatStore.getState().initializeConversationMessages(conversationData.id, conversationData.messages);
        }
        useChatStore.getState().setActiveConversation(conversationData.id);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erreur lors du chargement de la conversation")
      } finally {
        setIsLoading(false)
      }
    }
    
    if (user && resolvedParams.id) {
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

  const otherUser = getOtherParticipant(conversation, user.id)

  if (!otherUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Utilisateur non trouvé</p>
      </div>
    )
  }

  return (
    <Layout experience="icebreaker">
      <ChatSocketProvider conversation={conversation}>
        <div className="max-w-md w-full mx-auto bg-white shadow-lg flex flex-col h-full">
          <ChatContainer 
            conversation={conversation}
          />
        </div>
      </ChatSocketProvider>
    </Layout>
  )
} 