import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  // @awi/shared ships TypeScript source, so it must be bundled rather than left as an import.
  noExternal: ['@awi/shared'],
});
