// src/providers/UserSocketProvider.tsx
import { useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useUserSocket } from '@/hooks/useUserSocket';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { UserStatusChange } from '@/types/socket';
import { logger } from '@/utils/logger';
import { useContactStore } from '@/stores/contactStore';

export function UserSocketProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const { socket, isConnected } = useUserSocket();
  
  // Fonctions du store
  const setParticipantOnlineStatus = useChatStore((state) => state.setParticipantOnlineStatus);
  const isContact = useContactStore((state) => state.isContact);
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);
  
  
  // Mettre à jour le statut au montage/démontage
  useEffect(() => {
    if (session?.user?.id && socket && isConnected) {
      updateUserStatus(true);
      socket.updateUserStatus(true);
      
      return () => {
        updateUserStatus(false);
        socket.updateUserStatus(false);
      };
    }
  }, [session?.user?.id, socket, isConnected, updateUserStatus]);

  // Écouter les changements de statut
  useEffect(() => {
    if (!socket || !session?.user?.id) return;

    const handleUserStatusChange = (data: UserStatusChange) => {
      logger.debug('Changement de statut reçu:', data);
      
      // Toujours mettre à jour le statut si:
      // 1. C'est l'utilisateur actuel
      // 2. C'est un contact
      const shouldUpdate = 
        data.userId === session.user.id || 
        isContact(data.userId);
      
      if (shouldUpdate) {
        setParticipantOnlineStatus(data.userId, data.isOnline);
        
        // Si c'est l'utilisateur actuel
        if (data.userId === session.user.id) {
          updateUserStatus(data.isOnline);
        }
      }
    };
    
    const unsubscribe = socket.onUserStatusChange(handleUserStatusChange);
    
    return () => {
      unsubscribe();
    };
  }, [socket, session?.user?.id, isContact, setParticipantOnlineStatus, updateUserStatus]);

  // Gestion fermeture de fenêtre
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket && isConnected && session?.user?.id) {
        socket.updateUserStatus(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, isConnected, session?.user?.id]);

  return <>{children}</>;
}