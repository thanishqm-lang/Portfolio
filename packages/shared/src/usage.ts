import { z } from 'zod';

/** Closed set so a new tool is a compile error wherever it must be handled (TS-3). */
export const AI_TOOLS = ['chat-assistant', 'coding-agent', 'code-completion', 'image-gen'] as const;
export const aiToolSchema = z.enum(AI_TOOLS);
export type AiTool = z.infer<typeof aiToolSchema>;

export const TASK_CATEGORIES = [
  'coding',
  'code-review',
  'writing',
  'research',
  'data-analysis',
  'support',
] as const;
export const taskCategorySchema = z.enum(TASK_CATEGORIES);
export type TaskCategory = z.infer<typeof taskCategorySchema>;

/**
 * One AI-tool usage record. Aggregate metadata only: there is deliberately no field
 * that could hold prompt or response content (NS-3). "Hours saved" is not stored; it is
 * derived from visible assumptions (NS-5).
 */
export const usageEventSchema = z.object({
  id: z.string().min(1),
  occurredAt: z.iso.datetime(),
  userId: z.string().min(1),
  team: z.string().min(1),
  tool: aiToolSchema,
  taskCategory: taskCategorySchema,
  durationMinutes: z.number().nonnegative(),
  costUsd: z.number().nonnegative(),
});
export type UsageEvent = z.infer<typeof usageEventSchema>;
