// src/components/contacts/ContactActions.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { User } from '@/features/user/user.types'
import { UserPlus, UserMinus } from 'lucide-react'
import { useContactStore } from '../stores/contact-store'

interface ContactActionsProps {
  user: User
}

export function ContactActions({ user }: ContactActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const isContact = useContactStore(state => state.isContact(user.id))
  const addContact = useContactStore(state => state.addContact)
  const removeContact = useContactStore(state => state.removeContact)

  const handleToggleContact = async () => {
    setIsProcessing(true)

    try {
      if (isContact) {
        await removeContact(user.id)
      } else {
        await addContact(user.id)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      variant={isContact ? 'destructive' : 'default'}
      size='sm'
      disabled={isProcessing}
      onClick={handleToggleContact}
    >
      {isContact ? (
        <>
          <UserMinus className='w-4 h-4 mr-2' />
          Retirer des contacts
        </>
      ) : (
        <>
          <UserPlus className='w-4 h-4 mr-2' />
          Ajouter aux contacts
        </>
      )}
    </Button>
  )
}
