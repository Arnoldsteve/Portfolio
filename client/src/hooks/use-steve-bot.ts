import { useEffect, useState, useCallback } from 'react';
import { socketService } from '@/services/socket.service';
import { ChatMessage, AiChunk, SteveStatus } from '@/types/ai-chat';

export const useSteveBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketService.connect();

    socketService.on('connect', () => setIsConnected(true));
    socketService.on('disconnect', () => setIsConnected(false));

    socketService.on<SteveStatus>('steve_status', (status) => {
      setIsTyping(status.typing);
    });

    // Handle Rate Limiting (The Shield)
    socketService.on('exception', (error: any) => {
      if (error?.message?.includes('ThrottlerException')) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: 'error-' + Date.now(),
            role: 'ai',
            content: "⚠️ Whoa there! I'm thinking as fast as I can. Please wait a minute before your next question so I can catch my breath.",
            timestamp: new Date(),
          },
        ]);
      }
    });

    socketService.on<AiChunk>('ai_chunk', (chunk) => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === 'ai' && !lastMsg.id.startsWith('error')) {
          return [
            ...prev.slice(0, -1),
            { ...lastMsg, content: lastMsg.content + chunk.text },
          ];
        }
        return [
          ...prev,
          { id: Date.now().toString(), role: 'ai', content: chunk.text, timestamp: new Date() },
        ];
      });
    });

    // SOLID: Cleanup listeners on unmount to prevent memory leaks
    return () => {
      socketService.off('connect');
      socketService.off('disconnect');
      socketService.off('steve_status');
      socketService.off('ai_chunk');
      socketService.off('exception');
      socketService.disconnect();
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    socketService.emit('send_message', { text });
  }, []);

  return { messages, isTyping, isConnected, sendMessage, setMessages };
};