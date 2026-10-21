// Chuyển SVG của d2 sang PNG bằng Playwright (vì `d2 ... .png` cần tải driver Playwright, bị chặn).
// usage: node svg2png.js in.svg out.png targetWidthPx
const { chromium } = require('playwright-core');
const fs = require('fs');
(async () => {
  const [,, inp, out, tw] = process.argv;
  const svg = fs.readFileSync(inp, 'utf8');
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const w = vb[2], h = vb[3];
  const scale = (+tw || 2000) / w;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: Math.ceil(w), height: Math.ceil(h) }, deviceScaleFactor: scale });
  await p.setContent(`<html><body style="margin:0;background:#fff"><div style="width:${w}px;height:${h}px">${svg.replace(/^<\?xml[^>]*>/, '')}</div></body></html>`);
  await p.evaluate(([w, h]) => { const s = document.querySelector('svg'); s.setAttribute('width', w); s.setAttribute('height', h); }, [w, h]);
  await p.waitForTimeout(800);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  console.log('svg', w, 'x', h, 'scale', scale.toFixed(2));
  await b.close();
})();
