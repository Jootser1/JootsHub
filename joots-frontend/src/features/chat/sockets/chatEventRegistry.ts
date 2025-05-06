import { handleIcebreakerQuestionGroupEvent, handleNewMessageEvent } from './chatEventHandlers';
import { handleTypingEvent } from './chatEventHandlers';
import { handleIcebreakerStatusUpdatedEvent } from './chatEventHandlers';


export const chatEventRegistry = {
  newMessage: handleNewMessageEvent,
  typing: handleTypingEvent,
  icebreakerStatusUpdated: handleIcebreakerStatusUpdatedEvent,
  icebreakerQuestionGroup: handleIcebreakerQuestionGroupEvent,
};






