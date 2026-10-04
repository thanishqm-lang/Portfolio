// AST-04: asks the assistant every question in docs/assistant-questions.json and checks the answer.
// Fails below 90% (PRD section 15) or whenever a question that must be declined gets an answer.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { respond } from '../apps/web/src/assistant/engine.ts';

interface Case {
  q: string;
  expect: string[];
}

const file = fileURLToPath(new URL('../docs/assistant-questions.json', import.meta.url));
const data: unknown = JSON.parse(readFileSync(file, 'utf8'));
const cases = (data as { questions: Case[] }).questions;

let passed = 0;
let wronglyAnswered = 0;
for (const { q, expect } of cases) {
  const reply = respond(q);
  const got = reply.kind === 'answer' ? reply.entry.id : 'FALLBACK';
  const ok = expect.includes(got);
  if (ok) passed += 1;
  if (!ok && expect.includes('FALLBACK')) wronglyAnswered += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${q}  ->  ${got}${ok ? '' : `   (expected ${expect.join(' or ')})`}`);
}

const percent = Math.round((passed / cases.length) * 100);
console.log(`\ncheck-assistant: ${passed}/${cases.length} correct (${percent}%), ${wronglyAnswered} out-of-scope question(s) wrongly answered`);
if (percent < 90 || wronglyAnswered > 0) process.exit(1);
