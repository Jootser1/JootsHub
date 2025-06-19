import { PollType } from "./poll.types";

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
  poll: string
}

export interface IcebreakerResponsesEvent {
  poll_id: string
  conversation_id: string
  poll_translation: string
  response1: string
  user1: string
  response2: string
  user2: string
  xpAndLevel?: ProgressionResult
}

export interface IcebreakerResponse {
  pollId: string
  optionId: string
  answeredAt: string
}

export interface XpLevelUpdateEvent {
  conversationId: string
  xpAndLevel: ProgressionResult
}

export type ProgressionResult = {
  xpPerQuestion : number;
  reached_xp : number;
  reached_level: number;
  remaining_xp_after_level_up: number;
  required_xp_for_current_level: number;
  required_xp_for_next_level: number;
  max_xp_for_next_level: number;
  next_level: number;
  reward?: string;
  photo_reveal_percent?: number | null;
};
