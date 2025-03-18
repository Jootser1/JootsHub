"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function OnlineUsersList() {
  const user = useSelector((state: RootState) => state.user);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user?.accessToken || !SOCKET_SERVER_URL) return;

    // Créer une nouvelle connexion socket
    socketRef.current = io(SOCKET_SERVER_URL, {
      auth: { token: user.accessToken },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    // Gestionnaire d'erreurs
    socketRef.current.on("connect_error", (error) => {
      console.error("Erreur de connexion socket:", error);
    });

    // Gestionnaire de connexion réussie
    socketRef.current.on("connect", () => {
      console.log("Connecté au serveur socket");
    });

    // Écouteurs d'événements
    socketRef.current.on("users_list", setOnlineUsers);
    socketRef.current.on("user_connected", (newUser) => {
      setOnlineUsers(prev => [...new Set([...prev, newUser])]);
    });
    socketRef.current.on("user_disconnected", (disconnectedUser) => {
      setOnlineUsers(prev => prev.filter(u => u !== disconnectedUser));
    });

    // Nettoyage
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user?.accessToken]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Utilisateurs connectés</h2>
      {onlineUsers.length > 0 ? (
        <ul className="list-disc pl-5">
          {onlineUsers.map((u, index) => (
            <li key={index} className="py-1">{u}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur en ligne</p>
      )}
    </div>
  );
}