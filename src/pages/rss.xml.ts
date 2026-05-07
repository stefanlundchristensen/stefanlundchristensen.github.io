import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { STEFAN } from '../data/stefan';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const published = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: STEFAN.name,
    description: STEFAN.tagline,
    site: context.site!,
    items: published.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      link: `/posts/${post.id}/`,
    })),
  });
}
