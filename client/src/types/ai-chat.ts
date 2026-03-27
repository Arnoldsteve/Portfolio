/**
 * SOLID: Interface Segregation
 * Defining the shape of our real-time AI communication.
 */

export type ChatRole = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
}

export interface SteveStatus {
  typing: boolean;
}

export interface AiChunk {
  text: string;
}

export interface AiComplete {
  fullText: string;
}