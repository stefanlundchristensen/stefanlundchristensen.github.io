import { useState, useMemo } from 'react';

interface Post {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  categories: string[];
  readingTime: string;
}

interface Props {
  posts: Post[];
}

export default function TagFilter({ posts }: Props) {
  const [tag, setTag] = useState('All');

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) {
      for (const c of p.categories) set.add(c);
    }
    return ['All', ...Array.from(set).sort()];
  }, [posts]);

  const filtered = tag === 'All' ? posts : posts.filter((p) => p.categories.includes(tag));
  const featured = posts[0];
  const listPosts = tag === 'All' ? posts.slice(1) : filtered;

  return (
    <section id="writing">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
        <div className="lbl">Writing</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tags.map((tg) => (
            <button
              key={tg}
              className={`chip${tag === tg ? ' active' : ''}`}
              onClick={() => setTag(tg)}
            >
              {tg}
            </button>
          ))}
        </div>
      </div>

      {tag === 'All' && featured && (
        <a className="featured" href={`/posts/${featured.slug}/`}>
          <div style={{ width: 56 }}>
            <div className="lbl" style={{ color: 'var(--accent)', marginBottom: 6 }}>Latest</div>
            <div className="num h-display" style={{ fontSize: 26, color: 'var(--ink-30)' }}>01</div>
          </div>
          <div>
            <div className="h-display" style={{ fontSize: 26, lineHeight: 1.18, marginBottom: 8 }}>
              {featured.title}
            </div>
            {featured.description && (
              <div style={{ color: 'var(--ink-70)', fontSize: 15, marginBottom: 10 }}>
                {featured.description}
              </div>
            )}
            <div style={{ display: 'flex', gap: 14, fontSize: 11.5 }}>
              {featured.categories[0] && (
                <span className="lbl" style={{ color: 'var(--accent)' }}>{featured.categories[0]}</span>
              )}
              <span className="lbl">{featured.date}</span>
              <span className="lbl">{featured.readingTime}</span>
            </div>
          </div>
        </a>
      )}

      {listPosts.map((w, i) => (
        <a
          key={w.slug}
          href={`/posts/${w.slug}/`}
          style={{
            display: 'block',
            padding: '20px 0',
            borderTop: i === 0 ? 'none' : '1px solid var(--ink-10)',
            color: 'inherit',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, marginBottom: 4 }}>
            <div className="h-display" style={{ fontSize: 21 }}>{w.title}</div>
            <div className="num" style={{ fontSize: 12, color: 'var(--ink-50)', whiteSpace: 'nowrap' }}>
              {w.date}
            </div>
          </div>
          {w.description && (
            <div style={{ color: 'var(--ink-65)', fontSize: 15, marginBottom: 6 }}>
              {w.description}
            </div>
          )}
          <div style={{ display: 'flex', gap: 14 }}>
            {w.categories[0] && (
              <span className="lbl" style={{ color: 'var(--accent)' }}>{w.categories[0]}</span>
            )}
            <span className="lbl">{w.readingTime}</span>
          </div>
        </a>
      ))}
    </section>
  );
}
