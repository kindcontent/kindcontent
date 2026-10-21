import { chromium } from "playwright";
import fs from "fs";
const OUT = process.argv[2]; const step = process.argv[3] || "all";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.25 });
const page = await ctx.newPage();
page.on("pageerror", e => console.log("pageerror", e.message));
async function open(scene) {
  await page.goto(`http://127.0.0.1:5199/?scene=/scenes/${scene}.excalidraw`);
  await page.waitForFunction(() => window.__api && window.__api.getSceneElements().length > 0);
  await page.evaluate(() => window.X.loadFonts());
  await page.waitForTimeout(800);
  await page.evaluate(() => window.__api.scrollToContent(window.__api.getSceneElements(), { fitToViewport: true, viewportZoomFactor: 0.95 }));
  await page.waitForTimeout(800);
}
await open("hand-nunito");
await page.screenshot({ path: `${OUT}/editor-hand-nunito.png` });
// select one text element to show the font options panel
const id = await page.evaluate(() => {
  const t = window.__api.getSceneElements().find(e => e.type === "text" && e.text.startsWith("4."));
  window.__api.updateScene({ appState: { selectedElementIds: { [t.id]: true } } });
  return t.id;
});
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/editor-font-panel.png` });
fs.writeFileSync(`${OUT}/dom.html`, await page.content());
await browser.close();
