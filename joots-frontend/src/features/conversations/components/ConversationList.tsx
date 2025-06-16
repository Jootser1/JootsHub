import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useConversation } from '@/features/conversations/hooks/useConversation'
import { ConversationItem } from '@/features/conversations/components/ConversationItem'
import { useUserStore } from '@/features/user/stores/user-store'
import { logger } from '@/utils/logger'

export function ConversationList() {
  const { data: session, status } = useSession()
  const { conversations, loading, error } = useConversation()
  const user = useUserStore(state => state.user)

  logger.debug('ConversationList - Session status', { status })
  logger.debug('ConversationList - Session data', { session })
  logger.debug('ConversationList - Conversations', { conversations })
  logger.debug('ConversationList - Loading', { loading })
  logger.debug('ConversationList - Error', { error })
  logger.debug('ConversationList - User store', { user })

  useEffect(() => {
    if (status === 'authenticated' && !user) {
      logger.info('ConversationList - User store not initialized, waiting for sync...')
    }
  }, [status, user])

  if (loading || status === 'loading' || !user) {
    logger.debug('ConversationList - Rendering loading state')
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (error) {
    logger.error('ConversationList - Rendering error state', { error })
    return (
      <div className='flex items-center justify-center h-full text-red-500'>
        Une erreur est survenue lors du chargement des conversations
      </div>
    )
  }

  if (!conversations || conversations.length === 0) {
    logger.debug('ConversationList - Rendering empty state')
    return (
      <div className='flex flex-col items-center justify-center h-full text-gray-500'>
        <p>Aucune conversation</p>
        <p className='text-sm mt-2'>Commencez une nouvelle conversation !</p>
      </div>
    )
  }

  logger.debug('ConversationList - Rendering conversations', { conversations })
  return (
    <div className='divide-y divide-gray-100'>
      {conversations.map(conversation => {
        logger.debug('Rendering conversation', { conversation })
        return <ConversationItem key={conversation.conversation_id} conversation={conversation} />
      })}
    </div>
  )
}
