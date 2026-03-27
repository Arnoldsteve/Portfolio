import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { VectorService } from '../vector/vector.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly aiService: AiService,
    private readonly vectorService: VectorService,
  ) {}

  /**
   * SOLID: This method orchestrates the RAG flow.
   * 1. Get Memory -> 2. Ask AI -> 3. Return Stream
   */
  async getResponseStream(userQuery: string) {
    // 1. Retrieve relevant "Steve Facts" from Neon/pgvector
    const context = await this.vectorService.findSimilarContent(userQuery);

    // 2. Generate the streaming response from Groq
    return this.aiService.generateStream(userQuery, context);
  }
}