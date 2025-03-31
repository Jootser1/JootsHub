import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Message, User } from './types';

interface ChatWindowProps {
  conversationId: string;
  otherUser: User;
}

export function ChatWindow({ conversationId, otherUser }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isIcebreakerReady, setIsIcebreakerReady] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { sendMessage, isConnected } = useChat({
    conversationId,
    onNewMessage: (message) => {
      setMessages((prev) => [...prev, message]);
    },
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage(newMessage.trim());
    setNewMessage('');
  };

  const handleIcebreakerClick = () => {
    setIsIcebreakerReady(true);
    // Ici, on enverra un événement au serveur pour indiquer que l'utilisateur est prêt
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white">
        <button onClick={() => router.back()} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <Avatar>
          <AvatarImage src={otherUser.avatar} alt={otherUser.username} />
          <AvatarFallback>{otherUser.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{otherUser.username}</h3>
          <p className="text-sm text-muted-foreground">
            {otherUser.isOnline ? 'En ligne' : 'Hors ligne'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === otherUser.id ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.type === 'question'
                    ? 'bg-orange-200 w-full max-w-full'
                    : message.senderId === otherUser.id
                    ? 'bg-gray-100'
                    : 'bg-gray-200'
                }`}
              >
                {message.type === 'question' && message.answers && (
                  <>
                    <div className="font-indie-flower text-sm mb-1">
                      {message.answers.user1}
                    </div>
                    <p className="text-sm font-medium">{message.content}</p>
                    <div className="font-indie-flower text-sm text-right mt-1">
                      {message.answers.user2}
                    </div>
                  </>
                )}
                {!message.type && (
                  <>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input et Icebreaker */}
      <div className="border-t bg-white">
        <form onSubmit={handleSendMessage} className="p-4">
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </form>

        {/* Icebreaker Button */}
        <div className="flex justify-center items-center py-4">
          <Button
            onClick={handleIcebreakerClick}
            className={`rounded-full p-4 ${
              isIcebreakerReady ? 'bg-green-500' : 'bg-white'
            } shadow-md`}
          >
            <img
              src="/icebreaker-icon.svg"
              alt="Icebreaker"
              className="w-8 h-8"
            />
          </Button>
        </div>
      </div>
    </div>
  );
} 