import { IcebreakerLogo } from "./icebreaker-logo"
import { Button } from "./ui/button"
import Image from 'next/image';
import { ChatSocketService } from "@/features/chat/sockets/chatSocketService";
import { useChatStore } from '@/features/chat/stores/chatStore'
import { useCallback, useEffect } from "react";
import { useChatSocketStore } from "@/features/chat/stores/chatSocketStore";
type Experience = "hub" | "icebreaker" | "socioscopy" | "revelio"

interface ExperienceLogoProps {
  experience: Experience
  size?: number
}

export function ExperienceLogo({ experience, size = 48 }: ExperienceLogoProps) {
  const handleClick = useCallback(() => {
    if (experience !== "icebreaker") return;

    const conversationId = useChatSocketStore.getState().getActiveConversation();
    console.log("conversationId", conversationId);    
    if (conversationId) {
      useChatSocketStore.getState().sendIcebreakerReady(conversationId, true);
    }
  }, [experience]);


  switch (experience) {
    case "hub":
      return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <button className="w-18 h-18 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-300 hover:shadow-xl transition duration-300">
          <Image 
            src="/joots_logo.png"
            alt="Icebreaker"
            width={45}
            height={45}
            className="align-center content-center absolute bottom-3"
          />
        </button>
      </div>
      )
    case "icebreaker":
      return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <button onClick={handleClick} className="w-18 h-18 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-300 hover:shadow-xl transition duration-300">
          <Image 
            src="/icebreaker_oo.png"
            alt="Icebreaker"
            width={45}
            height={45}
            className="align-center content-center absolute bottom-3"
          />
        </button>
      </div>
      )
    case "socioscopy":
      // À implémenter quand nécessaire
      return null
    case "revelio":
      // À implémenter quand nécessaire
      return null
    default:
      return null
  }
} 


