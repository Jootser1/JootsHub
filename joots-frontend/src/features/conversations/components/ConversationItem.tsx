import Link from 'next/link'
import Image from 'next/image'
import { Conversation } from '@shared/conversation.types'
import { ConversationStatus } from '@/features/conversations/components/ConversationStatus'
import { formatDistanceToNow } from 'date-fns'
import { getDateFnsLocale } from '@/utils/date-locale'
import { getOtherParticipantUser } from '@/features/conversations/utils/conversation-utils'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { useUserStore } from '@/features/user/stores/user-store'
import { ensureDate } from '@/utils/date-utils'
import { logger } from '@/utils/logger'
import { useLocalizedPath } from '@/hooks/useTranslations'
import { useTranslations } from '@/contexts/TranslationContext'

interface ConversationItemProps {
  conversation: Conversation
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  logger.debug('ConversationItem - Received conversation', { conversation })
  
  const currentUserId = useUserStore(state => state.user?.user_id)
  logger.debug('ConversationItem - Current user ID', { currentUserId })
  
  const contactStore = useContactStore()
  const getLocalizedPath = useLocalizedPath()
  const { locale } = useTranslations()

  // Déterminer l'autre utilisateur (celui avec qui on parle)
  if (!currentUserId) {
    logger.warn('ConversationItem - No current user ID, returning null')
    return null
  }
  
  const otherUser = getOtherParticipantUser(conversation as Parameters<typeof getOtherParticipantUser>[0], currentUserId)
  logger.debug('ConversationItem - Other user', { otherUser })
  
  if (!otherUser) {
    logger.warn('ConversationItem - No other user found, returning null')
    return null
  }

  // Récupérer le dernier message s'il existe
  const lastMessage = conversation.messages?.[0]
  logger.debug('ConversationItem - Last message', { lastMessage })

  // Récupérer le statut en ligne depuis le contactStore
  const isOnline = useContactStore(state => state.isUserOnline(otherUser.user_id))
  logger.debug('ConversationItem - Is online', { isOnline })

  return (
    <Link
      href={getLocalizedPath(`/conversations/${conversation.conversation_id}`)}
      className='block hover:bg-gray-50 transition-colors'
    >
      <div className='flex items-center p-4'>
        <div className='relative'>
          {/* Avatar */}
          <div className='w-12 h-12 rounded-lg bg-gray-200 overflow-hidden'>
            {otherUser.avatar ? (
              <Image
                src={otherUser.avatar}
                alt={otherUser.username}
                width={48}
                height={48}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-[#E59C45] text-white text-lg'>
                {otherUser.username && otherUser.username[0]
                  ? otherUser.username[0].toUpperCase()
                  : '?'}
              </div>
            )}
          </div>
          {/* Indicateur de statut en ligne */}
          <ConversationStatus
            is_online={isOnline}
            className='absolute -bottom-1 -right-1 border-2 border-white'
          />
        </div>

        <div className='ml-4 flex-1 min-w-0'>
          <div className='flex justify-between items-start'>
            <h3 className='font-medium truncate'>{otherUser.username}</h3>
            {lastMessage && (
              <span className='text-xs text-gray-500 whitespace-nowrap ml-2'>
                {formatDistanceToNow(ensureDate(lastMessage.created_at), {
                  addSuffix: true,
                  locale: getDateFnsLocale(locale),
                })}
              </span>
            )}
          </div>
          {lastMessage && <p className='text-sm text-gray-500 truncate'>{lastMessage.content}</p>}
        </div>
      </div>
    </Link>
  )
}
