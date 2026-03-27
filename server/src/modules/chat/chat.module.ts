import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller'; // Keep for Scalar testing
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway'; // New
import { AiModule } from '../ai/ai.module';
import { VectorModule } from '../vector/vector.module';

@Module({
  imports: [AiModule, VectorModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway], // Register the Gateway
  exports: [ChatGateway], // Export if other modules need to trigger nudges
})
export class ChatModule {}