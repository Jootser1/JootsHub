import { useEffect, useRef } from 'react'
import ConversationItem from './ConversationItem'
import { useConversation } from '@/features/conversations/hooks/useConversation'
import { useSession } from 'next-auth/react'
import { Conversation } from '@/features/conversations/conversation.types'

export const ConversationList = () => {
  const { data: session, status } = useSession()
  const isInitializedRef = useRef(false)
  const { 
    conversations, 
    loading, 
    error, 
    fetchConversations, 
  } = useConversation()

  
  useEffect(() => {
    if (!session?.user?.id || isInitializedRef.current) return

    if (status === 'authenticated') {
      fetchConversations()
    }

    isInitializedRef.current = true
  }, [status, session?.user?.id, fetchConversations])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        Une erreur est survenue lors du chargement des conversations
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <p className="text-center">
          Aucune conversation pour le moment.
          <br />
          Commencez une nouvelle aventure humaine !
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y">
      {conversations.map((conversation: Conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
        />
      ))}
    </div>
  )
}