import { useEffect, useState, useCallback, useRef } from 'react';
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

    socketService.on<AiChunk>('ai_chunk', (chunk) => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === 'ai') {
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

    return () => {
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