import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { STEFAN } from '../data/stefan';
import { getPublishedPosts } from '../lib/publishedPosts';
import type { APIContext } from 'astro';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const siteUrl = context.site!.toString().replace(/\/$/, '');
  const published = await getPublishedPosts();

  return rss({
    title: STEFAN.name,
    description: STEFAN.tagline,
    site: context.site!,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
    customData: [
      '<language>en</language>',
      `<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>`,
    ].join(''),
    items: published.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      link: `/posts/${post.id}/`,
      categories: [...post.data.categories, ...post.data.tags],
      customData: `<dc:creator>${STEFAN.name}</dc:creator>`,
      // Full body, with root-relative links made absolute — feed readers have
      // no base URL to resolve them against.
      content: sanitizeHtml(parser.render(post.body ?? ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      })
        .replaceAll('href="/', `href="${siteUrl}/`)
        .replaceAll('src="/', `src="${siteUrl}/`),
    })),
  });
}
