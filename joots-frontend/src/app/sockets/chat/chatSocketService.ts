import { BaseSocketService } from '../BaseSocketService';
import { logger } from '@/utils/logger';
import { useChatStore } from '@/stores/chatStore';
import { chatEventRegistry } from './chatEventRegistry';

const chatStore = useChatStore.getState(); // Récupère le store en dehors du hook


export class ChatSocketService extends BaseSocketService {
  private static instance: ChatSocketService | null = null;

  constructor() {
    super('chat');
  }

  public registerEvents() {
    Object.entries(chatEventRegistry).forEach(([event, handler]) => {
      this.onEvent(event, handler);
    });
  }

  public unregisterEvents() {
    this.closeExistingSocketConnection();
  }

  static getInstance(): ChatSocketService {
    if (!ChatSocketService.instance) {
      ChatSocketService.instance = new ChatSocketService();
    }
    return ChatSocketService.instance;
  }
  
  joinConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de rejoindre la conversation: non connecté');
      return;
    }
    
    this.socket.emit('joinConversation', conversationId);
  }
  
  leaveConversation(conversationId: string): void {
    if (!this.socket?.connected) return;
    this.socket.emit('leaveConversation', conversationId);
  }
  
  sendMessage = (conversationId: string, content: string, userId: string) => {
    if (!this.socket?.connected) return;
    this.socket.emit('sendMessage', { conversationId, content, userId });
  }

  sendTypingStatus = (conversationId: string, isTyping: boolean) => {
    if (!this.socket?.connected) return;
    this.socket.emit('typingStatus', { conversationId, isTyping });
  };
  
  
  

}