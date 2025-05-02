import React, { useCallback, useEffect } from 'react';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { useUserStore } from '@/features/user/stores/userStore';
import { Conversation } from '@/features/conversations/conversation.types';
import { useChatSocketStore } from '@/features/chat/stores/chatSocketStore';


interface IcebreakerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IcebreakerModal: React.FC<IcebreakerModalProps> = ({ isOpen, onClose }) => {
  const { activeConversationId, getParticipant, getOtherParticipant, conversations } = useChatStore();
  const user = useUserStore((state: any) => state.user);
  
  const handleClick = useCallback(() => {
    const conversationId = useChatSocketStore.getState().getActiveConversation();
    if (conversationId) {
      useChatSocketStore.getState().sendIcebreakerReady(conversationId, false);
    }
  },[]);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen || !activeConversationId || !user || !user.id) return null;
  
  const conversation: Conversation = conversations[activeConversationId];
  const currentUser = getParticipant(activeConversationId, user.id);
  const otherParticipant = getOtherParticipant(activeConversationId, user.id);
  
  const isCurrentUserReady = currentUser?.isIcebreakerReady;
  const isOtherParticipantReady = otherParticipant?.isIcebreakerReady;
  
  if (!isCurrentUserReady || !isOtherParticipantReady) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
    <div className="bg-white w-full max-w-md mt-10 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Icebreaker Modal</h2>
    <p>Contenu de la modale à définir plus tard.</p>
    <button onClick={() => {
      handleClick();
      onClose();
    }} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
    Fermer
    </button>
    </div>
    </div>
  );
};

export default IcebreakerModal; 