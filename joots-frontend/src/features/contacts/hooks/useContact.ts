import { useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useContactStore } from '@/features/contacts/stores/contactStore';
import axiosInstance from '@/app/api/axiosInstance';
import { logger } from '@/utils/logger';

interface ContactResponse {
  contact: {
    id: string;
    username: string;
    avatar: string | null;
    isOnline: boolean;
  };
}

export const useContact = () => {
  const { data: session } = useSession();
  const { addContact } = useContactStore();

  const loadContacts = useCallback(async () => {
    if (!session?.user?.id) {
      logger.warn('Impossible de charger les contacts: utilisateur non connecté');
      return;
    }

    try {
      logger.debug('Chargement des contacts...');
      const response = await axiosInstance.get('/users/contacts');
      const contacts = response.data;

      // Ajouter chaque contact au store avec un persist pour stocker dans local storage
      contacts.forEach((contact: ContactResponse) => {
        addContact(contact.contact.id);
      });

      logger.debug('Contacts chargés avec succès');
    } catch (error) {
      logger.error('Erreur lors du chargement des contacts:', error instanceof Error ? error : new Error(String(error)));
    }
  }, [session?.user?.id, addContact]);

  return {
    loadContacts
  };
};
