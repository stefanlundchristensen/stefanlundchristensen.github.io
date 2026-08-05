/**
 * Reads a post's own shape out of its markdown.
 *
 * Round one and two seeded every mark from a hash of the slug. That produces
 * variation, but all of it drawn from one distribution — same density, same
 * weight, same rhythm — which is why the marks read as monotone however
 * different the parameters were. Randomness looks like sameness.
 *
 * This module replaces the hash entirely. Nothing downstream of it is random:
 * a mark is a function of the post's structure, so two posts differ visually
 * exactly as much as they differ structurally, and a mark changes when the
 * post is edited.
 */

/** Numerals per 100 words above which a passage reads as quantitative. */
const QUANT_THRESHOLD = 1.5;

/**
 * Remove everything that isn't prose before measuring.
 *
 * A mark describes the writing, not the markup. Code fences, HTML comments and
 * any raw HTML a post carries would otherwise be counted as words — and any
 * digits inside them counted as numerals, which is what decides whether a
 * section reads as quantitative.
 */
function stripNonProse(s) {
  return s
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '');
}

function countWords(s) {
  return s.split(/\s+/).filter(Boolean).length;
}

function countNumerals(s) {
  return (s.match(/[€£$]?\d+[\d,.]*%?/g) || []).length;
}

function countParagraphs(s) {
  return s.split(/\n\n+/).filter((p) => p.trim() && !p.trim().startsWith('#')).length;
}

/**
 * @typedef {object} Section
 * @property {string} heading   '' for the passage before the first h2
 * @property {number} words
 * @property {number} paras
 * @property {number} nums
 * @property {number} density   numerals per 100 words
 * @property {boolean} quant    reads as quantitative
 * @property {boolean} intro
 *
 * @typedef {object} Structure
 * @property {Section[]} sections
 * @property {number[]} paragraphs  word count of every paragraph, in order
 * @property {number} words
 * @property {number} maxSectionWords
 * @property {number} density
 * @property {boolean} quant
 */

/**
 * @param {string} md raw markdown, with or without frontmatter
 * @returns {Structure}
 */
export function analyze(md) {
  const body = stripNonProse(String(md ?? '').replace(/^---\n[\s\S]*?\n---\n?/, ''));

  // Split on h2 only. h3s belong to their parent section — the mark reflects
  // the post's top-level argument, not every subdivision.
  const parts = body.split(/^## +(.*)$/m);
  const sections = [];

  const intro = parts[0] ?? '';
  if (countWords(intro) > 0) {
    sections.push(makeSection('', intro, true));
  }
  for (let i = 1; i < parts.length; i += 2) {
    sections.push(makeSection(parts[i] ?? '', parts[i + 1] ?? '', false));
  }
  // A post with no prose at all still needs one run, or it renders blank.
  if (sections.length === 0) sections.push(makeSection('', body, true));

  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#') && !p.startsWith('---'))
    .map(countWords)
    .filter((w) => w > 0);

  const words = sections.reduce((a, s) => a + s.words, 0);
  const nums = sections.reduce((a, s) => a + s.nums, 0);
  const density = words ? (nums / words) * 100 : 0;

  return {
    sections,
    paragraphs,
    words,
    maxSectionWords: Math.max(1, ...sections.map((s) => s.words)),
    density,
    quant: density >= QUANT_THRESHOLD,
  };
}

function makeSection(heading, text, intro) {
  const words = countWords(text);
  const nums = countNumerals(text);
  const density = words ? (nums / words) * 100 : 0;
  return {
    heading: heading.trim(),
    words,
    paras: countParagraphs(text),
    nums,
    density,
    quant: density >= QUANT_THRESHOLD,
    intro,
  };
}

/** The section carrying the most weight — the spine the mark hangs on. */
export function spineIndex(structure) {
  let best = 0;
  structure.sections.forEach((s, i) => {
    if (s.words > structure.sections[best].words) best = i;
  });
  return best;
}
