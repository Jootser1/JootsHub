"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import axiosInstance from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { Header } from "./Header"
import { BottomBar } from "./BottomBar"
import MobileMenu from "./mobile-menu"
import { logger } from '@/utils/logger';

export default function Layout({ 
  children,
  experience = "hub"
}: { 
  children: React.ReactNode
  experience?: "hub" | "icebreaker" | "socioscopy" | "revelio"
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, setUser, logout } = useUserStore();
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          logger.debug('fetchUserData session dans Layout:', session);
          const response = await axiosInstance.get(`/users/${session.user.id}`);
          logger.debug('fetchUserData response dans Layout:', response.data);
          
          setUser({
            id: response.data.id,
            username: response.data.username,
            avatar: response.data.avatar,
            bio: response.data.bio,
            isOnline: true,
            isAvailableForChat: response.data.isAvailableForChat,
          });

        } catch (error) {
          logger.error("Erreur fetch utilisateur dans Layout:", error);
          if ((error as any)?.response?.status === 401 || (error as any)?.response?.status === 403) {
            signOut({ redirect: true, callbackUrl: "/login" });
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [status, session?.user?.id, setUser, router]);

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