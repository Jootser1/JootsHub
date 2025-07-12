export interface Profile {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  isOnline: boolean;
  isAvailableForChat: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileUpdateInput {
  username?: string;
  avatar?: string;
  bio?: string;
  isAvailableForChat?: boolean;
} 