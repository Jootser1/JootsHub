import { Message, MessageType } from './message.types'
import { User } from './user.types'
import { CurrentPollWithRelations, PollTranslation } from './poll.types'
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
//-----------------


export type RawAnswer = {
  locale: string;
  answer: {
    poll_id: string;
    answered_at: string;
    user_id: string;
    poll: {
      type: MessageType;
      poll_translations: { translation: string }[];
    };
    option: {
      translations: { translated_option_text: string }[];
    };
  };
};

export type GroupedResult = {
  poll_id: string;
  question: string;
  type: string;
  latest_answered_at: string;
  answers: {
    user_id: string;
    answerText: string;
  }[];
};


//------- Types pour les polls et réponses dans les conversations ---------

export type UserInfo = {
  user_id: string;
  username: string;
  avatar: string | null;
};

export type PollOptionTranslation = {
  translated_option_text: string;
};

export type PollOptionWithTranslations = {
  poll_option_id: string;
  order: number;
  translations: PollOptionTranslation[];
};

export type PollAnswerInConversation = {
  poll_answer_id: string;
  user_id: string | null;
  answered_at: Date;
  opentext: string | null;
  numeric: number | null;
  comment: string | null;
  user: UserInfo | null;
  option: PollOptionWithTranslations | null;
};

export type PollScaleConstraint = {
  is_labeled: boolean;
  min_value: number;
  max_value: number;
  step_value: number | null;
  min_label: string | null;
  max_label: string | null;
  mid_label: string | null;
};

export type PollCategory = {
  category: {
    category_id: number;
    name: string;
  };
};

export type PollWithAllAnswersInConversation = {
  poll_id: string;
  type: string;
  author_id: string;
  created_at: Date;
  is_moderated: boolean;
  is_pinned: boolean;
  is_enabled: boolean;
  poll_translations: PollTranslation[];
  categories: PollCategory[];
  options: PollOptionWithTranslations[];
  scale_constraint: PollScaleConstraint | null;
  answers: PollAnswerInConversation[];
};

export type EnrichedPollAnswerSource = {
  source_id: string;
  source_type: string;
  locale: string;
  conversation_id: string | null;
  answer: {
    poll_answer_id: string;
    answered_at: Date;
    poll_id: string;
    user_id: string | null;
    opentext: string | null;
    numeric: number | null;
    comment: string | null;
    user: UserInfo | null;
    option: PollOptionWithTranslations | null;
    poll: PollWithAllAnswersInConversation;
  } | null;
};

//------- Types existants (à conserver pour compatibilité) ---------
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
