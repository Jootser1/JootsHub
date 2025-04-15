"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/features/user/stores/userStore";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  
    
  }, [status, session?.user?.id, router]);


  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomBar experience={experience} />
      <MobileMenu />
    </div>
  );
}