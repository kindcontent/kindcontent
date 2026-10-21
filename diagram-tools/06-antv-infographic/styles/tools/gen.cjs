// Generate Agentic Content syntax for every template. usage: node gen.cjs templates.txt outdir
const fs = require('fs'), path = require('path');
const [listFile, outdir] = process.argv.slice(2);
const templates = fs.readFileSync(listFile, 'utf8').split('\n').slice(1).map(s => s.trim()).filter(Boolean);
fs.mkdirSync(outdir, { recursive: true });

const STEPS = [
  ['Agent Nghiên cứu', 'Thị trường, đối thủ, insight khách hàng', 'search', 'Chiến lược'],
  ['Agent SEO & Từ khóa', 'Từ khóa, search intent, khoảng trống nội dung', 'key-round', 'Chiến lược'],
  ['Agent Kế hoạch', 'Persona, content pillar, lịch nội dung', 'calendar-days', 'Chiến lược'],
  ['👤 Người duyệt chiến lược', 'Human-in-the-loop', 'user-check', 'Chiến lược'],
  ['Agent Brief', 'Dàn ý, outline, thông điệp chính', 'clipboard-list', 'Thực thi'],
  ['Agent Viết', 'Bản nháp blog, fanpage, PR', 'pen-line', 'Thực thi'],
  ['Agent Hình ảnh & Video', 'Visual, thumbnail, kịch bản video ngắn', 'clapperboard', 'Thực thi'],
  ['Agent Biên tập', 'SEO on-page, kiểm chứng, giọng thương hiệu', 'spell-check', 'Thực thi'],
  ['👤 Người duyệt nội dung', 'Chưa đạt → quay lại Agent Viết', 'user-check', 'Thực thi'],
  ['Agent Chuyển thể', '1 bài gốc → post, reel, email', 'shuffle', 'Phân phối'],
  ['Agent Đăng bài', 'Website, Fanpage, TikTok, YouTube, Email', 'send', 'Phân phối'],
  ['Agent Đo lường', 'Traffic, tương tác, chuyển đổi → quay lại Chiến lược', 'chart-line', 'Phân phối'],
];
const PHASES = [
  ['Chiến lược', 'Nghiên cứu · SEO & Từ khóa · Kế hoạch · 👤 duyệt', 'compass', [0, 1, 2, 3]],
  ['Thực thi', 'Brief · Viết · Hình ảnh & Video · Biên tập · 👤 duyệt', 'pen-tool', [4, 5, 6, 7, 8]],
  ['Phân phối', 'Chuyển thể · Đăng bài đa kênh · Đo lường', 'send', [9, 10, 11]],
];
const LOOP = ['Đo lường & tối ưu', 'Kết quả quay lại Chiến lược cho chu kỳ sau', 'refresh-cw'];
const P12 = '#2563eb #2563eb #2563eb #2563eb #7c3aed #7c3aed #7c3aed #7c3aed #7c3aed #059669 #059669 #059669';
const P4 = '#2563eb #7c3aed #059669 #ea580c';
const TITLE = 'Quy trình Agentic Content';

const theme = (pal) => `theme\n  palette ${pal}\n  base\n    text\n      font-family Inter\n`;
const item = (ind, label, desc, icon, illus) => {
  const p = ' '.repeat(ind);
  let s = `${p}- label ${label}\n`;
  if (desc) s += `${p}  desc ${desc}\n`;
  if (icon) s += `${p}  icon lucide/${icon}\n`;
  if (illus) s += `${p}  illus lucide/${icon}\n`;
  return s;
};
const steps12 = (key, illus) => `  ${key}\n` + STEPS.map(s => item(4, s[0], s[1], s[2], illus)).join('');
const phases = (key, n, illus) => `  ${key}\n` + [...PHASES.map(p => [p[0], p[1], p[2]]), LOOP].slice(0, n).map(p => item(4, p[0], p[1], p[2], illus)).join('');
const head = (t, desc) => `infographic ${t}\ndata\n  title ${TITLE}\n  desc ${desc}\n`;

