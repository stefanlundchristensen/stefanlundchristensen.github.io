import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/publishedPosts';
import { profileSection } from '../lib/llmsProfile';

export async function GET(context: APIContext) {
  const siteUrl = context.site!.toString().replace(/\/$/, '');
  const posts = await getPublishedPosts();

  const writing = posts
    .map(
      (p) =>
        `- [${p.data.title}](${siteUrl}/posts/${p.id}.md)${p.data.description ? `: ${p.data.description}` : ''}`,
    )
    .join('\n');

  const body = [
    profileSection(siteUrl),
    '',
    '## Writing',
    '',
    'Essays on org design, payments infrastructure, and scaling teams. Markdown versions linked; HTML at the same path without the .md suffix, with a trailing slash.',
    '',
    writing,
    '',
    '## Pages',
    '',
    `- [About](${siteUrl}/about/): background, beliefs, and what's next`,
    `- [Experience](${siteUrl}/experience/): career history with dates and outcomes`,
    `- [Now](${siteUrl}/now/): current focus`,
    `- [Writing index](${siteUrl}/posts/)`,
    '',
    '## Optional',
    '',
    `- [Full posts corpus](${siteUrl}/llms-full.txt): every published post inlined as markdown`,
    `- [RSS feed](${siteUrl}/rss.xml)`,
    `- [CV, PDF](${siteUrl}/files/stefan-christensen-cv.pdf)`,
    `- [CV, JSON](${siteUrl}/cv.json)`,
    `- [LinkedIn](https://linkedin.com/in/stefanlchristensen)`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
