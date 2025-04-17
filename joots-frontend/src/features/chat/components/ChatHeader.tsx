import { User } from '@/features/user/user.types';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { useEffect, useState, useMemo } from 'react';
import { useContactStore } from '@/features/contacts/stores/contactStore';

interface ChatHeaderProps {
  otherUser: User;
  isOnline: boolean;
  isTyping?: boolean;
  conversationId: string;
}

export const ChatHeader = ({ otherUser, isOnline: initialIsOnline, conversationId }: ChatHeaderProps) => {
  // Écoute réactive du statut "isTyping" depuis le store
  const isTyping = useChatStore((state) => {
    console.log('[ChatHeader] state:', state);
    const conversation = state.conversations[conversationId];
    console.log('[ChatHeader] conversation:', conversation);
    const participant = conversation?.participants.find(p => p.userId === otherUser.id);
    console.log('[ChatHeader] isTyping update:', participant?.isTyping);
    return participant?.isTyping || false;
  });

  // Écoute réactive du statut "isOnline" depuis un selector du contactStore
  const isOnline = useContactStore((state) => state.isUserOnline(otherUser.id));


  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {otherUser.avatar ? (
            <img
              src={otherUser.avatar}
              alt={otherUser.username}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">
                {otherUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{otherUser.username}</h2>
          <p className="text-sm text-gray-500">
            {isTyping ? 'En train d\'écrire...' : (
              isOnline ? 'En ligne' : 'Hors ligne'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}; 