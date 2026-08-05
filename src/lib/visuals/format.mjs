/**
 * SVG string helpers shared by the renderer and the OG card composer.
 *
 * Plain .mjs with JSDoc rather than .ts, so the same modules import cleanly
 * into both Astro and scripts/generate-og.mjs without a bundler step.
 */

export function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/** Round to 2dp — keeps the emitted SVG small and readable. */
export function n(v) {
  return Math.round(v * 100) / 100;
}
