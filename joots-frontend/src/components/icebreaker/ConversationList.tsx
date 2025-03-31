import { useEffect, useRef } from 'react'
import ConversationItem from './ConversationItem'
import { useConversation } from '../../hooks/useConversation'
import { useSession } from 'next-auth/react'
import { useSocket } from '@/hooks/useSocket'
import { Conversation } from './types'

interface UserStatusChange {
  userId: string;
  isOnline: boolean;
}

export const ConversationList = () => {
  const { data: session, status } = useSession()
  const isInitializedRef = useRef(false)
  const { socket } = useSocket()
  const { 
    conversations, 
    isLoading, 
    error, 
    fetchConversations, 
    updateOnlineStatus 
  } = useConversation()

  useEffect(() => {
    if (!session?.accessToken || isInitializedRef.current) return

    console.log('ConversationList useEffect triggered, session status:', status)
    console.log('Session data:', session)

    // Fetch conversations
    console.log('Calling fetchConversations')
    fetchConversations()

    isInitializedRef.current = true
  }, [session?.accessToken, status])

  useEffect(() => {
    if (!socket) return

    const handleUserStatusChange = (data: UserStatusChange) => {
      updateOnlineStatus(data.userId, data.isOnline)
    }

    const handleNewConversation = () => {
      fetchConversations()
    }

    socket.on('userStatusChange', handleUserStatusChange)
    socket.on('newConversation', handleNewConversation)

    return () => {
      socket.off('userStatusChange', handleUserStatusChange)
      socket.off('newConversation', handleNewConversation)
    }
  }, [socket])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E59C45]" />
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