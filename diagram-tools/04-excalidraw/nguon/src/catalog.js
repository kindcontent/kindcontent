// Catalog scenes showing every visual option Excalidraw 0.18 offers.
import oc from "open-color/open-color.json";
import { STEPS, LH } from "./scene.js";

const T = (x, y, text, o = {}) => ({ type: "text", x, y, text, fontSize: 20, fontFamily: 6, strokeColor: "#1e1e1e", ...o });

export function catalogFillRough() {
  const els = [T(0, -150, "Kiểu tô (Fill) × Độ nguệch ngoạc (Sloppiness)", { fontSize: 36 })];
  els.push(T(0, -100, "Cùng 1 ô “6. Agent Viết”, màu nền #a5d8ff, viền #1971c2, nét 2", { fontSize: 20, strokeColor: "#868e96" }));
  const fills = [["hachure", "Hachure (gạch chéo)"], ["cross-hatch", "Cross-hatch (ô lưới)"], ["solid", "Solid (tô đặc)"], ["zigzag", "Zigzag"]];
  const rough = [[0, "Architect (0)\nthẳng, gọn"], [1, "Artist (1)\nmặc định"], [2, "Cartoonist (2)\nnguệch ngoạc"]];
  fills.forEach(([f, name], c) => els.push(T(260 + c * 300, -40, name, { fontSize: 22, strokeColor: "#1971c2" })));
  rough.forEach(([r, name], ri) => {
    els.push(T(0, ri * 190 + 30, name, { fontSize: 22, strokeColor: "#1971c2" }));
    fills.forEach(([f], c) => {
      els.push({
        type: "rectangle", x: 260 + c * 300, y: ri * 190, width: 260, height: 150,
        backgroundColor: "#a5d8ff", strokeColor: "#1971c2", fillStyle: f, roughness: r, strokeWidth: 2,
        roundness: { type: 3 },
        label: { text: "6. Agent Viết\nbản nháp blog, fanpage", fontSize: 20, fontFamily: 6 },
      });
    });
  });
  return els;
}

