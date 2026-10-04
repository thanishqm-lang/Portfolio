import { healthResponseSchema, type HealthResponse } from '@awi/shared';

/** Network is a boundary: the body is `unknown` until parsed against the shared schema (NS-4, TS-1). */
export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const res = await fetch('/api/health', { signal });
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  const body: unknown = await res.json();
  return healthResponseSchema.parse(body);
}
