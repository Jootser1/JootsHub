'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
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
  reward: string | undefined
}

const DEFAULT_XP_DATA: ProgressionResult = {
  xpPerQuestion: 0,
  reachedLevel: 1,
  reachedXP: 0,
  remainingXpAfterLevelUp: 0,
  requiredXpForCurrentLevel: 0,
  requiredXpForNextLevel: 100,
  maxXpForNextLevel: 100,
  nextLevel: 2,
  reward: undefined,
  photoRevealPercent: undefined
};

export function AnimatedLevelProgress({ conversationId, icon, initialXpAndLevel }: AnimatedLevelProgressProps) {
  // Récupérer les données de la conversation
  const conversation = useChatStore(state => state.conversations[conversationId])
  const xpData = conversation?.xpAndLevel || initialXpAndLevel

  
  // Early return si pas de données
  if (!xpData) return null
  
  // Ref pour stocker les données XP de l'état *avant* l'animation actuelle
  const prevXpDataRef = useRef<ProgressionResult>(xpData || DEFAULT_XP_DATA)
  // État pour suivre la phase d'animation du level up
  const [animatingLevelUpPhase, setAnimatingLevelUpPhase] = useState<null | 'phase1' | 'phase3'>(null)
  
  // État d'affichage simplifié
  const [displayState, setDisplayState] = useState<DisplayState>({
    level: xpData.reachedLevel,
    totalXp: xpData.reachedXP,
    isAnimating: false,
  })
  
  // État pour la popup de level up
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpState>({ 
    show: false, 
    level: 0, 
    reward: undefined
  })
  
  // Calculer le pourcentage de progression
  const progressPercentage = useMemo(() => {
    const dataForProgress = animatingLevelUpPhase === 'phase1' && prevXpDataRef.current
      ? prevXpDataRef.current
      : xpData
    const xpInCurrentLevel = displayState.totalXp - dataForProgress.requiredXpForCurrentLevel
    const xpNeededForLevel = dataForProgress.maxXpForNextLevel - dataForProgress.requiredXpForCurrentLevel
    
    if (xpNeededForLevel <= 0) return 100
    
    return Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)))
  }, [displayState.totalXp, xpData, animatingLevelUpPhase, prevXpDataRef.current])
  
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
    setLevelUpInfo({ show: true, level, reward: xpData.reward })
    setTimeout(() => {
      setLevelUpInfo({ show: false, level: 0, reward: undefined })
    }, 3000)
  }, [])
  
  // Animation de level up en 3 phases
  const animateLevelUp = useCallback((
    fromXp: number,
    toXp: number,
    oldXpData: ProgressionResult,
    newXpData: ProgressionResult
  ) => {
    setDisplayState(prev => ({ ...prev, isAnimating: true }))
    setAnimatingLevelUpPhase('phase1')
    // Phase 1: Remplir la barre de l'ancien niveau jusqu'à 100%
    animateValue(fromXp, oldXpData.maxXpForNextLevel, 1000,
      (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
      () => {
        // Phase 2: Changer de niveau et vider la barre
        setDisplayState(prev => ({ 
          ...prev, 
          level: newXpData.reachedLevel,
          totalXp: newXpData.requiredXpForCurrentLevel
        }))
        
        showLevelUpPopup(newXpData.reachedLevel)
        setAnimatingLevelUpPhase('phase3')
        
        // Phase 3: Animer l'XP restant dans le nouveau niveau après un délai
        
        setTimeout(() => {
          animateValue(newXpData.requiredXpForCurrentLevel, toXp, 1000,
            (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
            () => {
              setDisplayState(prev => ({ ...prev, isAnimating: false }))
              setAnimatingLevelUpPhase(null)
              prevXpDataRef.current = newXpData
            }
          )
        }, 300)
        
      }
    )
  }, [animateValue, showLevelUpPopup])
  
  
  
  // Animation XP simple
  const animateXp = useCallback((fromXp: number, toXp: number, newXpData: ProgressionResult) => {
    setDisplayState(prev => ({ ...prev, isAnimating: true }))
    
    animateValue(fromXp, toXp, 1500,
      (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
      () => {
        setDisplayState(prev => ({ ...prev, isAnimating: false }))
        prevXpDataRef.current = newXpData
      }
    )
  }, [animateValue])
  
  // Effet principal pour détecter les changements et déclencher les animations
  useEffect(() => {
    if (!xpData || displayState.isAnimating || animatingLevelUpPhase) return
    
    const hasLeveledUp = xpData.reachedLevel > displayState.level
    const hasXpChanged = xpData.reachedXP !== displayState.totalXp
    
    if (hasLeveledUp) {
      // IMPORTANT: On mémorise l'ancien état AVANT de lancer l'animation
      // prevXpDataRef.current contient encore les données de l'ancien niveau
      animateLevelUp(displayState.totalXp, xpData.reachedXP, prevXpDataRef.current, xpData)
      // NE PAS mettre à jour prevXpDataRef ici, c'est fait dans animateLevelUp
    } else if (hasXpChanged) {
      animateXp(displayState.totalXp, xpData.reachedXP, xpData)
      // NE PAS mettre à jour prevXpDataRef ici, c'est fait dans animateXp
    } else {
      // Seulement si aucune animation n'est déclenchée, on met à jour la ref
      prevXpDataRef.current = xpData
    }
  }, [xpData, displayState, animateLevelUp, animateXp, animatingLevelUpPhase])
  
  // Effet séparé pour mettre à jour prevXpDataRef quand xpData change SANS animation
  useEffect(() => {
    if (!displayState.isAnimating && !animatingLevelUpPhase && xpData) {
      // Seulement mettre à jour si on n'est pas en train d'animer
      // et si les données ont vraiment changé
      if (prevXpDataRef.current.reachedXP !== xpData.reachedXP || 
          prevXpDataRef.current.reachedLevel !== xpData.reachedLevel) {
        // Mais seulement si ce n'est pas un changement qui va déclencher une animation
        const wouldTriggerLevelUp = xpData.reachedLevel > displayState.level
        const wouldTriggerXpChange = xpData.reachedXP !== displayState.totalXp
        
        if (!wouldTriggerLevelUp && !wouldTriggerXpChange) {
          prevXpDataRef.current = xpData
        }
      }
    }
  }, [xpData, displayState.isAnimating, displayState.level, displayState.totalXp, animatingLevelUpPhase])
  
  
  
  
  
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
    {Math.round(displayState.totalXp)} / {animatingLevelUpPhase === 'phase1' && prevXpDataRef.current
      ? prevXpDataRef.current.maxXpForNextLevel
      : xpData.maxXpForNextLevel}
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
      <p className="text-sm text-gray-500 mt-4">
      {levelUpInfo.reward ? `Vous avez gagné un ${levelUpInfo.reward} !` : 'Continuez comme ça !'}
      </p>
      </div>
      </div>
    )}
    </div>
  )
}