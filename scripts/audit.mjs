// npm audit gate with a short, dated allowlist.
// Fails on any advisory not listed below. Remove an entry as soon as a fix ships.
import { execFileSync } from 'node:child_process';

const allow = {
  // picomatch ReDoS (build-time only; static output is unaffected). No patched
  // version exists yet (all <=4.0.7). Added 2026-11-17; drop when picomatch >4.0.7 ships.
  'GHSA-fc5q-39xc-vjpf': '2026-12-31',
};

let out;
try {
  out = execFileSync('npm', ['audit', '--json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
} catch (e) {
  out = e.stdout;
}
const report = JSON.parse(out);
const today = new Date().toISOString().slice(0, 10);
const blocking = new Set();
const allowed = new Set();
for (const v of Object.values(report.vulnerabilities || {})) {
  for (const via of v.via) {
    if (typeof via !== 'object') continue;
    const id = (via.url || '').split('/').pop();
    if (allow[id] && today <= allow[id]) allowed.add(id);
    else blocking.add(`${id} (${via.name}, ${via.severity}): ${via.title}`);
  }
}
for (const id of allowed) console.warn(`audit: allowed until ${allow[id]}: ${id}`);
if (blocking.size) {
  console.error('audit: blocking advisories:\n  ' + [...blocking].join('\n  '));
  process.exit(1);
}
console.log('audit: ok');
