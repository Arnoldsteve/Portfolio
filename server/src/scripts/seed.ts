import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import * as schema from '../modules/database/schema';
import * as path from 'path';
import * as fs from 'fs';

// --- ENTERPRISE FIX: BYPASS SHARP/NATIVE BINARY ISSUES ---
import { env, pipeline } from '@xenova/transformers';
env.allowLocalModels = true;
env.useBrowserCache = false;
(env as any).backends = { onnx: { executionProviders: ['cpu'] } };

// SOLID: Configuration Management
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

class DataSeeder {
  private db: any;
  private extractor: any = null;

  constructor() {
    if (!DATABASE_URL) throw new Error('❌ DATABASE_URL missing');
    const client = neon(DATABASE_URL);
    this.db = drizzle(client, { schema });
  }

  /**
   * Fresh Start Logic (Idempotency)
   * Prevents duplicate vectors if you run the script multiple times.
   */
  async clearExistingMemory() {
    console.log('🧹 Clearing existing knowledge base...');
    await this.db.delete(schema.documentSections);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.extractor) {
      console.log('📦 Loading local embedding model (384d)...');
      this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    const output = await this.extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data) as number[];
  }

  /**
   * SOLID: The core ingestion engine
   */
  async seed(data: { content: string; source: string }[]) {
    console.log(`🚀 Starting ingestion for ${data.length} professional chunks...`);

    for (const item of data) {
      try {
        console.log(`Vectorizing [${item.source}]...`);
        const embedding = await this.generateEmbedding(item.content);

        await this.db.insert(schema.documentSections).values({
          content: item.content,
          source: item.source,
          embedding: embedding,
        });
      } catch (error) {
        console.error(`❌ Failed to seed ${item.source}:`, (error as Error).message);
      }
    }
    console.log('✅ AI Memory successfully updated!');
  }
}

/**
 * Execution Wrapper
 * Handles file system operations and class orchestration.
 */
async function runSeeder() {
  const seeder = new DataSeeder();

  // 1. Resolve path to your bio.json
  const knowledgePath = path.resolve(__dirname, '../knowledge/bio.json');
  
  if (!fs.existsSync(knowledgePath)) {
    throw new Error(`❌ Knowledge file not found at ${knowledgePath}`);
  }

  // 2. Read and Parse the data
  const rawData = fs.readFileSync(knowledgePath, 'utf-8');
  const knowledgeData = JSON.parse(rawData);

  // 3. Clear and Re-seed (Optional: remove clearExistingMemory() if you want to keep adding)
  await seeder.clearExistingMemory();
  await seeder.seed(knowledgeData);

  process.exit(0);
}

runSeeder().catch((err) => {
  console.error('Critical Seeder Error:', err);
  process.exit(1);
});