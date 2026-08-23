import type { APIRoute } from 'astro';
import { getPublishedPosts, type Post } from '../../lib/publishedPosts';
import { STEFAN } from '../../data/stefan';

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props, site }) => {
  const { post } = props as { post: Post };
  const siteUrl = site!.toString().replace(/\/$/, '');

  const header = [
    `# ${post.data.title}`,
    '',
    ...(post.data.description ? [`> ${post.data.description}`, ''] : []),
    `By ${STEFAN.name} · ${post.data.date.toISOString().slice(0, 10)}`,
    `Canonical: ${siteUrl}/posts/${post.id}/`,
    '',
    '---',
    '',
  ].join('\n');

  return new Response(header + (post.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
