'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/app/sockets/useSocket';
import { useUserStore } from '@/stores/userStore';
import { useContactStore } from '@/stores/contactStore';
import axiosInstance from '@/app/api/axiosInstance';
import { logger } from '@/utils/logger';
import { UserSocketService } from './userSocketService';

interface GlobalUserSocketContextType {
  socketService: UserSocketService | null;
  isConnected: boolean;
  isLoading: boolean;
}

export const GlobalUserSocketContext = createContext<GlobalUserSocketContextType | null>(null);

export const GlobalUserSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, updateUserStatus, syncUserStatus } = useUserStore();
  const { socket, isConnected } = useSocket('users');
  const [eventsRegistered, setEventsRegistered] = useState(false);
  const socketService = UserSocketService.getInstance();

  useEffect(() => {
    const setupSocket = async () => {
      if (status !== 'authenticated' || !isConnected || !session?.user?.id || !session?.accessToken) return;
      
      try {
        // Récupération des données utilisateur si nécessaire
        if (!user) {
          const response = await axiosInstance.get(`/users/${session.user.id}`);
          const userData = {
            id: response.data.id,
            username: response.data.username,
            avatar: response.data.avatar,
            bio: response.data.bio,
            isOnline: true,
            isAvailableForChat: response.data.isAvailableForChat,
          };
          setUser(userData);     
        }
        
        // Configuration du socket
        socketService.connect(session.user.id, session.accessToken);
        socketService.registerEvents();
        setEventsRegistered(true);
        
        const contactsResponse = await axiosInstance.get('/users/me/contacts');
        const contactIds = contactsResponse.data.map((contact: any) => contact.contact.id);
        
        if (socketService.isConnected()) {
          socketService.joinContactsRooms(contactIds);
          logger.info('Rooms des contacts rejointes:', contactIds.length);
          socketService.updateUserStatus(session.user.id, true);
          logger.info('Statut utilisateur mis à jour dans redis via socket');
        }
        
        setIsLoading(false);
      } catch (error) {
        logger.error("Erreur lors de la configuration du socket:", error);
        setIsLoading(false);
      }
    };

    setupSocket();

    return () => {
      if (eventsRegistered) {
        const contactIds = useContactStore.getState().contactList;
        if (contactIds && contactIds.size > 0) {
          socketService.leaveContactsRooms([...contactIds]);
        }
        if (user?.id) {
          socketService.updateUserStatus(user.id, false);
          logger.info('Nettoyage socket effectué, utilisateur marqué hors ligne');
        }
        socketService.unregisterEvents();
        setEventsRegistered(false);
      }
    };
  }, [session?.user?.id, session?.accessToken, isConnected, status]);

  return (
    <GlobalUserSocketContext.Provider value={{ socketService, isConnected, isLoading }}>
      {children}
    </GlobalUserSocketContext.Provider>
  );
};

export const useGlobalUserSocketContext = () => {
  const context = useContext(GlobalUserSocketContext);
  if (!context) {
    throw new Error('useGlobalUserSocketContext must be used within a GlobalUserSocketProvider');
  }
  return context;
}; 