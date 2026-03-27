import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler'; 
import { DatabaseModule } from './modules/database/database.module';
import { AiModule } from './modules/ai/ai.module';
import { VectorModule } from './modules/vector/vector.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
   ConfigModule.forRoot({ isGlobal: true }),
    
    // SOLID: Global Rate Limiting Policy
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time to live: 60 seconds
      limit: 10,  // Max 10 requests per minute per IP
    }]),
    DatabaseModule,
    AiModule,
    VectorModule,
    ChatModule,
  ],
})
export class AppModule {}