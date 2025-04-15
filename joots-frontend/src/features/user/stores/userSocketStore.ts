import { create } from 'zustand';
import { BaseSocketService } from '@/lib/sockets/BaseSocketService';
import { UserSocketService } from '@/features/user/sockets/userSocketService';
import { logger } from '@/utils/logger';
import { useContactStore } from '@/features/contacts/stores/contactStore';
import { useUserStore } from '@/features/user/stores/userStore';
import { waitForConnection } from '@/utils/socketUtils';

interface UserSocketStoreState {
    userSocket: BaseSocketService | null;
    connectUserSocket: (userId: string, token: string) => Promise<BaseSocketService>;
    disconnectUserSocket: () => void;
}

export const useUserSocketStore = create<UserSocketStoreState>((set, get) => ({
    userSocket: null,
    
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
        if (!userSocketService.isConnected()) {
            userSocketService.registerEvents();
        }
        
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
        
        // 6. Mettre à jour le store et retourner le service
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
}));

// Fonction utilitaire
const setupUserRooms = async (socketService: UserSocketService, userId: string): Promise<void> => {
    // Récupérer les contacts
    const contactStore = useContactStore.getState();
    const contactIds = Array.from(contactStore.contactList || []);
    
    // Rejoindre les rooms
    if (contactIds.length > 0) {
        socketService.joinContactsRooms(contactIds);
        logger.info(`Rooms des contacts rejointes: ${contactIds.length}`);
    }
    
    // Mettre à jour le statut
    socketService.updateUserStatus(userId, true);
    logger.info('Statut utilisateur mis à jour dans redis via socket');
}; 