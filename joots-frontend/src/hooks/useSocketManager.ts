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
  
  // Fonction pour vérifier si une conversation est active
  const isConversationActive = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    return chatSocket ? chatSocket.isInConversation(conversationId) : false;
  }, []);
  
  // Fonction pour rejoindre une conversation
  const joinConversation = useCallback((conversationId: string) => {
    const chatSocket = socketManager.getChatSocket();
    if (chatSocket?.isConnected()) {
      // Vérifier si déjà dans la conversation avant de rejoindre
      if (!isConversationActive(conversationId)) {
        chatSocket.joinConversation(conversationId);
        logger.info(`useSocketManager: Conversation rejointe: ${conversationId}`);
      } else {
        logger.info(`useSocketManager: Déjà dans la conversation: ${conversationId}`);
      }
    } else {
      logger.warn(`useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`);
    }
  }, []);
  
  // Synchronisation de l'état avec l'état réel des sockets
  useEffect(() => {
    // Vérifier l'état actuel
    const updateConnectionState = () => {
      const currentUserConnected = socketManager.isUserSocketConnected();
      const currentChatConnected = socketManager.isChatSocketConnected();

      if (currentUserConnected !== isUserConnected) {
        setIsUserConnected(currentUserConnected);
      }

      if (currentChatConnected !== isChatConnected) {
        setIsChatConnected(currentChatConnected);
      }
    };

    // Vérifier immédiatement
    updateConnectionState();
  }, []);
  
  // Connexion du socket utilisateur
  const connectUserSocket = useCallback(async (userId: string, token: string) => {
    try {
      socketManager.setCredentials(userId, token);
      const userSocket = await socketManager.connectUserSocket();
      setIsUserConnected(userSocket.isConnected());
      return userSocket;
    } catch (error) {
      logger.error('useSocketManager: Erreur lors de la connexion du socket utilisateur', error as Error);
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
      logger.error('useSocketManager: Erreur lors de la connexion du socket chat', error as Error);
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
      conversationIds = response.data.map((conv: { id: string }) => conv.id);
      const chatStore = useChatStore.getState();
      chatStore.setConversationsIds(conversationIds);
      return conversationIds;
    } catch (error) {
      logger.error("useSocketManager: Erreur lors du chargement des conversations:", error as Error);
      return [];
    }
  }, []);
  
  // Connexion avec toutes les conversations de l'utilisateur
  const connectWithAllUserConversations = useCallback(async (userId: string, token: string) => {
    try {
      // Enregistrer l'état actuel des connexions
      const isUserAlreadyConnected = socketManager.isUserSocketConnected();
      const isChatAlreadyConnected = socketManager.isChatSocketConnected();
      
      // 1. S'assurer que le socket utilisateur est connecté
      if (!isUserAlreadyConnected) {
        socketManager.setCredentials(userId, token);
        await socketManager.connectUserSocket();
        setIsUserConnected(true);
      }

      // 2. S'assurer que le socket chat est connecté avec toutes les conversations
      if (!isChatAlreadyConnected) {
        // Récupérer les conversations de l'utilisateur
        const conversationIds = await fetchUserConversations();
        
        // Connexion du socket chat avec ces conversations
        const chatSocket = await socketManager.connectChatSocket(conversationIds);
        const isConnected = chatSocket.isConnected();
        setIsChatConnected(isConnected);
        
        logger.info(`useSocketManager: Socket connecté avec ${conversationIds.length} conversations: ${isConnected}`);
        return isConnected;
      } else {
        // Si déjà connecté, synchroniser l'état local
        setIsChatConnected(true);
        return true;
      }
    } catch (error) {
      logger.error("useSocketManager: Erreur lors de la connexion avec les conversations:", error as Error);
      return false;
    }
  }, [fetchUserConversations]);
  
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
      if (chatSocket.isConnected()) {
        chatSocket.joinConversation(conversationId);
        logger.info(`useSocketManager: Conversation rejointe: ${conversationId}`);
      } else {
        logger.warn(`useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`);
        return false;
      }
    }
    
    const result = chatSocket.sendMessage(conversationId, content, userId);
    
    // Si le résultat est une promesse (cas de reconnexion)
    if (result instanceof Promise) {
      return result;
    }
    
    return result;
  }, []);
  
  const sendTypingStatus = useCallback((conversationId: string, isTyping: boolean) => {
    const chatSocket = socketManager.getChatSocket() as ChatSocketService;
    if (chatSocket?.isConnected()) {
      // S'assurer que la conversation est rejointe avant d'envoyer
      if (!chatSocket.isInConversation(conversationId)) {
        if (chatSocket.isConnected()) {
          chatSocket.joinConversation(conversationId);
          logger.info(`useSocketManager: Conversation rejointe: ${conversationId}`);
        } else {
          logger.warn(`useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`);
          return;
        }
      }
      
      chatSocket.sendTypingStatus(conversationId, isTyping);
    }
  }, []);
  
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
      if (chatSocket.isConnected()) {
        chatSocket.joinConversation(conversationId);
        logger.info(`useSocketManager: Conversation rejointe: ${conversationId}`);
      } else {
        logger.warn(`useSocketManager: Impossible de rejoindre la conversation ${conversationId}: socket non connecté`);
        return;
      }
    }
    
    chatSocket.sendIcebreakerReady(conversationId, userId, isIcebreakerReady);
  }, []);
  
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