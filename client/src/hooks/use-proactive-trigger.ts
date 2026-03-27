import { useCallback } from 'react';
import { socketService } from '@/services/socket.service';

export const useProactiveTrigger = () => {
  /**
   * SOLID: This hook allows any component to trigger a 
   * specific conversation topic without the user typing first.
   */
  const triggerTopic = useCallback((topic: string) => {
    if (socketService.isConnected()) {
      socketService.emit('send_message', { 
        text: `Tell the user something proactive about: ${topic}` 
      });
    }
  }, []);

  return { triggerTopic };
};