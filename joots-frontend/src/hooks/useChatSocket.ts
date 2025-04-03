import { useEffect, useCallback, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useChatStore } from '../stores/chatStore';
import { Message, MessageStatus, MessageType, IcebreakerResponse } from '../types/chat';
import axiosInstance from '@/app/api/axiosInstance';
import SocketService from '@/services/SocketService';
import { logger } from '@/utils/logger';

export const useChatSocket = (conversationId?: string) => {
  const { data: session } = useSession();
  const store = useChatStore();
  const socketServiceRef = useRef<SocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Charger la conversation
  useEffect(() => {
    const loadConversation = async () => {
      if (!conversationId || !session?.user?.id) return;

      try {
        const response = await axiosInstance.get(`/conversations/${conversationId}`);
        store.updateConversation(conversationId, response.data);
      } catch (error) {
        console.error('Failed to load conversation:', error);
        store.setError('Erreur lors du chargement de la conversation');
      }
    };

    loadConversation();
  }, [conversationId, session?.user?.id]);

  // Initialiser le service Socket
  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken || isInitialized) return;

    const socketService = SocketService.getInstance();
    socketServiceRef.current = socketService;

    try {
      socketService.initialize(session.user.id, session.accessToken);
      setIsInitialized(true);

      // S'abonner aux changements d'état de connexion
      const unsubscribe = socketService.onConnectionChange((connected) => {
        setIsConnected(connected);
        store.setConnectionStatus(connected ? 'connected' : 'disconnected');
      });

      return () => {
        unsubscribe();
        if (socketServiceRef.current) {
          socketServiceRef.current.disconnect();
        }
      };
    } catch (error) {
      logger.error('Failed to initialize Socket:', error);
      store.setError('Erreur de connexion au serveur');
      store.setConnectionStatus('disconnected');
    }
  }, [session?.user?.id, session?.accessToken, isInitialized]);

  // Rejoindre/quitter la conversation
  useEffect(() => {
    if (!conversationId || !session?.user?.id || !socketServiceRef.current || !isConnected) return;

    const socketService = socketServiceRef.current;
    
    try {
      socketService.joinConversation(conversationId);

      // Configuration des gestionnaires d'événements
      socketService.onNewMessage((socketMessage) => {
        const chatMessage: Message = {
          id: socketMessage.id,
          content: socketMessage.content,
          senderId: socketMessage.senderId,
          receiverId: socketMessage.receiverId,
          timestamp: new Date(socketMessage.createdAt),
          status: 'delivered' as MessageStatus,
          type: 'text' as MessageType
        };
        store.addMessage(conversationId, chatMessage);
      });

      socketService.onTypingStatus((data) => {
        store.setParticipantTypingStatus(data.userId, data.isTyping);
      });

      socketService.onMessageRead((data) => {
        store.markMessagesAsRead(conversationId);
      });

    } catch (error) {
      logger.error('Failed to join conversation:', error);
      store.setError('Erreur lors de la connexion à la conversation');
    }

    return () => {
      try {
        socketService.leaveConversation(conversationId);
      } catch (error) {
        logger.error('Failed to leave conversation:', error);
      }
    };
  }, [conversationId, session?.user?.id, isConnected]);

  // Actions exposées aux composants
  const sendMessage = useCallback((conversationId: string, content: string) => {
    if (!conversationId || !socketServiceRef.current || !isConnected) {
      logger.warn('Cannot send message: socket not connected');
      return;
    }
    socketServiceRef.current.sendMessage(conversationId, content);
  }, [isConnected]);

  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (!conversationId || !socketServiceRef.current || !isConnected) {
      logger.warn('Cannot send typing status: socket not connected');
      return;
    }
    socketServiceRef.current.sendTypingStatus(conversationId, isTyping);
  }, [conversationId, isConnected]);

  const markMessageAsRead = useCallback((messageId: string) => {
    if (!conversationId || !socketServiceRef.current) return;
    socketServiceRef.current.markMessageAsRead(messageId, conversationId);
  }, [conversationId]);

  const sendIcebreakerReady = useCallback(() => {
    if (!conversationId || !socketServiceRef.current) return;
    socketServiceRef.current.sendIcebreakerReady(conversationId);
  }, [conversationId]);

  const sendIcebreakerResponse = useCallback((response: IcebreakerResponse) => {
    if (!conversationId || !socketServiceRef.current) return;
    socketServiceRef.current.sendIcebreakerResponse(conversationId, response);
  }, [conversationId]);

  // Sélecteurs du store pour les données de la conversation
  const connectionStatus = store.connectionStatus;
  const messages = conversationId ? store.messages[conversationId] || [] : [];
  const conversation = conversationId ? store.conversations[conversationId] : null;
  const error = store.error;

  return {
    // État de la connexion
    isConnected,
    isConnecting: connectionStatus === 'connecting',
    error,

    // Données de la conversation
    messages,
    conversation,
    
    // Actions
    sendMessage,
    sendTypingStatus,
    markMessageAsRead,
    sendIcebreakerReady,
    sendIcebreakerResponse,
  };
}; 