export function catalogLines() {
  const els = [T(0, -110, "Nét viền, góc, kiểu mũi tên và đầu mũi tên", { fontSize: 36 })];
  // stroke width x style
  els.push(T(0, -50, "Độ dày nét (Stroke width) × Kiểu nét (Stroke style)", { fontSize: 24, strokeColor: "#1971c2" }));
  const widths = [[1, "Thin (1)"], [2, "Bold (2)"], [4, "Extra bold (4)"]];
  const styles = [["solid", "Solid — liền"], ["dashed", "Dashed — gạch"], ["dotted", "Dotted — chấm"]];
  styles.forEach(([s, sn], c) => els.push(T(200 + c * 280, 0, sn, { fontSize: 20, strokeColor: "#495057" })));
  widths.forEach(([w, wn], r) => {
    els.push(T(0, 50 + r * 110, wn, { fontSize: 20, strokeColor: "#495057" }));
    styles.forEach(([s], c) => {
      els.push({ type: "rectangle", x: 200 + c * 280, y: 40 + r * 110, width: 230, height: 80, strokeColor: "#1e1e1e", backgroundColor: "#ffec99", fillStyle: "solid", strokeWidth: w, strokeStyle: s, roughness: 1, roundness: { type: 3 } });
    });
  });
  // edges
  const ex = 1100;
  els.push(T(ex, -50, "Góc (Edges)", { fontSize: 24, strokeColor: "#1971c2" }));
  els.push({ type: "rectangle", x: ex, y: 40, width: 230, height: 110, strokeColor: "#2f9e44", backgroundColor: "#b2f2bb", fillStyle: "solid", strokeWidth: 2, roundness: null, label: { text: "Sharp — góc vuông", fontSize: 20, fontFamily: 6 } });
  els.push({ type: "rectangle", x: ex + 260, y: 40, width: 230, height: 110, strokeColor: "#2f9e44", backgroundColor: "#b2f2bb", fillStyle: "solid", strokeWidth: 2, roundness: { type: 3 }, label: { text: "Round — bo tròn", fontSize: 20, fontFamily: 6 } });
  els.push({ type: "diamond", x: ex, y: 180, width: 230, height: 130, strokeColor: "#e8590c", backgroundColor: "#ffec99", fillStyle: "solid", strokeWidth: 2, roundness: null, label: { text: "Hình thoi sharp", fontSize: 18, fontFamily: 6 } });
  els.push({ type: "ellipse", x: ex + 260, y: 180, width: 230, height: 130, strokeColor: "#6741d9", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 2, label: { text: "Hình elip", fontSize: 18, fontFamily: 6 } });

  // arrow types
  const ay = 420;
  els.push(T(0, ay, "Kiểu mũi tên (Arrow type) — cùng 3 điểm gấp khúc", { fontSize: 24, strokeColor: "#1971c2" }));
  const types = [["sharp", "Sharp — gấp khúc"], ["round", "Curve — cong mềm"], ["elbow", "Elbow — vuông góc, tự định tuyến"]];
  types.forEach(([t, name], i) => {
    const x = i * 560, y = ay + 60;
    els.push(T(x, y, name, { fontSize: 20, strokeColor: "#495057" }));
    const a = { type: "arrow", x: x + 20, y: y + 60, width: 360, height: 120, points: [[0, 0], [180, 0], [180, 120], [360, 120]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 1, endArrowhead: "arrow", roundness: null };
    if (t === "round") a.roundness = { type: 2 };
    if (t === "elbow") a.elbowed = true;
    els.push(a);
  });

  // arrowheads
  const hy = ay + 300;
  els.push(T(0, hy, "Đầu mũi tên (Arrowheads) — 11 loại trong editor + “không có” (dot = kiểu cũ, giống circle)", { fontSize: 24, strokeColor: "#1971c2" }));
  const heads = [null, "arrow", "triangle", "triangle_outline", "bar", "dot", "circle", "circle_outline", "diamond", "diamond_outline", "crowfoot_one", "crowfoot_many", "crowfoot_one_or_many"];
  heads.forEach((h, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = col * 420, y = hy + 60 + row * 70;
    els.push({ type: "arrow", x, y: y + 14, width: 160, height: 0, points: [[0, 0], [160, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: h, startArrowhead: null, roundness: null });
    els.push(T(x + 190, y, h === "dot" ? "dot (cũ)" : h || "none (không)", { fontSize: 20, fontFamily: 3, strokeColor: "#495057" }));
  });
  return els;
}

export function catalogColors() {
  const els = [T(0, -120, "Bảng màu Excalidraw (open-color)", { fontSize: 36 })];
  els.push(T(0, -70, "Bảng chọn màu có 5 sắc độ mỗi màu (chỉ số 0, 2, 4, 6, 8) + đen #1e1e1e, trắng, trong suốt", { fontSize: 20, strokeColor: "#868e96" }));
  const names = ["gray", "red", "pink", "grape", "violet", "blue", "cyan", "teal", "green", "yellow", "orange"];
  const idx = [0, 2, 4, 6, 8];
  names.forEach((n, r) => {
    const y = r * 58;
    els.push(T(0, y + 12, n, { fontSize: 20, fontFamily: 3, strokeColor: "#495057" }));
    idx.forEach((k, c) => {
      els.push({ type: "rectangle", x: 130 + c * 150, y, width: 130, height: 48, backgroundColor: oc[n][k], fillStyle: "solid", strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0, roundness: { type: 3 } });
      els.push(T(140 + c * 150, y + 14, oc[n][k], { fontSize: 16, fontFamily: 3, strokeColor: k >= 6 ? "#ffffff" : "#1e1e1e" }));
    });
  });
  const bronze = ["#f8f1ee", "#eaddd7", "#d2bab0", "#a18072", "#846358"];
  const yb = names.length * 58;
  els.push(T(0, yb + 12, "bronze", { fontSize: 20, fontFamily: 3, strokeColor: "#495057" }));
  bronze.forEach((h, c) => {
    els.push({ type: "rectangle", x: 130 + c * 150, y: yb, width: 130, height: 48, backgroundColor: h, fillStyle: "solid", strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0, roundness: { type: 3 } });
    els.push(T(140 + c * 150, yb + 14, h, { fontSize: 16, fontFamily: 3, strokeColor: c >= 3 ? "#ffffff" : "#1e1e1e" }));
  });
  // quick picks
  const qx = 940;
  const quick = [
    ["Màu nét — chọn nhanh", ["#1e1e1e", "#e03131", "#2f9e44", "#1971c2", "#f08c00"]],
    ["Màu nền ô — chọn nhanh", ["transparent", "#ffc9c9", "#b2f2bb", "#a5d8ff", "#ffec99"]],
    ["Màu nền canvas", ["#ffffff", "#f8f9fa", "#f5faff", "#fffce8", "#fdf8f6"]],
  ];
  quick.forEach(([title, cols], i) => {
    const y = i * 200;
    els.push(T(qx, y, title, { fontSize: 22, strokeColor: "#1971c2" }));
    cols.forEach((h, c) => {
      els.push({ type: "rectangle", x: qx + c * 130, y: y + 40, width: 110, height: 80, backgroundColor: h, fillStyle: h === "transparent" ? "hachure" : "solid", strokeColor: "#868e96", strokeWidth: 1, roughness: 0, roundness: { type: 3 } });
      els.push(T(qx + c * 130, y + 128, h, { fontSize: 16, fontFamily: 3, strokeColor: "#495057" }));
    });
  });
  return els;
}

// Two real boxes of the diagram (step 4 + step 9) rendered in a given font, with a verdict label
export function fontRows(wrap) {
  const fonts = [
    [6, "Nunito — nút “Normal”", true],
    [3, "Cascadia — font code cũ (không còn trong bộ chọn)", true],
    [5, "Excalifont — nút “Hand-drawn” (MẶC ĐỊNH)", false],
    [8, "Comic Shanns — nút “Code”", false],
    [7, "Lilita One — trong danh sách font", false],
    [1, "Virgil — font vẽ tay cũ", false],
    [9, "Liberation Sans — chỉ dùng phía server", false],
  ];
  const els = [T(0, -110, "Font nào hiển thị đúng tiếng Việt?", { fontSize: 36 })];
  els.push(T(0, -60, "Cùng 3 ô của sơ đồ, đổi font. Ô ❌ = ký tự có dấu bị mượn font hệ thống → chữ lẫn lộn 2 kiểu.", { fontSize: 20, strokeColor: "#868e96" }));
  const boxes = [STEPS[0][3], STEPS[2][2], STEPS[1][1]];
  fonts.forEach(([fam, name, ok], r) => {
    const y = r * 200;
    els.push(T(0, y, (ok ? "✅ ĐÚNG — " : "❌ LỖI DẤU — ") + name, { fontSize: 24, strokeColor: ok ? "#2f9e44" : "#e03131" }));
    boxes.forEach(([t, d, h], c) => {
      const x = c * 380, by = y + 40, W = 350;
      const lh = LH[fam] || 1.25;
      const tw = wrap(t, 22, fam, W - 32), dw = wrap(d, 18, fam, W - 32);
      els.push({ type: "rectangle", x, y: by, width: W, height: 140, strokeColor: h ? "#e8590c" : "#1971c2", backgroundColor: h ? "#ffec99" : "#a5d8ff", fillStyle: "solid", strokeWidth: 2, strokeStyle: h ? "dashed" : "solid", roundness: { type: 3 }, roughness: 1 });
      els.push({ type: "text", x: x + 16, y: by + 14, text: tw, fontSize: 22, fontFamily: fam, strokeColor: "#1e1e1e" });
      els.push({ type: "text", x: x + 16, y: by + 24 + tw.split("\n").length * 22 * lh, text: dw, fontSize: 18, fontFamily: fam, strokeColor: "#343a40" });
    });
  });
  return els;
}
