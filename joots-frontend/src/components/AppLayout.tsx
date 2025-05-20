"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomBar } from "./BottomBar"
import MobileMenu from "./mobile-menu"
import { GlobalUserSocketProvider } from "@/features/user/sockets/GlobalUserSocketProvider";
import { ChatSocketProvider } from "@/features/chat/sockets/ChatSocketProvider";


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
      <ChatSocketProvider>
        <div className="h-screen flex flex-col">
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
          <div className="flex-shrink-0">
            <BottomBar />
          </div>
          <MobileMenu />
        </div>
      </ChatSocketProvider>
    </GlobalUserSocketProvider>
  );
}