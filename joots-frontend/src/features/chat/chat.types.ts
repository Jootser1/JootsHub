import { Conversation, ConversationParticipant } from '@shared/conversation.types'
import { Question } from '@shared/question.types'
import { Message, MessageStatus, ChatStoreMessage } from '@shared/message.types'
import { ProgressionResult, IcebreakerResponse } from '@shared/icebreaker-event.types'

export interface ChatState {
  conversations: Record<string, Conversation>
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
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void
  initializeConversation: (conversation: Conversation) => void

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
  updateConversationXpAndLevel: (conversationId: string, xpAndLevel: ProgressionResult) => void

  // Helpers
  getMessagesFromConversation: (conversationId: string) => ChatStoreMessage[]
  getConversation: (conversationId: string) => Conversation | undefined
  getCurrentPoll: (conversationId: string) => string | null
  setCurrentPoll: (conversationId: string, poll: string) => void
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
