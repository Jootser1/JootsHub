import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profile.api';
import { ProfileUpdateInput } from '../types';

export const useProfile = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileApi.getProfile(userId),
  });

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: (data: ProfileUpdateInput) => profileApi.updateProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  const { mutate: uploadAvatar, isLoading: isUploading } = useMutation({
    mutationFn: (file: File) => profileApi.uploadAvatar(userId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    isUpdating,
    uploadAvatar,
    isUploading,
  };
}; 