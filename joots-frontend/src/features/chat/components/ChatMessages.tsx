import { useEffect, useRef } from 'react';
import { Message } from '@/features/chat/chat.types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ensureDate } from '@/utils/dateUtils';
import { useUserStore } from '@/features/user/stores/userStore';
import { useConversationMessages } from '@/features/chat/hooks/useConversationMessages';
import { useChatStore } from '@/features/chat/stores/chatStore';
interface ChatMessagesProps {
  messages: Message[];
  conversationId?: string;
}

export const ChatMessages = ({ messages: propMessages, conversationId }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  
  // N'utiliser qu'une seule source de messages
  const storeMessages = useChatStore.getState().getMessagesFromConversation(conversationId || '');
  // Si les messages du store sont disponibles, les utiliser, sinon utiliser les props
  const displayMessages = storeMessages.length > 0 ? storeMessages : propMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  if (!user?.id) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Déconnecté
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {displayMessages.map((message: Message, index: number) => {
        const isCurrentUser = message.senderId === user.id;
        const timeAgo = formatDistanceToNow(ensureDate(message.createdAt), { addSuffix: true, locale: fr });

        return (
          <div
            key={`${message.id}-${index}`}
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