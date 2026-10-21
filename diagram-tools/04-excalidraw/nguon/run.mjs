import { chromium } from "playwright";
import fs from "fs";

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const URL = "http://127.0.0.1:5199/";
const mmd = fs.readFileSync(new URL_("./workflow.mmd"), "utf8");
function URL_(p) { return new globalThis.URL(p, import.meta.url); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const failed = [];
page.on("requestfailed", (r) => failed.push(r.url() + " " + r.failure()?.errorText));
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console.log("[console]", m.type(), m.text().slice(0, 300)); });
await page.goto(URL);
await page.waitForFunction(() => window.X && window.__api);
await page.evaluate(() => window.X.loadFonts());

async function save(name, kind, data) {
  if (kind === "png") fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(data.split(",")[1], "base64"));
  else fs.writeFileSync(`${OUT}/${name}.${kind}`, data);
}

const variants = JSON.parse(process.env.VARIANTS || '[["hand-nunito",6],["hand-excalifont",5],["hand-cascadia",3]]');
for (const [name, fam] of variants) {
  const r = await page.evaluate(async ({ fam }) => {
    const els = window.X.hand(fam);
    return { png: await window.X.toPng(els, {}, 2200), svg: await window.X.toSvg(els, {}), json: window.X.toJSON(els, {}) };
  }, { fam });
  await save(name, "png", r.png);
  await save(name, "svg", r.svg);
  await save(name, "excalidraw", r.json);
  console.log("saved", name);
}

{
  const r = await page.evaluate(async () => { const els = window.X.fontTest(); return { png: await window.X.toPng(els, {}, 1800), json: window.X.toJSON(els, {}) }; });
  await save("font-test", "png", r.png); await save("font-test", "excalidraw", r.json); console.log("saved font-test");
}
if (!process.env.SKIP_MERMAID) {
  for (const [name, fam] of [["mermaid-default", null], ["mermaid-nunito", 6]]) {
    try {
      const r = await page.evaluate(async ({ mmd, fam }) => {
        const { elements, files } = await window.X.mermaidElements(mmd, fam);
        return { png: await window.X.toPng(elements, files, 2000), svg: await window.X.toSvg(elements, files), json: window.X.toJSON(elements, files), n: elements.length };
      }, { mmd, fam });
      await save(name, "png", r.png);
      await save(name, "svg", r.svg);
      await save(name, "excalidraw", r.json);
      console.log("saved", name, r.n, "elements");
    } catch (e) {
      console.log("MERMAID FAIL", name, e.message.slice(0, 500));
    }
  }
}
console.log("failed requests:", failed);
await browser.close();
