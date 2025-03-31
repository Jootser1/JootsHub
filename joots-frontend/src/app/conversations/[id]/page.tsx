"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import axiosInstance from "@/app/api/axiosInstance"
import Layout from "@/components/Layout"
import { toast } from "sonner"
import { ChatWindow } from "@/components/icebreaker/ChatWindow"

interface User {
  id: string
  name: string
  image: string
  isOnline?: boolean
}

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
}

interface Conversation {
  id: string
  initiatorId: string
  receiverId: string
  initiator: User
  receiver: User
  messages: Message[]
  createdAt: string
  updatedAt: string
}

export default function ConversationPage() {
  const { data: session } = useSession()
  const params = useParams()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosInstance.get(`/conversations/${params.id}`)
        setConversation(response.data)
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erreur lors du chargement de la conversation")
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user && params.id) {
      fetchConversation()
    }
  }, [session?.user, params.id])

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
  const otherUser = conversation.initiatorId === session.user.id
    ? conversation.receiver
    : conversation.initiator

  return (
    <Layout experience="icebreaker">
      <main className="flex min-h-screen flex-col bg-gray-50">
        <div className="max-w-md w-full mx-auto bg-white min-h-screen shadow-lg">
          <ChatWindow
            conversationId={params.id as string}
            otherUser={otherUser}
          />
        </div>
      </main>
    </Layout>
  )
} 