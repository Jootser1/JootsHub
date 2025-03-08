"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import Link from "next/link";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("Utilisateur");

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`, {
        headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
        .then((res) => res.json())
        .then((data) => {
          if (data.pseudo) {
            setUsername(data.pseudo);
          }
        })
        .catch((err) => console.error("Erreur lors du chargement du pseudo :", err));
    }
  }, [session?.user?.id, session?.accessToken]);


  return (
    <div className="flex flex-col h-screen">
      {/* Barre de navigation */}
      <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">JOOTS</h1>
        {status === "authenticated" ? (
          <div className="flex items-center space-x-4">
            <span>Bienvenue {username} 👋</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-white text-purple-600 px-3 py-1 rounded">
              Connexion
            </button>
          </Link>
        )}
      </nav>

      {/* Contenu de la page */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
