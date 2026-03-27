
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './src/modules/database/schema.ts', // Path to your schema
  out: './src/modules/database/migrations',   // Where migrations will be saved
  dialect: 'postgresql',                      // Use the new dialect field
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});