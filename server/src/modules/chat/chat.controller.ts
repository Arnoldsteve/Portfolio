import { Controller, Post, Body, Res, Header, HttpStatus, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AppThrottlerGuard } from 'src/common/guards/throttler.guard';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * SOLID: Single Responsibility
   * This endpoint manages the HTTP lifecycle for the AI stream.
   * Using @Header decorators ensures NestJS handles the response metadata correctly.
   */
  @UseGuards(AppThrottlerGuard)
  @Post('stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @ApiOperation({ summary: 'Stream Steve-Bot response word-by-word via SSE' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { message: { type: 'string', example: 'Tell me about GradeHub' } } 
    } 
  })
  async streamChat(@Body('message') message: string, @Res() res: Response) {
    try {
      // Orchestrate retrieval and inference
      const stream = await this.chatService.getResponseStream(message);

      // Iterate through the Groq stream chunks
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        
        if (content) {
          /**
           * SSE Format requirement: data: <payload>\n\n
           * We wrap the text in a JSON object for easier frontend consumption.
           */
          res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
        }
      }

      // Signal the end of the stream
      res.end();
    } catch (error) {
      console.error('Chat Streaming Error:', error);
      
      /**
       * If streaming fails before headers are sent, we can return JSON error.
       * If it fails mid-stream, the connection will simply close.
       */
      if (!res.headersSent) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: 500,
          message: 'AI Service currently unavailable. Check Model ID or API Key.',
        });
      } else {
        res.end();
      }
    }
  }
}