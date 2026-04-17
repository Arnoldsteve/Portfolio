// C:\Users\USER\Documents\personal-work\Portfolio\server\src\modules\vector\adapters\web-crawler.adapter.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { IKnowledgeAdapter, ProcessedKnowledge } from '../interfaces/knowledge-adapter.interface';

const BASE_URL = 'https://steve-arnold.vercel.app';

// All known pages to crawl
const PAGES_TO_CRAWL = [
  { url: `${BASE_URL}/`,                      sourceId: 'home',         label: 'Homepage & Hero' },
  { url: `${BASE_URL}/about`,                 sourceId: 'about',        label: 'About & Professional Journey' },
  { url: `${BASE_URL}/service?serviceId=1`,   sourceId: 'service-1',    label: 'Service: SEO-Optimized Business Sites' },
  { url: `${BASE_URL}/service?serviceId=2`,   sourceId: 'service-2',    label: 'Service: Secure E-Commerce Solutions' },
  { url: `${BASE_URL}/service?serviceId=3`,   sourceId: 'service-3',    label: 'Service: Custom Web Applications' },
  { url: `${BASE_URL}/service?serviceId=4`,   sourceId: 'service-4',    label: 'Service: Optimization & Maintenance' },
  { url: `${BASE_URL}/project?projectId=1`,   sourceId: 'project-1',    label: 'Project: GradeHub' },
  { url: `${BASE_URL}/project?projectId=2`,   sourceId: 'project-2',    label: 'Project: KYC Vault Africa' },
  { url: `${BASE_URL}/project?projectId=3`,   sourceId: 'project-3',    label: 'Project: iTravel' },
  { url: `${BASE_URL}/project?projectId=4`,   sourceId: 'project-4',    label: 'Project: ArtisanBase' },
  { url: `${BASE_URL}/project?projectId=5`,   sourceId: 'project-5',    label: 'Project: Legacy Library System' },
];

export class WebCrawlerAdapter implements IKnowledgeAdapter {

  async fetchAndProcess(): Promise<ProcessedKnowledge[]> {
    const results: ProcessedKnowledge[] = [];

    // 1. Optionally grab the PDF CV
    await this.extractPdfResume(results);

    // 2. Scrape every known page
    for (const page of PAGES_TO_CRAWL) {
      try {
        console.log(`🌐 Scraping [${page.label}]...`);
        const { data: html } = await axios.get(page.url, { timeout: 10000 });
        const content = this.extractCleanText(html, page.label);

        if (content.length > 100) {
          results.push({
            source: 'web-portfolio',
            sourceId: page.sourceId,
            url: page.url,
            content,
            metadata: {
              label: page.label,
              type: page.sourceId.startsWith('project') ? 'project'
                  : page.sourceId.startsWith('service') ? 'service'
                  : page.sourceId === 'about' ? 'about'
                  : 'home',
              priority: ['project-1', 'project-2', 'project-3', 'project-4'].includes(page.sourceId)
                ? 'high'
                : 'normal',
            },
          });
          console.log(`✅ [${page.label}] — ${content.length} chars captured.`);
        } else {
          console.warn(`⚠️ [${page.label}] — content too short, skipping.`);
        }
      } catch (err) {
        console.error(`❌ Failed to scrape [${page.label}]:`, err.message);
      }
    }

    return results;
  }

  /**
   * Strips nav, footer, scripts, and image alt text noise.
   * Returns clean readable text from the page body.
   */
  private extractCleanText(html: string, label: string): string {
    const $ = cheerio.load(html);

    // Remove noise
    $('nav, footer, script, style, noscript, button, [aria-hidden="true"]').remove();
    $('img').each((_, el) => {
      // Remove img tags but keep alt text if meaningful
      const alt = $(el).attr('alt') || '';
      $(el).replaceWith(alt.length > 5 ? `` : '');
    });

    // Get clean text
    const rawText = $('body')
      .text()
      .replace(/\s{2,}/g, ' ')   // collapse whitespace
      .replace(/\n{2,}/g, '\n')  // collapse newlines
      .trim();

    return `[PAGE: ${label}]\n${rawText}`;
  }

  /**
   * Attempts to download and parse the PDF CV.
   * Failure here is non-fatal — main scraping continues regardless.
   */
  private async extractPdfResume(results: ProcessedKnowledge[]): Promise<void> {
    const pdfUrl = `${BASE_URL}/Steve_Arnold_SE_Resume.pdf`;
    let parser: any = null;
    
    try {
      console.log(`📄 Fetching PDF Resume...`);
      const response = await axios.get(pdfUrl, {
        responseType: 'arraybuffer',
        timeout: 15000,
      });

      // pdf-parse v2.x uses class-based API
      const { PDFParse } = require('pdf-parse');
      const dataBuffer = Buffer.from(response.data);
      
      // Initialize parser with buffer data
      parser = new PDFParse({ data: dataBuffer });
      
      // Extract text using v2 API
      const result = await parser.getText();
      const extractedText = result.text || '';

      if (extractedText.trim().length > 100) {
        results.push({
          source: 'web-portfolio',
          sourceId: 'official-cv',
          url: pdfUrl,
          content: `[SOURCE: OFFICIAL CV/RESUME — HIGH PRIORITY METRICS]\n${extractedText.trim()}`,
          metadata: { type: 'resume', priority: 'high' },
        });
        console.log(`✅ PDF CV successfully parsed — ${extractedText.length} chars.`);
      } else {
        console.warn(`⚠️ PDF extraction failed to find text content.`);
      }

    } catch (err) {
      console.warn(`❌ PDF extraction failed: ${err.message}`);
    } finally {
      // Always destroy parser to free memory
      if (parser && typeof parser.destroy === 'function') {
        await parser.destroy();
      }
    }
  }
}