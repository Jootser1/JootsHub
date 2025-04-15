// src/sockets/chat/chatEventHandlers.ts

import { useChatStore } from '@/features/chat/stores/chatStore';
import { Message } from '@/features/chat/chat.types';

// On utilise Zustand ou un autre store pour manipuler les messages
const chatStore = useChatStore.getState(); // on prend l'état du store directement

// Handler pour 'newMessage' event
export function handleNewMessageEvent(message: any, conversationId?: string) {
  if (!message || !conversationId) return;

  if (message.conversationId !== conversationId) return;

  const newMessage: Message = {
    id: message.id,
    content: message.content,
    senderId: message.sender.id,
    receiverId: message.recipientId || '',
    type: message.type || 'text',
    timestamp: new Date(message.createdAt),
    status: 'delivered',
  };

  chatStore.addMessage(conversationId, newMessage);
}

// Handler pour 'userTyping' event
export function handleTypingEvent(data: any, conversationId?: string) {
  // Ex: update typing indicator in the store
  console.log('User typing in conversation', conversationId, data);
}

// Handler pour 'messageRead' event
export function handleMessageReadEvent(data: any, conversationId?: string) {
  // Ex: mark a message as read in the store
  console.log('Message read in conversation', conversationId, data);
}
