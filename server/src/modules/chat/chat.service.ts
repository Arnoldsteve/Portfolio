import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { VectorService } from '../vector/vector.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly vectorService: VectorService,
  ) {}

  /**
   * SOLID: Single Responsibility
   * This method orchestrates the RAG (Retrieval-Augmented Generation) pipeline.
   */
  async getResponseStream(userQuery: string) {
    // 1. Retrieve structured "Steve Facts" from Neon/pgvector
    // We increased retrieval to 10 items in VectorService to ensure depth.
    const contextItems = await this.vectorService.findSimilarContent(userQuery);

    // 2. Observability: Log the hits for debugging
    this.logger.log(`🔍 User Query: "${userQuery}" | Context Chunks Found: ${contextItems.length}`);

    // 3. Format the context for the AI Brain
    // We explicitly label the Source Link so the AiService prompt rules can find it.
    const formattedContext = contextItems.length > 0
      ? contextItems
          .map((item) => `Fact: ${item.content} ${item.url ? `| Link: ${item.url}` : ''}`)
          .join('\n\n')
      : "No direct information found in Steve's technical memory.";

    // 4. Generate the streaming response from Groq
    return this.aiService.generateStream(userQuery, formattedContext);
  }
}