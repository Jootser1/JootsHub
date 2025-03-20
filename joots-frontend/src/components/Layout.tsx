"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";
import axiosInstance from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { JootsLogo } from "@/components/joots-logo"
import Link from "next/link"
import Image from "next/image"


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
  }, [status, session, setUser, logout, router]);

  return (
    <div className="flex flex-col h-screen">

    <header className="p-4 flex items-center justify-between border-b">
        <JootsLogo className="w-24 h-auto" />
        <Link href="/profile">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src={user.avatar || "/placeholder.svg"} 
                alt={user.username}
                width={32}
                height={32}
              />
            </div>
            <span className="font-medium">{user.username}</span>
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
        </Link>
      </header>
      <main className="flex min-h-screen flex-col">{children}</main>
    </div>
  );
}
