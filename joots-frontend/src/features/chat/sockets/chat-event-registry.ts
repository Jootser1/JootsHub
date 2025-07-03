import { handleTypingEvent,
   handleIcebreakerStatusUpdatedEvent,
    handleIcebreakerResponsesEvent,
    handleIcebreakerPollEvent,
     handleNewMessageEvent } from './chat-event-handlers'

export const chatEventRegistry = {
  newMessage: handleNewMessageEvent,
  typing: handleTypingEvent,
  icebreakerStatusUpdated: handleIcebreakerStatusUpdatedEvent,
  icebreakerPoll: handleIcebreakerPollEvent,
  icebreakerResponses: handleIcebreakerResponsesEvent,
}
