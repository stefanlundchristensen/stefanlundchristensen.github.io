#!/usr/bin/env python3
"""The eight programme icons, shared by the invitation and the website.

24 x 24 grid, round caps and joins, stroke only (colour = currentColor).
Run: python3 print-suite/icons/icons.py  -> writes <name>.svg and preview.html here.
"""
import os

ICONS = {
    # ca. 15.00 Ankomst: an open door
    'ankomst': ('<path d="M3.6 20.4h16.8"/><path d="M7 20.4V3.6h10v16.8"/>'
                '<path d="M7 3.6l5.6 1.8v13.4L7 20.4z"/><path d="M10.9 12.3v.01"/>'),
    # 15.30 Ceremoni
    'ceremoni': '<path d="M12 20.2s-7.6-4.6-7.6-10.2A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.6 10c0 5.6-7.6 10.2-7.6 10.2z"/>',
    # Sødt, salt & bobler: flute with bubbles + a small bowl of snacks
    'bobler': ('<path d="M5.4 3.2h5l-.35 5.7a2.15 2.15 0 0 1-4.3 0z"/><path d="M7.9 11.1v8.4M5.5 19.5h4.8"/>'
               '<path d="M7.3 5.7v.01M8.5 7.6v.01"/>'
               '<path d="M13.2 15.4h8a4 4 0 0 1-8 0z"/>'
               '<path d="M15.2 13.3v.01M17.2 12.4v.01M19.2 13.3v.01"/>'),
    # Fællesfoto
    'foto': ('<path d="M3.2 8.6A1.6 1.6 0 0 1 4.8 7h2.7l1.6-2.2h5.8L16.5 7h2.7a1.6 1.6 0 0 1 1.6 1.6v9.2a1.6 1.6 0 0 1-1.6 1.6H4.8a1.6 1.6 0 0 1-1.6-1.6z"/>'
             '<circle cx="12" cy="13.1" r="3.6"/><path d="M17.7 9.9v.01"/>'),
    # Middag: fork, plate, knife
    'middag': ('<path d="M3 4.2v4.3a1.6 1.6 0 0 0 3.2 0V4.2M4.6 4.2v15.6"/>'
               '<circle cx="12.3" cy="12" r="5"/><circle cx="12.3" cy="12" r="2.5"/>'
               '<path d="M20.8 19.8V4.2c-1.7 1.4-2.3 5.2-2.3 7.8h2.3"/>'),
    # Fest!: disco ball on a string + a note
    'fest': ('<path d="M10 3.2v3.6"/><circle cx="10" cy="12.9" r="6.1"/>'
             '<path d="M3.9 12.9h12.2M4.9 9.7h10.2M4.9 16.1h10.2"/><ellipse cx="10" cy="12.9" rx="2.8" ry="6.1"/>'
             '<path d="M20.6 8.2V3.2l1.6.6"/><circle cx="19.6" cy="8.3" r="1" fill="currentColor"/>'),
    # Natmad: hot dog
    'natmad': ('<path d="M4.6 10.2h14.8a1.8 1.8 0 0 1 0 3.6H4.6a1.8 1.8 0 0 1 0-3.6z"/>'
               '<path d="M4.4 13.8c.3 2.3 2 3.8 4.3 3.8h6.6c2.3 0 4-1.5 4.3-3.8"/>'
               '<path d="M7 12c.9-.8 1.8.8 2.7 0s1.8.8 2.6 0 1.8.8 2.7 0"/>'),
    # Godnat: star
    'godnat': '<path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
}

PROGRAMME = [  # (icon, time, title) — same order and words as the invitation
    ('ankomst', 'ca. 15.00', 'Ankomst'),
    ('ceremoni', '15.30', 'Ceremoni'),
    ('bobler', '', 'Sødt, salt &amp; bobler'),
    ('foto', '', 'Fællesfoto'),
    ('middag', 'ca. 17.30', 'Middag'),
    ('fest', '', 'Fest &amp; dans'),
    ('natmad', 'ca. 24.00', 'Natmad'),
    ('godnat', '02.00', 'Godnat'),
]


def svg(name, size=None, stroke=1.5, extra=''):
    wh = f' width="{size}" height="{size}"' if size else ''
    return (f'<svg{wh} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{stroke}" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"{extra}>{ICONS[name]}</svg>')


if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    for n in ICONS:
        with open(os.path.join(here, f'{n}.svg'), 'w') as f:
            f.write(svg(n, 24).replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"', 1).replace('currentColor', '#641b33') + '\n')
    rows = ''.join(
        f'<div class="c"><div class="big">{svg(n, 240, 1.5)}</div><div class="s">{svg(n, 48)}{svg(n, 34)}{svg(n, 20)}</div><p>{n}</p></div>'
        for n in ICONS)
    grid = ''.join(f'<line x1="{i*10}" y1="0" x2="{i*10}" y2="240"/><line x1="0" y1="{i*10}" x2="240" y2="{i*10}"/>' for i in range(25))
    html = f'''<!doctype html><meta charset="utf-8"><title>Ikoner</title><style>
body{{margin:0;padding:20px;background:#fffaf0;color:#641b33;font:14px Georgia}}.w{{display:flex;flex-wrap:wrap;gap:20px}}
.big{{position:relative;width:240px;height:240px;background:#fff}}.big svg{{position:relative}}.big::before{{content:"";position:absolute;inset:0;background:url("data:image/svg+xml,{grid.replace('<','%3C').replace('>','%3E').replace('"',"'").replace('/','%2F').replace('line ', "line stroke='%23641b3318' ")}") }}
.s{{display:flex;gap:14px;align-items:end;margin-top:10px}}p{{margin:6px 0 0}}</style><div class="w">{rows}</div>'''
    with open(os.path.join(here, 'preview.html'), 'w') as f:
        f.write(html)
    print('wrote', len(ICONS), 'icons + preview.html')
