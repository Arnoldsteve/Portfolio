import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../database/database.module';
import { documentSections } from '../database/schema';
import { sql } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai'; // Groq uses the OpenAI-compatible SDK

@Injectable()
export class VectorService implements OnModuleInit {
  private groq: OpenAI;

  constructor(
    @Inject(DRIZZLE_TOKEN) private db: any,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.groq = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('GROQ_API_KEY'),
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  /**
   * SOLID: Retrieval Logic
   * Uses Groq's Nomic model to vectorize the search query.
   */
  async findSimilarContent(query: string, limit = 3): Promise<string> {
    // 1. Generate embedding using Groq
    const response = await this.groq.embeddings.create({
      model: 'nomic-embed-text-v1.5',
      input: query,
    });
    const queryEmbedding = response.data[0].embedding;

    // 2. Vector search in Neon
    const results = await this.db
      .select({
        content: documentSections.content,
      })
      .from(documentSections)
      .where(sql`1 - (${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}) > 0.5`)
      .orderBy(sql`${documentSections.embedding} <=> ${JSON.stringify(queryEmbedding)}`)
      .limit(limit);

    return results.map((r) => r.content).join('\n\n');
  }
}