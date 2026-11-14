from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
root=Path(__file__).resolve().parent.parent/'public'/'wedding'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.refs=[];self.labels=[];self.controls=[];self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='label' and 'for' in a:self.labels.append(a['for'])
  if tag in ('input','textarea') and a.get('id'):self.controls.append(a['id'])
  if tag=='img':self.images.append(a)
  for key in ('href','src'):
   if key in a:self.refs.append(a[key])
for path in root.rglob('*.html'):
 page=Page();page.feed(path.read_text())
 for ref in page.refs:
  url=urlsplit(ref)
  if url.scheme or url.netloc:continue
  target=(path.parent/unquote(url.path)).resolve() if url.path else path.resolve()
  assert target.exists(),f'{path}: missing {ref}'
  if url.fragment:
   other=page
   if target!=path.resolve():other=Page();other.feed(target.read_text())
   assert url.fragment in other.ids,f'{path}: missing anchor {ref}'
 assert all(c in page.labels for c in page.controls),f'{path}: unlabelled control'
 assert all('alt' in img for img in page.images),f'{path}: missing image alternative'
 assert len(page.ids)==len(set(page.ids))
assert [p.name for p in root.rglob('*.html')]==['index.html']
print('PASS: one HTML page; local assets, navigation, anchors, labelled fields and image alternatives.')
