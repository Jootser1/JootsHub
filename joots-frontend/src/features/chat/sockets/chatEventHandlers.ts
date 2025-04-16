// src/sockets/chat/chatEventHandlers.ts

import { useChatStore } from '@/features/chat/stores/chatStore';
import { Message } from '@/features/chat/chat.types';
import { logger } from '@/utils/logger';

// On utilise Zustand ou un autre store pour manipuler les messages
const chatStore = useChatStore.getState(); // on prend l'état du store directement

// Handler pour 'newMessage' event
export function handleNewMessageEvent(message: any) {
  try {
    if (!message) {
      logger.warn('Received empty message from gateway');
      return;
    }
    
    // Loggons le message complet pour le debug
    logger.info('Message brut reçu du gateway:', message);
    
    // Utiliser l'ID de conversation du message si disponible
    const conversationId = message.conversationId;
    
    if (!conversationId) {
      logger.warn('Message reçu sans ID de conversation');
      return;
    }

    const newMessage: Message = {
      id: message.id,
      content: message.content,
      senderId: message.sender?.id || message.senderId,
      receiverId: message.recipientId || '',
      type: message.type || 'text',
      createdAt: new Date(message.createdAt || message.timestamp || new Date()),
      status: 'delivered',
    };

    // Vérifier que la date est valide avant d'ajouter le message
    logger.info(`Timestamp du message: ${newMessage.createdAt.toISOString()}`);
    
    chatStore.addMessage(conversationId, newMessage);
    console.log('newMessage reçu et ajouté au store', newMessage);
  } catch (error) {
    logger.error('Erreur lors du traitement du message:', error);
  }
}

// Handler pour 'userTyping' event
export function handleTypingEvent(data: any) {
  try {
    // Ex: update typing indicator in the store
    const conversationId = data?.conversationId;
    if (conversationId) {
      console.log('User typing in conversation', conversationId, data);
    }
  } catch (error) {
    logger.error('Erreur lors du traitement du statut de frappe:', error);
  }
}

// Handler pour 'messageRead' event
export function handleMessageReadEvent(data: any) {
  try {
    // Ex: mark a message as read in the store
    const conversationId = data?.conversationId;
    if (conversationId) {
      console.log('Message read in conversation', conversationId, data);
    }
  } catch (error) {
    logger.error('Erreur lors du traitement de la lecture du message:', error);
  }
}
