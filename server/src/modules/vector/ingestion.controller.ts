import { Controller, Post, Headers, UnauthorizedException, Logger } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { GithubAdapter } from './adapters/github.adapter';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { WebCrawlerAdapter } from './adapters/web-crawler.adapter';
import { LinkedinPdfAdapter } from './adapters/linkedin.adapter';

@ApiTags('Ingestion')
@Controller('ingest')
export class IngestionController {
  private readonly logger = new Logger(IngestionController.name);

  constructor(
    private readonly ingestionService: IngestionService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * SOLID: Open/Closed Principle
   * This endpoint triggers the GitHub sync process.
   * We verify the secret before proceeding.
   */
  @Post('github')
  @ApiOperation({ summary: 'Trigger GitHub README synchronization' })
  @ApiHeader({ name: 'x-sync-secret', description: 'Authorization secret' })
  async syncGithub(@Headers('x-sync-secret') secret: string) {
    const validSecret = this.configService.get('SYNC_SECRET');

    if (secret !== validSecret) {
      this.logger.warn('🚫 Unauthorized sync attempt detected.');
      throw new UnauthorizedException('Invalid Sync Secret');
    }

    // 1. Instantiate the specific Strategy (Adapter)
    const adapter = new GithubAdapter(this.configService);

    // 2. Run the Engine (Async to avoid timeout)
    this.logger.log('🚀 Webhook received: Starting GitHub Sync...');
    
    // We don't 'await' here so the webhook returns 201 immediately 
    // while the processing happens in the background.
    this.ingestionService.sync(adapter).catch(err => {
        this.logger.error('❌ Background Sync Failed:', err);
    });

    return { message: 'Synchronization started in background.' };
  }

@Post('web-app')
@ApiOperation({ summary: 'Crawl and sync memory from the live portfolio website' })
async syncWebApp(@Headers('x-sync-secret') secret: string) {
  this.validateSecret(secret);

  const adapter = new WebCrawlerAdapter();
  
  this.logger.log('🌐 Starting Live Web App Crawl...');
  
  this.ingestionService.sync(adapter).catch(err => {
      this.logger.error('❌ Web Sync Failed:', err);
  });

  return { message: 'Web app crawling started in background.' };
}



@Post('linkedin')
async syncLinkedin(@Headers('x-sync-secret') secret: string) {
  this.validateSecret(secret);

  // SWAP: Use the PDF adapter instead of the Playwright one
  const adapter = new LinkedinPdfAdapter();
  
  this.logger.log('📄 Syncing from LinkedIn PDF...');
  this.ingestionService.sync(adapter).catch(err => {
      this.logger.error('❌ LinkedIn Sync Failed:', err);
  });

  return { message: 'LinkedIn PDF processing started.' };
}

private validateSecret(secret: string) {
  if (secret !== this.configService.get('SYNC_SECRET')) {
    throw new UnauthorizedException('Invalid Sync Secret');
  }
}
}