import { useState, useEffect } from 'react';
import axiosInstance from '../app/api/axiosInstance';
import { Conversation } from '@/components/icebreaker/types';

export const useConversation = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/conversations');
      console.log('Conversations fetched:', response.data);
      setConversations(response.data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to fetch conversations'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateOnlineStatus = async (userId: string, isOnline: boolean) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.initiator.id === userId) {
          return {
            ...conv,
            initiator: { ...conv.initiator, isOnline }
          };
        }
        if (conv.receiver.id === userId) {
          return {
            ...conv,
            receiver: { ...conv.receiver, isOnline }
          };
        }
        return conv;
      })
    );

    try {
      await axiosInstance.post('/conversations/online-status', {
        userId,
        isOnline
      });
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  };

  const createConversation = async (receiverId: string) => {
    try {
      console.log('Creating new conversation with:', receiverId);
      const response = await axiosInstance.post('/conversations', {
        receiverId
      });
      console.log('New conversation created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  };

  const findConversation = async (receiverId: string) => {
    try {
      console.log('Finding conversation with:', receiverId);
      const response = await axiosInstance.get(`/conversations/find/${receiverId}`);
      console.log('Conversation found:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error finding conversation:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    isLoading,
    error,
    fetchConversations,
    updateOnlineStatus,
    createConversation,
    findConversation
  };
};