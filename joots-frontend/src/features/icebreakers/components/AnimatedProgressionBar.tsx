'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useChatStore } from '@/features/chat/stores/chat-store'
import { ProgressionResult } from '@/features/chat/chat.types'

interface AnimatedLevelProgressProps {
  conversationId: string
  icon?: React.ReactNode
  initialXpAndLevel?: ProgressionResult
}

// État simplifié pour l'affichage
interface DisplayState {
  level: number
  totalXp: number
  isAnimating: boolean
}

// État pour la popup de level up
interface LevelUpState {
  show: boolean
  level: number
}

export function AnimatedLevelProgress({ conversationId, icon, initialXpAndLevel }: AnimatedLevelProgressProps) {
  // Récupérer les données de la conversation
  const conversation = useChatStore(state => state.conversations[conversationId])
  const xpData = conversation?.xpAndLevel || initialXpAndLevel

  // Early return si pas de données
  if (!xpData) return null

  // État d'affichage simplifié
  const [displayState, setDisplayState] = useState<DisplayState>({
    level: xpData.reachedLevel,
    totalXp: xpData.reachedXP,
    isAnimating: false
  })

  // État pour la popup de level up
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpState>({ 
    show: false, 
    level: 0 
  })

  // Calculer le pourcentage de progression
  const progressPercentage = useMemo(() => {
    if (!xpData) return 0
    
    const xpInCurrentLevel = displayState.totalXp - xpData.requiredXpForCurrentLevel
    const xpNeededForLevel = xpData.maxXpForNextLevel - xpData.requiredXpForCurrentLevel
    
    if (xpNeededForLevel <= 0) return 100
    
    return Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)))
  }, [displayState.totalXp, xpData])

  // Animation simple et réutilisable
  const animateValue = useCallback((
    from: number,
    to: number,
    duration: number,
    onUpdate: (value: number) => void,
    onComplete?: () => void
  ) => {
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentValue = from + (to - from) * progress

      onUpdate(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    requestAnimationFrame(animate)
  }, [])

  // Afficher la popup de level up
  const showLevelUpPopup = useCallback((level: number) => {
    setLevelUpInfo({ show: true, level })
    setTimeout(() => {
      setLevelUpInfo({ show: false, level: 0 })
    }, 3000)
  }, [])

  // Animation de level up en 3 phases
  const animateLevelUp = useCallback((
    fromLevel: number,
    toLevel: number,
    fromXp: number,
    toXp: number
  ) => {
    if (!xpData) return

    setDisplayState(prev => ({ ...prev, isAnimating: true }))

    // Phase 1: Remplir la barre jusqu'à 100%
    const maxXpForCurrentLevel = xpData.maxXpForNextLevel
    
    animateValue(fromXp, maxXpForCurrentLevel, 1000, 
      (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
      () => {
        // Phase 2: Changer de niveau et vider la barre
        setDisplayState(prev => ({ 
          ...prev, 
          level: toLevel,
          totalXp: xpData.requiredXpForCurrentLevel // Reset au minimum du nouveau niveau
        }))
        
        showLevelUpPopup(toLevel)

        // Phase 3: Animer l'XP restant après un délai
        setTimeout(() => {
          animateValue(xpData.requiredXpForCurrentLevel, toXp, 1000,
            (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
            () => setDisplayState(prev => ({ ...prev, isAnimating: false }))
          )
        }, 300)
      }
    )
  }, [xpData, animateValue, showLevelUpPopup])

  // Animation XP simple
  const animateXp = useCallback((fromXp: number, toXp: number) => {
    setDisplayState(prev => ({ ...prev, isAnimating: true }))
    
    animateValue(fromXp, toXp, 1500,
      (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
      () => setDisplayState(prev => ({ ...prev, isAnimating: false }))
    )
  }, [animateValue])

  // Effet principal pour détecter les changements
  useEffect(() => {
    if (!xpData || displayState.isAnimating) return

    const hasLeveledUp = xpData.reachedLevel > displayState.level
    const hasXpChanged = xpData.reachedXP !== displayState.totalXp

    if (hasXpChanged) {
      if (hasLeveledUp) {
        animateLevelUp(displayState.level, xpData.reachedLevel, displayState.totalXp, xpData.reachedXP)
      } else {
        animateXp(displayState.totalXp, xpData.reachedXP)
      }
    }
  }, [xpData, displayState, animateLevelUp, animateXp])

  return (
    <div className='flex flex-col justify-between rounded-3xl max-w-md relative'>
      {/* Niveau et Trophée */}
      <div className='flex items-center justify-between rounded-3xl p-1'>
        <p className='text-lg font-bold text-gray-800'>
          Niveau {displayState.level}
        </p>
        <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg'>
          {icon || (
            <Image
              src='/trophee.png'
              alt='Trophée'
              width={45}
              height={45}
              className='align-center content-center'
            />
          )}
        </div>
      </div>
      
      {/* Barre de progression */}
      <div className='w-50 h-5 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-600 relative'>
        <div
          className='h-full rounded-full bg-orange-500 transition-all duration-100 ease-linear'
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Nombre de points */}
      <div className='flex justify-end pr-2'>
        <p className='text-sm text-gray-600 text-right'>
          {Math.round(displayState.totalXp)} / {xpData.maxXpForNextLevel}
        </p>
      </div>

      {/* Popup de Level Up */}
      {levelUpInfo.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-all scale-100 opacity-100">
            <div className="text-yellow-400 text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">LEVEL UP!</h2>
            <p className="text-xl text-gray-600">
              Vous avez atteint le <span className="font-bold text-orange-500">Niveau {levelUpInfo.level}</span> !
            </p>
            <p className="text-sm text-gray-500 mt-4">Continuez comme ça !</p>
          </div>
        </div>
      )}
    </div>
  )
}