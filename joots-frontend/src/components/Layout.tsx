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
      <div className="flex-1 overflow-y-auto pb-16">
        <main className="flex flex-col">{children}</main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <BottomBar experience={experience} />
      </div>
      <MobileMenu />
    </div>
  );
}