import {
  handleUserStatusChange,
  handleUserProfileChange,
} from './user-event-handlers'

export interface UserStatusChangeData {
  userId: string
  isOnline: boolean
}

export const createUserEventRegistry = (currentUserId: string) => ({
  userStatusChange: (data: UserStatusChangeData) => handleUserStatusChange(data, currentUserId),
  userProfileChange: () => handleUserProfileChange(currentUserId),
})
