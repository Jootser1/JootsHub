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
    //logger.info('Message brut reçu du gateway:', message);
    
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
    
    chatStore.addMessage(conversationId, newMessage);
    console.log('newMessage reçu et ajouté au store', newMessage);
  } catch (error) {
    logger.error('Erreur lors du traitement du message:', error);
  }
}

// Handler pour 'userTyping' event
export function handleTypingEvent(data: any) {
  try {
    const conversationId = data?.conversationId;
    const userId = data?.userId;
    const isTyping = data?.isTyping;

    if (conversationId && userId) {
      chatStore.updateParticipantField(conversationId, userId, 'isTyping', isTyping);
      logger.debug(`Statut de frappe mis à jour pour l'utilisateur ${userId}: ${isTyping ? 'en train d\'écrire' : 'inactif'}`);
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

// Handler pour 'icebreakerStatusUpdated' event
export function handleIcebreakerStatusUpdatedEvent(data: any) {
  try {
    const conversationId = data?.conversationId;
    const userId = data?.userId;
    const isIcebreakerReady = data?.isIcebreakerReady;
    const timestamp = data?.timestamp;

    if (conversationId && userId) {
        chatStore.updateParticipantField(conversationId, userId, 'isIcebreakerReady', isIcebreakerReady);
        chatStore.updateParticipantField(conversationId, userId, 'icebreakerTimestamp', timestamp);
    }

    console.log('icebreakerStatusUpdated', conversationId, userId, isIcebreakerReady, timestamp);

  } catch (error) {
    logger.error('Erreur lors du traitement de la mise à jour du statut de l\'icebreaker:', error);
  }
}

// Handler pour 'icebreakerQuestionGroup' event
export function handleIcebreakerQuestionGroupEvent(data: any) {
  try {
    const conversationId = data?.conversationId;
    const questionGroup = data?.questionGroup;
    console.log('handleIcebreakerQuestionGroupEvent', conversationId, questionGroup);

    chatStore.setCurrentQuestionGroup(conversationId, questionGroup);
    console.log('icebreakerQuestionGroup', conversationId, questionGroup);

  } catch (error) {
    logger.error('Erreur lors du traitement de la question de l\'icebreaker:', error);
  }
}

// Handler pour 'icebreakerResponses' event
export function handleIcebreakerResponsesEvent(data: any) {
  console.log('handleIcebreakerResponsesEvent', data);
  try {
    const conversationId = data?.conversationId;
    const questionGroupId = data?.questionGroupId;  
    const userId1 = data?.userId1;
    const optionId1 = data?.optionId1;
    const userId2 = data?.userId2;
    const optionId2 = data?.optionId2;

    chatStore.resetIcebreakerStatus(conversationId);
    chatStore.setParticipantResponse(conversationId, userId1, {
      questionGroupId: questionGroupId,
      optionId: optionId1,
      answeredAt: new Date().toISOString()
    });
    chatStore.setParticipantResponse(conversationId, userId2, {
      questionGroupId: questionGroupId,
      optionId: optionId2,
      answeredAt: new Date().toISOString()
    });

    console.log('icebreakerResponses', conversationId, questionGroupId, userId1, optionId1, userId2, optionId2); 
  } catch (error) {
    logger.error('Erreur lors du traitement des réponses de l\'icebreaker:', error);
  }
}



