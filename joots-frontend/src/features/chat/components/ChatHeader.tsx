import { User } from '@/features/user/user.types'
import { useChatStore } from '@/features/chat/stores/chat-store'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { AnimatedLevelProgress } from '@/features/icebreakers/components/AnimatedProgressionBar'
import { ProgressionResult } from '@/features/chat/chat.types'
import { ConversationProfileModal } from '@/features/user/components/ConversationProfileModal'
import { useState } from 'react'
import Image from 'next/image'

interface ChatHeaderProps {
  otherUser: User
  isOnline: boolean
  isTyping?: boolean
  conversationId: string
  xpAndLevel?: ProgressionResult
}

export function ChatHeader({ otherUser, conversationId, xpAndLevel }: ChatHeaderProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  
  // Écoute réactive du statut 'isTyping' depuis le store
  const isTyping = useChatStore(state => {
    const conversation = state.conversations[conversationId]
    const participant = conversation?.participants.find(p => p.userId === otherUser.id)
    return participant?.isTyping || false
  })

  // Écoute réactive du statut 'isOnline' depuis un selector du contactStore
  const isOnline = useContactStore(state => state.isUserOnline(otherUser.id))

  const handleAvatarClick = () => {
    setIsProfileModalOpen(true)
  }

  return (
    <>
      <div className='flex items-center justify-between p-4 border-b border-gray-200'>
        <div className='flex items-center space-x-3'>
          <div className='relative cursor-pointer' onClick={handleAvatarClick}>
            {otherUser.avatar ? (
              <Image
                src={otherUser.avatar}
                alt={otherUser.username}
                width={40}
                height={40}
                className='rounded-full hover:ring-2 hover:ring-primary transition-all duration-200'
              />
            ) : (
              <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-primary transition-all duration-200'>
                <span className='text-gray-500 text-lg'>
                  {otherUser.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {isOnline && (
              <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
            )}
          </div>
          <div>
            <h2 className='text-lg font-semibold'>{otherUser.username}</h2>
            <p className='text-sm text-gray-500'>
              {isTyping ? "En train d'écrire..." : isOnline ? 'En ligne' : 'Hors ligne'}
            </p>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-end'>
          <AnimatedLevelProgress
            conversationId={conversationId}
            initialXpAndLevel={xpAndLevel}
          />
        </div>
      </div>

      <ConversationProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userId={otherUser.id}
        conversationId={conversationId}
      />
    </>
  )
}
