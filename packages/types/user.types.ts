export interface User {
  user_id: string;
  username: string;
  avatar: string | null;
  last_seen: Date;
  isOnline?: boolean;
  isAvailableForChat?: boolean;
}

export interface UserContact {
  user_id: string;
  username: string;
  avatar: string | null;
}

export type UserWithAuth = {
  user_id: string;
  username: string;
  user_number: number;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  last_seen: Date;  
  role: string;
  // Auth relation
  auth: {
    auth_id: string;
    email: string;
    password: string;
    access_token: string | null;
    refresh_token: string | null;
    created_at: Date;
    updated_at: Date;
    user_id: string;
  } | null;
};


export interface FilteredUserProfile {
  user: {
    user_id: string
    username: string
    avatar: string | null
    last_seen: Date
  }
  revealedAttributes: Record<string, string | string[]>
  conversationLevel: number
  photoRevealPercent: number | null
  totalAttributes: number
  revealedCount: number
}