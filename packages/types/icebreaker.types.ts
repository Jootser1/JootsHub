import { PollType } from "./question.types";

export interface postedResponse {
    poll_type: PollType,
    user_id: string,
    poll_id: string,
    option_id?: string,
    opentext?: string,
    numeric?: number,
    conversation_id: string,
    locale: string,
  }