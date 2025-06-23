// src/sockets/chat/chatEventHandlers.ts

import { useChatStore } from '@/features/chat/stores/chat-store'
import {
  NewMessageEvent,
  TypingEvent,
  MessageReadEvent,
  IcebreakerStatusEvent,
  IcebreakerPollEvent,
  IcebreakerResponsesEvent,
} from '@shared/icebreaker-event.types'
import { ChatStoreMessage, Message } from '@shared/message.types'
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
    const conversation_id = message.conversation_id
    
    if (!conversation_id) {
      logger.warn('Message reçu sans ID de conversation')
      return
    }

    const newMessage: ChatStoreMessage = {
      message_id: message.message_id,
      message_type: 'MESSAGE',
      content: message.content,
      sender_id: message.sender_id,
      created_at: message.created_at,
      status: 'DELIVERED',
    }
    
    // Vérifier que la date est valide avant d'ajouter le message
    
    chatStore.addMessage(conversation_id, newMessage)
  } catch (error) {
    logger.error(
      'Erreur lors du traitement du message:',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export function handleTypingEvent(data: TypingEvent) {
  try {
    const { conversation_id, user_id, is_typing } = data
    console.log('Typing event', data)

    if (conversation_id && user_id) {
      // Mettre à jour le champ snake_case utilisé dans ConversationParticipant
      chatStore.updateParticipantField(conversation_id, user_id, 'is_typing', is_typing)
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
    const conversation_id = data.conversation_id
    if (conversation_id) {
      console.log('Message read in conversation', conversation_id, data)
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
    const { conversation_id, user_id, is_icebreaker_ready, timestamp } = data
    
    if (conversation_id && user_id) {
      chatStore.updateParticipantField(
        conversation_id,
        user_id,
        'is_icebreaker_ready',
        is_icebreaker_ready
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
    const { conversation_id, poll } = data
    // poll est maintenant un objet CurrentPollWithRelations, on le stocke directement
    chatStore.setCurrentPoll(conversation_id, poll)
    console.log('Poll reçu pour conversation', conversation_id, poll)
    logger.info(`Poll reçu pour conversation ${conversation_id}:`, poll)
  } catch (error) {
    logger.error(
      "Erreur lors du traitement de la question de l'icebreaker:",
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

// Handler pour 'icebreakerResponses' event
export function handleIcebreakerResponsesEvent(data: IcebreakerResponsesEvent) {
  console.log('RESET STATUS ICEBREAKER', data)
  try {
    // Vérifier si c'est le format de synchronisation (sans questionLabel)
    if (!data.poll_translation && data.poll_id) {
      // Ne pas créer de message pour les événements de synchronisation
      // Juste mettre à jour les statuts des participants
      chatStore.resetIcebreakerStatus(data.conversation_id)
      return
    }
    
    // Format normal avec questionLabel
    if (!data.poll_translation) {
      logger.warn('questionLabel manquant dans icebreakerResponses, abandon')
      return
    }  
    
    const message: ChatStoreMessage = {
      message_id: data.poll_id,
      content: data.poll_translation,
      sender_id: 'JOOTS',
      status: 'DELIVERED',
      created_at: new Date(),
      message_type: 'ICEBREAKER',
      userAId: data.user1,
      userAAnswer: data.response1,
      userBId: data.user2,
      userBAnswer: data.response2,
    }
    
    chatStore.addMessage(data.conversation_id, message)
    
    // Mettre à jour les données XP et niveau si disponibles
    if (data.xpAndLevel) {      
      // Mettre à jour le store de chat - AnimatedProgressionBar détectera automatiquement le changement
      chatStore.updateConversationXpAndLevel(data.conversation_id, data.xpAndLevel)
    }
    
    chatStore.resetIcebreakerStatus(data.conversation_id)
  } catch (error) {
    logger.error(
      "Erreur lors du traitement des réponses de l'icebreaker:",
      error instanceof Error ? error : new Error(String(error))
    )
  }
}
