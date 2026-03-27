import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  /**
   * SOLID: Custom handleRequest that is type-safe for NestJS Throttler v6.
   */
  protected async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    const { context, limit, ttl, throttler, blockDuration } = requestProps;
    const clientType = context.getType();

    /**
     * TS FIX: Defensive fallback
     * We ensure throttlerName is always a string to satisfy the compiler.
     */
    const throttlerName = throttler.name ?? 'default';

    // 1. WebSocket Specific Logic
    if (clientType === 'ws') {
      const client = context.switchToWs().getClient();
      
      // Get IP for the key (standard Socket.io structure)
      const ip = client.conn?.remoteAddress || 'unknown';
      
      // Generate the unique key for this IP
      const key = this.generateKey(context, ip, throttlerName);
      
      // Increment hits in storage using the safe throttlerName
      const { totalHits } = await this.storageService.increment(
        key,
        ttl,
        limit,
        blockDuration,
        throttlerName,
      );

      if (totalHits > limit) {
        throw new WsException('ThrottlerException: Too Many Requests');
      }
      return true;
    }

    // 2. HTTP Logic: Delegate back to the original method
    return super.handleRequest(requestProps);
  }
}