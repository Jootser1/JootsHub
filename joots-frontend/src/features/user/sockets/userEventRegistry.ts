import { handleUserStatusChange, handleUserProfileChange } from './userEventHandlers';

export const createUserEventRegistry = (currentUserId: string) => ({
  userStatusChange: (data: any) => handleUserStatusChange(data, currentUserId),
  userProfileChange: () => handleUserProfileChange(currentUserId),
});


