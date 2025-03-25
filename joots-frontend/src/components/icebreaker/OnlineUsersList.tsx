"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useStore } from "@/app/store/store";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function OnlineUsersList() {
  const user = useStore((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user?.accessToken || !SOCKET_SERVER_URL) {
      console.log('[Socket] Pas de token ou URL manquante');
      return;
    }

    console.log(`[Socket] Tentative de connexion pour l'utilisateur: ${user.username}`);
    setConnectionStatus('connecting');

    // Créer une nouvelle connexion socket
    socketRef.current = io(`${SOCKET_SERVER_URL}/users`, {
      auth: { token: user.accessToken },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      forceNew: true
    });

    // Gestionnaire d'erreurs
    socketRef.current.on("connect_error", (error) => {
      console.error("[Socket] Erreur de connexion:", error);
      setConnectionStatus('error');
    });

    // Gestionnaire de connexion réussie
    socketRef.current.on("connect", () => {
      console.log(`[Socket] Connecté avec succès pour l'utilisateur: ${user.username}`);
      setConnectionStatus('connected');
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log(`[Socket] Déconnecté: ${reason}`);
      setConnectionStatus('disconnected');
    });

    // Écouteurs d'événements
    socketRef.current.on("users_list", (users) => {
      console.log("[Socket] Liste des utilisateurs en ligne:", users);
      setOnlineUsers(users);
    });

    socketRef.current.on("user_connected", (newUser) => {
      console.log(`[Socket] Nouvel utilisateur connecté: ${newUser}`);
      setOnlineUsers(prev => [...new Set([...prev, newUser])]);
    });

    socketRef.current.on("user_disconnected", (disconnectedUser) => {
      console.log(`[Socket] Utilisateur déconnecté: ${disconnectedUser}`);
      setOnlineUsers(prev => prev.filter(u => u !== disconnectedUser));
    });

    // Nettoyage
    return () => {
      if (socketRef.current) {
        console.log(`[Socket] Déconnexion de l'utilisateur: ${user.username}`);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user?.accessToken, user?.username]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Utilisateurs connectés</h2>
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500' :
          connectionStatus === 'connecting' ? 'bg-yellow-500' :
          connectionStatus === 'error' ? 'bg-red-500' :
          'bg-gray-500'
        }`} />
      </div>
      {onlineUsers.length > 0 ? (
        <ul className="list-disc pl-5">
          {onlineUsers.map((u, index) => (
            <li key={index} className="py-1">{u}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur en ligne</p>
      )}
      {connectionStatus === 'error' && (
        <p className="text-red-400 mt-2">Erreur de connexion au serveur</p>
      )}
    </div>
  );
}