import { chromium } from "playwright";
import fs from "fs";

const OUT = process.argv[2];
const only = process.argv[3] ? process.argv[3].split(",") : null;
fs.mkdirSync(OUT, { recursive: true });

const base = { roughness: 1, fill: "solid", arrowType: "sharp", strokeWidth: 2, edges: "round" };
const V = [
  // presets (also saved as .excalidraw)
  { file: "preset-gon-gang", fam: 6, style: { ...base, roughness: 0, arrowType: "elbow" }, json: true },
  { file: "preset-ve-tay", fam: 6, style: { ...base, roughness: 2, fill: "hachure", arrowType: "round" }, bg: "#fffce8", json: true },
  { file: "preset-nen-toi", fam: 6, style: { ...base }, dark: true, json: true },
  { file: "preset-den-trang", fam: 6, style: { ...base, roughness: 0, palette: "mono", edges: "sharp" }, json: true },
  // single-dimension variants (base = artist, solid, sharp arrows, bold, round edges, Nunito)
  { file: "style-co-ban", fam: 6, style: { ...base, caption: "Mặc định: Artist · Solid · Bold · Round · mũi tên Sharp · Nunito" } },
  { file: "style-fill-hachure", fam: 6, style: { ...base, fill: "hachure", caption: "Fill: Hachure (gạch chéo)" } },
  { file: "style-fill-cross-hatch", fam: 6, style: { ...base, fill: "cross-hatch", caption: "Fill: Cross-hatch (ô lưới)" } },
  { file: "style-fill-zigzag", fam: 6, style: { ...base, fill: "zigzag", caption: "Fill: Zigzag" } },
  { file: "style-rough-architect", fam: 6, style: { ...base, roughness: 0, caption: "Sloppiness: Architect (0)" } },
  { file: "style-rough-cartoonist", fam: 6, style: { ...base, roughness: 2, caption: "Sloppiness: Cartoonist (2)" } },
  { file: "style-arrow-curve", fam: 6, style: { ...base, arrowType: "round", caption: "Arrow type: Curve (cong)" } },
  { file: "style-arrow-elbow", fam: 6, style: { ...base, arrowType: "elbow", caption: "Arrow type: Elbow (vuông góc)" } },
  { file: "style-stroke-thin", fam: 6, style: { ...base, strokeWidth: 1, caption: "Stroke width: Thin (1)" } },
  { file: "style-stroke-extra-bold", fam: 6, style: { ...base, strokeWidth: 4, caption: "Stroke width: Extra bold (4)" } },
  { file: "style-stroke-dotted", fam: 6, style: { ...base, boxStrokeStyle: "dotted", caption: "Stroke style: Dotted (chấm) cho ô Agent" } },
  { file: "style-edges-sharp", fam: 6, style: { ...base, edges: "sharp", caption: "Edges: Sharp (góc vuông)" } },
  { file: "style-font-cascadia", fam: 3, style: { ...base, caption: "Font: Cascadia (cũ, vẫn đúng dấu)" } },
  { file: "style-canvas-xanh-nhat", fam: 6, style: { ...base, caption: "Nền canvas #f5faff" }, bg: "#f5faff" },
  { file: "style-bang-mau-am", fam: 6, style: { ...base, palette: "warm", frameFill: "solid", caption: "Bảng màu ấm: cam · teal · grape, nền #fdf8f6" }, bg: "#fdf8f6" },
  // catalogs
  { file: "catalog-fill-x-sloppiness", catalog: "fill", w: 1400 },
  { file: "catalog-net-goc-mui-ten", catalog: "lines", w: 1600 },
  { file: "catalog-bang-mau", catalog: "colors", w: 1600 },
  { file: "font-so-sanh-tieng-viet", catalog: "fonts", w: 1300 },
  { file: "thu-vien-cong-khai", libs: [
      ["finfin_flow-chart-symbols.excalidrawlib", "Flow Chart Symbols (finfin) — ký hiệu lưu đồ", 20],
      ["ferminrp_post-it.excalidrawlib", "Sticky Notes (ferminrp) — giấy ghi chú", 5],
      ["kaligule_robots.excalidrawlib", "Robots (kaligule) — robot nhiều cảm xúc, hợp minh họa “Agent”", 10],
      ["youritjang_stick-figures.excalidrawlib", "Stick Figures (youritjang) — người que, hợp minh họa “Người duyệt”", 10],
      ["kwirke_some-handdrawn-signs.excalidrawlib", "Some hand-drawn signs (kwirke) — dấu tick, dấu chéo vẽ tay", 12],
    ], w: 1600 },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on("console", (m) => { if (m.type() === "error") console.log("[console]", m.text().slice(0, 300)); });
page.on("pageerror", (e) => console.log("pageerror", e.message));
await page.goto("http://127.0.0.1:5199/");
await page.waitForFunction(() => window.X && window.__api);
await page.evaluate(() => window.X.loadFonts());

for (const v of V) {
  if (only && !only.includes(v.file)) continue;
  const r = await page.evaluate(async (v) => {
    let els;
    if (v.catalog) els = window.X.catalog(v.catalog);
    else if (v.libs) els = await window.X.libraries(v.libs);
    else els = window.X.hand(v.fam, v.style);
    const opts = { bg: v.bg, dark: v.dark };
    return {
      png: await window.X.toPng(els, {}, v.w || 1600, opts),
      json: v.json ? window.X.toJSON(els, {}, opts) : null,
      n: els.length,
    };
  }, v);
  fs.writeFileSync(`${OUT}/${v.file}.png`, Buffer.from(r.png.split(",")[1], "base64"));
  if (r.json) fs.writeFileSync(`${OUT}/${v.file}.excalidraw`, r.json);
  console.log("saved", v.file, r.n);
}
await browser.close();
