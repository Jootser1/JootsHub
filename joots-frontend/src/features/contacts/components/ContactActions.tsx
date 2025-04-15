// src/components/contacts/ContactActions.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { User } from '@/features/user/user.types';
import { UserPlus, UserMinus } from 'lucide-react';

interface ContactActionsProps {
  user: User;
}

export function ContactActions({ user }: ContactActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isContact = useChatStore((state) => state.isContact(user.id));
  const syncContact = useChatStore((state) => state.syncContact);
  
  const handleToggleContact = async () => {
    setIsProcessing(true);
    
    try {
      await syncContact(user.id, !isContact);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Button 
      variant={isContact ? "destructive" : "default"}
      size="sm"
      disabled={isProcessing}
      onClick={handleToggleContact}
    >
      {isContact ? (
        <>
          <UserMinus className="w-4 h-4 mr-2" />
          Retirer des contacts
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter aux contacts
        </>
      )}
    </Button>
  );
}