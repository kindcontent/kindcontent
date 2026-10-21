// Chụp HTML markmap thành PNG (ẩn toolbar). Dùng: node chup-png.js input.html output.png
const { chromium } = require('playwright-core');
(async () => {
  const [,, inp, out] = process.argv;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1150, height: 760 }, deviceScaleFactor: 2 });
  await p.goto('file://' + require('path').resolve(inp));
  await p.waitForTimeout(1500);
  await p.addStyleTag({ content: '.mm-toolbar{display:none!important}' });
  const f = await p.evaluate(() => getComputedStyle(document.querySelector('svg.markmap foreignObject div') || document.body).fontFamily);
  console.log('font:', f);
  await p.evaluate(() => window.mm && window.mm.fit());
  await p.waitForTimeout(1200);
  await p.screenshot({ path: out });
  await b.close();
})();
