import { IcebreakerLogo } from "./icebreaker-logo"
import { Button } from "./ui/button"
import Image from 'next/image';
import { ChatSocketService } from "@/features/chat/sockets/chatSocketService";
import { useUserStore } from "@/features/user/stores/userStore";
import { useChatStore } from '@/features/chat/stores/chatStore'
import { useCallback, useEffect } from "react";
import { useChatSocketStore } from "@/features/chat/stores/chatSocketStore";
type Experience = "hub" | "icebreaker" | "socioscopy" | "revelio"


interface ExperienceLogoProps {
  experience: Experience
  size?: number
}

export function ExperienceLogo({ experience, size = 48 }: ExperienceLogoProps) {
  const { getParticipant, getOtherParticipant, activeConversationId } = useChatStore();
  const user = useUserStore((state) => state.user);

  if (!user) return null;
  if (!activeConversationId) return null;

  const currentUser = getParticipant(activeConversationId, user.id);
  const otherParticipant = getOtherParticipant(activeConversationId, user.id);

  const isCurrentUserReady = currentUser?.isIcebreakerReady;
  const isOtherParticipantReady = otherParticipant?.isIcebreakerReady;

  let imageSrc = '/icebreaker_oo.png';
  if (isCurrentUserReady && isOtherParticipantReady) {
    imageSrc = '/icebreaker_gg.png';
  } else if (isCurrentUserReady) {
    imageSrc = '/icebreaker_go.png';
  } else if (isOtherParticipantReady) {
    imageSrc = '/icebreaker_og.png';
  }

  const handleClick = useCallback(() => {
    if (experience !== "icebreaker") return;

    console.log("conversationId", activeConversationId);    
    if (activeConversationId) {
      useChatSocketStore.getState().sendIcebreakerReady(activeConversationId, true);
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
            src={imageSrc}
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


