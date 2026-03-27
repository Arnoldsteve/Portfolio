/**
 * SOLID: Interface Segregation
 * Every adapter must return this standardized "ProcessedKnowledge" object.
 */
export interface ProcessedKnowledge {
  source: string;        // e.g., 'github'
  sourceId: string;      // e.g., 'repo-name'
  content: string;       // The cleaned text
  url: string;           // The link for the AI to provide to users
  metadata?: Record<string, any>;
}

export interface IKnowledgeAdapter {
  /**
   * Fetches data from the external source and standardizes it.
   */
  fetchAndProcess(): Promise<ProcessedKnowledge[]>;
}