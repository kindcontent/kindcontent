# Post-process thumbnails (cap size) and build contact sheets per category.
import json, os, sys, io, math
from PIL import Image, ImageDraw, ImageFont
src, dst, sheetdir = sys.argv[1:4]
os.makedirs(dst, exist_ok=True); os.makedirs(sheetdir, exist_ok=True)
res = json.load(open(os.path.join(src, '_results.json')))
BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'; REG = '/usr/share/fonts/opentype/inter/Inter-Regular.otf'

def save_capped(img, path, limit):
    img = img.convert('RGB')
    for colors in (256, 192, 128, 96, 64):
        q = img.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
        buf = io.BytesIO(); q.save(buf, 'PNG', optimize=True)
        if buf.tell() <= limit: break
    while buf.tell() > limit:
        img = img.resize((int(img.width * .85), int(img.height * .85)), Image.LANCZOS)
        q = img.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
        buf = io.BytesIO(); q.save(buf, 'PNG', optimize=True)
    open(path, 'wb').write(buf.getvalue()); return buf.tell(), img.size


import re
RULES = [
 (r'illus', False, 'Cần ảnh minh hoạ unDraw tải online (bị chặn); tạm thay bằng icon Lucide nên trông thô.'),
 (r'circular-progress|circle-progress', False, 'Thiết kế cho số liệu %; nội dung quy trình không có số nên hiện 0%.'),
 (r'^sequence-color-snake-steps-horizontal-icon-line$', False, 'Nhãn và mô tả chồng lên nhau với 12 bước.'),
 (r'^list-row-horizontal-icon-line$', False, 'Nhãn đè lên mô tả.'),
 (r'^list-pyramid-rounded-rect-node$', False, 'Chỉ vẽ 3 tầng (mất mục thứ 4) và bỏ mô tả.'),
 (r'^list-sector-simple$', False, 'Mô tả bị cắt ở mép quạt.'),
 (r'^relation-network-simple-circle-node$', False, 'Không hiển thị nhãn nút.'),
 (r'^relation-network-icon-badge$', False, 'Nhãn cuối bị cắt; bố cục lực không thể hiện vòng lặp.'),
 (r'^relation-circle-icon-badge$', True, 'Không vẽ cạnh nối giữa các nút.'),
 (r'^compare-binary-horizontal-underline-text-', False, 'Gạch chân đè lên chữ.'),
 (r'^compare-binary-horizontal-simple-', False, 'Chữ cột trái chồng nhau khi nhãn dài.'),
 (r'^compare-hierarchy-left-right-circle-node-', False, 'Chữ nhỏ, chồng nhau ở cột trái.'),
 (r'^compare-binary-horizontal-(badge-card|compact-card)-(arrow|fold)$', True, 'Chữ PROS/CONS tiếng Anh cố định trong template.'),
 (r'^compare-binary-horizontal-(simple|underline-text)-(arrow|fold)$', None, 'Chữ PROS/CONS tiếng Anh cố định trong template.'),
 (r'^(sequence-horizontal-zigzag-|sequence-zigzag-steps-underline-text|relation-dagre-flow-lr-|hierarchy-tree-(?!lr-|rl-))', None, 'Bố cục rất rộng với 12 mục nên chữ nhỏ; hợp với ít mục hơn.'),
 (r'^(list-column-simple-vertical-arrow|list-column-vertical-icon-arrow|sequence-timeline-simple|relation-dagre-flow-tb-)', None, 'Rất dài và hẹp với 12 mục.'),
 (r'^(chart-wordcloud|hierarchy-mindmap-|hierarchy-tree-)', None, 'Template không hiển thị tiêu đề.'),
 (r'^chart-(?!wordcloud)', None, 'Ánh xạ minh hoạ: số bước mỗi giai đoạn (4/5/3).'),
 (r'^sequence-interaction-', None, 'Làn Agent AI / Con người: thể hiện đúng 2 điểm duyệt và vòng sửa bài.'),
 (r'^compare-swot$', None, 'Dùng 4 ô cho 3 giai đoạn + vòng lặp; tiêu đề ô chỉ là chữ cái đầu C/T/P/V.'),
]
def judge(t):
    ok, notes = True, []
    for pat, o, n in RULES:
        if re.search(pat, t):
            if o is False: ok = False
            if n not in notes: notes.append(n)
    return ok, ' '.join(notes)
