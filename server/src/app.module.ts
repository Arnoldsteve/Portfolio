import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { AiModule } from './modules/ai/ai.module';
import { VectorModule } from './modules/vector/vector.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    DatabaseModule,
    AiModule,
    VectorModule,
    ChatModule,
  ],
})
export class AppModule {}