import { useState, useEffect, useRef } from 'react'
import { Conversation } from '@shared/conversation.types'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { getOtherParticipantInConversation } from '@/features/conversations/utils/conversation-utils'
import { useUserStore } from '@/features/user/stores/user-store'
import { useChatStore } from '../stores/chat-store'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { IcebreakerPopup } from '@/features/icebreakers/components/IcebreakerPopup'
import { IcebreakerService } from '@/features/icebreakers/services/icebreaker-service'
import { logger } from '@/utils/logger'
import { ProgressionResult } from '../chat.types'



interface ChatContainerProps {
  conversation: Conversation
  xpAndLevel?: ProgressionResult | null
}

export function ChatContainer({ conversation, xpAndLevel }: ChatContainerProps) {
  const { activeConversationId, getParticipant, getOtherParticipant, getCurrentPoll } =
    useChatStore()
  const currentPoll = activeConversationId
    ? getCurrentPoll(activeConversationId)
    : null
  const user = useUserStore(state => state.user)
  const isUserOnline = useContactStore(state => state.isUserOnline)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const isCurrentUserReady =
    activeConversationId && user?.user_id
      ? getParticipant(activeConversationId, user.user_id)?.isIcebreakerReady
      : false
  const isOtherParticipantReady =
    activeConversationId && user?.user_id
      ? getOtherParticipant(activeConversationId, user.user_id)?.isIcebreakerReady
      : false

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAnswerQuestion = (pollId: string, optionId: string) => {
    if (!user?.user_id || !activeConversationId) return
    IcebreakerService.submitIcebreakerResponse(
      {
        userId: user.user_id,
        pollId,
        optionId,
        conversationId: activeConversationId,
        locale: conversation.locale,
      }
    )
    setShowQuestion(false)
  }

  const handleCloseQuestion = () => {
    setShowQuestion(false)
  }

  // Scroll to bottom of the chat
  useEffect(() => {
    scrollToBottom()
    const input = document.getElementById('chat-input')
    input?.addEventListener('focus', scrollToBottom)
    return () => {
      input?.removeEventListener('focus', scrollToBottom)
    }
  }, [conversation?.messages.length])

  // Show the question if the current user and the other participant are ready
  useEffect(() => {
    if (currentPoll && isCurrentUserReady && isOtherParticipantReady) {
      setShowQuestion(true)
    }
  }, [isCurrentUserReady, isOtherParticipantReady, currentPoll])

  if (!activeConversationId || !user?.user_id) return null
  const otherUser = getOtherParticipantInConversation(conversation, user.user_id)

  if (!otherUser) {
    return <div className='flex items-center justify-center h-full'>Utilisateur non trouvé</div>
  }

  return (
    <>
      {currentPoll && (
        <IcebreakerPopup
          question={JSON.parse(currentPoll)}
          isVisible={showQuestion}
          onAnswer={handleAnswerQuestion}
          onClose={handleCloseQuestion}
        />
      )}
      <div className='relative flex flex-col h-full bg-gray-50'>
        <ChatHeader
          otherUser={otherUser}
          isOnline={isUserOnline(otherUser.user_id)}
          conversationId={activeConversationId}
          xpAndLevel={xpAndLevel || conversation.xpAndLevel}
        />
        <div className='flex-1 overflow-y-auto'>
          <ChatMessages
            messages={conversation?.messages || []}
            conversationId={activeConversationId}
          />
        </div>
        <ChatInput conversationId={activeConversationId} />
      </div>
    </>
  )
}
