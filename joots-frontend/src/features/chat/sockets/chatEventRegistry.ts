import { handleNewMessageEvent } from './chatEventHandlers';
import { handleTypingEvent } from './chatEventHandlers';


export const chatEventRegistry = {
  newMessage: handleNewMessageEvent,
  typing: handleTypingEvent,
};






