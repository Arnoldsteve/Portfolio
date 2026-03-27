import { Controller, Post, Body, Res, MessageEvent } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@ApiTags('Chat') // Scalar/Swagger grouping
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('stream')
  @ApiOperation({ summary: 'Stream AI response word-by-word' })
  async streamChat(@Body('message') message: string, @Res() res: Response) {
    // Set headers for SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await this.chatService.getResponseStream(message);

    // Standard loop for OpenAI-compatible streams
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        // Format: data: {"text": "hello"} \n\n
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    res.end();
  }
}