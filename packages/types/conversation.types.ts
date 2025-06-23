import { Message } from './message.types'
import { User } from './user.types'
import { CurrentPollWithRelations } from './poll.types'
import { PollAnswer } from './pollAnswer.types'

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
  response?: {
    poll_id: string
    option_id: string
    answered_at: string
  } | null
}


export interface ConversationWithXpAndLevel {
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
  participants: ConversationParticipant[];
  messages: Message[];
  lastMessage?: Message;
  current_poll?: string;
  locale: string
  xp_and_level: xp_and_level;
}

export interface ConversationWithPollAndXp {
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
  participants: ConversationParticipant[];
  messages: Message[];
  lastMessage?: Message;
  current_poll?: CurrentPollWithRelations
  locale: string
  xp_and_level: xp_and_level;
}

export interface Conversation {
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
  participants: ConversationParticipant[];
  messages: Message[];
  lastMessage?: Message;
  current_poll?: string;
  locale: string
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

export interface xp_and_level {
  difficulty: string;
  xp_per_question: number;
  reached_xp: number;
  reached_level: number;
  remaining_xp_after_level_up: number;
  required_xp_for_current_level: number;
  required_xp_for_next_level: number;
  max_xp_for_next_level: number;
  next_level: number;
  reward: string;
  photo_reveal_percent: number | null;
}
//------- Menage a faire apres ici ---------
export type PollWithRelations = {
  poll_id: string;
  type: string;
  created_at: Date;
  is_moderated: boolean;
  is_pinned: boolean;
  is_enabled: boolean;
  poll_translations: Array<{
    poll_translation_id: string;
    poll_id: string;
    locale: string;
    translation: string;
  }>;
  options: Array<{
    poll_option_id: string;
    order: number;
    translations: Array<{
      locale: string;
      translated_option_text: string;
    }>;
  }>;
};





export type PollAnswerSourceWithAnswer = {
  locale: string;
  answer: PollAnswerWithRelations | null;
};

export type PollAnswerWithRelations = PollAnswer & {
  poll: PollWithRelations;
  option: PollOptionWithTranslations | null;
};

export type PollOptionWithTranslations = {
  poll_option_id: string;
  order: number;
  translations: Array<{
    locale: string;
    translated_option_text: string;
  }>;
};
