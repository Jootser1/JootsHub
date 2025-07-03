import { Conversation, ConversationParticipant, xp_and_level } from '@shared/conversation.types'
import { CurrentPollWithRelations, Question } from '@shared/poll.types'
import { Message, MessageStatus, ChatStoreMessage } from '@shared/message.types'
import { IcebreakerResponse } from '@shared/icebreaker-event.types'

// Type étendu pour le frontend avec current_poll comme objet au lieu de string
export interface ConversationWithCurrentPollObject extends Omit<Conversation, 'current_poll'> {
  current_poll?: CurrentPollWithRelations | null
  xp_and_level?: xp_and_level | null
}

export interface ChatState {
  conversations: Record<string, ConversationWithCurrentPollObject>
  activeConversationId: string | null
  currentPoll: string | null
  error: string | null
  userId?: string
  token?: string
  conversationsIds: string[]
  icebreakerQuestions: Record<string, Question>
  isChatSocketConnected: boolean
}



export type ChatActions = {
  // Connection context
  setActiveConversation: (conversationId: string | null) => void
  setError: (error: string | null) => void

  // Conversation lifecycle
  loadAllConversations: () => Promise<void>
  updateConversation: (conversationId: string, updates: Partial<ConversationWithCurrentPollObject>) => void
  initializeConversation: (conversation: ConversationWithCurrentPollObject) => void

  // Message lifecycle
  addMessage: (conversationId: string, message: Message) => void
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void
  markMessagesAsRead: (conversationId: string) => void

  // Participants
  updateParticipantField: (
    conversationId: string,
    participantId: string,
    field: 'is_icebreaker_ready' | 'has_given_answer' | 'is_typing',
    value: boolean
  ) => void

  // Icebreaker
  resetIcebreakerStatus: (conversationId: string) => void

  // XP and Level progression
  updateConversationXpAndLevel: (conversationId: string, xpAndLevel: xp_and_level) => void

  // Helpers
  getMessagesFromConversation: (conversationId: string) => ChatStoreMessage[]
  getConversation: (conversationId: string) => ConversationWithCurrentPollObject | undefined
  getCurrentPoll: (conversationId: string) => CurrentPollWithRelations | null
  setCurrentPoll: (conversationId: string, poll: CurrentPollWithRelations) => void
  getParticipant: (conversationId: string, userId: string) => ConversationParticipant | undefined
  getOtherParticipant: (
    conversationId: string,
    userId: string
  ) => ConversationParticipant | undefined
  getOtherParticipantId: (conversationId: string, userId: string) => string | undefined
  getOtherParticipantIcebreakerStatus: (
    conversationId: string,
    userId: string
  ) => boolean | undefined
  getParticipantResponse: (
    conversationId: string,
    participantId: string
  ) => IcebreakerResponse | null
  setParticipantResponse: (
    conversationId: string,
    participantId: string,
    response: IcebreakerResponse | null
  ) => void

  // Conversation actions
  setConversationsIds: (conversationIds: string[]) => void
}

export type ChatStore = ChatState & ChatActions
