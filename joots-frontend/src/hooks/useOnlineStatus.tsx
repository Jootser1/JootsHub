import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from './useSocket';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { logger } from '@/utils/logger';

interface UserStatusChange {
  userId: string;
  isOnline: boolean;
}

export const useOnlineStatus = () => {
  const { data: session } = useSession();
  const { socket, isConnected } = useSocket();
  const setParticipantOnlineStatus = useChatStore((state) => state.setParticipantOnlineStatus);
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);
  const [localOnlineStatus, setLocalOnlineStatus] = useState<boolean>(true);

  // Effectuer une mise à jour forcée du statut au montage et démontage du composant
  useEffect(() => {
    if (session?.user?.id) {
      // Mettre à jour le statut en ligne au montage
      updateUserStatus(true);
      
      // Nettoyer au démontage - marquer comme hors ligne
      return () => {
        updateMyStatus(false);
      };
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (!socket || !session?.user?.id) {
      logger.warn('useOnlineStatus: Pas de socket ou de session utilisateur');
      return;
    }

    logger.debug(`[useOnlineStatus] Hook initialisé pour l'utilisateur ${session.user.id}`);
    logger.debug(`État de connexion socket: ${socket.connected ? 'Connecté' : 'Déconnecté'}`);

    // Fonction de gestionnaire d'événement pour userStatusChange
    const handleUserStatusChange = (data: UserStatusChange) => {
      logger.debug(`Statut utilisateur changé: ID=${data.userId}, isOnline=${data.isOnline}`);
      
      try {
        // Mise à jour du statut dans le store de chat
        setParticipantOnlineStatus(data.userId, data.isOnline);
        
        // Si c'est l'utilisateur actuel, mettre à jour aussi son propre statut
        if (data.userId === session.user.id) {
          logger.debug(`Mise à jour du statut pour l'utilisateur actuel: ${data.isOnline}`);
          updateUserStatus(data.isOnline);
          setLocalOnlineStatus(data.isOnline);
        }
      } catch (error) {
        logger.error('Erreur lors du traitement de userStatusChange:', error);
      }
    };
    
    // S'abonner à l'événement de changement de statut
    const unsubscribe = socket.onUserStatusChange(handleUserStatusChange);
    
    // Émettre un ping pour signaler la présence et vérifier la connexion
    if (socket.connected) {
      socket.emit('ping');
    }

    return () => {
      logger.debug('Nettoyage des écouteurs d\'événements useOnlineStatus');
      unsubscribe();
    };
  }, [socket, session?.user?.id, setParticipantOnlineStatus, updateUserStatus]);

  // Fonction pour mettre à jour son propre statut
  const updateMyStatus = useCallback((isOnline: boolean) => {
    if (!socket || !session?.user?.id) {
      logger.warn('updateMyStatus: Pas de socket ou de session utilisateur');
      return;
    }

    try {
      logger.debug(`Émission de mise à jour de statut: isOnline=${isOnline}`);
      
      // Mettre à jour localement d'abord
      updateUserStatus(isOnline);
      setLocalOnlineStatus(isOnline);
      
      // Émettre l'événement via Socket.IO
      if (socket.connected) {
        socket.emit('updateUserStatus', { isOnline });
      } else {
        logger.warn('Socket non connecté lors de la tentative de mise à jour du statut');
      }
    } catch (error) {
      logger.error('Erreur lors de la mise à jour du statut en ligne:', error);
    }
  }, [socket, session?.user?.id, updateUserStatus]);

  return { 
    updateMyStatus,
    isOnline: localOnlineStatus 
  };
}; 