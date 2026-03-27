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

  async findSimilarContent(query: string, limit = 3): Promise<string> {
    try {
      const queryEmbedding = await this.generateEmbedding(query);

      const results = await this.db
        .select({ content: documentSections.content })
        .from(documentSections)
        // SOLID: We calculate similarity score explicitly
        .where(
          sql`1 - (${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}) > 0.4`,
        )
        .orderBy(
          sql`${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}`,
        )
        .limit(limit);

      // If no similar content is found, return an empty string
      // This allows the AI to know it has no "facts" to rely on.
      if (!results || results.length === 0) return '';

      return results.map((r) => r.content).join('\n\n');
    } catch (error) {
      console.error('Vector Search Error:', error);
      return ''; // Fail gracefully: better to have no context than a crashed app
    }
  }
}
