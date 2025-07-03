import { IcebreakerResponse } from "@shared/icebreaker-event.types";

export interface IcebreakerActions {
  setIcebreakerQuestion: (conversationId: string, question: string) => void
  submitIcebreakerResponse: (
    conversationId: string,
    isCurrentUser: boolean,
    response: IcebreakerResponse
  ) => void
  resetIcebreakerStatus: (conversationId: string) => void
  fetchRandomQuestion: (conversationId: string) => void
}

export type IcebreakerStore = IcebreakerActions
