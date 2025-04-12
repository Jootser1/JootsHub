// src/stores/socketStore.ts
import { create } from 'zustand';
import { BaseSocketService } from '@/app/sockets/BaseSocketService';
import { UserSocketService } from '@/app/sockets/user/userSocketService';
import { ChatSocketService } from '@/app/sockets/chat/chatSocketService';
import axiosInstance from '@/app/api/axiosInstance';
import { logger } from '@/utils/logger';
import { useContactStore } from '@/stores/contactStore';
import { useUserStore } from '@/stores/userStore';

// Fonctions utilitaires
const waitForConnection = async (socketService: BaseSocketService): Promise<void> => {
    return new Promise<void>((resolve) => {
        let timeoutId: NodeJS.Timeout;
        
        const checkConnection = (status: boolean) => {
            if (status === true) {
                if (timeoutId) clearTimeout(timeoutId);
                cleanup();
                resolve();
            }
        };
        
        const cleanup = socketService.onSocketConnectionChange(checkConnection);
        
        timeoutId = setTimeout(() => {
            cleanup();
            resolve();
            logger.warn('Timeout en attendant la connexion socket');
        }, 5000);
    });
};

const setupUserRooms = async (socketService: UserSocketService, userId: string): Promise<void> => {
    // Récupérer les contacts
    const contactsResponse = await axiosInstance.get('/users/me/contacts');
    const contactIds = contactsResponse.data.map((contact: any) => contact.contact.id);
    
    // Rejoindre les rooms
    socketService.joinContactsRooms(contactIds);
    logger.info('Rooms des contacts rejointes:', contactIds.length);
    
    // Mettre à jour le statut
    socketService.updateUserStatus(userId, true);
    logger.info('Statut utilisateur mis à jour dans redis via socket');
};

interface SocketStoreState {
    userSocket: BaseSocketService | null;
    chatSocket: BaseSocketService | null;
    connectUserSocket: (userId: string, token: string) => Promise<BaseSocketService>;
    disconnectUserSocket: () => void;
    connectChatSocket: (userId: string, token: string, conversationId?: string) => BaseSocketService;
    disconnectChatSocket: () => void;
}

export const useSocketStore = create<SocketStoreState>((set, get) => ({
    userSocket: null,
    chatSocket: null,
    
    connectUserSocket: async (userId: string, token: string): Promise<BaseSocketService> => {
        if (typeof window === 'undefined') {
            throw new Error('Cannot connect socket on server side');
        }
        
        // 1. Vérifier si un socket existe déjà et est connecté
        const existingSocket = get().userSocket;
        if (existingSocket?.isConnected()) {
            logger.info('Socket utilisateur déjà connecté, réutilisation');
            return existingSocket;
        }
        
        // 2. Initialisation
        const userSocketService = UserSocketService.getInstance();
        logger.info(`Connexion du socket utilisateur pour ${userId}`);
        userSocketService.connect(userId, token);
        
        // 3. Attendre la connexion avec un timeout de sécurité
        if (!userSocketService.isConnected()) {
            await waitForConnection(userSocketService);
        }
        
        // 4. Enregistrer les événements
        userSocketService.registerEvents();
        
        
        // 5. Configuration post-connexion
        if (userSocketService.isConnected()) {
            try {
                await setupUserRooms(userSocketService, userId);
            } catch (error) {
                logger.error("Erreur lors de la configuration des rooms:", error);
            }
        } else {
            logger.warn('Socket toujours non connecté après attente - impossible de configurer les rooms');
        }
        
        // 5. Mettre à jour le store et retourner le service
        set({ userSocket: userSocketService });
        return userSocketService;
    },
    
    disconnectUserSocket: () => {
        set((state) => {
            if (state.userSocket) {
                try {
                    // Cast pour accéder aux méthodes spécifiques
                    const userSocketService = state.userSocket as UserSocketService;
                    
                    // 1. Tenter de récupérer l'ID utilisateur depuis différentes sources
                    let userId = state.userSocket.getUserId();
                    
                    // Si userId est null, essayer de le récupérer depuis le store utilisateur
                    if (!userId) {
                        const userFromStore = useUserStore.getState().user?.id;
                        // Convertir undefined en null si nécessaire
                        userId = userFromStore || null;
                        
                        if (userId) {
                            logger.info('Fallback: userId récupéré depuis le store utilisateur');
                        }
                    }
                    
                    logger.info(`Déconnexion du socket pour l'utilisateur: ${userId || 'inconnu'}`);
                    
                    if (userId) {
                        // 2. Mise à jour du statut utilisateur (hors ligne)
                        useUserStore.getState().updateUserStatus(false);
                        userSocketService.updateUserStatus(userId, false);
                        logger.info('Nettoyage socket effectué, utilisateur marqué hors ligne');
                        
                        // 3. Quitter les rooms de contacts
                        const contactIds = useContactStore.getState().contactList;
                        if (contactIds && contactIds.size > 0) {
                            userSocketService.leaveContactsRooms([...contactIds]);
                            logger.info('Rooms des contacts quittées');
                        }
                    } else {
                        logger.warn('Impossible de trouver l\'ID utilisateur pour la déconnexion');
                    }

                    // 4. Désenregistrer les événements et déconnecter dans tous les cas
                    userSocketService.unregisterEvents();
                    state.userSocket.disconnect();
                } catch (error) {
                    logger.error('Erreur lors de la déconnexion du socket:', error);
                }
            }
            return { userSocket: null };
        });
    },
    
    connectChatSocket: (userId: string, token: string, conversationId?: string): BaseSocketService => {
        if (typeof window === 'undefined') {
            throw new Error('Cannot connect socket on server side');
        }
        
        const chatSocketService = ChatSocketService.getInstance();
        chatSocketService.connect(userId, token);
        
        if (conversationId) {
            chatSocketService.joinConversation(conversationId);
        }
        
        set({ chatSocket: chatSocketService });
        return chatSocketService;
    },
    
    disconnectChatSocket: () => {
        set((state) => {
            if (state.chatSocket) {
                state.chatSocket.disconnect();
            }
            return { chatSocket: null };
        });
    },
}));
