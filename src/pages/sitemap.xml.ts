import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/publishedPosts';

// Replaces @astrojs/sitemap: the integration's serialize() never sees post
// dates, and per-post <lastmod> is the point of having a sitemap at all.
// Static pages get no lastmod rather than a fabricated build date.
const STATIC_PAGES = ['/', '/about/', '/experience/', '/now/', '/posts/'];

export async function GET(context: APIContext) {
  const siteUrl = context.site!.toString().replace(/\/$/, '');
  const posts = await getPublishedPosts();

  const urls = [
    ...STATIC_PAGES.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`),
    ...posts.map((p) => {
      const lastmod = (p.data.updated ?? p.data.date).toISOString();
      return `  <url><loc>${siteUrl}/posts/${p.id}/</loc><lastmod>${lastmod}</lastmod></url>`;
    }),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
