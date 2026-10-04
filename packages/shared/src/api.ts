import { z } from 'zod';

export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  version: z.string(),
  /** False when no API key is configured; the dashboard still works (NS-6). */
  aiEnabled: z.boolean(),
});
export type HealthResponse = z.infer<typeof healthResponseSchema>;
