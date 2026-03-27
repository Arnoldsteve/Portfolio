import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

/**
 * OOP: The Gateway encapsulates all real-time communication.
 * We enable CORS to allow your Next.js frontend to connect.
 */
@WebSocketGateway({
  cors: { origin: '*' }, 
  namespace: 'chat',
})
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService) {}

  /**
   * SOLID: Single Responsibility
   * This handles the "message" event from the recruiter.
   */
  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { text: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 1. Tell the UI Steve is "thinking"
    client.emit('steve_status', { typing: true });

    // 2. Get the stream from our existing ChatService (DRY Principle)
    const stream = await this.chatService.getResponseStream(data.text);

    let fullResponse = "";

    // 3. Stream words back to the client via WebSockets
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        client.emit('ai_chunk', { text: content });
      }
    }

    // 4. Signal completion and stop typing indicator
    client.emit('steve_status', { typing: false });
    client.emit('ai_complete', { fullText: fullResponse });
  }

  /**
   * PROACTIVE LOGIC:
   * This can be called from anywhere in your backend to "nudge" the recruiter.
   */
  sendProactiveNudge(clientId: string, message: string) {
    this.server.to(clientId).emit('proactive_nudge', { text: message });
  }
}