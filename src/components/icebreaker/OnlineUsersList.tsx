"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function OnlineUsersList() {
  const user = useSelector((state: RootState) => state.user);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.accessToken) return;

    const socket = io(SOCKET_SERVER_URL, {
      auth: { token: user.accessToken },
      transports: ['websocket']
    });

    socket.on("connect_error", (error) => {
      console.error("Erreur de connexion socket:", error);
    });

    socket.on("users_list", setOnlineUsers);
    socket.on("user_connected", (newUser) => {
      setOnlineUsers(prev => [...new Set([...prev, newUser])]);
    });
    socket.on("user_disconnected", (disconnectedUser) => {
      setOnlineUsers(prev => prev.filter(u => u !== disconnectedUser));
    });

    return () => {
      socket.disconnect();
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