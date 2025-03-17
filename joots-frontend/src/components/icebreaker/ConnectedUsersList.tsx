"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL

export default function ConnectedUsersList() {
  const user = useSelector((state: RootState) => state.user);
  console.log("user dans connected users list", user);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const socket = io(SOCKET_SERVER_URL, {
      auth: { token: user.accessToken },
    });

    socket.on("users_connected", (userList: string[]) => {
      console.log("userList dans connected users list", userList);
        setUsers(userList);
    });

    socket.on("user_connected", (newUser: string) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    socket.on("user_disconnected", (disconnectedUser: string) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== disconnectedUser));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Utilisateurs connectés</h2>
      {users.length > 0 ? (
        <ul className="list-disc pl-5">
          {users.map((u, index) => (
            <li key={index} className="py-1">{u}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur en ligne</p>
      )}
    </div>
  );
}