index = []
for r in res:
    f = r.get('file'); ok = bool(f) and r['status'] == 'loaded' and not r.get('errors')
    ok2, note = judge(r['template'])
    entry = {'file': f'templates/{f}' if f else None, 'template': r['template'], 'category': r['category'], 'ok': ok and ok2, 'rendered': ok}
    if note: entry['note'] = note
    if f:
        im = Image.open(os.path.join(src, f))
        if im.height > 2400: im = im.resize((int(im.width * 2400 / im.height), 2400), Image.LANCZOS)
        size, dim = save_capped(im, os.path.join(dst, f), 150 * 1024)
        entry['px'] = list(dim); entry['kb'] = round(size / 1024)
    index.append(entry)

# contact sheets
cats = {}
SHEETCAT={'quadrant':'compare-quadrant','compare':'compare-quadrant','hierarchy-structure':'hierarchy-mindmap-structure','hierarchy-mindmap':'hierarchy-mindmap-structure'}
for e in index: cats.setdefault(SHEETCAT.get(e['category'], e['category']), []).append(e)
COLS, CW, CH, LH, PAD = 4, 388, 300, 34, 8
W = COLS * CW + (COLS + 1) * PAD  # 1592
sheets = []
fl = ImageFont.truetype(BOLD, 15); fh = ImageFont.truetype(BOLD, 26); fs = ImageFont.truetype(REG, 15)
for cat, items in cats.items():
    pages = math.ceil(len(items) / 28); per = math.ceil(len(items) / pages)
    for pi in range(pages):
        chunk = items[pi * per:(pi + 1) * per]
        rows = math.ceil(len(chunk) / COLS)
        H = 70 + rows * (CH + LH + PAD) + PAD
        sheet = Image.new('RGB', (W, H), (246, 247, 249)); d = ImageDraw.Draw(sheet)
        title = f'AntV Infographic · {cat}' + (f' ({pi+1}/{pages})' if pages > 1 else '') + f' · {len(items)} template'
        d.text((PAD + 4, 18), title, font=fh, fill=(20, 24, 33))
        for i, e in enumerate(chunk):
            cx = PAD + (i % COLS) * (CW + PAD); cy = 70 + (i // COLS) * (CH + LH + PAD)
            d.rectangle([cx, cy, cx + CW - 1, cy + CH + LH - 1], fill=(255, 255, 255), outline=(220, 223, 228))
            if e['file']:
                im = Image.open(os.path.join(src, os.path.basename(e['file']))).convert('RGB')
                s = min((CW - 12) / im.width, (CH - 12) / im.height)
                im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.LANCZOS)
                sheet.paste(im, (cx + (CW - im.width) // 2, cy + (CH - im.height) // 2))
            name = e['template']
            while d.textlength(name, font=fl) > CW - 12: name = name[:-2]
            if name != e['template']: name = name[:-1] + '…'
            d.rectangle([cx, cy + CH, cx + CW - 1, cy + CH + LH - 1], fill=(238, 241, 246))
            d.text((cx + 6, cy + CH + 8), name, font=fl, fill=(20, 24, 33) if e['ok'] else (200, 30, 30))
        fn = f'sheet-{cat}' + (f'-{pi+1}' if pages > 1 else '') + '.png'
        size, dim = save_capped(sheet, os.path.join(sheetdir, fn), 600 * 1024)
        sheets.append({'file': fn, 'category': cat, 'count': len(chunk), 'kb': round(size / 1024), 'px': list(dim)})
json.dump(index, open(os.path.join(dst, 'index.json'), 'w'), ensure_ascii=False, indent=1)
json.dump(sheets, open(os.path.join(sheetdir, '_sheets.json'), 'w'), ensure_ascii=False, indent=1)
for s in sheets: print(s)
print('thumbs max kb', max(e.get('kb', 0) for e in index), 'ok', sum(e['ok'] for e in index), '/', len(index))
