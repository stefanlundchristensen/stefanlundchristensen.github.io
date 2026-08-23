import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// The sitemap is a hand-rolled endpoint (src/pages/sitemap.xml.ts) rather than
// @astrojs/sitemap, so post pages can carry a real <lastmod>.
export default defineConfig({
  site: 'https://stefanchristensen.me',
  output: 'static',
  integrations: [react()],
});
