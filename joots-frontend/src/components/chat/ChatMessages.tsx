import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ensureDate } from '@/utils/dateUtils';

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  isConnected: boolean;
}

export const ChatMessages = ({ messages, currentUserId, isConnected }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Déconnecté
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUserId;
        const timeAgo = formatDistanceToNow(ensureDate(message.timestamp), { addSuffix: true, locale: fr });

        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isCurrentUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {timeAgo}
              </span>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}; 