import React, { useState, useRef, useEffect } from 'react';
import { useUserStore } from '@/features/user/stores/userStore';
import { useSocketManager } from '@/hooks/useSocketManager';
interface ChatInputProps {
  conversationId: string;
}

export const ChatInput = ({ conversationId}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [sendAttempted, setSendAttempted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useUserStore();
  const { isChatConnected, sendChatMessage, sendTypingStatus } = useSocketManager();
  

  

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    // Gérer le statut de frappe
    if (!isTyping) {
      setIsTyping(true);
      sendTypingStatus(conversationId, true);
    }

    // Réinitialiser le timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Définir un nouveau timeout pour arrêter le statut de frappe après 3 secondes d'inactivité
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingStatus(conversationId, false);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (!isChatConnected) {
      setSendAttempted(true);
      setTimeout(() => setSendAttempted(false), 3000);
      return;
    }

    if (user?.id) {
      try {
        const sendResult = sendChatMessage(conversationId, message.trim(), user.id);
        
        // Si le résultat est une promesse (cas de reconnexion)
        if (sendResult instanceof Promise) {
          sendResult.then(success => {
            if (success) {
              setMessage('');
              setSendAttempted(false);
            } else {
              setSendAttempted(true);
              setTimeout(() => setSendAttempted(false), 3000);
            }
          }).catch(() => {
            setSendAttempted(true);
            setTimeout(() => setSendAttempted(false), 3000);
          });
        } else if (sendResult) {
          // Cas synchrone réussi
          setMessage('');
          setSendAttempted(false);
        } else {
          // Cas synchrone échoué
          setSendAttempted(true);
          setTimeout(() => setSendAttempted(false), 3000);
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        setSendAttempted(true);
        setTimeout(() => setSendAttempted(false), 3000);
      }
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      {sendAttempted && !isChatConnected && (
        <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-sm">
          Impossible d&apos;envoyer le message : connexion au chat non établie. Veuillez réessayer dans quelques instants.
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder={isChatConnected ? "Écrivez votre message..." : "Reconnexion en cours..."}
            className={`w-full rounded-lg border ${!isChatConnected ? 'border-orange-300 bg-orange-50' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {!isChatConnected && (
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
              <span className="animate-pulse h-2 w-2 bg-orange-500 rounded-full mr-1"></span>
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={!message.trim() || !isChatConnected}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Envoyer
        </button>
      </div>

    </form>
  );
}; 