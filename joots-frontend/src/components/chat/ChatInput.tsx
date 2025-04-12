import React, { useState, useRef, useEffect } from 'react';
import { IcebreakerResponse, Message } from '@/types/chat';
import { IcebreakerModal } from './IcebreakerModal';
import { useUserStore } from '@/stores/userStore';
import { useChatSocketContext } from '@/app/sockets/chat/ChatSocketProvider';
interface ChatInputProps {
  conversationId: string;
  currentUserId: string;
  isIcebreakerReady: boolean;
  currentQuestion?: string;
  onIcebreakerReady: () => void;
  onIcebreakerResponse: (response: IcebreakerResponse) => void;
}

export const ChatInput = ({ conversationId, currentUserId, isIcebreakerReady, currentQuestion, onIcebreakerReady, onIcebreakerResponse }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showIcebreakerModal, setShowIcebreakerModal] = useState(false);
  const [sendAttempted, setSendAttempted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUserStore();
  const { isConnected, socketService } = useChatSocketContext();
  

  

  // Ajuster automatiquement la hauteur du textarea
  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
    }
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (!isConnected) {
      setSendAttempted(true);
      setTimeout(() => setSendAttempted(false), 3000);
      return;
    }

    if (socketService && user?.id) {
      socketService.sendMessage(message.trim(), conversationId, user.id);
    }
    setMessage('');
    setSendAttempted(false);
  };

  const handleIcebreakerClick = () => {
    onIcebreakerReady();
    setShowIcebreakerModal(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      {sendAttempted && !isConnected && (
        <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-sm">
          Impossible d'envoyer le message : connexion au chat non établie. Veuillez réessayer dans quelques instants.
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isConnected ? "Écrivez votre message..." : "Reconnexion en cours..."}
            className={`w-full rounded-lg border ${!isConnected ? 'border-orange-300 bg-orange-50' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {!isConnected && (
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
              <span className="animate-pulse h-2 w-2 bg-orange-500 rounded-full mr-1"></span>
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={!message.trim() || !isConnected}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Envoyer
        </button>
      </div>

    </form>
  );
}; 