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
  name: string;
  avatar: string | null;
  isOnline: boolean;
  bio?: string | null;
  isAvailableForChat: boolean;
}
