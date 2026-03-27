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
   * SOLID: The Ingestion logic is decoupled from the data sources.
   * It takes any class that implements IKnowledgeAdapter.
   */
  async sync(adapter: IKnowledgeAdapter) {
    const rawData = await adapter.fetchAndProcess();
    this.logger.log(`🔄 Syncing ${rawData.length} items from source...`);

    for (const item of rawData) {
      // 1. Generate a Checksum (SHA-256) to detect changes
      const currentChecksum = crypto
        .createHash('sha256')
        .update(item.content)
        .digest('hex');

      // 2. Check if this source already exists in Neon
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

      // 3. Skip if content hasn't changed (The Efficiency Layer)
      if (record && record.checksum === currentChecksum) {
        this.logger.log(`⏭️ Skipping ${item.sourceId} - no changes.`);
        continue;
      }

      // 4. Vectorize only if new or changed
      this.logger.log(`✨ Vectorizing/Updating ${item.sourceId}...`);
      const embedding = await this.vectorService.generateEmbedding(item.content);

      if (record) {
        // Update existing memory
        await this.db
          .update(documentSections)
          .set({
            content: item.content,
            checksum: currentChecksum,
            embedding: embedding,
            metadata: { url: item.url, ...item.metadata },
            updatedAt: new Date(),
          })
          .where(eq(documentSections.id, record.id));
      } else {
        // Insert new memory
        await this.db.insert(documentSections).values({
          source: item.source,
          sourceId: item.sourceId,
          content: item.content,
          checksum: currentChecksum,
          embedding: embedding,
          metadata: { url: item.url, ...item.metadata },
        });
      }
    }
  }
}