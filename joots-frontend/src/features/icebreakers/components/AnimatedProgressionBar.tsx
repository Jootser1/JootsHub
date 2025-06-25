'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useChatStore } from '@/features/chat/stores/chat-store'
import { xp_and_level } from '@shared/conversation.types'

interface AnimatedLevelProgressProps {
  conversationId: string
  icon?: React.ReactNode
  initialXpAndLevel?: xp_and_level
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

const DEFAULT_XP_DATA: xp_and_level = {
  difficulty: 'easy',
  xp_per_question: 0,
  reached_level: 1,
  reached_xp: 0,
  remaining_xp_after_level_up: 0,
  required_xp_for_current_level: 0,
  required_xp_for_next_level: 100,
  max_xp_for_next_level: 100,
  next_level: 2,
  reward: '',
  photo_reveal_percent: null
}

export function AnimatedLevelProgress({ conversationId, icon, initialXpAndLevel }: AnimatedLevelProgressProps) {
  // Récupérer les données de la conversation - utiliser getState() pour avoir les données immédiatement
  const conversation = useChatStore(state => state.conversations[conversationId])
  
  // Récupérer les données directement du store pour l'initialisation
  const getConversationData = () => {
    const state = useChatStore.getState()
    return state.conversations[conversationId]?.xp_and_level || initialXpAndLevel || DEFAULT_XP_DATA
  }
  
  const xpData = conversation?.xp_and_level || initialXpAndLevel || DEFAULT_XP_DATA

  // Ref pour stocker les données XP de l'état *avant* l'animation actuelle
  const prevXpDataRef = useRef<xp_and_level>(getConversationData())
  // État pour suivre la phase d'animation du level up
  const [animatingLevelUpPhase, setAnimatingLevelUpPhase] = useState<null | 'phase1' | 'phase3'>(null)
  
  // État d'affichage simplifié - utiliser getState() pour l'initialisation
  const [displayState, setDisplayState] = useState<DisplayState>(() => {
    const initialData = getConversationData()
    return {
      level: initialData.reached_level,
      totalXp: initialData.reached_xp,
      isAnimating: false,
    }
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
    const xpInCurrentLevel = displayState.totalXp - dataForProgress.required_xp_for_current_level
    const xpNeededForLevel = dataForProgress.max_xp_for_next_level - dataForProgress.required_xp_for_current_level
    
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
    setLevelUpInfo({ show: true, level, reward: xpData?.reward })
    setTimeout(() => {
      setLevelUpInfo({ show: false, level: 0, reward: undefined })
    }, 3000)
  }, [xpData?.reward])
  
  // Animation de level up en 3 phases
  const animateLevelUp = useCallback((
    fromXp: number,
    toXp: number,
    oldXpData: xp_and_level,
    newXpData: xp_and_level
  ) => {
    setDisplayState(prev => ({ ...prev, isAnimating: true }))
    setAnimatingLevelUpPhase('phase1')
    // Phase 1: Remplir la barre de l'ancien niveau jusqu'à 100%
    animateValue(fromXp, oldXpData.max_xp_for_next_level, 1000,
      (xp) => setDisplayState(prev => ({ ...prev, totalXp: xp })),
      () => {
        // Phase 2: Changer de niveau et vider la barre
        setDisplayState(prev => ({ 
          ...prev, 
          level: newXpData.reached_level,
          totalXp: newXpData.required_xp_for_current_level
        }))
        
        showLevelUpPopup(newXpData.reached_level)
        setAnimatingLevelUpPhase('phase3')
        
        // Phase 3: Animer l'XP restant dans le nouveau niveau après un délai
        
        setTimeout(() => {
          animateValue(newXpData.required_xp_for_current_level, toXp, 1000,
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
  const animateXp = useCallback((fromXp: number, toXp: number, newXpData: xp_and_level) => {
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
    
    const hasLeveledUp = xpData.reached_level > displayState.level
    const hasXpChanged = xpData.reached_xp !== displayState.totalXp
    
    if (hasLeveledUp) {
      // IMPORTANT: On mémorise l'ancien état AVANT de lancer l'animation
      // prevXpDataRef.current contient encore les données de l'ancien niveau
      animateLevelUp(displayState.totalXp, xpData.reached_xp, prevXpDataRef.current, xpData)
      // NE PAS mettre à jour prevXpDataRef ici, c'est fait dans animateLevelUp
    } else if (hasXpChanged) {
      animateXp(displayState.totalXp, xpData.reached_xp, xpData)
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
      if (prevXpDataRef.current.reached_xp !== xpData.reached_xp || 
          prevXpDataRef.current.reached_level !== xpData.reached_level) {
        // Mais seulement si ce n'est pas un changement qui va déclencher une animation
        const wouldTriggerLevelUp = xpData.reached_level > displayState.level
        const wouldTriggerXpChange = xpData.reached_xp !== displayState.totalXp
        
        if (!wouldTriggerLevelUp && !wouldTriggerXpChange) {
          prevXpDataRef.current = xpData
        }
      }
    }
  }, [xpData, displayState.isAnimating, displayState.level, displayState.totalXp, animatingLevelUpPhase])
  
  // Plus besoin d'early return car xpData a toujours une valeur par défaut maintenant
  
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
      ? prevXpDataRef.current.max_xp_for_next_level
      : xpData?.max_xp_for_next_level}
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