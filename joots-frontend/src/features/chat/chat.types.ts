import { Conversation, ConversationParticipant } from '@shared/conversation.types'
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types'
import { Question } from '@shared/question.types'
import { Message, MessageStatus } from '@shared/message.types'

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

// Types exportés pour être utilisés dans chatEventHandlers.ts
export interface NewMessageEvent {
  id: string
  content: string
  sender?: { id: string }
  senderId?: string
  recipientId?: string
  type?: string
  createdAt?: string
  timestamp?: string
  conversationId: string
}

export interface TypingEvent {
  conversationId: string
  userId: string
  isTyping: boolean
}

export interface MessageReadEvent {
  conversationId: string
  messageId: string
}

export interface IcebreakerStatusEvent {
  conversationId: string
  userId: string
  isIcebreakerReady: boolean
  timestamp?: string
}

export interface IcebreakerPollEvent {
  conversationId: string
  poll: string
}

export interface IcebreakerResponsesEvent {
  id?: string
  conversationId: string
  questionLabel: string
  response1: string
  user1: string
  response2: string
  user2: string
  xpAndLevel?: ProgressionResult
}

export interface ProgressionResult {
  xpPerQuestion : number;
  reachedXP : number;
  reachedLevel: number;
  remainingXpAfterLevelUp: number;
  requiredXpForCurrentLevel: number;
  requiredXpForNextLevel: number;
  maxXpForNextLevel: number;
  nextLevel: number;
  reward?: string;
  photoRevealPercent?: number | null;
}

export interface XpLevelUpdateEvent {
  conversationId: string
  xpAndLevel: ProgressionResult
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
    field: 'isIcebreakerReady' | 'hasGivenAnswer' | 'isTyping',
    value: boolean
  ) => void

  // Icebreaker
  resetIcebreakerStatus: (conversationId: string) => void

  // XP and Level progression
  updateConversationXpAndLevel: (conversationId: string, xpAndLevel: ProgressionResult) => void

  // Helpers
  getMessagesFromConversation: (conversationId: string) => Message[]
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
    response: IcebreakerResponse
  ) => void

  // Conversation actions
  setConversationsIds: (conversationIds: string[]) => void
}

export type ChatStore = ChatState & ChatActions
