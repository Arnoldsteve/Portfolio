import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// CHANGE THIS LINE: from 'neon-serverless' to 'neon-http'
import { drizzle } from 'drizzle-orm/neon-http'; 
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

export const DRIZZLE_TOKEN = 'DRIZZLE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_TOKEN,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const connectionString = config.getOrThrow<string>('DATABASE_URL');
        
        /**
         * neon(url) returns a "NeonQueryFunction" (HTTP).
         * drizzle-orm/neon-http is designed exactly for this.
         */
        const client = neon(connectionString);
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DRIZZLE_TOKEN],
})
export class DatabaseModule {}