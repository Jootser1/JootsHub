export interface User {
  id: string
  username: string
  avatar: string | null
  bio?: string
  isOnline: boolean
  isAvailableForChat: boolean
}

export interface FilteredUserProfile {
  user: {
    id: string
    username: string
    avatar: string | null
    isOnline: boolean
    createdAt: string
  }
  revealedAttributes: Record<string, string | string[]>
  conversationLevel: number
  photoRevealPercent: number | null
  totalAttributes: number
  revealedCount: number
}
