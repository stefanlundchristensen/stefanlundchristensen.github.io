import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/publishedPosts';
import { profileSection } from '../lib/llmsProfile';

export async function GET(context: APIContext) {
  const siteUrl = context.site!.toString().replace(/\/$/, '');
  const posts = await getPublishedPosts();

  const fullPosts = posts.map((p) =>
    [
      `# ${p.data.title}`,
      '',
      ...(p.data.description ? [`> ${p.data.description}`, ''] : []),
      `Published: ${p.data.date.toISOString().slice(0, 10)}`,
      `Canonical: ${siteUrl}/posts/${p.id}/`,
      '',
      (p.body ?? '').trim(),
    ].join('\n'),
  );

  const body = [profileSection(siteUrl), '', '## Writing (full text)', '', fullPosts.join('\n\n---\n\n'), ''].join(
    '\n',
  );

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
