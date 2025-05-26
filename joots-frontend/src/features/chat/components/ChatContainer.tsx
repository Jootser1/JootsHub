import { useState, useEffect, useRef } from 'react'
import { Conversation } from '@/features/conversations/conversation.types'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { getOtherParticipantInConversation } from '@/features/conversations/utils/conversation-utils'
import { useUserStore } from '@/features/user/stores/user-store'
import { useChatStore } from '../stores/chat-store'
import { IcebreakerPopup } from '@/features/icebreakers/components/IcebreakerPopup'
import { IcebreakerService } from '@/features/icebreakers/services/icebreaker-service'
import { logger } from '@/utils/logger'



interface ChatContainerProps {
  conversation: Conversation
}

export function ChatContainer({ conversation }: ChatContainerProps) {
  const { activeConversationId, getParticipant, getOtherParticipant, getCurrentQuestionGroup } =
    useChatStore()
  const currentQuestionGroup = activeConversationId
    ? getCurrentQuestionGroup(activeConversationId)
    : null
  const user = useUserStore(state => state.user)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const isCurrentUserReady =
    activeConversationId && user?.id
      ? getParticipant(activeConversationId, user.id)?.isIcebreakerReady
      : false
  const isOtherParticipantReady =
    activeConversationId && user?.id
      ? getOtherParticipant(activeConversationId, user.id)?.isIcebreakerReady
      : false

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAnswerQuestion = (questionGroupId: string, optionId: string) => {
    if (!user?.id || !activeConversationId) return
    IcebreakerService.submitIcebreakerResponse(
      user.id,
      questionGroupId,
      optionId,
      activeConversationId
    )
    logger.debug(`Réponse validée: Question ${questionGroupId}, Option ${optionId}`)
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
    if (currentQuestionGroup && isCurrentUserReady && isOtherParticipantReady) {
      setShowQuestion(true)
    }
  }, [isCurrentUserReady, isOtherParticipantReady, currentQuestionGroup])

  if (!activeConversationId || !user?.id) return null
  const otherUser = getOtherParticipantInConversation(conversation, user.id)

  if (!otherUser) {
    return <div className='flex items-center justify-center h-full'>Utilisateur non trouvé</div>
  }

  return (
    <>
      {currentQuestionGroup && (
        <IcebreakerPopup
          question={JSON.parse(currentQuestionGroup)}
          isVisible={showQuestion}
          onAnswer={handleAnswerQuestion}
          onClose={handleCloseQuestion}
        />
      )}
      <div className='relative flex flex-col h-full bg-gray-50'>
        <ChatHeader
          otherUser={otherUser}
          isOnline={otherUser.isOnline}
          conversationId={activeConversationId}
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
