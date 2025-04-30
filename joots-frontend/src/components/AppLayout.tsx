"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/features/user/stores/userStore";
import { useRouter } from "next/navigation";
import { Header } from "./Header"
import { BottomBar } from "./BottomBar"
import MobileMenu from "./mobile-menu"
import { logger } from '@/utils/logger';
import { GlobalUserSocketProvider } from "@/features/user/sockets/GlobalUserSocketProvider";



export default function AppLayout({ 
  children,
}: { 
  children: React.ReactNode
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }, [status, session?.user?.id, router]);

  return (
    <GlobalUserSocketProvider>
    <div className="h-screen flex flex-col">
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
      <div className="flex-shrink-0">
        <BottomBar />
      </div>
      <MobileMenu />
    </div>
    </GlobalUserSocketProvider>
  );
}