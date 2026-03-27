import { IKnowledgeAdapter, ProcessedKnowledge } from '../interfaces/knowledge-adapter.interface';
import * as fs from 'fs';
import * as path from 'path';

export class LinkedinPdfAdapter implements IKnowledgeAdapter {
  private readonly pdfPath = path.join(process.cwd(), 'src/knowledge/linkedin-profile.pdf');

  async fetchAndProcess(): Promise<ProcessedKnowledge[]> {
    try {
      if (!fs.existsSync(this.pdfPath)) return [];

      const dataBuffer = fs.readFileSync(this.pdfPath);

      // WORKAROUND: Force CommonJS resolution inside the method
      const pdf = require('pdf-parse');
      const pdfData = await pdf(dataBuffer);
      
      const cleanText = pdfData.text.replace(/\n\s*\n/g, '\n').trim();

      return [{
        source: 'linkedin-pdf',
        sourceId: 'official-profile-pdf',
        url: 'https://www.linkedin.com/in/steve-arnold-otieno',
        content: `Steve's Official LinkedIn Resume Data:\n${cleanText}`,
        metadata: { type: 'career-history' }
      }];
    } catch (error) {
      console.error('❌ PDF Error:', error.message);
      return [];
    }
  }
}