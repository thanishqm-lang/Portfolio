import type { KnowledgeEntry } from '../content/types';
import { KNOWLEDGE, OVERVIEW_IDS } from './knowledge';
import { tokenize } from './text';

/** A marker that only exists in the assistant chunk; the build check looks for it in the entry bundle. */
export const ENGINE_ID = 'awi-assistant-engine-v1';

/** Below this score the assistant says it does not know rather than guessing (NS-20). */
const MIN_SCORE = 3;

/** A query this similar to an overview's own example question is asking for that overview. */
const NEAR_EXACT = 0.6;

export type Reply =
  | { kind: 'answer'; entry: KnowledgeEntry; score: number }
  | { kind: 'fallback'; reason: 'empty' | 'low-confidence' };

interface Prepared {
  entry: KnowledgeEntry;
  overview: boolean;
  keywords: string[][];
  questions: string[][];
}

interface Scored {
  entry: KnowledgeEntry;
  /** Keyword points plus up to 6 for the closest example question. */
  score: number;
  /** How close the query is to the nearest example question, 0 to 1. */
  similarity: number;
}

const PREPARED: readonly Prepared[] = KNOWLEDGE.map((entry) => ({
  entry,
  overview: OVERVIEW_IDS.has(entry.id),
  keywords: entry.keywords.map(tokenize).filter((tokens) => tokens.length > 0),
  questions: entry.questions.map(tokenize).filter((tokens) => tokens.length > 0),
}));

function jaccard(a: ReadonlySet<string>, b: readonly string[]): number {
  if (a.size === 0 || b.length === 0) return 0;
  const other = new Set(b);
  let shared = 0;
  for (const token of other) if (a.has(token)) shared += 1;
  return shared / (a.size + other.size - shared);
}

/**
 * Scores an entry for a query. A keyword counts when every one of its tokens is in the query (longer
 * phrases weigh more); the closest example question adds up to 6 points. Pure and deterministic.
 */
function score(prepared: Prepared, query: ReadonlySet<string>): Scored {
  let keywordPoints = 0;
  for (const tokens of prepared.keywords) {
    if (tokens.every((token) => query.has(token))) keywordPoints += 2 + tokens.length;
  }
  let similarity = 0;
  for (const tokens of prepared.questions) similarity = Math.max(similarity, jaccard(query, tokens));
  return { entry: prepared.entry, score: keywordPoints + similarity * 6, similarity };
}

/** The highest score; on a tie the earlier entry wins, so the result never depends on timing. */
function best(scored: readonly Scored[]): Scored | null {
  let top: Scored | null = null;
  for (const candidate of scored) if (top === null || candidate.score > top.score) top = candidate;
  return top;
}

/** Answers a visitor's question from the knowledge base, or asks them to try something else. */
export function respond(input: string): Reply {
  const tokens = tokenize(input);
  if (tokens.length === 0) return { kind: 'fallback', reason: 'empty' };

  const query = new Set(tokens);
  const scored = PREPARED.map((prepared) => ({ prepared, result: score(prepared, query) }));
  const specific = best(scored.filter((row) => !row.prepared.overview).map((row) => row.result));
  const overview = best(scored.filter((row) => row.prepared.overview).map((row) => row.result));

  // A question that names something specific ("CRM", "React") gets the specific answer, unless it is
  // really the overview's own question ("Which projects have you worked on?").
  const overviewWasAsked = overview !== null && overview.similarity >= NEAR_EXACT;
  const chosen =
    specific !== null && specific.score >= MIN_SCORE && !overviewWasAsked
      ? specific
      : best([specific, overview].flatMap((row) => (row === null ? [] : [row])));

  if (chosen === null || chosen.score < MIN_SCORE) return { kind: 'fallback', reason: 'low-confidence' };
  return { kind: 'answer', entry: chosen.entry, score: chosen.score };
}
