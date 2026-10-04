/// <reference types="node" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Fills in the site's public address in index.html (link-preview image and canonical URL need an
 * absolute URL). The address comes from SITE_URL, or from Vercel's own production-URL variable at
 * build time; without either (local development) the image path stays relative and og:url is left out.
 */
function siteUrl(): Plugin {
  const fromEnv = process.env['SITE_URL'] ?? process.env['VERCEL_PROJECT_PRODUCTION_URL'] ?? '';
  const site = fromEnv === '' ? '' : (fromEnv.startsWith('http') ? fromEnv : `https://${fromEnv}`).replace(/\/$/, '');
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replaceAll('%SITE_URL_META%', site === '' ? '' : `<meta property="og:url" content="${site}/" />\n    <link rel="canonical" href="${site}/" />`)
          .replaceAll('%SITE_URL%', site),
    },
  };
}

export default defineConfig({
  plugins: [react(), siteUrl()],
  build: {
    // The lazy 3D chunk is intentionally large; scripts/check-bundle.mjs enforces its real budget.
    chunkSizeWarningLimit: 1000,
    // Never embed assets as data: URIs; the Content Security Policy (vercel.json) only allows files from the site itself.
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:3001' },
  },
});
