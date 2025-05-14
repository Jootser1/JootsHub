import { useState, useCallback, useEffect } from 'react';
import { socketManager } from '@/lib/sockets/socketManager';
import { logger } from '@/utils/logger';
import { ChatSocketService } from '@/features/chat/sockets/chatSocketService';
import axiosInstance from '@/app/api/axiosInstance';
import { useChatStore } from '@/features/chat/stores/chatStore';
/**
 * Hook personnalisé pour accéder aux fonctionnalités du socketManager
 * Remplace les stores chatSocketStore et userSocketStore
 */
export function useSocketManager() {
  // États pour la réactivité dans les composants React
  const [isUserConnected, setIsUserConnected] = useState(socketManager.isUserSocketConnected());
  const [isChatConnected, setIsChatConnected] = useState(socketManager.isChatSocketConnected());
  
  
  // Connexion du socket utilisateur
  const connectUserSocket = useCallback(async (userId: string, token: string) => {
    try {
      socketManager.setCredentials(userId, token);
      const userSocket = await socketManager.connectUserSocket();
      setIsUserConnected(userSocket.isConnected());
      return userSocket;
    } catch (error) {
      logger.error('useSocketManager: Erreur lors de la connexion du socket utilisateur', error);
      throw error;
    }
  }, []);
  
  // Connexion du socket chat
  const connectChatSocket = useCallback(async (userId: string, token: string, conversationIds?: string[]) => {
    try {
      socketManager.setCredentials(userId, token);
      const chatSocket = await socketManager.connectChatSocket(conversationIds);

      return chatSocket;
    } catch (error) {
      logger.error('useSocketManager: Erreur lors de la connexion du socket chat', error);
      throw error;
    }
  }, []);
  
  // Récupération des conversations de l'utilisateur
  const fetchUserConversations = useCallback(async () => {
    try {
      let conversationIds = useChatStore.getState().conversationsIds;
      if (conversationIds.length > 0) {
        return conversationIds;
      }
      const response = await axiosInstance.get('/conversations');
      conversationIds = response.data.map((conv: any) => conv.id);
      const chatStore = useChatStore.getState();
      chatStore.setConversationsIds(conversationIds);
      logger.info(`${conversationIds.length} conversation(s) récupérées depuis la bdd`);
      return conversationIds;
    } catch (error) {
      logger.error("useSocketManager: Erreur lors du chargement des conversations:", error);
      return [];
    }
  }, []);
  
  // Connexion avec toutes les conversations de l'utilisateur
  const connectWithAllUserConversations = useCallback(async (userId: string, token: string) => {
    try {
      // Récupérer les conversations de l'utilisateur
      const conversationIds = await fetchUserConversations();
      
      // Connexion du socket chat avec ces conversations
      socketManager.setCredentials(userId, token);
      const chatSocket = await socketManager.connectChatSocket(conversationIds);

      const isConnected = chatSocket.isConnected();
      setIsChatConnected(isConnected);
      
      logger.info(`useSocketManager: Socket connecté avec ${conversationIds.length} conversations: ${isConnected}`);
      return isConnected;
    } catch (error) {
      logger.error("useSocketManager: Erreur lors de la connexion avec les conversations:", error);
      return false;
    }
  }, [fetchUserConversations, isChatConnected]);
  
  // Déconnexion des sockets
  const disconnectUserSocket = useCallback(() => {
    socketManager.disconnectUserSocket();
    setIsUserConnected(false);
  }, []);
  
  const disconnectChatSocket = useCallback(() => {
    socketManager.disconnectChatSocket();
    setIsChatConnected(false);
  }, []);
  
  const disconnectAll = useCallback(() => {
    socketManager.disconnectAll();
    setIsUserConnected(false);
    setIsChatConnected(false);
  }, []);
  
  // Fonctions pour les conversations
  const joinConversation = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket();
    if (chatSocket?.isConnected()) {
      chatSocket.joinConversation(conversationId);
      logger.info(`useSocketManager: Conversation rejointe: ${conversationId}`);
    } else {
      logger.warn(`useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`);
    }
  }, []);
  
  const leaveConversation = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket();
    if (chatSocket?.isConnected()) {
      chatSocket.leaveConversation(conversationId);
      logger.info(`useSocketManager: Conversation quittée: ${conversationId}`);
    }
  }, []);
  
  const joinMultipleConversations = useCallback((conversationIds: string[]) => {
    const chatSocket = socketManager.getChatSocket();
    if (chatSocket?.isConnected() && conversationIds.length > 0) {
      chatSocket.joinAllConversations(conversationIds);
      logger.info(`useSocketManager: ${conversationIds.length} conversations rejointes`);
    }
  }, []);
  
  const isConversationActive = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    return chatSocket ? chatSocket.isInConversation(conversationId) : false;
  }, []);
  
  const getActiveConversations = useCallback(() => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    return chatSocket ? chatSocket.getActiveConversations() : [];
  }, []);
  
  // Fonctions pour les messages
  const sendChatMessage = useCallback((conversationId: string, content: string, userId: string) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    if (!chatSocket) {
      logger.warn('useSocketManager: Impossible d\'envoyer le message: socket non initialisé');
      return false;
    }
    
    // S'assurer que la conversation est rejointe avant d'envoyer
    if (!chatSocket.isInConversation(conversationId)) {
      joinConversation(conversationId);
    }
    
    const result = chatSocket.sendMessage(conversationId, content, userId);
    
    // Si le résultat est une promesse (cas de reconnexion)
    if (result instanceof Promise) {
      return result;
    }
    
    return result;
  }, [joinConversation]);
  
  const sendTypingStatus = useCallback((conversationId: string, isTyping: boolean) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    if (chatSocket?.isConnected()) {
      // S'assurer que la conversation est rejointe avant d'envoyer
      if (!chatSocket.isInConversation(conversationId)) {
        joinConversation(conversationId);
      }
      
      chatSocket.sendTypingStatus(conversationId, isTyping);
    }
  }, [joinConversation]);
  
  const sendIcebreakerReady = useCallback((conversationId: string, isIcebreakerReady: boolean) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    if (!chatSocket?.isConnected()) {
      logger.warn('useSocketManager: Impossible d\'envoyer le statut icebreaker: socket non connecté');
      return;
    }
    
    const userId = chatSocket.getUserId();
    if (!userId) {
      logger.warn('useSocketManager: Impossible d\'envoyer le statut icebreaker: utilisateur non identifié');
      return;
    }
    
    // S'assurer que la conversation est rejointe avant d'envoyer
    if (!chatSocket.isInConversation(conversationId)) {
      joinConversation(conversationId);
    }
    
    chatSocket.sendIcebreakerReady(conversationId, userId, isIcebreakerReady);
  }, [joinConversation]);
  
  // Retourne toutes les fonctionnalités
  return {
    // État
    isUserConnected,
    isChatConnected,
    
    // Méthodes d'authentification et de connexion
    connectUserSocket,
    connectChatSocket,
    connectWithAllUserConversations,
    fetchUserConversations,
    
    // Méthodes de déconnexion
    disconnectUserSocket,
    disconnectChatSocket,
    disconnectAll,
    
    // Méthodes de gestion des conversations
    joinConversation,
    leaveConversation,
    joinMultipleConversations,
    isConversationActive,
    getActiveConversations,
    
    // Méthodes de gestion des messages
    sendChatMessage,
    sendTypingStatus,
    sendIcebreakerReady,
    
    // Accès direct aux services
    getUserSocket: socketManager.getUserSocket.bind(socketManager),
    getChatSocket: socketManager.getChatSocket.bind(socketManager)
  };
} 