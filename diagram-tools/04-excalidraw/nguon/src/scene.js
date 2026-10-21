// Hand-built Excalidraw scene (skeleton API) for the "Quy trình Agentic Content" workflow.
// buildHandScene(fam, wrap, style) — style lets us re-render the same content in every Excalidraw look.
export const LH = { 1: 1.25, 3: 1.2, 5: 1.25, 6: 1.35, 7: 1.15, 8: 1.25, 9: 1.15 };

export const STEPS = [
  [
    ["1. Agent Nghiên cứu", "phân tích thị trường, đối thủ, insight khách hàng"],
    ["2. Agent SEO & Từ khóa", "nghiên cứu từ khóa, search intent, khoảng trống nội dung"],
    ["3. Agent Kế hoạch", "persona, content pillar, lịch nội dung"],
    ["4. 👤 Người duyệt chiến lược", "human-in-the-loop: duyệt trước khi thực thi", true],
  ],
  [
    ["5. Agent Brief", "dàn ý, outline, thông điệp chính"],
    ["6. Agent Viết", "bản nháp bài blog, fanpage, PR"],
    ["7. Agent Hình ảnh & Video", "visual, thumbnail, kịch bản video ngắn"],
    ["8. Agent Biên tập", "SEO on-page, kiểm chứng thông tin, giọng thương hiệu"],
    ["9. 👤 Người duyệt nội dung", "human-in-the-loop: chưa đạt thì quay lại Agent Viết", true],
  ],
  [
    ["10. Agent Chuyển thể", "1 bài gốc → nhiều định dạng (post, reel, email)"],
    ["11. Agent Đăng bài", "lên lịch & đăng: Website, Fanpage, TikTok, YouTube, Email"],
    ["12. Agent Đo lường", "traffic, tương tác, chuyển đổi"],
  ],
];

export const PALETTES = {
  default: {
    phases: [
      { stroke: "#1971c2", frameBg: "#e7f5ff", boxBg: "#a5d8ff" },
      { stroke: "#2f9e44", frameBg: "#ebfbee", boxBg: "#b2f2bb" },
      { stroke: "#6741d9", frameBg: "#f3f0ff", boxBg: "#d0bfff" },
    ],
    human: { stroke: "#e8590c", bg: "#ffec99" },
    revise: "#e03131", loop: "#c2255c", text: "#1e1e1e", sub: "#343a40", muted: "#495057", arrow: "#1e1e1e",
  },
  warm: {
    phases: [
      { stroke: "#e8590c", frameBg: "transparent", boxBg: "#ffc078" },
      { stroke: "#0c8599", frameBg: "transparent", boxBg: "#66d9e8" },
      { stroke: "#9c36b5", frameBg: "transparent", boxBg: "#e599f7" },
    ],
    human: { stroke: "#f08c00", bg: "#ffe066" },
    revise: "#e03131", loop: "#c2255c", text: "#1e1e1e", sub: "#343a40", muted: "#495057", arrow: "#1e1e1e",
  },
  mono: {
    phases: [
      { stroke: "#1e1e1e", frameBg: "#f8f9fa", boxBg: "#ffffff" },
      { stroke: "#1e1e1e", frameBg: "#f8f9fa", boxBg: "#ffffff" },
      { stroke: "#1e1e1e", frameBg: "#f8f9fa", boxBg: "#ffffff" },
    ],
    human: { stroke: "#1e1e1e", bg: "#e9ecef" },
    revise: "#495057", loop: "#1e1e1e", text: "#1e1e1e", sub: "#343a40", muted: "#495057", arrow: "#1e1e1e",
  },
};

