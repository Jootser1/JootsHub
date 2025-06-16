import { logger } from '@/utils/logger'
import { UserSocketService } from '@/features/user/sockets/user-socket-service'
import { ChatSocketService } from '@/features/chat/sockets/chat-socket-service'
import { waitForConnection } from '@/utils/socket-utils'
import { useUserStore } from '@/features/user/stores/user-store'
import { useContactStore } from '@/features/contacts/stores/contact-store'

// ✅ Interface pour les callbacks de changement d'état
interface StateChangeCallback {
  (isUserConnected: boolean, isChatConnected: boolean): void
}

/**
 * Gestionnaire global de sockets pour toute l'application
 * Implémenté comme un singleton accessible partout
 */
class SocketManager {
  private static instance: SocketManager | null = null
  private userSocket: UserSocketService | null = null
  private chatSocket: ChatSocketService | null = null
  private userId: string | null = null
  private token: string | null = null
  private isUserConnecting = false
  private isChatConnecting = false
  
  // ✅ Callbacks pour notifier les changements d'état
  private stateChangeCallbacks = new Set<StateChangeCallback>()

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager()
    }
    return SocketManager.instance
  }

  // ✅ Méthode pour s'abonner aux changements d'état
  public onStateChange(callback: StateChangeCallback): () => void {
    this.stateChangeCallbacks.add(callback)
    
    // Envoyer l'état actuel immédiatement
    callback(this.isUserSocketConnected(), this.isChatSocketConnected())
    
    return () => {
      this.stateChangeCallbacks.delete(callback)
    }
  }

  // ✅ Notifier les changements d'état
  private notifyStateChange(): void {
    const isUserConnected = this.isUserSocketConnected()
    const isChatConnected = this.isChatSocketConnected()
    
    this.stateChangeCallbacks.forEach(callback => {
      try {
        callback(isUserConnected, isChatConnected)
      } catch (error) {
        logger.error('Erreur dans le callback de changement d\'état:', error as Error)
      }
    })
  }

  public setCredentials(userId: string, token: string): void {
    this.userId = userId
    this.token = token
  }

  public getUserId(): string | null {
    return this.userId
  }

  public isUserSocketConnected(): boolean {
    return this.userSocket?.isConnected() ?? false
  }

  public isChatSocketConnected(): boolean {
    return this.chatSocket?.isConnected() ?? false
  }

  // ✅ Optimisation : Connexion utilisateur avec monitoring et notification
  public async connectUserSocket(): Promise<UserSocketService> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot connect socket on server side')
    }

    if (!this.userId || !this.token) {
      throw new Error('No credentials set for socket connection')
    }

    // Éviter les connexions multiples simultanées
    if (this.isUserConnecting) {
      logger.debug('Connexion utilisateur déjà en cours, attente...')
      while (this.isUserConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      return this.userSocket!
    }

    if (this.userSocket?.isConnected()) {
      logger.debug('Socket utilisateur déjà connecté')
      return this.userSocket
    }

    this.isUserConnecting = true

    try {
      // Initialisation - utiliser le singleton
      this.userSocket = UserSocketService.getInstance()
      this.userSocket.connect(this.userId, this.token)
      
      await waitForConnection(this.userSocket!)
      
      this.userSocket.registerEvents()

      if (!this.userSocket?.isConnected()) {
        logger.warn("SocketManager: Impossible d'établir une connexion socket utilisateur")
        return this.userSocket
      }

      await this.setupUserRooms()

      logger.info('SocketManager: Socket utilisateur configuré avec succès')
      
      this.notifyStateChange()
      
      return this.userSocket
    } finally {
      this.isUserConnecting = false
    }
  }

  //✅ Optimisation : Connexion chat avec monitoring et notification
  public async connectChatSocket(conversationIds?: string[]): Promise<ChatSocketService> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot connect socket on server side')
    }

    if (!this.userId || !this.token) {
      throw new Error('No credentials set for socket connection')
    }

    // Éviter les connexions multiples simultanées
    if (this.isChatConnecting) {
      logger.debug('Connexion chat déjà en cours, attente...')
      while (this.isChatConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      return this.chatSocket!
    }

    // Si déjà connecté, gérer les nouvelles conversations sans recréer
    if (this.chatSocket?.isConnected()) {
      logger.debug('Socket chat déjà connecté, gestion des conversations')

      if (conversationIds && conversationIds.length > 0) {
        const existingConversations = this.chatSocket.getActiveConversations()
        const newConversations = conversationIds.filter(id => !existingConversations.includes(id))

        if (newConversations.length > 0) {
          this.chatSocket!.joinAllConversations(newConversations)
          logger.info(`${newConversations.length} nouvelles conversations rejointes`)
        }
      }

      return this.chatSocket
    }

    this.isChatConnecting = true

    try {
      // Initialisation - utiliser le singleton
      this.chatSocket = ChatSocketService.getInstance()
      this.chatSocket.connect(this.userId, this.token)
      
      await waitForConnection(this.chatSocket!)
      
      this.chatSocket.registerEvents()

      if (!this.chatSocket?.isConnected()) {
        logger.warn("SocketManager: Impossible d'établir une connexion socket chat")
        return this.chatSocket
      }

      if (conversationIds && conversationIds.length > 0) {
        const existingConversations = this.chatSocket.getActiveConversations()
        logger.debug(`SocketManager: Conversations existantes: ${existingConversations.length}, nouvelles: ${conversationIds.length}`)
        
        this.chatSocket!.joinAllConversations(conversationIds)
      }

      logger.info('SocketManager: Socket chat configuré avec succès')
      
      this.notifyStateChange()
      
      return this.chatSocket
    } finally {
      this.isChatConnecting = false
    }
  }

  // ✅ Optimisation : Déconnexion avec nettoyage et notification
  public disconnectUserSocket(): void {
    if (this.userSocket) {
      try {
        // 1. Tenter de récupérer l'ID utilisateur depuis différentes sources
        let userId = this.userSocket.getUserId()
        // Si userId est null, essayer de le récupérer depuis le store utilisateur
        if (!userId) {
          const userFromStore = useUserStore.getState().user?.user_id
          // Convertir undefined en null si nécessaire
          userId = userFromStore || null

          if (userId) {
            logger.info('Fallback: userId récupéré depuis le store utilisateur')
          }
        }

        // 2. Mise à jour du statut utilisateur (hors ligne)
        if (userId) {
          useUserStore.getState().setUserStatus(false)
          this.userSocket.updateUserStatus(userId, false)
        }

        // 3. Quitter les rooms de contacts
        const contactIds = useContactStore.getState().contactList
        if (contactIds && contactIds.size > 0) {
          this.userSocket.leaveContactsRooms([...contactIds])
        }

        // 4. Désenregistrer les événements et déconnecter
        this.userSocket.unregisterEvents()
        this.userSocket.disconnect()
      } catch (error) {
        logger.error(
          'Erreur lors de la déconnexion du socket utilisateur:',
          error instanceof Error ? error : new Error(String(error))
        )
      }

      this.userSocket = null
      
      this.notifyStateChange()
    }
  }

  public disconnectChatSocket(): void {
    if (this.chatSocket) {
      try {
        const chatSocketService = this.chatSocket as ChatSocketService

        chatSocketService.unregisterEvents()
        this.chatSocket.disconnect()
        ChatSocketService.resetInstance()
      } catch (error) {
        logger.error(
          'Erreur lors de la déconnexion du socket chat:',
          error instanceof Error ? error : new Error(String(error))
        )
      }

      this.chatSocket = null
      
      this.notifyStateChange()
    }
  }

  public disconnectAll(): void {
    this.disconnectUserSocket()
    this.disconnectChatSocket()
    this.userId = null
    this.token = null
    logger.info('SocketManager: Tous les sockets déconnectés')
  }

  //✅ Configure les rooms de contacts et récupère les statuts en ligne
  private async setupUserRooms(): Promise<void> {
    if (!this.userId) return

    try {
      // 1. Charger les contacts depuis l'API si nécessaire
      const contactStore = useContactStore.getState()
      
      // Si pas de contacts en cache, les charger
      if (contactStore.contactList.size === 0) {
        await contactStore.loadContacts()
      }

      const contactIds = Array.from(contactStore.contactList || [])

      if (contactIds.length === 0) {
        logger.debug(`[UserSocket] ${this.userId} : Aucun contact à configurer`)
        return
      }

      // 2. Rejoindre les rooms de contacts
      this.userSocket?.joinContactsRooms(contactIds)
      logger.info(`[UserSocket] ${this.userId} a rejoint ${contactIds.length} Contact Rooms`)

      // 3. Demander les statuts en ligne des contacts
      await this.requestContactsOnlineStatus(contactIds)

    } catch (error) {
      logger.error('Erreur lors de la configuration des rooms utilisateur:', error as Error)
    }
  }

  //✅ Demande les statuts en ligne des contacts
  private async requestContactsOnlineStatus(contactIds: string[]): Promise<void> {
    if (!this.userSocket?.isConnected()) return

    try {
      // Utiliser la méthode publique du UserSocketService
      this.userSocket.requestContactsOnlineStatus(contactIds)
      logger.debug(`[UserSocket] Demande des statuts en ligne pour ${contactIds.length} contacts`)
    } catch (error) {
      logger.error('Erreur lors de la demande des statuts en ligne:', error as Error)
    }
  }

  //Récupère l'instance du socket utilisateur
  public getUserSocket(): UserSocketService | null {
    return this.userSocket
  }

  //Récupère l'instance du socket chat
  public getChatSocket(): ChatSocketService | null {
    return this.chatSocket
  }
}

// Exporter une instance unique du gestionnaire
export const socketManager = SocketManager.getInstance()
