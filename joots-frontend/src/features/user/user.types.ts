export interface User {
  id: string
  username: string
  avatar: string | null
  bio?: string
  isOnline: boolean
  isAvailableForChat: boolean
}