export function buildHandScene(fam, wrap, style = {}) {
  const S = {
    roughness: 1, fill: "solid", frameFill: "solid", strokeWidth: 2, edges: "round",
    arrowType: "sharp", arrowhead: "arrow", palette: "default", boxStrokeStyle: "solid", ...style,
  };
  const P = typeof S.palette === "string" ? PALETTES[S.palette] : S.palette;
  const els = [];
  const lh = LH[fam] || 1.25;
  const BW = 300, PITCH = 364, BX = 310, FX = 60, FW = 2046, PAD = 16;
  const TS = 22, DS = 18;
  const R = S.roughness;
  const rnd = S.edges === "round" ? { type: 3 } : null;
  const sw = S.strokeWidth;
  const text = (o) => els.push({ type: "text", fontFamily: fam, strokeColor: P.text, roughness: R, ...o });

  const wrapped = STEPS.map((row) =>
    row.map(([t, d, h]) => {
      const tw = wrap(t, TS, BW - 2 * PAD);
      const dw = wrap(d, DS, BW - 2 * PAD);
      return { tw, dw, th: tw.split("\n").length * TS * lh, dh: dw.split("\n").length * DS * lh, h };
    })
  );
  let BH = 140;
  for (const row of wrapped) for (const w of row) BH = Math.max(BH, Math.ceil(PAD + w.th + 10 + w.dh + PAD));

  text({ x: FX, y: 24, text: "Quy trình Agentic Content — Từ Chiến lược đến Thực thi và Phân phối", fontSize: 40 });
  text({
    x: FX, y: 84, fontSize: 20, strokeColor: P.muted,
    text: "12 bước · 3 giai đoạn · 2 điểm duyệt của con người (👤) · vòng sửa bài · vòng lặp tối ưu chu kỳ sau",
  });

  const y1 = 150, h1 = BH + 80, G = 100;
  const y2 = y1 + h1 + G, h2 = BH + 130;
  const y3 = y2 + h2 + G, h3 = BH + 80;
  const rows = [
    { y: y1, h: h1, by: y1 + 40 },
    { y: y2, h: h2, by: y2 + 90 },
    { y: y3, h: h3, by: y3 + 40 },
  ];
  const NAMES = [["GIAI ĐOẠN 1", "Chiến lược", "(Strategy)"], ["GIAI ĐOẠN 2", "Thực thi", "(Execution)"], ["GIAI ĐOẠN 3", "Phân phối", "(Distribution)"]];
  const pos = {};
  let n = 0;

  STEPS.forEach((row, i) => {
    const p = P.phases[i];
    const r = rows[i];
    const g = `grp-phase-${i + 1}`;
    els.push({
      type: "rectangle", id: `frame-${i + 1}`, x: FX, y: r.y, width: FW, height: r.h,
      strokeColor: p.stroke, backgroundColor: p.frameBg, fillStyle: S.frameFill, strokeWidth: sw,
      roughness: R, roundness: rnd, groupIds: [g],
    });
    text({ x: FX + 28, y: r.y + r.h / 2 - 62, text: NAMES[i][0], fontSize: 20, strokeColor: p.stroke, groupIds: [g] });
    text({ x: FX + 28, y: r.y + r.h / 2 - 32, text: NAMES[i][1], fontSize: 34, strokeColor: p.stroke, groupIds: [g] });
    text({ x: FX + 28, y: r.y + r.h / 2 + 20, text: NAMES[i][2], fontSize: 20, strokeColor: P.muted, groupIds: [g] });

    row.forEach((s, j) => {
      n++;
      const w = wrapped[i][j];
      const x = BX + j * PITCH, y = r.by;
      pos[n] = { x, y };
      const bid = `step-${n}`;
      const sg = `grp-step-${n}`;
      els.push({
        type: "rectangle", id: bid, x, y, width: BW, height: BH,
        strokeColor: w.h ? P.human.stroke : p.stroke,
        backgroundColor: w.h ? P.human.bg : p.boxBg,
        fillStyle: S.fill, strokeWidth: sw, strokeStyle: w.h ? "dashed" : S.boxStrokeStyle,
        roughness: R, roundness: rnd, groupIds: [sg, g],
      });
      text({ x: x + PAD, y: y + PAD, text: w.tw, fontSize: TS, groupIds: [sg, g] });
      text({ x: x + PAD, y: y + PAD + w.th + 10, text: w.dw, fontSize: DS, strokeColor: P.sub, groupIds: [sg, g] });
      if (j > 0) {
        const a = {
          type: "arrow", x: x - PITCH + BW, y: y + BH / 2, width: PITCH - BW, height: 0,
          points: [[0, 0], [PITCH - BW, 0]],
          strokeColor: P.arrow, strokeWidth: sw, endArrowhead: S.arrowhead, roughness: R,
          start: { id: `step-${n - 1}` }, end: { id: bid },
        };
        if (S.arrowType === "elbow") Object.assign(a, { elbowed: true, roundness: null });
        els.push(a);
      }
    });
  });

  const poly = (pts, o) => {
    // curved style: Excalidraw curves overshoot at tight corners, so use hand-picked through-points
    if (S.arrowType === "round" && o.curve) pts = o.curve;
    delete o.curve;
    const [x0, y0] = pts[0];
    const rel = pts.map(([x, y]) => [x - x0, y - y0]);
    const xs = rel.map((p) => p[0]), ys = rel.map((p) => p[1]);
    const a = {
      type: "arrow", x: x0, y: y0,
      width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys),
      points: rel, strokeWidth: sw, endArrowhead: S.arrowhead, roughness: R, roundness: null, ...o,
    };
    if (S.arrowType === "round") a.roundness = { type: 2 };
    if (S.arrowType === "elbow") Object.assign(a, { elbowed: true, roundness: null });
    els.push(a);
  };
  const cx = (k) => pos[k].x + BW / 2;

  // phase transitions
  const m12 = y1 + h1 + G / 2;
  poly([[cx(4), pos[4].y + BH], [cx(4), m12], [cx(5), m12], [cx(5), pos[5].y]], { strokeColor: P.human.stroke,
    curve: [[cx(4), pos[4].y + BH], [(cx(4) + cx(5)) / 2, m12 + 10], [cx(5), pos[5].y]] });
  text({ x: cx(4) + 12, y: y1 + h1 + 4, text: "Đã duyệt ✓", fontSize: 18, strokeColor: P.human.stroke });
  const m23 = y2 + h2 + G / 2;
  poly([[cx(9), pos[9].y + BH], [cx(9), m23], [cx(10), m23], [cx(10), pos[10].y]], { strokeColor: P.human.stroke,
    curve: [[cx(9), pos[9].y + BH], [(cx(9) + cx(10)) / 2, m23 + 10], [cx(10), pos[10].y]] });
  text({ x: cx(9) + 12, y: y2 + h2 + 4, text: "Đạt ✓", fontSize: 18, strokeColor: P.human.stroke });

  // revise loop 9 -> 6
  const ly = y2 + 52;
  poly([[cx(9), pos[9].y], [cx(9), ly], [cx(6), ly], [cx(6), pos[6].y]], { strokeColor: P.revise, strokeStyle: "dashed",
    curve: [[cx(9), pos[9].y], [(cx(9) + cx(6)) / 2, ly - 10], [cx(6), pos[6].y]] });
  text({ x: pos[7].x + 40, y: y2 + 16, fontSize: 20, strokeColor: P.revise, text: "↺ Chưa đạt → quay lại Agent Viết để sửa" });

  // feedback loop 12 -> phase 1
  const rx = FX + FW + 64;
  const cy3 = pos[12].y + BH / 2, cy1 = pos[1].y + BH / 2;
  poly([[pos[12].x + BW, cy3], [rx, cy3], [rx, cy1], [FX + FW, cy1]], { strokeColor: P.loop, strokeStyle: "dashed", strokeWidth: sw + 1 });
  const lt = wrap("↺ VÒNG LẶP: kết quả đo lường quay lại Giai đoạn 1 – Chiến lược để tối ưu chu kỳ sau", 20, 640);
  text({ x: pos[12].x + BW + 60, y: cy3 - 20 - lt.split("\n").length * 20 * lh, text: lt, fontSize: 20, strokeColor: P.loop });

  // legend
  const ly2 = y3 + h3 + 36;
  const k = fam === 3 ? 1.3 : 1; // wider monospace font needs more room in the legend
  const leg = (x, o, label) => {
    els.push({ type: "rectangle", x, y: ly2, width: 46, height: 30, fillStyle: S.fill, strokeWidth: sw, roughness: R, roundness: rnd, ...o });
    text({ x: x + 58, y: ly2 + 2, text: label, fontSize: 20, strokeColor: P.muted });
  };
  leg(FX, { strokeColor: P.phases[0].stroke, backgroundColor: P.phases[0].boxBg, strokeStyle: S.boxStrokeStyle }, "Agent AI");
  leg(FX + 210 * k, { strokeColor: P.human.stroke, backgroundColor: P.human.bg, strokeStyle: "dashed" }, "👤 Con người duyệt");
  const legArrow = (x, o) => els.push({ type: "arrow", x, y: ly2 + 15, width: 60, height: 0, points: [[0, 0], [60, 0]], strokeWidth: sw, endArrowhead: S.arrowhead, roughness: R, roundness: null, ...o });
  legArrow(FX + 500 * k, { strokeColor: P.revise, strokeStyle: "dashed" });
  text({ x: FX + 500 * k + 72, y: ly2 + 2, text: "Vòng sửa bài", fontSize: 20, strokeColor: P.muted });
  legArrow(FX + 760 * k, { strokeColor: P.loop, strokeStyle: "dashed", strokeWidth: sw + 1 });
  text({ x: FX + 760 * k + 72, y: ly2 + 2, text: "Vòng lặp tối ưu chu kỳ sau", fontSize: 20, strokeColor: P.muted });

  if (S.caption) {
    text({ x: FX + 1180 * k, y: ly2 - 2, text: S.caption, fontSize: 22, strokeColor: S.captionColor || "#868e96" });
  }
  return els;
}
