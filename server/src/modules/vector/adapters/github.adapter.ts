import { Octokit } from 'octokit';
import { IKnowledgeAdapter, ProcessedKnowledge } from '../interfaces/knowledge-adapter.interface';
import { ConfigService } from '@nestjs/config';

export class GithubAdapter implements IKnowledgeAdapter {
  private octokit: Octokit;
  private username: string;

  constructor(private configService: ConfigService) {
    this.octokit = new Octokit({
      auth: this.configService.getOrThrow('GITHUB_TOKEN'),
    });
    this.username = this.configService.getOrThrow('GITHUB_USERNAME');
  }

  /**
   * SOLID: Implementation of the contract
   */
  async fetchAndProcess(): Promise<ProcessedKnowledge[]> {
    const results: ProcessedKnowledge[] = [];

    // 1. Fetch all public repositories for the user
    const repos = await this.octokit.rest.repos.listForUser({
      username: this.username,
      sort: 'updated',
      per_page: 10, // We take the top 10 most recent/relevant
    });

    for (const repo of repos.data) {
      try {
        // 2. Fetch the README content
        const readme = await this.octokit.rest.repos.getReadme({
          owner: this.username,
          repo: repo.name,
          mediaType: { format: 'raw' }, // Get raw text, not base64
        });

        // 3. REFINERY: Clean the markdown to make it "Concise"
        const cleanedContent = this.refineReadme(readme.data as unknown as string);

        results.push({
          source: 'github',
          sourceId: repo.name,
          url: repo.html_url,
          content: `Project Name: ${repo.name}\nDescription: ${repo.description || 'No description'}\nTechnical Details: ${cleanedContent}`,
          metadata: {
            stars: repo.stargazers_count,
            language: repo.language,
          },
        });
      } catch (e) {
        // Skip repos that don't have a README
        continue;
      }
    }

    return results;
  }

  /**
   * DATA REFINERY:
   * Strips out badges, images, and non-technical noise.
   */
  private refineReadme(text: string): string {
    return text
      .replace(/!\[.*\]\(.*\)/g, '') // Remove images
      .replace(/\[!\[.*\]\(.*\)]\(.*\)/g, '') // Remove badges/links
      .replace(/<[^>]*>?/gm, '') // Remove HTML tags
      .slice(0, 1500); // Keep it concise for the RAG window
  }
}