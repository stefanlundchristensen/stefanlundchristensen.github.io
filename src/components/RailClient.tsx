import { useState, useEffect, useRef, useCallback } from 'react';
import { STEFAN } from '../data/stefan';
import ThemeToggle from './ThemeToggle';

const s = STEFAN;
const initials = s.name
  .split(' ')
  .map((p) => p[0])
  .join('');

const NAV_ITEMS = [
  { id: 'work', n: '01', label: 'The path here' },
  { id: 'about', n: '02', label: 'About' },
  { id: 'advisory', n: '03', label: "Where I'm strongest" },
  { id: 'writing', n: '04', label: 'Writing' },
];

const SECTION_IDS = NAV_ITEMS.map((it) => it.id);

export default function RailClient() {
  const [railOpen, setRailOpen] = useState(true);
  const [active, setActive] = useState('work');
  const [isMobile, setIsMobile] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const mobile = window.innerWidth < 720;
      setIsMobile(mobile);
      if (mobile) {
        setRailOpen(false);
      } else {
        const stored = localStorage.getItem('stefanRailOpen');
        if (stored !== null) setRailOpen(stored === 'true');
        else if (window.innerWidth < 1024) setRailOpen(false);
      }
      initialized.current = true;
    }

    const onResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('stefanRailOpen', String(railOpen));
    }
    document.documentElement.setAttribute('data-rail', railOpen ? 'open' : 'collapsed');
  }, [railOpen, isMobile]);

  useEffect(() => {
    const onScroll = () => {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2;
      if (atBottom) {
        setActive(SECTION_IDS[SECTION_IDS.length - 1]);
        return;
      }
      let best = SECTION_IDS[0];
      let bestTop = -Infinity;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - 140 <= 0 && top > bestTop) {
          bestTop = top;
          best = id;
        }
      }
      setActive(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (isMobile) {
    return (
      <header className="rail-mobile">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="h-display" style={{ fontSize: 22, lineHeight: 1.1 }}>{s.name}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-60)' }}>{s.subtitle}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <ThemeToggle />
            <a className="link" href={`mailto:${s.contact.email}`} style={{ fontSize: 12 }}>Contact</a>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {NAV_ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`chip${active === it.id ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(it.id);
              }}
              style={{ fontSize: 10, padding: '4px 8px' }}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </header>
    );
  }

  return (
    <aside className="rail" style={{ position: 'sticky', top: 64, alignSelf: 'start' }}>
      {railOpen ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div className="lbl">{s.contact.location}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <ThemeToggle />
              <button className="rail-toggle" onClick={() => setRailOpen(false)} title="Collapse">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M9 3l-4 4 4 4" />
                </svg>
              </button>
            </div>
          </div>
          <h1 className="h-display" style={{ fontSize: 30, lineHeight: 1.05, margin: 0 }}>
            {s.name}
          </h1>
          <div style={{ fontSize: 14, color: 'var(--ink-60)', marginBottom: 24, lineHeight: 1.4 }}>
            {s.subtitle}
          </div>

          <div style={{ marginBottom: 28 }}>
            <div className="lbl" style={{ marginBottom: 10 }}>Contact</div>
            <div style={{ display: 'grid', gap: 6, fontSize: 13 }}>
              <a className="link" href={`https://${s.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                {s.contact.linkedin}
              </a>
              <a className="link" href={`https://${s.contact.writing}`}>
                {s.contact.writing}
              </a>
            </div>
          </div>

          <div className="lbl" style={{ marginBottom: 10 }}>Contents</div>
          <nav style={{ display: 'grid', gap: 2 }}>
            {NAV_ITEMS.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={`navrow${active === it.id ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(it.id);
                }}
              >
                <span className="navnum num">{it.n}</span>
                <span>{it.label}</span>
              </a>
            ))}
          </nav>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <ThemeToggle />
            <button className="rail-toggle" onClick={() => setRailOpen(true)} title="Expand">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M5 3l4 4-4 4" />
              </svg>
            </button>
          </div>
          <div className="h-display" style={{ fontSize: 26, lineHeight: 1, color: 'var(--ink)' }}>
            {initials}
          </div>
          <div className="vname">{s.name}</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', marginTop: 8 }}>
            {NAV_ITEMS.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                title={it.label}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(it.id);
                }}
              >
                <span className={`navdot${active === it.id ? ' active' : ''}`} />
              </a>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
}
