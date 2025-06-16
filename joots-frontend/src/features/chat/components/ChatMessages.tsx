import { useEffect, useRef } from 'react'
import { Message } from '@shared/message.types'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ensureDate } from '@/utils/date-utils'
import { useUserStore } from '@/features/user/stores/user-store'
import { useChatStore } from '@/features/chat/stores/chat-store'

interface ChatMessagesProps {
  messages: Message[]
  conversationId?: string
}

export function ChatMessages({ messages: propMessages, conversationId }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useUserStore()

  // N'utiliser qu'une seule source de messages
  const storeMessages = useChatStore.getState().getMessagesFromConversation(conversationId || '')
  // Si les messages du store sont disponibles, les utiliser, sinon utiliser les props
  const displayMessages = storeMessages.length > 0 ? storeMessages : propMessages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages])

  if (!user?.user_id) {
    return <div className='flex items-center justify-center h-full text-gray-500'>Déconnecté</div>
  }

  return (
    <div className='p-4 space-y-4'>
      {displayMessages.map((message: Message, index: number) => {
        const messageType = message.messageType
        const isCurrentUser = message.sender_id === user.user_id
        const timeAgo = formatDistanceToNow(ensureDate(message.created_at), {
          addSuffix: true,
          locale: fr,
        })
        let currentUserAnswer, otherUserAnswer

        if (messageType === 'ANSWER') {
          currentUserAnswer =
            message.userAId === user.user_id ? message.userAAnswer : message.userBAnswer
          otherUserAnswer = message.userAId === user.user_id ? message.userBAnswer : message.userAAnswer
        }

        return (
          <div
            key={`${message.message_id}-${index}`}
            className={`flex ${messageType === 'ANSWER' ? 'justify-center' : isCurrentUser ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                messageType === 'ANSWER'
                  ? 'bg-orange-100 text-gray-900'
                  : isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className={`text-sm ${messageType === 'ANSWER' ? 'text-center' : ''}`}>
                {message.content}
              </p>
              {messageType === 'ANSWER' && (
                <div className='mt-2 space-y-2'>
                  {currentUserAnswer && (
                    <div className='flex justify-start'>
                      <p className='text-sm'>{currentUserAnswer}</p>
                    </div>
                  )}
                  {otherUserAnswer && (
                    <div className='flex justify-end'>
                      <p className='text-sm'>{otherUserAnswer}</p>
                    </div>
                  )}
                </div>
              )}
              <span className='text-xs opacity-70 mt-1 block'>{timeAgo}</span>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
