import { Message } from './message.types'
import { User } from './user.types'
import { ProgressionResult } from './icebreaker-event.types'

export interface RandomChatResponse {
  conversation_id: string
  randomUser: {
    user_id: string
    username: string
  }
}

export interface ConversationParticipant {
  conversation_id: string
  user_id: string
  user: User
  is_typing?: boolean
  is_icebreaker_ready?: boolean
  has_given_answer?: boolean
  icebreaker_timestamp?: string
  response?: {
    poll_id: string
    option_id: string
    answered_at: string
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
  icebreaker_status: {
    current_poll?: string;
  };
  current_poll?: string
  xp_point?: number
  locale: string
  level?: number
  remaining_xp?: number
  xp_to_next_level?: number
  reward?: string
  photo_reveal_percent?: number | null
  xp_and_level?: ProgressionResult
}

export interface ParticipantIcebreakerStatus {
  user_id: string;
  is_icebreaker_ready: boolean;
}

export interface TypingStatus {
  conversationId: string
  userId: string
  isTyping: boolean
}