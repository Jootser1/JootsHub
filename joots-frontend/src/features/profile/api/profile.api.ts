import axios from 'axios';
import { Profile, ProfileUpdateInput } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const profileApi = {
  getProfile: async (userId: string): Promise<Profile> => {
    const response = await axios.get(`${API_URL}/users/${userId}/profile`);
    return response.data;
  },

  updateProfile: async (userId: string, data: ProfileUpdateInput): Promise<Profile> => {
    const response = await axios.patch(`${API_URL}/users/${userId}/profile`, data);
    return response.data;
  },

  uploadAvatar: async (userId: string, file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axios.post(`${API_URL}/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 