function tree(t) {
  let s = head(t, 'Các Agent theo 3 giai đoạn') + '  root\n    label Agentic Content\n    icon lucide/workflow\n    children\n';
  for (const p of PHASES) {
    s += `      - label ${p[0]}\n        icon lucide/${p[2]}\n        children\n`;
    for (const i of p[3]) s += `          - label ${STEPS[i][0].replace('👤 ', '')}\n            icon lucide/${STEPS[i][2]}\n`;
  }
  return s + theme('#334155 #2563eb #7c3aed #059669');
}
function compareBinary(t) {
  return head(t, 'Agent AI làm gì, con người duyệt ở đâu') + `  compares
    - label Agent AI thực hiện
      icon lucide/bot
      children
        - label Nghiên cứu, SEO, Kế hoạch
          icon lucide/search
        - label Brief, Viết, Hình ảnh & Video, Biên tập
          icon lucide/pen-line
        - label Chuyển thể, Đăng bài, Đo lường
          icon lucide/send
    - label Con người kiểm duyệt
      icon lucide/user-check
      children
        - label Duyệt chiến lược (sau bước 3)
          icon lucide/compass
        - label Duyệt nội dung (sau bước 8)
          icon lucide/spell-check
        - label Chưa đạt → quay lại Agent Viết
          icon lucide/undo-2
` + theme('#2563eb #ea580c');
}
function swot(t) {
  let s = head(t, '3 giai đoạn + vòng lặp phản hồi') + '  compares\n';
  for (const p of PHASES) {
    s += `    - label ${p[0]}\n      icon lucide/${p[2]}\n      children\n`;
    for (const i of p[3]) s += `        - label ${STEPS[i][0].replace('👤 ', '')}\n`;
  }
  s += `    - label Vòng lặp\n      icon lucide/refresh-cw\n      children\n        - label Đo lường → Chiến lược\n        - label Chưa đạt → Agent Viết\n`;
  return s + theme(P4);
}
function quadrant(t) {
  return head(t, '3 giai đoạn + vòng lặp phản hồi') + phases('compares', 4, t.includes('illus')) + theme(P4);
}
function chart(t) {
  if (t.includes('wordcloud')) {
    const words = [['Agent', 40], ['Chiến lược', 30], ['Thực thi', 30], ['Phân phối', 30], ['SEO', 22], ['Từ khóa', 18], ['Nghiên cứu', 20], ['Kế hoạch', 18], ['Brief', 16], ['Viết', 24], ['Hình ảnh', 16], ['Video', 16], ['Biên tập', 18], ['Duyệt', 26], ['Chuyển thể', 16], ['Đăng bài', 18], ['Đo lường', 22], ['TikTok', 12], ['YouTube', 12], ['Fanpage', 12], ['Email', 12], ['Persona', 12], ['Insight', 14], ['Chuyển đổi', 14]];
    return head(t, 'Từ khóa trong quy trình') + '  values\n' + words.map(w => `    - label ${w[0]}\n      value ${w[1]}\n`).join('') + theme('#2563eb #7c3aed #059669 #ea580c #0891b2');
  }
  return head(t, 'Số bước trong mỗi giai đoạn (tổng 12)') + '  values\n' + PHASES.map(p => `    - label ${p[0]}\n      value ${p[3].length}\n      icon lucide/${p[2]}\n`).join('') + theme('#2563eb #7c3aed #059669');
}
function relationFlow(t) {
  let s = head(t, 'Màu theo giai đoạn · có vòng sửa bài và vòng phản hồi') + '  nodes\n';
  STEPS.forEach((st, i) => { s += `    - id n${i + 1}\n      label ${i + 1}. ${st[0]}\n      group ${st[3]}\n      icon lucide/${st[2]}\n`; });
  s += `  relations
    n1 -> n2 -> n3 -> n4
    n4 -duyệt-> n5
    n5 -> n6 -> n7 -> n8 -> n9
    n9 -đạt-> n10
    n9 -chưa đạt-> n6
    n10 -> n11 -> n12
    n12 -chu kỳ sau-> n1
`;
  return s + theme('#2563eb #7c3aed #059669');
}
function relationCycle(t) {
  const n = [...PHASES.map(p => [p[0], p[1], p[2]]), LOOP];
  let s = head(t, 'Vòng lặp tối ưu liên tục') + '  nodes\n';
  n.forEach((p, i) => { s += `    - id p${i}\n      label ${p[0]}\n      desc ${p[1]}\n      icon lucide/${p[2]}\n`; });
  s += '  relations\n    p0 -> p1 -> p2 -> p3 -> p0\n';
  return s + theme(P4);
}
function interaction(t) {
  // lanes: Agent AI vs Con người; step = order
  const ai = [], hu = [];
  STEPS.forEach((st, i) => (st[0].startsWith('👤') ? hu : ai).push([st, i]));
  const lane = (label, icon, arr) => `    - label ${label}\n      icon lucide/${icon}\n      children\n` + arr.map(([st, i]) => `        - label ${st[0].replace('👤 ', '')}\n          id s${i + 1}\n          step ${i}\n          icon lucide/${st[2]}\n`).join('');
  let s = head(t, 'Agent AI làm, con người duyệt ở 2 điểm') + '  sequences\n' + lane('Agent AI', 'bot', ai) + lane('Con người', 'user', hu);
  s += '  relations\n';
  for (let i = 1; i < 12; i++) s += `    s${i} -> s${i + 1}\n`;
  s += '    s9 -chưa đạt-> s6\n';
  return s + theme('#2563eb #ea580c');
}
const SEQ_COMPACT = /circular|circle-arrows|pyramid|funnel|filter-mesh|cylinders|mountain|ascending|stairs-front|pucks/;
function sequence(t) {
  const illus = t.includes('illus');
  if (/^sequence-steps-/.test(t)) return head(t, 'Từ Chiến lược đến Thực thi và Phân phối') + phases('sequences', 3, illus) + theme(P4);
  if (SEQ_COMPACT.test(t)) return head(t, '3 giai đoạn + vòng lặp phản hồi') + phases('sequences', 4, illus) + theme(P4);
  return head(t, '12 bước · 2 điểm duyệt của con người') + steps12('sequences', illus) + theme(P12);
}
function list(t) {
  const illus = t.includes('illus');
  if (/^list-(grid|column)-/.test(t)) return head(t, '12 bước · 2 điểm duyệt của con người') + steps12('lists', illus) + theme(P12);
  return head(t, '3 giai đoạn + vòng lặp phản hồi') + phases('lists', 4, illus) + theme(P4);
}
function gen(t) {
  if (t.startsWith('hierarchy-')) return ['hierarchy', tree(t)];
  if (t.startsWith('compare-swot')) return ['compare', swot(t)];
  if (t.startsWith('compare-quadrant') || t.startsWith('quadrant-')) return [t.startsWith('quadrant') ? 'quadrant' : 'compare', quadrant(t)];
  if (t.startsWith('compare-')) return ['compare', compareBinary(t)];
  if (t.startsWith('chart-')) return ['chart', chart(t)];
  if (t.startsWith('relation-dagre')) return ['relation', relationFlow(t)];
  if (t.startsWith('relation-')) return ['relation', relationCycle(t)];
  if (t.startsWith('sequence-interaction')) return ['sequence-interaction', interaction(t)];
  if (t.startsWith('sequence-')) return ['sequence', sequence(t)];
  if (t.startsWith('list-')) return ['list', list(t)];
  return ['other', head(t, '') + phases('items', 4) + theme(P4)];
}
const meta = [];
for (const t of templates) {
  const [cat, s] = gen(t);
  let sub = cat;
  if (t.startsWith('hierarchy-tree')) { const m = t.match(/^hierarchy-tree-(bt|lr|rl)-/); sub = 'hierarchy-tree-' + (m ? m[1] : 'tb'); }
  else if (t.startsWith('hierarchy-mindmap')) sub = 'hierarchy-mindmap';
  else if (t.startsWith('hierarchy-structure')) sub = 'hierarchy-structure';
  fs.writeFileSync(path.join(outdir, t + '.infographic'), s);
  meta.push({ template: t, category: sub });
}
fs.writeFileSync(path.join(outdir, '_meta.json'), JSON.stringify(meta, null, 1));
const c = {}; meta.forEach(m => c[m.category] = (c[m.category] || 0) + 1); console.log(templates.length, c);
