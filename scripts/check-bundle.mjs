// Tenet 3 and the size budget (design section 8): after a build, the entry chunk must not contain
// three.js and must stay within the initial-JavaScript budget.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const DIST = fileURLToPath(new URL('../apps/web/dist', import.meta.url));
const ENTRY_BUDGET_KB = 120; // gzipped initial JavaScript
const LAZY_BUDGET_KB = 350; // gzipped lazy 3D chunk
// Strings that only appear when three.js itself is bundled.
const THREE_MARKERS = ['WebGLRenderer', 'BufferGeometry', 'IcosahedronGeometry'];
// A string that only exists in the assistant chunk (src/assistant/engine.ts, ENGINE_ID).
const ASSISTANT_MARKERS = ['awi-assistant-engine'];

const html = readFileSync(join(DIST, 'index.html'), 'utf8');
const entryMatch = html.match(/<script[^>]+src="\/(assets\/[^"]+\.js)"/);
if (!entryMatch) {
  console.error('check-bundle: no entry script found in dist/index.html');
  process.exit(1);
}

const kb = (bytes) => (bytes / 1024).toFixed(1);
const gz = (buffer) => gzipSync(buffer).length;
let problems = 0;

const entryName = entryMatch[1].split('/').pop();
const entry = readFileSync(join(DIST, 'assets', entryName));
const entryText = entry.toString('utf8');
const entryGz = gz(entry);
console.log(`check-bundle: entry ${entryName} is ${kb(entryGz)} KB gzipped (budget ${ENTRY_BUDGET_KB} KB)`);

if (entryGz / 1024 > ENTRY_BUDGET_KB) {
  console.error(`check-bundle: the entry chunk is over its ${ENTRY_BUDGET_KB} KB budget`);
  problems += 1;
}
for (const marker of THREE_MARKERS) {
  if (entryText.includes(marker)) {
    console.error(`check-bundle: the entry chunk contains "${marker}", so three.js is in the first load (tenet 3)`);
    problems += 1;
  }
}

for (const marker of ASSISTANT_MARKERS) {
  if (entryText.includes(marker)) {
    console.error(`check-bundle: the entry chunk contains "${marker}", so the assistant is in the first load (tenet 3)`);
    problems += 1;
  }
}

const lazyChunks = readdirSync(join(DIST, 'assets')).filter(
  (name) => name.endsWith('.js') && name !== entryName,
);
for (const name of lazyChunks) {
  const size = gz(readFileSync(join(DIST, 'assets', name)));
  console.log(`check-bundle: lazy chunk ${name} is ${kb(size)} KB gzipped (budget ${LAZY_BUDGET_KB} KB)`);
  if (size / 1024 > LAZY_BUDGET_KB) {
    console.error(`check-bundle: ${name} is over its ${LAZY_BUDGET_KB} KB budget`);
    problems += 1;
  }
}

if (problems > 0) process.exit(1);
