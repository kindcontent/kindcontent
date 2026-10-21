import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://127.0.0.1:5199/");
await page.waitForFunction(() => window.X && window.__api);
await page.evaluate(() => window.X.loadFonts());
const fams = ["Excalifont","Virgil","Nunito","Comic Shanns","Cascadia","Liberation Sans","Lilita One"];
const txt = "Người duyệt chiến lược — Thực thi, Phân phối, Đo lường, tương tác, chuyển đổi, Hình ảnh, Từ khóa";
await page.evaluate(({fams,txt}) => {
  for (const f of fams) { const d = document.createElement("div"); d.id = "p-" + f.replace(/ /g,"_"); d.style.cssText = `font-family:"${f}", Xiaolai, "Segoe UI Emoji";font-size:20px;position:fixed;top:0;left:0`; d.textContent = txt; document.body.appendChild(d); }
}, {fams, txt});
await page.waitForTimeout(1500);
const cdp = await page.context().newCDPSession(page);
await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
const { root } = await cdp.send("DOM.getDocument");
for (const f of fams) {
  const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "#p-" + f.replace(/ /g,"_") });
  const r = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
  console.log(f.padEnd(16), r.fonts.map(x => `${x.familyName}${x.isCustomFont?"(web)":""}:${x.glyphCount}`).join(", "));
}
await browser.close();
