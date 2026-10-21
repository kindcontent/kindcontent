const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [srcdir, outdir] = process.argv.slice(2);
const meta = JSON.parse(fs.readFileSync(path.join(srcdir, '_meta.json'), 'utf8'));
fs.mkdirSync(outdir, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 840, height: 1000 }, deviceScaleFactor: 1 });
  let consoleErr = [];
  p.on('console', m => { if (m.type() === 'error' && !m.text().includes('ERR_TUNNEL')) consoleErr.push(m.text().slice(0, 160)); });
  p.on('pageerror', e => consoleErr.push('pageerror ' + e.message.slice(0, 160)));
  await p.goto('file://' + __dirname + '/page.html');
  const results = [];
  for (const m of meta) {
    consoleErr = [];
    const syntax = fs.readFileSync(path.join(srcdir, m.template + '.infographic'), 'utf8');
    await p.evaluate(() => { window.errors = []; window.iconMisses = []; });
    let st;
    try { st = await p.evaluate(([s]) => window.renderSyntax(s, 800), [syntax]); } catch (e) { st = 'exception ' + e.message; }
    await p.waitForTimeout(150);
    const info = await p.evaluate(() => {
      const svg = document.querySelector('#container svg');
      if (!svg) return { nosvg: true, errors: window.errors };
      const r = svg.getBoundingClientRect();
      const texts = [...svg.querySelectorAll('text, foreignObject')].map(t => t.textContent).join(' ');
      return { w: r.width, h: r.height, vb: svg.getAttribute('viewBox'), textLen: texts.length, hasTitle: texts.includes('Agentic'), errors: window.errors, miss: window.iconMisses };
    });
    const rec = { ...m, status: st, ...info, consoleErr: consoleErr.slice(0, 3) };
    if (!info.nosvg && info.h > 5) {
      const svg = await p.$('#container svg');
      try { await svg.screenshot({ path: path.join(outdir, m.template + '.png') }); rec.file = m.template + '.png'; } catch (e) { rec.shotErr = e.message.slice(0, 120); }
    }
    results.push(rec);
    process.stdout.write(`${m.template} ${st} ${info.w}x${Math.round(info.h)} text=${info.textLen} err=${(info.errors||[]).length + consoleErr.length}\n`);
  }
  fs.writeFileSync(path.join(outdir, '_results.json'), JSON.stringify(results, null, 1));
  await b.close();
})();
