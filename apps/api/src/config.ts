import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1).default('./data/awi.db'),
  // An empty string in .env means "not set" (NS-6: the app runs without AI).
  ANTHROPIC_API_KEY: z
    .string()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
});

export type Config = z.infer<typeof envSchema>;

/** The single place process.env is read; everything downstream gets typed, validated config (NS-4). */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    throw new Error(`Invalid environment: ${z.prettifyError(parsed.error)}`);
  }
  return parsed.data;
}
