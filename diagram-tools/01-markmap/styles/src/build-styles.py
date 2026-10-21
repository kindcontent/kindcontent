import json, subprocess, re, sys, os
W='/tmp/claude-0/-home-user-kindcontent/7da89d85-3d54-54c3-b9f1-3c1d3608d6ae/scratchpad/work-text'
OUT='/home/user/kindcontent/diagram-tools/01-markmap/styles'
src=open('/home/user/kindcontent/diagram-tools/01-markmap/quy-trinh-agentic-content.md',encoding='utf-8').read()
body=src.split('---',2)[2].strip()+'\n'
INTER='html body svg.markmap{--markmap-font:500 17px/22px Inter,"DejaVu Sans",sans-serif !important;font-family:Inter,"DejaVu Sans",sans-serif}'
def variant(name, opts, css='', body_text=None, toolbar=False, dark=False, vw=1150, vh=760):
    fm={'title':'Quy trình Agentic Content'}
    if opts is not None: fm['markmap']=opts
    md='---\n'+json.dumps(fm,ensure_ascii=False)+'\n---\n\n'+(body_text or body)
    # JSON là YAML hợp lệ
    open(f'src/{name}.md','w',encoding='utf-8').write(md)
    cmd=[f'{W}/node_modules/.bin/markmap','--no-open','--offline','-o',f'html/{name}.html',f'src/{name}.md']
    if not toolbar: cmd.insert(1,'--no-toolbar')
    subprocess.run(cmd,check=True,capture_output=True)
    h=open(f'html/{name}.html',encoding='utf-8').read()
    bg='#1a1b26' if dark else '#fff'
    extra=f'<style>html,body{{background:{bg}}}{css}</style>'
    if dark: h=h.replace('<html','<html class="markmap-dark"',1)
    h=h.replace('</head>',extra+'</head>',1)
    open(f'html/{name}.html','w',encoding='utf-8').write(h)
    subprocess.run(['node','shot.js',f'html/{name}.html',f'raw/{name}.png',str(vw),str(vh),'1' if toolbar else '0'],check=True)
    subprocess.run(['node',f'{W}/fitpng.js',f'raw/{name}.png',f'{OUT}/{name}.png'])
