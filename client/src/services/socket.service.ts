import { socket } from '@/lib/socket';

/**
 * Domain Service Layer: High-level socket management.
 * SOLID: This service depends on the abstraction (socket) from lib.
 */
class SocketService {
  public connect(): void {
    if (!socket.connected) {
      socket.connect();
    }
  }

  public disconnect(): void {
    if (socket.connected) {
      socket.disconnect();
    }
  }

  // Wrapper for listening to events with type safety
  public on<T>(event: string, callback: (data: T) => void): void {
    socket.on(event, callback);
  }

  // Wrapper for sending events
  public emit(event: string, data: any): void {
    socket.emit(event, data);
  }

  // Wrapper for removing listeners (to prevent memory leaks)
  public off(event: string): void {
    socket.off(event);
  }

  public isConnected(): boolean {
    return socket.connected;
  }
}

export const socketService = new SocketService();