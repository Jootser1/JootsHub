import React, { useState, useRef, useEffect } from 'react';
import { IcebreakerResponse, Message } from '@/types/chat';
import { IcebreakerModal } from './IcebreakerModal';

interface ChatInputProps {
  conversationId: string;
  currentUserId: string;
  isConnected: boolean;
  isIcebreakerReady: boolean;
  currentQuestion?: string;
  onSendMessage: (conversationId: string, content: string) => void;
  onTypingStatus: (isTyping: boolean) => void;
  onIcebreakerReady: () => void;
  onIcebreakerResponse: (response: IcebreakerResponse) => void;
}

export const ChatInput = ({ conversationId, currentUserId, isConnected, isIcebreakerReady, currentQuestion, onSendMessage, onTypingStatus, onIcebreakerReady, onIcebreakerResponse }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showIcebreakerModal, setShowIcebreakerModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Gérer l'état de frappe
  useEffect(() => {
    if (isTyping) {
      onTypingStatus(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTypingStatus(false);
      }, 2000);
    }
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, onTypingStatus]);

  // Ajuster automatiquement la hauteur du textarea
  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (!isTyping && newMessage.length > 0) {
      setIsTyping(true);
    } else if (isTyping && newMessage.length === 0) {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !isConnected) return;

    onSendMessage(conversationId, message.trim());
    setMessage('');
  };

  const handleIcebreakerClick = () => {
    onIcebreakerReady();
    setShowIcebreakerModal(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />
        <button
          type="submit"
          disabled={!message.trim() || !isConnected}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Envoyer
        </button>
      </div>

      {/* Bouton Icebreaker */}
      <button
        onClick={handleIcebreakerClick}
        className={`p-2 rounded-full transition-colors ${
          isIcebreakerReady
            ? 'bg-[#3CBF77] text-white'
            : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
        }`}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Modal Icebreaker */}
      <IcebreakerModal
        isOpen={showIcebreakerModal}
        question={currentQuestion || ''}
        onClose={() => setShowIcebreakerModal(false)}
        onResponse={onIcebreakerResponse}
      />
    </form>
  );
}; 