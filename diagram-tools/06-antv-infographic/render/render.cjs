// usage: node render.cjs <outdir> <file.infographic>...  (env W=width, DPR)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [outdir, ...files] = process.argv.slice(2);
const W = +(process.env.W || 1200), DPR = +(process.env.DPR || 2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W + 40, height: 1000 }, deviceScaleFactor: DPR });
  p.on('console', m => { if ((m.type() === 'error' || m.type() === 'warning') && !m.text().includes('ERR_TUNNEL')) console.log('  console.' + m.type() + ':', m.text().slice(0, 200)); });
  p.on('requestfailed', r => console.log('  reqfail:', r.url().slice(0,120)));
  p.on('pageerror', e => console.log('  pageerror:', e.message));
  await p.goto('file://' + __dirname + '/page.html');
  await p.evaluate(() => document.fonts.ready);
  for (const f of files) {
    const syntax = fs.readFileSync(f, 'utf8');
    const name = path.basename(f).replace(/\.[^.]+$/, '');
    await p.evaluate(() => { window.errors = []; window.iconMisses = []; });
    const st = await p.evaluate(([s, w]) => window.renderSyntax(s, w), [syntax, W]);
    await p.waitForTimeout(300);
    const info = await p.evaluate(() => {
      const svg = document.querySelector('#container svg');
      const r = svg.getBoundingClientRect();
      return { w: r.width, h: r.height, vb: svg.getAttribute('viewBox'), errors: window.errors, miss: window.iconMisses };
    });
    console.log(name, st, JSON.stringify(info));
    const svg = await p.$('#container svg');
    await svg.screenshot({ path: path.join(outdir, name + '.png'), omitBackground: false });
    try {
      const s = await p.evaluate(async () => { const u = await window.ig.toDataURL({ type: 'svg', embedResources: true }); return u; });
      const txt = s.startsWith('data:image/svg+xml;base64,') ? Buffer.from(s.split(',')[1], 'base64').toString('utf8') : decodeURIComponent(s.split(',').slice(1).join(','));
      fs.writeFileSync(path.join(outdir, name + '.svg'), txt);
    } catch (e) { console.log('  svg export failed', e.message); }
  }
  await b.close();
})();
