import { pgTable, serial, text, jsonb, timestamp, customType } from 'drizzle-orm/pg-core';

// Custom type for pgvector (Standard 1536 dimensions for most embeddings)
const vector = customType<{ data: number[] }>({
  dataType() {
    return 'vector(768)';
  },
});

/**
 * SOLID: Single Responsibility
 * This table handles raw knowledge chunks for the RAG system.
 */
export const documentSections = pgTable('document_sections', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),         // The text chunk
  source: text('source').notNull(),          // e.g., 'CV', 'GitHub: GradeHub'
  metadata: jsonb('metadata'),               // Extensible field for extra info
  embedding: vector('embedding').notNull(),  // Mathematical representation
  createdAt: timestamp('created_at').defaultNow(),
});

/**
 * OOP: Chat Session Entity
 * To follow enterprise standards, we persist chat sessions for observability.
 */
export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  externalId: text('external_id').unique(), // UUID for frontend reference
  summary: text('summary'),                  // AI-generated summary of the talk
  createdAt: timestamp('created_at').defaultNow(),
});