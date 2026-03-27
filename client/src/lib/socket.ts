import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Infrastructure Layer: Low-level socket configuration.
 * We initialize the socket for the '/chat' namespace.
 */
export const socket: Socket = io(`${SOCKET_URL}/chat`, {
  transports: ['websocket'],
  autoConnect: false, // We let the service control when to connect/disconnect
  withCredentials: true,
});