import { Message } from './message.types'
import { User } from './user.types'

export interface ConversationParticipant {
  conversationId: string
  user_id: string
  user: User
  isTyping?: boolean
  isIcebreakerReady?: boolean
  hasGivenAnswer?: boolean
  icebreakerTimestamp?: string
  response?: {
    pollId: string
    optionId: string
    answeredAt: string
  } | null
}


export interface Conversation {
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
  participants: ConversationParticipant[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  icebreakerStatus: {
    currentQuestion?: string;
  };
  currentPoll?: string
  xpPoint?: number
  locale: string
  level?: number
  remainingXp?: number
  xpToNextLevel?: number
  reward?: string
  photoRevealPercent?: number | null
  xpAndLevel?: ProgressionResult
}

export type ProgressionResult = {
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
};