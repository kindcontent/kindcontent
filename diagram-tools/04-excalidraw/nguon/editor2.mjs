import { chromium } from "playwright";
import fs from "fs";
const OUT = process.argv[2];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.25 });
const page = await ctx.newPage();
page.on("pageerror", e => console.log("pageerror", e.message));
await page.goto(`http://127.0.0.1:5199/?scene=/scenes/hand-excalifont.excalidraw`);
await page.waitForFunction(() => window.__api && window.__api.getSceneElements().length > 0);
await page.evaluate(() => window.X.loadFonts());
await page.waitForTimeout(800);
// select the step-4 title, zoom in on it, open font picker
await page.evaluate(() => {
  const a = window.__api; const els = a.getSceneElements();
  const t = els.find(e => e.type === "text" && e.text.startsWith("4."));
  const box = els.find(e => e.id === "step-4");
  a.scrollToContent([box, ...els.filter(e => e.id === "step-3")], { fitToViewport: true, viewportZoomFactor: 0.6 });
  a.updateScene({ appState: { selectedElementIds: { [t.id]: true } } });
});
await page.waitForTimeout(600);
await page.click('[title="Show font picker"]');
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/editor-font-picker-excalifont.png` });
// Mermaid dialog
await page.goto(`http://127.0.0.1:5199/`);
await page.waitForFunction(() => window.__api);
await page.evaluate(() => window.__api.updateScene({ appState: { openDialog: { name: "ttd", tab: "mermaid" } } }));
await page.waitForTimeout(1000);
const mmd = fs.readFileSync("workflow.mmd", "utf8");
const ta = page.locator(".ttd-dialog textarea").first();
await ta.fill(mmd);
await page.waitForTimeout(4000);
await page.screenshot({ path: `${OUT}/editor-mermaid-dialog.png` });
// insert
const btn = page.locator(".ttd-dialog button", { hasText: /Insert/ }).first();
if (await btn.count()) { await btn.click(); await page.waitForTimeout(1500); await page.evaluate(() => window.__api.updateScene({ appState: { selectedElementIds: {}, selectedGroupIds: {} } })); await page.waitForTimeout(300);
  await page.evaluate(() => window.__api.scrollToContent(window.__api.getSceneElements(), { fitToViewport: true, viewportZoomFactor: 0.95 }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/editor-mermaid-inserted.png` });
} else console.log("no insert button");
await browser.close();
