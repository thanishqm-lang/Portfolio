import Fastify from 'fastify';
import { healthResponseSchema, type HealthResponse } from '@awi/shared';
import type { Config } from './config';

const VERSION = '0.1.0';

export function buildServer(config: Config) {
  const app = Fastify({ logger: true });

  app.get('/api/health', async (): Promise<HealthResponse> => {
    // Parse our own output too: the response shape is a contract defined in @awi/shared.
    return healthResponseSchema.parse({
      status: 'ok',
      version: VERSION,
      aiEnabled: config.ANTHROPIC_API_KEY !== undefined,
    });
  });

  return app;
}
