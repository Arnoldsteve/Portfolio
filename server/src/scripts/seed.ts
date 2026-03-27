import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import * as schema from '../modules/database/schema';
import * as path from 'path';

// --- ENTERPRISE FIX: BYPASS SHARP/NATIVE BINARY ISSUES ---
import { env, pipeline } from '@xenova/transformers';

// 1. Tell the library to ignore browser-specific features and image processing
env.allowLocalModels = true;
env.useBrowserCache = false;

// 2. Explicitly tell the ONNX backend to use CPU (prevents binary search errors)
(env as any).backends = {
  onnx: {
    executionProviders: ['cpu'],
  },
};

// SOLID: Ensure we load the .env relative to this script for reliability
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

class DataSeeder {
  private db: any;
  private groq: OpenAI;
  private extractor: any = null;

  constructor() {
    if (!DATABASE_URL || !GROQ_API_KEY) {
      throw new Error('❌ Missing DATABASE_URL or GROQ_API_KEY in .env');
    }

    const client = neon(DATABASE_URL);
    // OOP: Initialize the Drizzle ORM
    this.db = drizzle(client, { schema });
    
    this.groq = new OpenAI({
      apiKey: GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  /**
   * SOLID: Retrieval Logic
   * Uses a local 384-dimension model to stay cost-free and fast.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.extractor) {
      console.log('📦 Loading local embedding model (384d)...');
      // Xenova's model is optimized for Node.js environments
      this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    const output = await this.extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data) as number[];
  }

  async seed(data: { content: string; source: string }[]) {
    console.log(`🚀 Starting seed for ${data.length} chunks...`);

    for (const item of data) {
      try {
        console.log(`Vectorizing: ${item.source}...`);
        const embedding = await this.generateEmbedding(item.content);

        // CRUD: Inserting into Neon/PostgreSQL
        await this.db.insert(schema.documentSections).values({
          content: item.content,
          source: item.source,
          embedding: embedding, // 384 dimensions
        });
      } catch (error) {
        console.error(`❌ Error seeding ${item.source}:`, (error as Error).message);
      }
    }

    console.log('✅ Seeding complete!');
    process.exit(0);
  }
}

// --- STEVE'S DATA ---
const steveData = [
  {
    source: 'Identity',
    content: 'Steve Arnold Otieno is a Full Stack Engineer specialized in NestJS, Next.js, and Cloud-native architectures. He focuses on high-performance AI integration.',
  },
  {
    source: 'Project: GradeHub',
    content: 'GradeHub is a finance and gradebook management system built with Next.js and NestJS. It features multi-tenant architecture and real-time data processing.',
  },
  {
    source: 'Project: ArtisanBase',
    content: 'ArtisanBase is a platform connecting local artisans with clients, utilizing PostgreSQL for robust data management and a focus on sleek UX.',
  },
  {
    source: 'Experience: iTravel',
    content: 'At iTravel, Steve worked on travel management systems, optimizing API response times and enhancing the frontend user journey.',
  }
];

const seeder = new DataSeeder();
seeder.seed(steveData).catch((err) => {
  console.error('Critical Seeding Error:', err);
  process.exit(1);
});