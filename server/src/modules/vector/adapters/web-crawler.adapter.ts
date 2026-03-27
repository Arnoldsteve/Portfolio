import axios from 'axios';
import * as cheerio from 'cheerio';
import { IKnowledgeAdapter, ProcessedKnowledge } from '../interfaces/knowledge-adapter.interface';

export class WebCrawlerAdapter implements IKnowledgeAdapter {
  private readonly baseUrl = 'https://steve-arnold.vercel.app';

  async fetchAndProcess(): Promise<ProcessedKnowledge[]> {
    const results: ProcessedKnowledge[] = [];

    try {
      // 1. Fetch the HTML
      const { data: html } = await axios.get(this.baseUrl);
      const $ = cheerio.load(html);

      // 2. Identify logical sections (Enterprise Logic: Semantic Scraping)
      // We look for sections, articles, or main content areas
      $('section, article, main').each((index, element) => {
        const sectionId = $(element).attr('id') || `section-${index}`;
        const sectionTitle = $(element).find('h1, h2, h3').first().text().trim();
        
        // Clean the text: remove extra whitespace and newlines
        const rawContent = $(element).text().replace(/\s\s+/g, ' ').trim();

        // 3. Noise Filter: Only ingest if there is meaningful content (> 100 chars)
        if (rawContent.length > 100) {
          results.push({
            source: 'web-portfolio',
            sourceId: `page-home-${sectionId}`,
            url: `${this.baseUrl}/#${sectionId}`,
            content: `Topic: ${sectionTitle || 'Portfolio Info'}\nContext from Live Site: ${rawContent}`,
            metadata: {
              componentId: sectionId,
              crawledAt: new Date().toISOString()
            }
          });
        }
      });

    } catch (error) {
      console.error('❌ Web Crawler failed:', error.message);
    }

    return results;
  }
}