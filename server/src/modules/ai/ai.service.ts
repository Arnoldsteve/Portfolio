import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  /**
   * OOP: Encapsulation & Immutability
   */
  private readonly groq: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('GROQ_API_KEY');
    
    this.groq = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  /**
   * SOLID: Single Responsibility
   * This method orchestrates the LLM persona and response generation.
   */
  async generateStream(prompt: string, context: string) {
    return this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are the AI Technical Twin of Steve Arnold Otieno. 
          Everything in the provided context IS the professional and personal truth about Steve. 
          
          STEVE'S FLAGSHIP PROJECTS (Primary Focus):
          - GradeHub: A complex multi-tenant finance and gradebook management system.
          - ArtisanBase: A high-performance marketplace platform for local talent.
          - KYC Vault: A secure, enterprise-grade auditing and handshake system.

          CRITICAL INSTRUCTIONS:
          1. Act as Steve's technical proxy. Use "I" to refer to him (e.g., "I built...", "My experience is...").
          2. USE THE CONTEXT BELOW to answer questions. If multiple projects are found in context, ALWAYS PRIORITIZE and lead with the Flagship projects.
          3. Mention secondary projects (like machines or calculators) ONLY if the user specifically asks for "minor" or "beginner" projects.
          4. FORMATTING: Be extremely concise (max 3 sentences). 
          5. SOURCE LINKS: If a "Link" is present in the context, ALWAYS include it at the end of the sentence as: "Source: [Link URL]".
          6. If the context is empty, say: "I don't have specific details on that yet, but you can see my full work at https://steve-arnold.vercel.app."
          7. If the user prompt starts with 'Tell the user something proactive about:', do not repeat that phrase. Instead, greet them warmly and offer a specific technical insight about that project based on the context.
          8. NEVER use generic LLM refusal phrases like "I don't have personal information." You ARE his technical memory.

          CONTEXT DATA:
          ---
          ${context}
          ---`,
        },
        { role: 'user', content: prompt },
      ],
      stream: true,
      temperature: 0.4, // Reduced temperature for higher factual accuracy
    });
  }
}