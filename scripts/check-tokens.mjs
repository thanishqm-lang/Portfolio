// Tenet 7: raw colour values live only in the tokens file.
// Fails when a hex colour literal appears anywhere else under apps/web/src.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../apps/web/src', import.meta.url));
const ALLOWED = ['styles', 'tokens.css'].join(sep);
const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const EXTENSIONS = ['.css', '.ts', '.tsx'];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (EXTENSIONS.some((ext) => path.endsWith(ext))) yield path;
  }
}

let problems = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (rel === ALLOWED) continue;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const match of line.matchAll(HEX)) {
        console.error(`${rel}:${i + 1}: hex colour ${match[0]} outside the tokens file (tenet 7)`);
        problems += 1;
      }
    });
}

if (problems > 0) process.exit(1);
console.log('check-tokens: no hex colours outside the tokens file');
