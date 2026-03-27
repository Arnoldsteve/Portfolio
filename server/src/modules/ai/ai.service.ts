import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService implements OnModuleInit {
  private groq: OpenAI;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.getOrThrow<string>('GROQ_API_KEY');
    
    // OOP: Encapsulating the Groq client initialization
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
      model: 'llama3-8b-8192', // The "Speed" choice for Llama 3
      messages: [
        {
          role: 'system',
          content: `You are the technical twin of Steve Arnold Otieno. 
          Respond professionally based on this context: ${context}.
          If you don't know the answer, tell them to contact Steve directly.`,
        },
        { role: 'user', content: prompt },
      ],
      stream: true,
      temperature: 0.6,
    });
  }
}