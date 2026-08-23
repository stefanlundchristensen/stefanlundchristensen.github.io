import { STEFAN } from '../data/stefan';

/**
 * The shared header for /llms.txt and /llms-full.txt: who Stefan is, in the
 * llmstxt.org shape (H1, blockquote summary, then detail). Everything comes
 * from STEFAN so it cannot drift from the site.
 */
export function profileSection(siteUrl: string): string {
  const s = STEFAN;

  const experience = s.experience
    .map((e) => `- ${e.years} — ${e.role}, ${e.org}. ${e.note}`)
    .join('\n');

  const metrics = s.metrics.map((m) => `- ${m.value} — ${m.label}`).join('\n');

  const propositions = s.proposition
    .map((p) => `- **${p.title}.** ${p.body}`)
    .join('\n');

  return [
    `# ${s.name}`,
    '',
    `> ${s.tagline}`,
    '',
    s.short,
    '',
    '## About',
    '',
    `- Role: ${s.role} at Pleo`,
    `- Location: ${s.contact.location}`,
    `- LinkedIn: https://${s.contact.linkedin}`,
    `- Website: ${siteUrl}/`,
    '',
    s.longBio.join('\n\n'),
    '',
    '### Experience',
    '',
    experience,
    '',
    '### Selected results',
    '',
    metrics,
    '',
    '### Focus areas',
    '',
    propositions,
  ].join('\n');
}
