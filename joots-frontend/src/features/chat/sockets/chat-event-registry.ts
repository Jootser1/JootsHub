import { handleTypingEvent,
   handleIcebreakerStatusUpdatedEvent,
    handleIcebreakerResponsesEvent,
    handleIcebreakerQuestionGroupEvent,
     handleNewMessageEvent } from './chat-event-handlers'

export const chatEventRegistry = {
  newMessage: handleNewMessageEvent,
  typing: handleTypingEvent,
  icebreakerStatusUpdated: handleIcebreakerStatusUpdatedEvent,
  icebreakerQuestionGroup: handleIcebreakerQuestionGroupEvent,
  icebreakerResponses: handleIcebreakerResponsesEvent,
}
