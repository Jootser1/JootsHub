"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import axiosInstance from "@/app/api/axiosInstance"
import Layout from '@/components/Layout'
import { ChatContainer } from '@/components/chat/ChatContainer'
import { toast } from "sonner"
import { getOtherParticipant } from '@/utils/conversationUtils'
import { Conversation } from '@/types/chat'
import { ChatSocketProvider } from '@/app/sockets/chat/ChatSocketProvider'
import { useChatStore } from '@/stores/chatStore'

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: session } = useSession()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosInstance.get(`/conversations/${resolvedParams.id}`)
        const conversationData = response.data;
        setConversation(conversationData);
        
        // Ajout des messages au chatStore
        if (conversationData.messages) {
          conversationData.messages.forEach((message: any) => {
            useChatStore.getState().addMessage(conversationData.id, message);
          });
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erreur lors du chargement de la conversation")
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user && resolvedParams.id) {
      fetchConversation()
    }
  }, [session?.user, resolvedParams.id])

  if (!session?.user) {
    return <div>Chargement...</div>
  }

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

  // Déterminer l'autre utilisateur
  const otherUser = getOtherParticipant(conversation, session.user.id)

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
        <main className="flex min-h-screen flex-col bg-gray-50">
          <div className="max-w-md w-full mx-auto bg-white min-h-screen shadow-lg">
            <ChatContainer 
              conversationId={resolvedParams.id} 
              conversation={conversation}
            />
          </div>
        </main>
      </ChatSocketProvider>
    </Layout>
  )
} 