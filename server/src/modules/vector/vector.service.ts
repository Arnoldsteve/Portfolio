import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../database/database.module';
import { documentSections } from '../database/schema';
import { sql } from 'drizzle-orm';
import { pipeline } from '@xenova/transformers';

@Injectable()
export class VectorService implements OnModuleInit {
  private extractor: any;

  constructor(@Inject(DRIZZLE_TOKEN) private db: any) {}

  async onModuleInit() {
    // Load the model into memory once when the server starts
    this.extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
    );
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
  async findSimilarContent(query: string, limit = 10): Promise<{ content: string, url?: string }[]> {
    try {
      const queryEmbedding = await this.generateEmbedding(query);

      const results = await this.db
        .select({ 
          content: documentSections.content,
          metadata: documentSections.metadata // IMPORTANT: Select metadata for the URL
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
        url: r.metadata?.url
      }));
    } catch (error) {
      console.error('Vector Search Error:', error);
      return []; 
    }
  }
}