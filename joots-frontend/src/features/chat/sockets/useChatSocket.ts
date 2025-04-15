import { useChatSocketStore } from '@/features/chat/stores/chatSocketStore';
import { useChatSocketContext } from './ChatSocketProvider';

/**
 * Hook pour utiliser les fonctionnalités du socket chat
 * Combine les informations du contexte et les méthodes du store
 */
export const useChatSocket = () => {
  const { isConnected, isLoading } = useChatSocketContext();
  const { 
    sendChatMessage, 
    sendTypingStatus,
    connectChatSocket,
    disconnectChatSocket,
    chatSocket
  } = useChatSocketStore();
  
  return {
    // État
    isConnected,
    isLoading,
    
    // Méthodes
    sendMessage: sendChatMessage,
    sendTypingStatus,
    connectChat: connectChatSocket,
    disconnectChat: disconnectChatSocket,
    
    // Accès direct au service si nécessaire
    service: chatSocket
  };
}; 