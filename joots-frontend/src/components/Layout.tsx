"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";
import axiosInstance from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
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
  const socket = useSocket();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    
    async function fetchUserData() {
      if (status === "authenticated" && session?.user?.id) {
        try {
          console.log('fetchUserData session:', session);
          const response = await axiosInstance.get(`/users/${session.user.id}`);
          console.log('fetchUserData response:', response.data);
          
          setUser({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            avatar: response.data.avatar,
            isOnline: true,
            isAvailableForChat: response.data.isAvailableForChat,
          });

        } catch (error) {
          console.error("Erreur fetch utilisateur :", error);
          if ((error as any)?.response?.status === 401 || (error as any)?.response?.status === 403) {
            signOut({ redirect: true, callbackUrl: "/login" });
          }
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomBar experience={experience} />
      <MobileMenu />
    </div>
  );
}