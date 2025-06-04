'use client'

import { useEffect, useState } from 'react'
import { X, Lock, Eye } from 'lucide-react'
import { FilteredUserProfile } from '../user.types'
import axiosInstance from '@/app/api/axios-instance'
import { toast } from 'sonner'
import Image from 'next/image'

interface ConversationProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  conversationId: string
}

const ATTRIBUTE_LABELS: Record<string, string> = {
  CITY: 'Ville',
  AGE: 'Âge',
  GENDER: 'Genre',
  JOB: 'Métier',
  ORIGIN: 'Origine',
  ORIENTATION: 'Orientation',
  PASSIONS: 'Passions',
  QUALITY: 'Qualité',
  FLAW: 'Défaut',
  BIO: 'Bio'
}

export function ConversationProfileModal({ 
  isOpen, 
  onClose, 
  userId, 
  conversationId 
}: ConversationProfileModalProps) {
  const [profile, setProfile] = useState<FilteredUserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && userId && conversationId) {
      fetchProfile()
    }
  }, [isOpen, userId, conversationId])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `/users/profile/${userId}/${conversationId}`
      )
      console.log('Response from API:', response.data) // Debug
      setProfile(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
      toast.error('Impossible de charger le profil')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const renderAttributeValue = (key: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    return value
  }

  const renderAvatar = () => {
    if (!profile || !profile.user) return null

    const { user, photoRevealPercent } = profile
    const shouldBlur = photoRevealPercent === null || photoRevealPercent < 100

    return (
      <div className="relative">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={`rounded-full object-cover ${shouldBlur ? 'filter blur-sm' : ''}`}
          />
        ) : (
          <div className={`w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center ${shouldBlur ? 'filter blur-sm' : ''}`}>
            <span className="text-gray-500 text-3xl">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {shouldBlur && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        {photoRevealPercent !== null && photoRevealPercent > 0 && (
          <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            {photoRevealPercent}%
          </div>
        )}
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Profil de conversation</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : profile && profile.user ? (
            <div className="space-y-6">
              {/* Avatar et informations de base */}
              <div className="text-center">
                {renderAvatar()}
                <h3 className="text-lg font-semibold mt-4">{profile.user.username}</h3>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${profile.user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-600">
                    {profile.user.isOnline ? 'En ligne' : 'Hors ligne'}
                  </span>
                </div>
              </div>

              {/* Progression */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Niveau de conversation</span>
                  <span className="text-sm text-gray-600">Niveau {profile.conversationLevel}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Informations révélées</span>
                  <span>{profile.revealedCount}/{profile.totalAttributes}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(profile.revealedCount / profile.totalAttributes) * 100}%` }}
                  />
                </div>
              </div>

              {/* Attributs révélés */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Informations révélées
                </h4>
                {Object.entries(profile.revealedAttributes || {}).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(profile.revealedAttributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">
                          {ATTRIBUTE_LABELS[key] || key}
                        </span>
                        <span className="text-sm text-right max-w-[60%]">
                          {renderAttributeValue(key, value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Aucune information révélée pour le moment.
                    Continuez à discuter pour en savoir plus !
                  </p>
                )}
              </div>

              {/* Attributs non révélés */}
              {profile.revealedCount < profile.totalAttributes && (
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center text-gray-500">
                    <Lock className="w-4 h-4 mr-2" />
                    À découvrir
                  </h4>
                  <p className="text-xs text-gray-500">
                    {profile.totalAttributes - profile.revealedCount} information(s) supplémentaire(s) 
                    à débloquer en progressant dans votre conversation.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Impossible de charger le profil</p>
              <p className="text-xs text-gray-400 mt-2">Données reçues: {JSON.stringify(profile)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 