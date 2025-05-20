export interface User {
  id: string;
  username: string;
  avatar: string | null;
  bio?: string | null;
  isOnline: boolean;
  isAvailableForChat: boolean;
} 

export interface UserContact {
  id: string;
  username: string;
  avatar: string | null;
  bio?: string | null;
  isOnline: boolean; 
  isAvailableForChat: boolean;
}
