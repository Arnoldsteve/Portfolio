import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  providers: [AiService],
  exports: [AiService], // Exported so the ChatModule can use it later
})
export class AiModule {}