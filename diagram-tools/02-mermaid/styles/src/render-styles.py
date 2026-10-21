import json, subprocess, sys, os
W='/tmp/claude-0/-home-user-kindcontent/7da89d85-3d54-54c3-b9f1-3c1d3608d6ae/scratchpad/work-text'
OUT='/home/user/kindcontent/diagram-tools/02-mermaid/styles'
FONT="Inter, 'DejaVu Sans', sans-serif"
def render(src, name, cfg, bg='white', scale=2, css=None):
    cfg=dict(cfg); tv=dict(cfg.get('themeVariables',{})); tv.setdefault('fontFamily',FONT); cfg['themeVariables']=tv
    cfg.setdefault('flowchart',{}).setdefault('wrappingWidth',260)
    cf=f'cfg-{name}.json'; json.dump(cfg,open(cf,'w'))
    raw=f'raw-{name}.png'
    cmd=[f'{W}/node_modules/.bin/mmdc','-q','-p','puppeteer-config.json','-c',cf,'-b',bg,'-i',src,'-o',raw,'-s',str(scale)]
    if css: cmd+=['-C',css]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode!=0 or not os.path.exists(raw):
        print('FAIL',name,r.stderr[-800:]); return False
    subprocess.run(['node',f'{W}/fitpng.js',raw,f'{OUT}/{name}.png'])
    return True
if __name__=='__main__':
    src,name,cfg=sys.argv[1],sys.argv[2],json.loads(sys.argv[3])
    bg=sys.argv[4] if len(sys.argv)>4 else 'white'
    render(src,name,cfg,bg)
