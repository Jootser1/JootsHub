import {
  handleUserStatusChange,
  handleUserProfileChange,
} from './user-event-handlers'
import { UserStatusChangeData } from '@shared/user.types'


export const createUserEventRegistry = (currentUserId: string) => ({
  userStatusChange: (data: UserStatusChangeData) => handleUserStatusChange(data, currentUserId),
  userProfileChange: () => handleUserProfileChange(currentUserId),
})
