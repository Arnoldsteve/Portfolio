import { pgTable, serial, text, jsonb, timestamp, varchar, customType } from 'drizzle-orm/pg-core';

/**
 * SOLID: Explicit Vector Type for pgvector
 * We use 384 dimensions to match the local Xenova model.
 */
export const vector = customType<{ data: number[] }>({
  dataType() {
    return 'vector(384)';
  },
  // CRITICAL: Turns the number array into a single JSON string "[0.1, 0.2...]"
  toDriver(value: number[]) {
    return JSON.stringify(value);
  },
  fromDriver(value: unknown) {
    // Standardize the return as a number array
    return typeof value === 'string' 
      ? JSON.parse(value) 
      : (value as number[]);
  },
});

export const documentSections = pgTable('document_sections', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  
  // NEW: Tracking external sources
  source: varchar('source', { length: 50 }).notNull(),   // e.g., 'github', 'linkedin'
  sourceId: varchar('source_id', { length: 255 }),      // e.g., 'repo-12345'
  
  // NEW: Performance & Synchronization
  checksum: varchar('checksum', { length: 64 }),        // SHA-256 hash to detect changes
  
  // Standardized metadata for Links (e.g., { "url": "https://github.com/...", "stars": 50 })
  metadata: jsonb('metadata').$type<{ url?: string; [key: string]: any }>(),
  
  embedding: vector('embedding').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});




export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  externalId: text('external_id').unique(),
  summary: text('summary'),
  createdAt: timestamp('created_at').defaultNow(),
});