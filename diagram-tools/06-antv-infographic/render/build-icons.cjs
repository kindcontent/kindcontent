const set = require('@iconify-json/lucide/icons.json');
const out = {};
for (const [name, ic] of Object.entries(set.icons)) {
  const w = ic.width || set.width || 24, h = ic.height || set.height || 24;
  out[name] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${ic.body}</svg>`;
}
require('fs').writeFileSync('icons.js', 'window.LUCIDE=' + JSON.stringify(out) + ';');
console.log(Object.keys(out).length);
