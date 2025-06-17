'use client'

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/features/user/stores/user-store'
import { logger } from '@/utils/logger'
import { socketManager } from '@/lib/sockets/socket-manager'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import axiosInstance from '@/app/api/axios-instance'

interface GlobalUserSocketContextType {
  isLoading: boolean
  isUserConnected: boolean
  isChatConnected: boolean
}

const GlobalUserSocketContext = createContext<GlobalUserSocketContextType>({
  isLoading: true,
  isUserConnected: false,
  isChatConnected: false,
})

// Constante pour définir le délai de rafraîchissement des contacts (15 minutes)
const CONTACT_REFRESH_INTERVAL = 15 * 60 * 1000

export function GlobalUserSocketProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const { user, syncUserData } = useUserStore()
  const setupDoneRef = useRef(false)
  const isAuthenticatedRef = useRef(false)
  const connectionAttemptedRef = useRef(false)
  const lastSessionIdRef = useRef<string | null>(null)
  const isConnectingRef = useRef(false)

  const connectUserSocket = useCallback(
    async (userId: string, token: string): Promise<boolean> => {
      // Vérifier si une connexion est déjà en cours
      if (isConnectingRef.current) {
        logger.debug('GlobalUserSocketProvider: Connexion déjà en cours, attente...')
        return socketManager.isUserSocketConnected()
      }

      // Vérifier si c'est la même session et déjà connecté
      if (lastSessionIdRef.current === userId && socketManager.isUserSocketConnected()) {
        logger.debug('GlobalUserSocketProvider: Socket utilisateur déjà connecté pour cette session')
        return true
      }

      // Éviter les tentatives multiples pour la même session
      if (connectionAttemptedRef.current && lastSessionIdRef.current === userId) {
        return socketManager.isUserSocketConnected()
      }

      isConnectingRef.current = true
      connectionAttemptedRef.current = true
      lastSessionIdRef.current = userId

      try {
        if (socketManager.isUserSocketConnected()) {
          return true
        }

        socketManager.setCredentials(userId, token)
        await socketManager.connectUserSocket()
        logger.info('(Re)Connexion socket utilisateur réussie')
        return true
      } catch (error) {
        logger.error(
          'Erreur lors de la connexion du socket utilisateur:',
          error instanceof Error ? error : new Error(String(error))
        )
        return false
      } finally {
        isConnectingRef.current = false
      }
    },
    [socketManager]
  )

  useEffect(() => {
    // Reset si changement d'utilisateur
    if (session?.user?.id !== lastSessionIdRef.current) {
      connectionAttemptedRef.current = false
      setupDoneRef.current = false
    }

    // Ne rien faire si l'utilisateur n'est pas authentifié
    if (status !== 'authenticated') {
      logger.debug('GlobalUserSocketProvider: Non authentifié, pas de connexion socket')
      isAuthenticatedRef.current = false
      return
    }

    // Marquer comme authentifié
    isAuthenticatedRef.current = true

    const setupSocket = async () => {
      // Éviter les configurations multiples pour la même session
      if (setupDoneRef.current && lastSessionIdRef.current === session?.user?.id) {
        setIsLoading(false)
        return
      }

      if (!session?.user?.id || !session?.accessToken) {
        return
      }

      try {
        // Récupération des données utilisateur depuis bdd et sync userStore
        if (!user) {
          logger.info('GlobalUserSocketProvider: Synchronisation des données utilisateur...')
          try {
            await syncUserData()
            // Vérifier que les données ont bien été synchronisées
            const updatedUser = useUserStore.getState().user
            if (!updatedUser) {
              logger.error('GlobalUserSocketProvider: Échec de la synchronisation des données utilisateur')
              return
            }
            logger.info('GlobalUserSocketProvider: Données utilisateur synchronisées avec succès', { user: updatedUser })
          } catch (error) {
            logger.error('GlobalUserSocketProvider: Erreur lors de la synchronisation', { error })
            return
          }
        } else {
          logger.debug('GlobalUserSocketProvider: Données utilisateur déjà présentes', { user })
        }

        //Récupération des données Contacts depuis bdd et Mise à jour des contacts dans ContactStore
        const contactStore = useContactStore.getState()
        const lastSyncTime = contactStore.lastSyncTime || 0
        const shouldRefresh = Date.now() - lastSyncTime > CONTACT_REFRESH_INTERVAL

        // Ne charger les contacts que si nécessaire
        if (contactStore.contactList.size === 0 || shouldRefresh) {
          await contactStore.loadContacts()
        }

        // Connexion du socket utilisateur seulement si pas déjà connecté
        logger.info('GlobalUserSocketProvider: Session', { session })
        const success = await connectUserSocket(session.user.id, session.accessToken)
        
        setupDoneRef.current = true
      } catch (error) {
        logger.error(
          'Erreur lors de la configuration du socket:',
          error instanceof Error ? error : new Error(String(error))
        )
      } finally {
        setIsLoading(false)
      }
    }

    setupSocket()

    const handleBeforeUnload = () => {
      logger.info('GlobalUserSocketProvider: Fermeture de page détectée, nettoyage des sockets')
      socketManager.disconnectAll()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        logger.info('GlobalUserSocketProvider: Page cachée')
        // Ne pas déconnecter immédiatement pour éviter les reconnexions inutiles
        // lors de changements d'onglets rapides
      } else if (document.visibilityState === 'visible') {
        logger.info('GlobalUserSocketProvider: Page de nouveau visible, vérification des sockets')
        // Vérifier si les sockets sont toujours connectés
        if (!socketManager.isUserSocketConnected() && session?.user?.id && session?.accessToken) {
          logger.info('GlobalUserSocketProvider: Reconnexion du socket utilisateur')
          connectUserSocket(session.user.id, session.accessToken)
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('visibilitychange', handleVisibilityChange)

      // Garder aussi la condition existante
      if (!isAuthenticatedRef.current) {
        logger.info('GlobalUserSocketProvider: Nettoyage du socket (session terminée)')
        socketManager.disconnectAll()
      }
    }
  }, [session?.user?.id, status, socketManager, connectUserSocket, syncUserData])

  const contextValue = {
    isLoading,
    isUserConnected: socketManager.isUserSocketConnected(),
    isChatConnected: socketManager.isChatSocketConnected(),
  }

  return (
    <GlobalUserSocketContext.Provider value={contextValue}>
      {children}
    </GlobalUserSocketContext.Provider>
  )
}

export function useGlobalUserSocket() {
  const context = useContext(GlobalUserSocketContext)
  if (!context) {
    throw new Error('useGlobalUserSocket must be used within a GlobalUserSocketProvider')
  }
  return context
}
