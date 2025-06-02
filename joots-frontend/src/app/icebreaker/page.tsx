'use client'

import { AppLayout } from '@/components/AppLayout'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, Search, Plus, Sparkles, Users, Filter } from 'lucide-react'
import Link from 'next/link'
import { ConversationList } from '@/features/conversations/components/ConversationList'
import { useRandomChat } from '@/features/conversations/hooks/useRandomChat'
import { useUserStore } from '@/features/user/stores/user-store'
import { ExperienceLogo } from '@/components/ExperienceLogo'

export default function IcebreakerHome() {
  const user = useUserStore(state => state.user)
  const { isLoading, startRandomChat } = useRandomChat()

  if (!user) {
    return <div className='flex items-center justify-center min-h-screen'>Chargement...</div>
  }

  return (
    <AppLayout>
      <div className='w-full mx-auto bg-white border-2 border-red-500'>
        {/* Header */}
        <div className='sticky top-0 z-10 bg-white border-b'>
          <div className='p-4 flex items-center'>
            <Link href='/hub'>
              <div className='w-10 h-10 rounded-full bg-[#E59C45] flex items-center justify-center'>
                <ChevronLeft className='h-5 w-5 text-white' />
              </div>
            </Link>
            <h1 className='text-xl font-semibold ml-4'>Icebreaker</h1>
          </div>

          {/* Action buttons */}
          <div className='px-4 grid grid-cols-4 gap-2 bg-gray-50'>
            <div className='flex flex-col items-center gap-1'>
              <Button
                className='bg-[#E59C45] hover:bg-[#E59C45]/90 text-white rounded-full aspect-square p-0'
                onClick={startRandomChat}
                disabled={isLoading}
                title={isLoading ? 'Recherche...' : 'Nouvelle Aventure Humaine'}
              >
                <Sparkles className='h-5 w-5' />
              </Button>
              <span className='text-xs text-center'>Nouvelle</span>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <Button
                variant='outline'
                className='bg-[#E59C45] hover:bg-[#E59C45]/90 text-white rounded-full aspect-square p-0'
                title='Redécouvre un ami'
              >
                <Users className='h-5 w-5' />
              </Button>
              <span className='text-xs text-center'>Amis</span>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <Button
                variant='outline'
                className='border-[#E59C45] text-[#E59C45] hover:bg-[#E59C45]/10 rounded-full aspect-square p-0'
                title='Nouveau Contact selon critères'
              >
                <Filter className='h-5 w-5' />
              </Button>
              <span className='text-xs text-center'>Filtres</span>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <Button variant='ghost' className='rounded-full aspect-square p-0' title='Rechercher'>
                <Search className='h-5 w-5 text-gray-500' />
              </Button>
              <span className='text-xs text-center'>Recherche</span>
            </div>
          </div>
        </div>

        {/* Conversations list */}
        <div className='flex-1 overflow-y-auto'>
          <ConversationList />
        </div>
      </div>
      <ExperienceLogo experience='hub' />
    </AppLayout>
  )
}
