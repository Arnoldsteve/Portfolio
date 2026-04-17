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

    try {
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
        `🔄 Loading embedding model (${isProd ? 'local' : 'remote download'})...`,
      );

      this.extractor = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
      );
      
      // Validate the model loaded correctly
      if (!this.extractor) {
        throw new Error('Pipeline returned null/undefined');
      }
      
      // Test embedding generation
      const testEmbedding = await this.generateEmbedding('test');
      if (!testEmbedding || testEmbedding.length !== 384) {
        throw new Error(`Invalid embedding dimension: ${testEmbedding?.length || 0}, expected 384`);
      }
      
      console.log('✅ Embedding model ready (384d vectors validated)');
    } catch (error) {
      console.error('❌ CRITICAL: Failed to load embedding model:', error);
      throw error; // Fail fast - don't start the server with broken embeddings
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.extractor) {
      throw new Error('Embedding model not initialized. Call onModuleInit first.');
    }
    
    try {
      const output = await this.extractor(text, {
        pooling: 'mean',
        normalize: true,
      });
      const embedding = Array.from(output.data) as number[];
      
      // Validate output
      if (!embedding || embedding.length !== 384) {
        throw new Error(`Invalid embedding generated: ${embedding?.length || 0} dimensions`);
      }
      
      return embedding;
    } catch (error) {
      console.error('❌ Embedding generation failed:', error);
      throw error;
    }
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
          sql`1 - (${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}) > 0.20`,
        )
        .orderBy(
          sql`${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}`,
        )
        .limit(limit);

      console.log(`🔍 Vector search for "${query.substring(0, 50)}..." found ${results.length} results`);

      if (!results || results.length === 0) return [];

      // Return structured data for the ChatService to format
      return results.map((r) => ({
        content: r.content,
        url: r.metadata?.url,
      }));
    } catch (error) {
      console.error('❌ Vector Search Error:', error);
      return [];
    }
  }
}
