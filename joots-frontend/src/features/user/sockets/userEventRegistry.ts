import { handleUserStatusChange, handleUserProfileChange } from './userEventHandlers';

export interface UserStatusChangeData {
  userId: string;
  isOnline: boolean;
}

export const createUserEventRegistry = (currentUserId: string) => ({
  userStatusChange: (data: UserStatusChangeData) => handleUserStatusChange(data, currentUserId),
  userProfileChange: () => handleUserProfileChange(currentUserId),
});


