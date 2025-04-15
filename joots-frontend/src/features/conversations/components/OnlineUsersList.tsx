"use client";

import { useEffect, useState } from 'react';
import { useUserSocket } from '@/features/user/sockets/useUserSocket';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';

export const OnlineUsersList = () => {
  const { data: session } = useSession();
  const { service, isConnected } = useUserSocket();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!service?.getSocket() || !session?.user?.id) {
      logger.warn('[Socket] Pas de token ou URL manquante');
      return;
    }

    const socket = service.getSocket();
    if (!socket) return;
    
    const user = session.user;
    console.log("user dans online users list", user);
    logger.debug(`[Socket] Tentative de connexion pour l'utilisateur: ${user.email}`);

    socket.on('connect_error', (error) => {
      logger.error("[Socket] Erreur de connexion:", error);
    });

    socket.on('connect', () => {
      logger.info(`[Socket] Connecté avec succès pour l'utilisateur: ${user.email}`);
    });

    socket.on('disconnect', (reason) => {
      logger.info(`[Socket] Déconnecté: ${reason}`);
    });

    socket.on('online_users', (users: string[]) => {
      logger.debug("[Socket] Liste des utilisateurs en ligne:", users);
      setOnlineUsers(users);
    });

    socket.on('user_connected', (newUser: string) => {
      logger.info(`[Socket] Nouvel utilisateur connecté: ${newUser}`);
      setOnlineUsers(prev => [...prev, newUser]);
    });

    socket.on('user_disconnected', (disconnectedUser: string) => {
      logger.info(`[Socket] Utilisateur déconnecté: ${disconnectedUser}`);
      setOnlineUsers(prev => prev.filter(user => user !== disconnectedUser));
    });

    return () => {
      logger.debug(`[Socket] Déconnexion de l'utilisateur: ${user.email}`);
      socket.off('connect_error');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('online_users');
      socket.off('user_connected');
      socket.off('user_disconnected');
    };
  }, [service, session?.user?.id]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Utilisateurs en ligne</h2>
      <ul className="space-y-1">
        {onlineUsers.map((username) => (
          <li key={username} className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {username}
          </li>
        ))}
      </ul>
    </div>
  );
};