import { FC } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Conversation } from '@/types/chat'
import { ConversationStatus } from './ConversationStatus'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useChatStore } from '@/stores/chatStore'
import { getOtherParticipant } from '@/utils/conversationUtils'

interface ConversationItemProps {
  conversation: Conversation
}

const ConversationItem: FC<ConversationItemProps> = ({ conversation }) => {
  const { data: session } = useSession()
  const currentUserId = session?.user?.id
  const conversations = useChatStore((state) => state.conversations)

  // Déterminer l'autre utilisateur (celui avec qui on parle)
  const otherUser = currentUserId ? getOtherParticipant(conversation, currentUserId) : undefined
  if (!otherUser) return null;

  // Récupérer le dernier message s'il existe
  const lastMessage = conversation.messages[0]

  // Récupérer le statut en ligne depuis le chatStore
  const isOnline = otherUser.isOnline ?? false

  return (
    <Link 
      href={`/conversations/${conversation.id}`}
      className="block hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center p-4">
        <div className="relative">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden">
            {otherUser.avatar ? (
              <img 
                src={otherUser.avatar} 
                alt={otherUser.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#E59C45] text-white text-lg">
                {otherUser.username && otherUser.username[0] ? otherUser.username[0].toUpperCase() : '?'}
              </div>
            )}
          </div>
          {/* Indicateur de statut en ligne */}
          <ConversationStatus 
            isOnline={isOnline} 
            className="absolute -bottom-1 -right-1 border-2 border-white"
          />
        </div>
        
        <div className="ml-4 flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium truncate">{otherUser.username}</h3>
            {lastMessage && (
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {formatDistanceToNow(
                  typeof lastMessage.timestamp === 'string' 
                    ? new Date(lastMessage.timestamp) 
                    : lastMessage.timestamp instanceof Date 
                      ? lastMessage.timestamp 
                      : new Date(), 
                  { 
                    addSuffix: true,
                    locale: fr 
                  }
                )}
              </span>
            )}
          </div>
          {lastMessage && (
            <p className="text-sm text-gray-500 truncate">
              {lastMessage.content}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ConversationItem