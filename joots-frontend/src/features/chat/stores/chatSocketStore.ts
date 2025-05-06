import { create } from 'zustand';
import { BaseSocketService } from '@/lib/sockets/BaseSocketService';
import { ChatSocketService } from '@/features/chat/sockets/chatSocketService';
import { logger } from '@/utils/logger';
import { waitForConnection } from '@/utils/socketUtils';

interface ChatSocketStoreState {
    chatSocket: BaseSocketService | null;
    connectChatSocket: (userId: string, token: string, conversationId?: string) => Promise<BaseSocketService>;
    disconnectChatSocket: () => void;
    sendChatMessage: (conversationId: string, content: string, userId: string) => boolean | Promise<boolean>;
    sendTypingStatus: (conversationId: string, isTyping: boolean) => void;
    getActiveConversation: () => string | null;
    sendIcebreakerReady: (conversationId: string, isIcebreakerReady: boolean) => void;
}

export const useChatSocketStore = create<ChatSocketStoreState>((set, get) => ({
    chatSocket: null,
    
connectChatSocket: async (userId: string, token: string, conversationId?: string): Promise<BaseSocketService> => {
        if (typeof window === 'undefined') {
            throw new Error('Cannot connect socket on server side');
        }
        
        // 1. Vérifier si un socket existe déjà et est connecté
        const existingSocket = get().chatSocket;
        if (existingSocket?.isConnected()) {
            logger.info('Socket chat déjà connecté, réutilisation');
            
            // Si nous avons déjà un socket connecté et une conversation différente, rejoindre la nouvelle conversation
            if (conversationId) {
                const chatService = existingSocket as ChatSocketService;
                const currentConversation = chatService.getActiveConversation();
                
                if (currentConversation !== conversationId) {
                    chatService.joinConversation(conversationId);
                    logger.info(`Changement de conversation: ${currentConversation} -> ${conversationId}`);
                }
            }
            
            return existingSocket;
        }
        
        // 2. Initialisation - utiliser le singleton
        const chatSocketService = ChatSocketService.getInstance();
        logger.info(`Instance de ChatSocketService existante vérifiée et créée pour ${userId}`);
        
        // 3. Connecter seulement si pas déjà connecté
        if (!chatSocketService.isConnected()) {
            chatSocketService.connect(userId, token);
            
            // Attendre la connexion avec un timeout de sécurité
            await waitForConnection(chatSocketService);
        }
        
        // 4. Enregistrer les événements si connecté
        if (chatSocketService.isConnected()) {
            chatSocketService.registerEvents();
        } else {
            logger.warn("Impossible d'établir une connexion socket");
            return chatSocketService;
        }  
        
        // 5. Rejoindre la conversation si spécifiée
        if (conversationId && chatSocketService.isConnected()) {
            try {
                chatSocketService.joinConversation(conversationId);
            } catch (error) {
                logger.error('Erreur lors de la rejointure de la conversation:', error);
            }
        } else if (conversationId) {
            logger.warn(`Socket chat non connecté (${chatSocketService.isConnected()}) - impossible de rejoindre la conversation ${conversationId}`);
        }
    
        // 6. Mettre à jour le store et retourner le service
        set({ chatSocket: chatSocketService });
        return chatSocketService;
    },

disconnectChatSocket: () => {
    set((state) => {
        if (state.chatSocket) {
            try {
                // Cast pour accéder aux méthodes spécifiques
                const chatSocketService = state.chatSocket as ChatSocketService;
                
                // Récupérer l'ID utilisateur
                const userId = state.chatSocket.getUserId();
                logger.info(`Déconnexion du socket chat pour l'utilisateur: ${userId || 'inconnu'}`);
                
                // Désenregistrer les événements
                chatSocketService.unregisterEvents();
                
                // Déconnecter le socket
                state.chatSocket.disconnect();
                ChatSocketService.resetInstance();
                logger.info('Socket chat déconnecté');
            } catch (error) {
                logger.error('Erreur lors de la déconnexion du socket chat:', error);
            }
        }
        return { chatSocket: null };
    });
},

sendChatMessage: (conversationId: string, content: string, userId: string) => {
    const chatSocket = get().chatSocket as ChatSocketService;
    if (!chatSocket) {
        logger.warn('Impossible d\'envoyer le message: socket non initialisé');
        return false;
    }
    
    const result = chatSocket.sendMessage(conversationId, content, userId);
    
    // Si le résultat est une promesse (cas de reconnexion)
    if (result instanceof Promise) {
        return result;
    }
    
    return result;
},

sendTypingStatus: (conversationId: string, isTyping: boolean): void => {
    const chatSocket = get().chatSocket as ChatSocketService;
    if (chatSocket?.isConnected()) {
        chatSocket.sendTypingStatus(conversationId, isTyping);
    }
},

getActiveConversation: (): string | null => {
    const chatSocket = get().chatSocket as ChatSocketService;
    return chatSocket ? chatSocket.getActiveConversation() : null;
},

sendIcebreakerReady: (conversationId: string, isIcebreakerReady: boolean) => {
    const chatSocket = get().chatSocket as ChatSocketService;
    const userId = chatSocket.getUserId();
    if (userId && chatSocket?.isConnected()) {
        chatSocket.sendIcebreakerReady(conversationId, userId, isIcebreakerReady);
    }
},
})); 