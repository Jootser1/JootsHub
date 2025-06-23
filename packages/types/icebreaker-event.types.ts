import { CurrentPollWithRelations, PollType } from "./poll.types";
import { xp_and_level } from "./conversation.types";

export interface PostedResponseEvent {
    poll_type: PollType,
    user_id: string,
    poll_id: string,
    option_id?: string,
    opentext?: string,
    numeric?: number,
    conversation_id: string,
    locale: string,
  }

  // Types exportés pour être utilisés dans chatEventHandlers.ts
export interface NewMessageEvent {
  message_id: string
  content: string
  sender_id: string
  type?: string
  created_at: Date
  conversation_id: string
}

export interface TypingEvent {
  conversation_id: string
  user_id: string
  is_typing: boolean
}

export interface MessageReadEvent {
  conversation_id: string
  message_id: string
}

export interface IcebreakerStatusEvent {
  conversation_id: string
  user_id: string
  is_icebreaker_ready: boolean
  timestamp?: string
}

export interface IcebreakerPollEvent {
  conversation_id: string
  poll: CurrentPollWithRelations
}

export interface IcebreakerResponsesEvent {
  poll_id: string
  conversation_id: string
  poll_translation: string
  response1: string
  user1: string
  response2: string
  user2: string
  xpAndLevel?: xp_and_level
}

export interface IcebreakerResponse {
  pollId: string
  optionId: string
  answeredAt: string
}

export interface XpLevelUpdateEvent {
  conversationId: string
  xpAndLevel: xp_and_level
}


