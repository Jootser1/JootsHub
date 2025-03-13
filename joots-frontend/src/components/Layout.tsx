"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setUser, logout } from "@/app/store/userSlice";
import axiosInstance from "@/app/api/axiosInstance";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function fetchUserData() {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await axiosInstance.get(`/users/${session.user.id}`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });

          dispatch(setUser({
            id: response.data.id,
            username: response.data.username, // Stocke bien le username
            email: response.data.email,
            accessToken: session.accessToken,
          }));

          // Stocke le token dans localStorage pour l'utiliser plus tard
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", session.accessToken);
          }
        } catch (error) {
          console.error("Erreur fetch utilisateur :", error);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        dispatch(logout());

        // Supprime le token à la déconnexion
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }

        setLoading(false);
      }
    }

    fetchUserData();
  }, [status, session, dispatch]);

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
                dispatch(logout());
                if (typeof window !== "undefined") {
                  localStorage.removeItem("accessToken");
                }
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
