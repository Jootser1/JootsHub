import { logger } from '@/utils/logger';
import { UserSocketService } from '@/features/user/sockets/userSocketService';
import { ChatSocketService } from '@/features/chat/sockets/chatSocketService';
import { waitForConnection } from '@/utils/socketUtils';
import { useUserStore } from '@/features/user/stores/userStore';
import { useContactStore } from '@/features/contacts/stores/contactStore';

/**
* Gestionnaire global de sockets pour toute l'application
* Implémenté comme un singleton accessible partout
*/
class SocketManager {
  private static instance: SocketManager | null = null;
  private userSocket: UserSocketService | null = null;
  private chatSocket: ChatSocketService | null = null;
  private userId: string | null = null;
  private token: string | null = null;
  
  private constructor() {}
  
  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }
  
  public setCredentials(userId: string, token: string): void {
    this.userId = userId;
    this.token = token;
  }
  
  public getUserId(): string | null {
    return this.userId;
  }
  
  public isUserSocketConnected(): boolean {
    return this.userSocket?.isConnected() || false;
  }
  
  public isChatSocketConnected(): boolean {
    return this.chatSocket?.isConnected() || false;
  }
  
  
  // Connecte et configure le socket utilisateur
  public async connectUserSocket(): Promise<UserSocketService> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot connect socket on server side');
    }
    
    if (!this.userId || !this.token) {
      throw new Error('No credentials set for socket connection');
    }
    
    // Initialisation - utiliser le singleton
    if (!this.userSocket?.isConnected()) {
      this.userSocket = UserSocketService.getInstance();
      this.userSocket.connect(this.userId, this.token);
      await waitForConnection(this.userSocket);
      this.userSocket.registerEvents();
    }
    
    if (!this.chatSocket?.isConnected()) {
      logger.warn("SocketManager: Impossible d'établir une connexion socket User");
      return this.userSocket;
    }
    
    try {
      logger.info('SocketManager: Configuration des rooms utilisateur');
      await this.setupUserRooms(this.userSocket);
    } catch (error) {
      logger.error("Erreur lors de la configuration des rooms:", error);
    }

    logger.info('SocketManager: Socket utilisateur configuré avec succès');
    return this.userSocket;
  }
  
  //Connecte et configure le socket de chat
  public async connectChatSocket(conversationIds?: string[]): Promise<ChatSocketService> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot connect socket on server side');
    }
    
    if (!this.userId || !this.token) {
      throw new Error('No credentials set for socket connection');
    }
    
    // Initialisation - utiliser le singleton
    if (!this.chatSocket?.isConnected()) {
      this.chatSocket = ChatSocketService.getInstance();
      this.chatSocket.connect(this.userId, this.token);
      await waitForConnection(this.chatSocket);
      this.chatSocket.registerEvents();
    }
    
    if (!this.chatSocket?.isConnected()) {
      logger.warn("SocketManager: Impossible d'établir une connexion socket chat");
      return this.chatSocket;
    }
    
    
    if (conversationIds && conversationIds.length > 0) {
      const chatService = this.chatSocket;
      chatService.joinAllConversations(conversationIds);
    }
    
    logger.info('SocketManager: Socket chat configuré avec succès');
    return this.chatSocket;
  }
  
  public disconnectUserSocket(): void {
    if (this.userSocket) {
      try {
        // 1. Tenter de récupérer l'ID utilisateur depuis différentes sources
        let userId = this.userSocket.getUserId();
        logger.info('1. Initie la déconnexion du userSocket pour userId ${userId}');
        // Si userId est null, essayer de le récupérer depuis le store utilisateur
        if (!userId) {
          const userFromStore = useUserStore.getState().user?.id;
          // Convertir undefined en null si nécessaire
          userId = userFromStore || null;
          
          if (userId) {
            logger.info('Fallback: userId récupéré depuis le store utilisateur');
          }
        }
        
        
        // 2. Mise à jour du statut utilisateur (hors ligne)
        if (userId) {
          logger.info('2. Passe le statut utilisateur de ${userId} à offline dans le UserStore');
          useUserStore.getState().updateUserStatus(false);
          this.userSocket.updateUserStatus(userId, false);
          logger.info('Socket utilisateur nettoyé, utilisateur marqué hors ligne');
        }
        
        // 3. Quitter les rooms de contacts
        const contactIds = useContactStore.getState().contactList;
        if (contactIds && contactIds.size > 0) {
          this.userSocket.leaveContactsRooms([...contactIds]);
        }
        
        // 4. Désenregistrer les événements et déconnecter// 4. Désenregistrer les événements et déconnecter
        this.userSocket.unregisterEvents();
        this.userSocket.disconnect();
      }       
      catch (error) {
        logger.error('Erreur lors de la déconnexion du socket utilisateur:', error);
      }
      
      this.userSocket = null;
    }
  }
  
  public disconnectChatSocket(): void {
    if (this.chatSocket) {
      try {
        const chatSocketService = this.chatSocket as ChatSocketService;
        
        chatSocketService.unregisterEvents();
        this.chatSocket.disconnect();
        ChatSocketService.resetInstance();
        
        logger.info(`Socket chat déconnecté pour l'utilisateur: ${this.userId || 'inconnu'}`);
      } catch (error) {
        logger.error('Erreur lors de la déconnexion du socket chat:', error);
      }
      
      this.chatSocket = null;
    }
  }
  
  public disconnectAll(): void {
    this.disconnectUserSocket();
    this.disconnectChatSocket();
    this.userId = null;
    this.token = null;
  }
  
  //Configure les rooms de contacts pour l'utilisateur
  private async setupUserRooms(socketService: UserSocketService): Promise<void> {
    if (!this.userId) return;
    
    // Récupérer les contacts
    const contactStore = useContactStore.getState();
    const contactIds = Array.from(contactStore.contactList || []);
    
    // Rejoindre les rooms
    if (contactIds.length > 0) {
      socketService.joinContactsRooms(contactIds);
      logger.info(`Rooms des contacts rejointes: ${contactIds.length}`);
      logger.info('Contact store:', { contactsArray: contactIds });
    }
    
    // Mettre à jour le statut
    socketService.updateUserStatus(this.userId, true);
    logger.info('Statut utilisateur mis à jour dans redis via socket');
  }
  
  //Récupère l'instance du socket utilisateur
  public getUserSocket(): UserSocketService | null {
    return this.userSocket;
  }
  
  //Récupère l'instance du socket chat
  public getChatSocket(): ChatSocketService | null {
    return this.chatSocket;
  }
}

// Exporter une instance unique du gestionnaire
export const socketManager = SocketManager.getInstance(); 