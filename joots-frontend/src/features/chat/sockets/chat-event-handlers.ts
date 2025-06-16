// src/sockets/chat/chatEventHandlers.ts

import { useChatStore } from '@/features/chat/stores/chat-store'
import {
  Message,
  MessageType,
  NewMessageEvent,
  TypingEvent,
  MessageReadEvent,
  IcebreakerStatusEvent,
  IcebreakerPollEvent,
  IcebreakerResponsesEvent,
} from '@/features/chat/chat.types'
import { logger } from '@/utils/logger'

// On utilise Zustand ou un autre store pour manipuler les messages
const chatStore = useChatStore.getState() // on prend l'état du store directement

// Handler pour 'newMessage' event
export function handleNewMessageEvent(message: NewMessageEvent) {
  try {
    if (!message) {
      logger.warn('Received empty message from gateway')
      return
    }
        
    // Utiliser l'ID de conversation du message si disponible
    const conversationId = message.conversationId
    
    if (!conversationId) {
      logger.warn('Message reçu sans ID de conversation')
      return
    }
    
    const newMessage: Message = {
      id: message.id,
      content: message.content,
      senderId: message.sender?.id || message.senderId || '',
      receiverId: message.recipientId || '',
      messageType: 'TEXT' as MessageType,
      createdAt: new Date(message.createdAt || message.timestamp || new Date()),
      status: 'delivered',
    }
    
    // Vérifier que la date est valide avant d'ajouter le message
    
    chatStore.addMessage(conversationId, newMessage)
  } catch (error) {
    logger.error(
      'Erreur lors du traitement du message:',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export function handleTypingEvent(data: TypingEvent) {
  try {
    const { conversationId, userId, isTyping } = data
    
    if (conversationId && userId) {
      chatStore.updateParticipantField(conversationId, userId, 'isTyping', isTyping)
    }
  } catch (error) {
    logger.error(
      'Erreur lors du traitement du statut de frappe:',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export function handleMessageReadEvent(data: MessageReadEvent) {
  try {
    // Ex: mark a message as read in the store
    const conversationId = data.conversationId
    if (conversationId) {
      console.log('Message read in conversation', conversationId, data)
    }
  } catch (error) {
    logger.error(
      'Erreur lors du traitement de la lecture du message:',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

// Handler pour 'icebreakerStatusUpdated' event
export function handleIcebreakerStatusUpdatedEvent(data: IcebreakerStatusEvent) {
  try {
    const { conversationId, userId, isIcebreakerReady, timestamp } = data
    
    if (conversationId && userId) {
      chatStore.updateParticipantField(
        conversationId,
        userId,
        'isIcebreakerReady',
        isIcebreakerReady
      )
    }
    
  } catch (error) {
    logger.error(
      "Erreur lors du traitement de la mise à jour du statut de l'icebreaker:",
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

// Handler pour 'icebreakerPoll' event
export function handleIcebreakerPollEvent(data: IcebreakerPollEvent) {
  try {
    const { conversationId, poll } = data
    chatStore.setCurrentPoll(conversationId, JSON.stringify(poll))
  } catch (error) {
    logger.error(
      "Erreur lors du traitement de la question de l'icebreaker:",
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

// Handler pour 'icebreakerResponses' event
export function handleIcebreakerResponsesEvent(data: any) {
  try {
    // Vérifier si c'est le format de synchronisation (sans questionLabel)
    if (!data.questionLabel && data.pollId) {
      // Ne pas créer de message pour les événements de synchronisation
      // Juste mettre à jour les statuts des participants
      chatStore.resetIcebreakerStatus(data.conversationId)
      return
    }
    
    // Format normal avec questionLabel
    if (!data.questionLabel) {
      logger.warn('questionLabel manquant dans icebreakerResponses, abandon')
      return
    }  
    
    const message: Message = {
      id: data.id || Date.now().toString(),
      content: data.questionLabel,
      senderId: 'JOOTS',
      receiverId: 'JOOTS',
      status: 'delivered',
      messageType: 'ANSWER' as MessageType,
      userAAnswer: data.response1,
      userAId: data.user1,
      userBAnswer: data.response2,
      userBId: data.user2,
      createdAt: new Date(),
    }
    
    chatStore.addMessage(data.conversationId, message)
    
    // Mettre à jour les données XP et niveau si disponibles
    if (data.xpAndLevel) {      
      // Mettre à jour le store de chat - AnimatedProgressionBar détectera automatiquement le changement
      chatStore.updateConversationXpAndLevel(data.conversationId, data.xpAndLevel)
    }
    
    chatStore.resetIcebreakerStatus(data.conversationId)
  } catch (error) {
    logger.error(
      "Erreur lors du traitement des réponses de l'icebreaker:",
      error instanceof Error ? error : new Error(String(error))
    )
  }
}
