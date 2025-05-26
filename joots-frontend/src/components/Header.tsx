import { JootsLogo } from './JootsLogo'
import Link from 'next/link'
import { useUserStore } from '@/features/user/stores/user-store'

export function Header() {
  const { user } = useUserStore()

  return (
    <header className='p-4 flex items-center justify-between border-b'>
      <JootsLogo className='w-24 h-auto' />
      <Link href='/profile'>
        <div className='flex items-center space-x-2'>
          <span className='font-medium'>{user?.username || 'Non connecté'}</span>
        </div>
      </Link>
    </header>
  )
}
