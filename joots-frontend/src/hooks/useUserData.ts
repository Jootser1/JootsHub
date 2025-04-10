import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/userStore";
import axiosInstance from "@/app/api/axiosInstance";
import { signOut } from "next-auth/react";
import { logger } from "@/utils/logger";


export const useUserData = () => {
    const { data: session, status } = useSession();
    const setUser = useUserStore(state => state.setUser);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserData = async () => {
        if (status === "authenticated" && session?.user?.id) {
          try {
            const response = await axiosInstance.get(`/users/${session.user.id}`);
            setUser({
              id: response.data.id,
              username: response.data.username,
              avatar: response.data.avatar,
              bio: response.data.bio,
              isOnline: true,
              isAvailableForChat: response.data.isAvailableForChat,
            });
          } catch (error) {
            logger.error("Erreur fetch utilisateur:", error);
            if ((error as any)?.response?.status === 401 || (error as any)?.response?.status === 403) {
              signOut({ redirect: true, callbackUrl: "/login" });
            }
          } finally {
            setIsLoading(false);
          }
        }
      };
  
      fetchUserData();
    }, [session?.user?.id, status, setUser]);
  
    return { isLoading };
  };