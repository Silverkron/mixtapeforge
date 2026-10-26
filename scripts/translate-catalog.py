"""Build-time translation aid. Sends only the static UI catalog, never projects/media.
The application uses the saved JSON catalogs offline; this is not a runtime dependency.
"""
import json,urllib.request,urllib.parse,time,pathlib
sources=json.load(open('src/locales/source.json'))
for lang in ['en','es','fr']:
 path=pathlib.Path(f'src/locales/{lang}.json');out=json.loads(path.read_text())
 pending=[s for s in sources if s not in out]
 for batchstart in range(0,len(pending),12):
  batch=pending[batchstart:batchstart+12]
  # Numbered lines let us reject merged/dropped entries rather than guess mappings.
  text='\n'.join(f'{i+1:03d}|||{s}' for i,s in enumerate(batch))
  url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'it','tl':lang,'dt':'t','q':text})
  for attempt in range(3):
   try:
    with urllib.request.urlopen(url,timeout=40) as r: data=json.load(r)
    translated=''.join(x[0] for x in data[0] if x[0]);import re
    pieces=re.split(r'(?<!\d)(\d{3})\s*\|\s*\|\s*\|\s*',translated)
    pairs={int(pieces[i])-1:pieces[i+1].strip() for i in range(1,len(pieces)-1,2)}
    if len(pairs)!=len(batch):raise ValueError(f'Wrong entry count {len(pairs)}/{len(batch)}')
    for i,s in enumerate(batch):
     target=pairs[i]
     if sorted(re.findall(r'\{\d+\}',target))!=sorted(re.findall(r'\{\d+\}',s)):raise ValueError('Placeholder mismatch')
     out[s]=target
    path.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
    print(lang,len(out),flush=True);break
   except Exception as e:
    if attempt==2:raise
    time.sleep(2)
