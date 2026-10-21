const fs = require('fs');
const D = '/home/user/kindcontent/diagram-tools/06-antv-infographic/';
const body = f => { const s = fs.readFileSync(D + f, 'utf8'); return s.slice(s.indexOf('data\n'), s.indexOf('theme\n')); };
const T = { snake: ['sequence-snake-steps-compact-card', body('02-12-buoc-snake.infographic')], roadmap: ['sequence-roadmap-vertical-badge-card', body('03-12-buoc-roadmap.infographic')] };
const PH = '#2563eb #2563eb #2563eb #2563eb #7c3aed #7c3aed #7c3aed #7c3aed #7c3aed #059669 #059669 #059669';
const PHD = '#60a5fa #60a5fa #60a5fa #60a5fa #a78bfa #a78bfa #a78bfa #a78bfa #a78bfa #34d399 #34d399 #34d399';
const font = f => `  base\n    text\n      font-family ${f}\n`;
const V = [
  ['light-phase', 'theme light\n  palette ' + PH + '\n' + font('Inter')],
  ['light-antv', 'theme light\n  palette antv\n' + font('Inter')],
  ['light-spectral', 'theme light\n  palette spectral\n' + font('Inter')],
  ['dark-phase', 'theme dark\n  palette ' + PHD + '\n' + font('Inter')],
  ['dark-antv', 'theme dark\n  palette antv\n' + font('Inter')],
  ['dark-spectral', 'theme dark\n  palette spectral\n' + font('Inter')],
  ['handdrawn-font-goc', 'theme hand-drawn\n  palette ' + PH + '\n'],
  ['handdrawn-patrick-hand', 'theme hand-drawn\n  palette ' + PH + '\n' + font('Patrick Hand')],
  ['handdrawn-pangolin', 'theme hand-drawn\n  palette ' + PH + '\n' + font('Pangolin')],
  ['rough-inter', 'theme\n  palette ' + PH + '\n  stylize rough\n    roughness 0.6\n' + font('Inter')],
  ['linear-gradient', 'theme\n  palette ' + PH + '\n  stylize linear-gradient\n' + font('Inter')],
  ['radial-gradient', 'theme\n  palette ' + PH + '\n  stylize radial-gradient\n' + font('Inter')],
  ['pattern-dot', 'theme\n  palette ' + PH + '\n  stylize pattern\n    pattern dot\n' + font('Inter')],
  ['pattern-line', 'theme\n  palette ' + PH + '\n  stylize pattern\n    pattern line\n' + font('Inter')],
  ['font-be-vietnam-pro', 'theme light\n  palette ' + PH + '\n' + font('Be Vietnam Pro')],
];
for (const [k, [tpl, data]] of Object.entries(T)) for (const [v, th] of V) {
  fs.writeFileSync(`th/src/${k}--${v}.infographic`, `infographic ${tpl}\n${data}${th}`);
}
console.log(fs.readdirSync('th/src').length);
