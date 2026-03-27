import { Module } from '@nestjs/common';
import { VectorService } from './vector.service';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';

@Module({
  controllers: [IngestionController], 
  providers: [VectorService, IngestionService],
  exports: [VectorService, IngestionService],
})
export class VectorModule {}