import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { documentSections } from '../modules/database/schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function clearVectors() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL not found in environment');
  }

  const client = neon(connectionString);
  const db = drizzle(client);

  console.log('🗑️ Clearing all document sections...');
  
  await db.delete(documentSections);
  
  console.log('✅ All vectors cleared. Run the ingestion endpoint to re-vectorize.');
  
  process.exit(0);
}

clearVectors().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
