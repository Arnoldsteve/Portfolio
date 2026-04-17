import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../database/database.module';
import { documentSections } from '../database/schema';
import { sql } from 'drizzle-orm';
import { pipeline, env } from '@xenova/transformers';

@Injectable()
export class VectorService implements OnModuleInit {
  private extractor: any;

  constructor(@Inject(DRIZZLE_TOKEN) private db: any) {}

  async onModuleInit() {
    const isProd = process.env.NODE_ENV === 'production';

    if (isProd) {
      // 2. CONFIGURE ENVIRONMENT BEFORE LOADING PIPELINE
      // Disable remote downloading to protect your 1GB RAM
      env.allowRemoteModels = false;

      // Point to the folder we created in the Dockerfile
      env.localModelPath = './models/';
      // Load the model into memory once when the server starts
    } else {
      // Local dev: download and cache the model automatically
      env.allowRemoteModels = true;
      env.localModelPath = './models/'; // will create & cache here on first run
    }
    console.log(
      `Loading embedding model (${isProd ? 'local' : 'remote download'})...`,
    );

    this.extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
    );
    console.log('Embedding model ready ✅');
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const output = await this.extractor(text, {
      pooling: 'mean',
      normalize: true,
    });
    return Array.from(output.data);
  }

  /**
   * SOLID: Retrieval logic
   * Increased limit to 10 to ensure flagship projects aren't "buried" by smaller repos.
   */
  async findSimilarContent(
    query: string,
    limit = 10,
  ): Promise<{ content: string; url?: string }[]> {
    try {
      const queryEmbedding = await this.generateEmbedding(query);

      const results = await this.db
        .select({
          content: documentSections.content,
          metadata: documentSections.metadata, // IMPORTANT: Select metadata for the URL
        })
        .from(documentSections)
        .where(
          sql`1 - (${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}) > 0.25`,
        )
        .orderBy(
          sql`${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}`,
        )
        .limit(limit);

      if (!results || results.length === 0) return [];

      // Return structured data for the ChatService to format
      return results.map((r) => ({
        content: r.content,
        url: r.metadata?.url,
      }));
    } catch (error) {
      console.error('Vector Search Error:', error);
      return [];
    }
  }
}
