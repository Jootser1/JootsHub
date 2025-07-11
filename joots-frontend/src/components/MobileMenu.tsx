'use client'

import type React from 'react'
import {
  ShoppingBag,
  Package,
  Mail,
  Award,
  HelpCircle,
  Settings,
  ChevronRight,
  Copy,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/features/user/stores/user-store'
import { useLocalizedPath } from '@/hooks/useTranslations'
import { signOut } from 'next-auth/react'
import { useTranslations } from '@/contexts/TranslationContext'
import { useSettingsNavigation } from '@/hooks/useSettingsNavigation'

import { useSocketManager } from '@/hooks/useSocketManager'
import { logger } from '@/utils/logger'
import { useSocketStore } from '@/features/socket/stores/socket-store'

export function MobileMenu() {
  const router = useRouter()
  const { mobileMenuOpen, setMobileMenuOpen, user, logout } = useUserStore()
  const socketManager = useSocketManager()
  const { isUserConnected } = useSocketStore()
  const getLocalizedPath = useLocalizedPath()
  const { dictionary } = useTranslations()
  const { navigateToSettings } = useSettingsNavigation()

  

  const handleLogout = async () => {
    try {
      setMobileMenuOpen(false)

      // Déconnecter tous les sockets avant la déconnexion
      socketManager.disconnectAll()
      logger.info('Tous les sockets ont été déconnectés')

      await signOut({ redirect: false })
      logout()
      router.push(getLocalizedPath('/login'))
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const copyClientId = () => {
    navigator.clipboard.writeText(user?.user_id || '')
    // Vous pourriez ajouter une notification de succès ici
  }

  return (
    <>
      {/* Overlay qui apparaît derrière le menu */}
      {mobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black/20 z-40 backdrop-blur-sm'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Menu popup */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-md bg-white rounded-l-3xl shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full p-6 pt-8'>
          {/* ID de clientèle */}
          <div className='mb-6'>
            <div className='text-gray-500 text-sm mb-2'>{dictionary.menu.client_id}</div>
            <div className='flex items-center bg-gray-100 rounded-full py-2 px-4'>
              <span className='text-gray-700 flex-1'>{user?.user_id || dictionary.common.not_connected}</span>
              <button
                onClick={copyClientId}
                className='text-gray-400 hover:text-gray-600'
                aria-label={dictionary.menu.copy_id}
              >
                <Copy className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Profil utilisateur */}
          <Link
            href={getLocalizedPath('/myprofile')}
            className='flex items-center bg-gray-100 rounded-full py-2 px-4 mb-4'
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className='relative w-10 h-10 mr-3'>
              <Image
                src={user?.avatar || '/placeholder.svg?height=40&width=40'}
                alt='Avatar'
                width={40}
                height={40}
                className='rounded-full'
              />
            </div>
            <span className='text-gray-800 font-medium flex-1'>
              {user?.username || dictionary.common.not_connected}
            </span>
            <span className='text-gray-800 font-medium flex-1'>
              {isUserConnected ? dictionary.common.online : dictionary.common.offline}
            </span>
            <ChevronRight className='h-5 w-5 text-gray-400' />
          </Link>



          {/* Pass standard */}
          <Link 
            href={getLocalizedPath('/pass')} 
            className='flex items-center bg-gray-100 rounded-full py-3 px-4 mb-8'
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className='relative w-6 h-6 mr-3'>
              <Image src='/placeholder.svg?height=24&width=24' alt='Pass' width={24} height={24} />
            </div>
            <span className='text-gray-600'>{dictionary.menu.standard_pass}</span>
          </Link>

          {/* Menu items */}
          <div className='flex flex-col space-y-6'>
          <MenuItem href={getLocalizedPath('/actualites')} icon={<Mail />} label={dictionary.menu.notifications} hasNotification onNavigate={() => setMobileMenuOpen(false)} />
          <MenuItem href={getLocalizedPath('/badges')} icon={<Award />} label={dictionary.menu.badges} hasNotification onNavigate={() => setMobileMenuOpen(false)} />
          <MenuItem href={getLocalizedPath('/astuces')} icon={<HelpCircle />} label={dictionary.menu.tips} onNavigate={() => setMobileMenuOpen(false)} />
          <MenuItem href={getLocalizedPath('/boutique')} icon={<ShoppingBag />} label={dictionary.menu.shop} hasNotification onNavigate={() => setMobileMenuOpen(false)} />        
            
            <MenuItem onClick={() => { 
              setMobileMenuOpen(false)
              navigateToSettings()
            }} icon={<Settings />} label={dictionary.common.settings} />
          </div>
          
          {/* Déconnexion */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <button
              onClick={handleLogout}
              className='flex items-center text-red-600 hover:text-red-700 w-full'
            >
              <div className='w-8 h-8 mr-3 text-red-600'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                </svg>
              </div>
              <span className='text-lg'>{dictionary.menu.disconnect}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

interface MenuItemProps {
  href?: string
  onClick?: () => void
  icon: React.ReactNode
  label: string
  hasNotification?: boolean
  onNavigate?: () => void
}

function MenuItem({ href, onClick, icon, label, hasNotification = false, onNavigate }: MenuItemProps) {
  const content = (
    <>
      <div className='relative w-8 h-8 mr-3 text-gray-500'>
        {icon}
        {hasNotification && (
          <span className='absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full' />
        )}
      </div>
      <span className='text-lg'>{label}</span>
    </>
  )

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className='flex items-center text-gray-600 hover:text-gray-900 w-full'
      >
        {content}
      </button>
    )
  }

  return (
    <Link href={href || '/'} className='flex items-center text-gray-600 hover:text-gray-900' onClick={onNavigate}>
      {content}
    </Link>
  )
}
