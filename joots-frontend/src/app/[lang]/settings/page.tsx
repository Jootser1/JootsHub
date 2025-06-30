'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/features/user/stores/user-store'
import { Switch } from '@/components/ui/Switch'
import axiosInstance from '@/app/api/axios-instance'
import { ArrowLeft, MessageSquare, Settings as SettingsIcon, Globe } from 'lucide-react'
import { useTranslations } from '@/contexts/TranslationContext'
import { useLocale, useLocalizedPath } from '@/hooks/useTranslations'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/types/i18n'

export default function SettingsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const getLocalizedPath = useLocalizedPath()
  const { user } = useUserStore()
  const { dictionary } = useTranslations()
  const [isLoading, setIsLoading] = useState(false)
  
  // Stocker la page précédente (sans locale) au premier rendu
  const [previousPath, setPreviousPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('settings-previous-path')
      return stored || '/hub'
    }
    return '/hub'
  })

  // Nettoyer le storage quand on quitte la page
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('settings-previous-path')
      }
    }
  }, [])

  const handleGoBack = () => {
    router.push(getLocalizedPath(previousPath))
  }

  const handleChatPreferenceChange = async (checked: boolean) => {
    setIsLoading(true)
    try {
      await axiosInstance.patch(`/users/${user?.user_id}/chat-preference`, {
        isAvailableForChat: checked,
      })

      // Mettre à jour le store avec la nouvelle préférence
      useUserStore.setState(state => ({
        user: state.user ? { ...state.user, isAvailableForChat: checked } : null,
      }))
    } catch (error) {
      console.error(dictionary.settings.error_updating_preference, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (newLocale: Locale) => {
    // Construire la nouvelle URL avec la nouvelle locale
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleGoBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center">
              <SettingsIcon className="w-6 h-6 text-gray-700 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">{dictionary.settings.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Section Chat */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{dictionary.settings.chat_preferences}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <MessageSquare className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      {dictionary.settings.accept_strangers}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {dictionary.settings.accept_strangers_desc}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={user?.isAvailableForChat ?? true}
                  onCheckedChange={handleChatPreferenceChange}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-[#E59C45] data-[state=unchecked]:bg-input"
                />
              </div>
            </div>
          </div>

          {/* Section Compte */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{dictionary.settings.account}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">{dictionary.settings.username}</span>
                <span className="text-gray-500">{user?.username || dictionary.common.not_defined}</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">{dictionary.settings.client_id}</span>
                <span className="text-gray-500 text-sm">{user?.user_id || dictionary.common.not_defined}</span>
              </div>
            </div>
          </div>

          {/* Section Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{dictionary.settings.notifications}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">{dictionary.settings.push_notifications}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {dictionary.settings.push_notifications_desc}
                  </p>
                </div>
                <Switch
                  checked={true}
                  onCheckedChange={() => {}}
                  className="data-[state=checked]:bg-[#E59C45] data-[state=unchecked]:bg-input"
                />
              </div>
            </div>
          </div>

          {/* Section Langue */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{dictionary.settings.language}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700 font-medium mb-1">
                    {dictionary.settings.language}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {dictionary.settings.language_desc}
                  </p>
                  
                  <div className="space-y-2">
                    {(['fr-FR', 'en-US', 'es-ES'] as Locale[]).map((localeOption) => (
                      <label key={localeOption} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="language"
                          value={localeOption}
                          checked={locale === localeOption}
                          onChange={() => handleLanguageChange(localeOption)}
                          className="w-4 h-4 text-[#E59C45] bg-gray-100 border-gray-300 focus:ring-[#E59C45] focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700">
                          {dictionary.settings.languages[localeOption]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 