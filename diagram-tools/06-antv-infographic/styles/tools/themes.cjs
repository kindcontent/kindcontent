// usage: node themes.cjs <outdir> <file.infographic>...  W=800 DPR=2
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [outdir, ...files] = process.argv.slice(2);
const W = +(process.env.W || 800), DPR = +(process.env.DPR || 2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W + 40, height: 1000 }, deviceScaleFactor: DPR });
  p.on('pageerror', e => console.log('  pageerror:', e.message));
  await p.goto('file://' + __dirname + '/page-fonts.html');
  const fl = await p.evaluate(async () => {
    const fams = ['"Patrick Hand"', 'Pangolin', '"Be Vietnam Pro"', '"851tegakizatsu"'];
    const out = {};
    for (const f of fams) { await document.fonts.load(`16px ${f}`, 'Aệ'); await document.fonts.load(`bold 16px ${f}`, 'Aệ'); out[f] = document.fonts.check(`16px ${f}`, 'Aệ'); }
    return out;
  });
  console.log('fonts', JSON.stringify(fl));
  for (const f of files) {
    const syntax = fs.readFileSync(f, 'utf8');
    const name = path.basename(f).replace(/\.[^.]+$/, '');
    await p.evaluate(() => { window.errors = []; });
    const st = await p.evaluate(([s, w]) => window.renderSyntax(s, w), [syntax, W]);
    await p.waitForTimeout(300);
    const info = await p.evaluate(() => ({ errors: window.errors, bg: getComputedStyle(document.querySelector('#container svg')).backgroundColor }));
    console.log(name, st, JSON.stringify(info));
    await (await p.$('#container svg')).screenshot({ path: path.join(outdir, name + '.png') });
  }
  await b.close();
})();
