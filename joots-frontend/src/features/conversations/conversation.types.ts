import { Message } from '@/features/chat/chat.types'
import { User } from '../user/user.types'
import { ProgressionResult } from '@/features/chat/chat.types'

export interface ConversationParticipant {
  conversationId: string
  userId: string
  user: User
  isTyping?: boolean
  isIcebreakerReady?: boolean
  hasGivenAnswer?: boolean
  icebreakerTimestamp?: string
  response?: {
    questionGroupId: string
    optionId: string
    answeredAt: string
  } | null
}

export interface Conversation {
  id: string
  createdAt: Date
  updatedAt: Date
  participants: ConversationParticipant[]
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  currentQuestionGroup?: string
  xpPoint?: number
  level?: number
  remainingXp?: number
  xpToNextLevel?: number
  reward?: string
  photoRevealPercent?: number | null
  xpAndLevel?: ProgressionResult
}
