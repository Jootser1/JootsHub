"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";
import axiosInstance from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, setUser, logout } = useStore();
  const [loading, setLoading] = useState(true);

  useSocket();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    
    async function fetchUserData() {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await axiosInstance.get(`/users/${session.user.id}`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });

          setUser({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            accessToken: session.accessToken,
            refreshToken: response.data.refresh_token,
          });

        } catch (error) {
          console.error("Erreur fetch utilisateur :", error);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        logout();
        setLoading(false);
      }
    }

    fetchUserData();
  }, [status, session, setUser, logout]);

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">JOOTS</h1>
        {loading ? (
          <span>Chargement...</span>
        ) : user.id ? (
          <div className="flex items-center space-x-4">
            <span>Bienvenue, {user.username} 👋</span>
            <button
              onClick={() => {
                logout();
                signOut();
              }}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <a href="/login" className="bg-white text-purple-600 px-3 py-1 rounded">
            Connexion
          </a>
        )}
      </nav>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
