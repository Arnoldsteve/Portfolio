import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  // Use 'readonly' to follow OOP principles (immutability)
  private readonly groq: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('GROQ_API_KEY');
    
    // Initialize directly in the constructor to satisfy the TS compiler
    this.groq = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  /**
   * SOLID: Single Responsibility
   * This method only handles generating stream responses from the LLM.
   */
  async generateStream(prompt: string, context: string) {
    return this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are the technical twin of Steve Arnold Otieno. 
          Use this context to answer: ${context}.
          If the context doesn't contain the answer, say you don't know and invite them to email Steve.
          Keep responses concise, technical, and professional.`,
        },
        { role: 'user', content: prompt },
      ],
      stream: true,
      temperature: 0.6,
    });
  }
}