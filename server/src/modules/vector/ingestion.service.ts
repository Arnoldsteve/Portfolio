import { Injectable, Inject, Logger } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../database/database.module';
import { documentSections } from '../database/schema';
import { VectorService } from './vector.service';
import { IKnowledgeAdapter } from './interfaces/knowledge-adapter.interface';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'crypto';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    @Inject(DRIZZLE_TOKEN) private db: any,
    private readonly vectorService: VectorService,
  ) {}

  /**
   * SOLID: The Ingestion logic is decoupled from data sources.
   * Now handles priority weighting and deep metadata storage.
   */
  async sync(adapter: IKnowledgeAdapter) {
    const rawData = await adapter.fetchAndProcess();
    this.logger.log(`🔄 Syncing ${rawData.length} items from ${adapter.constructor.name}...`);

    for (const item of rawData) {
      // 1. Generate a Checksum (SHA-256) to detect content changes
      const currentChecksum = crypto
        .createHash('sha256')
        .update(item.content)
        .digest('hex');

      // 2. Lookup existing record by source and sourceId
      const existing = await this.db
        .select()
        .from(documentSections)
        .where(
          and(
            eq(documentSections.source, item.source),
            eq(documentSections.sourceId, item.sourceId)
          )
        )
        .limit(1);

      const record = existing[0];

      // 3. Efficiency Layer: Skip if content is identical
      if (record && record.checksum === currentChecksum) {
        this.logger.log(`⏭️ Skipping ${item.sourceId} - content unchanged.`);
        continue;
      }

      // 4. Vectorize new or updated content
      const priorityTag = item.metadata?.priority === 'high' ? ' [HIGH PRIORITY] ' : '';
      this.logger.log(`✨ Vectorizing${priorityTag}: ${item.sourceId}...`);
      
      const embedding = await this.vectorService.generateEmbedding(item.content);

      // 5. Construct Metadata Object
      const metadataPayload = {
        url: item.url,
        ...(item.metadata || {}),
        lastSyncedAt: new Date().toISOString(),
      };

      if (record) {
        // Update existing entry
        await this.db
          .update(documentSections)
          .set({
            content: item.content,
            checksum: currentChecksum,
            embedding: embedding,
            metadata: metadataPayload,
            updatedAt: new Date(),
          })
          .where(eq(documentSections.id, record.id));
      } else {
        // Insert new entry
        await this.db.insert(documentSections).values({
          source: item.source,
          sourceId: item.sourceId,
          content: item.content,
          checksum: currentChecksum,
          embedding: embedding,
          metadata: metadataPayload,
        });
      }
    }
    this.logger.log(`✅ ${adapter.constructor.name} synchronization complete.`);
  }
}