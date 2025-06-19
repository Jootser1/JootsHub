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
import { ProgressionResult } from '@shared/icebreaker-event.types'
import { CurrentPollWithRelations, PollType } from '@shared/question.types'



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
  const parsedPoll = currentPoll ? JSON.parse(currentPoll) : null
  const user = useUserStore(state => state.user)
  const isUserOnline = useContactStore(state => state.isUserOnline)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const isCurrentUserReady =
    activeConversationId && user?.user_id
      ? getParticipant(activeConversationId, user.user_id)?.is_icebreaker_ready
      : false
  const isOtherParticipantReady =
    activeConversationId && user?.user_id
      ? getOtherParticipant(activeConversationId, user.user_id)?.is_icebreaker_ready
      : false

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAnswerQuestion = (pollId: string, optionId: string | undefined, opentext: string | undefined, numeric: number | undefined) => {
    if (!user?.user_id || !activeConversationId) return
    IcebreakerService.submitIcebreakerResponse(
      {
        user_id: user.user_id,
        poll_id: pollId,
        option_id: optionId ?? undefined,
        conversation_id: activeConversationId,
        locale: conversation.locale,
        poll_type: parsedPoll?.type as PollType,
        opentext: opentext ?? undefined,
        numeric: numeric ?? undefined,
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

  if (!activeConversationId || !user?.user_id) {
    console.log('ChatContainer early return:', { activeConversationId, userId: user?.user_id })
    return null
  }

  const conversationInStore = useChatStore.getState().getConversation(activeConversationId)
  if (!conversationInStore) {
    console.log('ChatContainer: Conversation not found in store:', activeConversationId)
    return null
  }

  const otherUser = getOtherParticipantInConversation(conversation, user.user_id)

  if (!otherUser) {
    return <div className='flex items-center justify-center h-full'>Utilisateur non trouvé</div>
  }

  return (
    <>
      {currentPoll && (
        <IcebreakerPopup
          poll={parsedPoll as CurrentPollWithRelations}
          locale={conversation.locale}
          isVisible={showQuestion}
          onAnswer={(pollId, response) => handleAnswerQuestion(pollId, response.option_id, response.opentext, response.numeric)}
          onClose={handleCloseQuestion}
        />
      )}
      <div className='relative flex flex-col h-full bg-gray-50'>
        <ChatHeader
          otherUser={otherUser}
          conversationId={activeConversationId}
          xpAndLevel={xpAndLevel || conversation.xp_and_level}
        />
        <div className='flex-1 overflow-y-auto'>
          <ChatMessages
            conversationId={activeConversationId}
          />
        </div>
        <ChatInput conversationId={activeConversationId} />
      </div>
    </>
  )
}
