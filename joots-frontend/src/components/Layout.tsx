"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";
import axiosInstance from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { Header } from "./Header"
import { BottomBar } from "./BottomBar"
import MobileMenu from "./mobile-menu"

export default function Layout({ 
  children,
  experience = "hub"
}: { 
  children: React.ReactNode
  experience?: "hub" | "icebreaker" | "socioscopy" | "revelio"
}) {
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
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomBar experience={experience} />
      <MobileMenu />
    </div>
  );
}
