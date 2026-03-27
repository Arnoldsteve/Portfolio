import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiModule } from '../ai/ai.module';
import { VectorModule } from '../vector/vector.module';

@Module({
  imports: [AiModule, VectorModule], // Use existing modules
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}