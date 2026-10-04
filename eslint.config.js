import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '.bearing/**', '.claude/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['apps/api/**/*.ts', 'packages/**/*.ts', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    // Tenet 3: three.js and drei may only be imported from the lazy 3D chunk
    // (src/scenes and src/three/SceneCanvas.tsx), never from entry code.
    files: ['apps/web/src/**/*.{ts,tsx}'],
    ignores: [
      'apps/web/src/scenes/**',
      'apps/web/src/three/SceneCanvas.tsx',
      'apps/web/src/assistant/**',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^(three|three/.*|@react-three/.*)$',
              message:
                'Import 3D libraries only from src/scenes or src/three/SceneCanvas.tsx so they stay out of the entry bundle (tenet 3).',
            },
            {
              regex: '(^|/)assistant/',
              message:
                'The assistant is lazy-loaded: reach it only with import() so it stays out of the entry bundle (tenet 3).',
            },
          ],
        },
      ],
    },
  },
);
