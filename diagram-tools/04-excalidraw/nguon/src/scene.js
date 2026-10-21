// Hand-built Excalidraw scene (skeleton API) for the "Quy trình Agentic Content" workflow.
const LH = { 1: 1.25, 3: 1.2, 5: 1.25, 6: 1.35, 8: 1.25, 9: 1.15 };

const PHASES = [
  {
    key: "s",
    no: "GIAI ĐOẠN 1",
    name: "Chiến lược",
    en: "(Strategy)",
    stroke: "#1971c2",
    frameBg: "#e7f5ff",
    boxBg: "#a5d8ff",
    steps: [
      ["1. Agent Nghiên cứu", "phân tích thị trường, đối thủ, insight khách hàng"],
      ["2. Agent SEO & Từ khóa", "nghiên cứu từ khóa, search intent, khoảng trống nội dung"],
      ["3. Agent Kế hoạch", "persona, content pillar, lịch nội dung"],
      ["4. 👤 Người duyệt chiến lược", "human-in-the-loop: duyệt trước khi thực thi", true],
    ],
  },
  {
    key: "e",
    no: "GIAI ĐOẠN 2",
    name: "Thực thi",
    en: "(Execution)",
    stroke: "#2f9e44",
    frameBg: "#ebfbee",
    boxBg: "#b2f2bb",
    steps: [
      ["5. Agent Brief", "dàn ý, outline, thông điệp chính"],
      ["6. Agent Viết", "bản nháp bài blog, fanpage, PR"],
      ["7. Agent Hình ảnh & Video", "visual, thumbnail, kịch bản video ngắn"],
      ["8. Agent Biên tập", "SEO on-page, kiểm chứng thông tin, giọng thương hiệu"],
      ["9. 👤 Người duyệt nội dung", "human-in-the-loop: chưa đạt thì quay lại Agent Viết", true],
    ],
  },
  {
    key: "d",
    no: "GIAI ĐOẠN 3",
    name: "Phân phối",
    en: "(Distribution)",
    stroke: "#6741d9",
    frameBg: "#f3f0ff",
    boxBg: "#d0bfff",
    steps: [
      ["10. Agent Chuyển thể", "1 bài gốc → nhiều định dạng (post, reel, email)"],
      ["11. Agent Đăng bài", "lên lịch & đăng: Website, Fanpage, TikTok, YouTube, Email"],
      ["12. Agent Đo lường", "traffic, tương tác, chuyển đổi"],
    ],
  },
];

const HUMAN = { stroke: "#e8590c", bg: "#ffec99" };
const REVISE = "#e03131";
const LOOP = "#c2255c";

export function buildHandScene(fam, wrap) {
  const els = [];
  const lh = LH[fam] || 1.25;
  const BW = 300, PITCH = 364, BX = 310, FX = 60, FW = 2046, PAD = 16;
  const TS = 22, DS = 18;
  const text = (o) => els.push({ type: "text", fontFamily: fam, strokeColor: "#1e1e1e", roughness: 1, ...o });

  // pre-wrap all texts to find a uniform box height
  const wrapped = PHASES.map((p) =>
    p.steps.map(([t, d, h]) => {
      const tw = wrap(t, TS, BW - 2 * PAD);
      const dw = wrap(d, DS, BW - 2 * PAD);
      const th = tw.split("\n").length * TS * lh;
      const dh = dw.split("\n").length * DS * lh;
      return { tw, dw, th, dh, h };
    })
  );
  let BH = 140;
  for (const row of wrapped) for (const w of row) BH = Math.max(BH, Math.ceil(PAD + w.th + 10 + w.dh + PAD));

  // title
  text({ x: FX, y: 24, text: "Quy trình Agentic Content — Từ Chiến lược đến Thực thi và Phân phối", fontSize: 40 });
  text({
    x: FX, y: 84, fontSize: 20, strokeColor: "#495057",
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
  const pos = {}; // step number -> {x,y}
  let n = 0;

  PHASES.forEach((p, i) => {
    const r = rows[i];
    const frameId = `frame-${p.key}`;
    const g = `grp-${p.key}`;
    els.push({
      type: "rectangle", id: frameId, x: FX, y: r.y, width: FW, height: r.h,
      strokeColor: p.stroke, backgroundColor: p.frameBg, fillStyle: "solid", strokeWidth: 2,
      roughness: 1, roundness: { type: 3 }, groupIds: [g],
    });
    // phase label column
    text({ x: FX + 28, y: r.y + r.h / 2 - 62, text: p.no, fontSize: 20, strokeColor: p.stroke, groupIds: [g] });
    text({ x: FX + 28, y: r.y + r.h / 2 - 32, text: p.name, fontSize: 34, strokeColor: p.stroke, groupIds: [g] });
    text({ x: FX + 28, y: r.y + r.h / 2 + 20, text: p.en, fontSize: 20, strokeColor: "#495057", groupIds: [g] });

    p.steps.forEach((s, j) => {
      n++;
      const w = wrapped[i][j];
      const x = BX + j * PITCH, y = r.by;
      pos[n] = { x, y };
      const bid = `step-${n}`;
      const sg = `grp-step-${n}`;
      els.push({
        type: "rectangle", id: bid, x, y, width: BW, height: BH,
        strokeColor: w.h ? HUMAN.stroke : p.stroke,
        backgroundColor: w.h ? HUMAN.bg : p.boxBg,
        fillStyle: "solid", strokeWidth: 2, strokeStyle: w.h ? "dashed" : "solid",
        roughness: 1, roundness: { type: 3 }, groupIds: [sg, g],
      });
      text({ x: x + PAD, y: y + PAD, text: w.tw, fontSize: TS, groupIds: [sg, g] });
      text({ x: x + PAD, y: y + PAD + w.th + 10, text: w.dw, fontSize: DS, strokeColor: "#343a40", groupIds: [sg, g] });
      if (j > 0) {
        els.push({
          type: "arrow", x: x - PITCH + BW, y: y + BH / 2, width: PITCH - BW, height: 0,
          points: [[0, 0], [PITCH - BW, 0]],
          strokeColor: "#1e1e1e", strokeWidth: 2, endArrowhead: "arrow", roughness: 1,
          start: { id: `step-${n - 1}` }, end: { id: bid },
        });
      }
    });
  });

  const poly = (pts, o) => {
    const [x0, y0] = pts[0];
    const rel = pts.map(([x, y]) => [x - x0, y - y0]);
    const xs = rel.map((p) => p[0]), ys = rel.map((p) => p[1]);
    els.push({
      type: "arrow", x: x0, y: y0,
      width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys),
      points: rel, strokeWidth: 2, endArrowhead: "arrow", roughness: 1, roundness: null, ...o,
    });
  };
  const cx = (k) => pos[k].x + BW / 2;

  // 4 -> 5 (phase 1 -> phase 2)
  const m12 = y1 + h1 + G / 2;
  poly([[cx(4), pos[4].y + BH], [cx(4), m12], [cx(5), m12], [cx(5), pos[5].y]], { strokeColor: HUMAN.stroke });
  text({ x: cx(4) + 12, y: y1 + h1 + 4, text: "Đã duyệt ✓", fontSize: 18, strokeColor: HUMAN.stroke });
  // 9 -> 10 (phase 2 -> phase 3)
  const m23 = y2 + h2 + G / 2;
  poly([[cx(9), pos[9].y + BH], [cx(9), m23], [cx(10), m23], [cx(10), pos[10].y]], { strokeColor: HUMAN.stroke });
  text({ x: cx(9) + 12, y: y2 + h2 + 4, text: "Đạt ✓", fontSize: 18, strokeColor: HUMAN.stroke });

  // revise loop 9 -> 6 (above the execution row)
  const ly = y2 + 52;
  poly([[cx(9), pos[9].y], [cx(9), ly], [cx(6), ly], [cx(6), pos[6].y]], { strokeColor: REVISE, strokeStyle: "dashed" });
  text({
    x: pos[7].x + 40, y: y2 + 16, fontSize: 20, strokeColor: REVISE,
    text: "↺ Chưa đạt → quay lại Agent Viết để sửa",
  });

  // feedback loop 12 -> phase 1
  const rx = FX + FW + 64;
  const cy3 = pos[12].y + BH / 2, cy1 = pos[1].y + BH / 2;
  poly([[pos[12].x + BW, cy3], [rx, cy3], [rx, cy1], [FX + FW, cy1]], { strokeColor: LOOP, strokeStyle: "dashed", strokeWidth: 3 });
  const lt = wrap("↺ VÒNG LẶP: kết quả đo lường quay lại Giai đoạn 1 – Chiến lược để tối ưu chu kỳ sau", 20, 640);
  text({ x: pos[12].x + BW + 60, y: cy3 - 20 - lt.split("\n").length * 20 * lh, text: lt, fontSize: 20, strokeColor: LOOP });

  // legend
  const ly2 = y3 + h3 + 36;
  const leg = (x, o, label) => {
    els.push({ type: "rectangle", x, y: ly2, width: 46, height: 30, fillStyle: "solid", strokeWidth: 2, roughness: 1, roundness: { type: 3 }, ...o });
    text({ x: x + 58, y: ly2 + 2, text: label, fontSize: 20, strokeColor: "#495057" });
  };
  leg(FX, { strokeColor: "#1971c2", backgroundColor: "#a5d8ff" }, "Agent AI");
  leg(FX + 210, { strokeColor: HUMAN.stroke, backgroundColor: HUMAN.bg, strokeStyle: "dashed" }, "👤 Con người duyệt");
  poly([[FX + 500, ly2 + 15], [FX + 560, ly2 + 15]], { strokeColor: REVISE, strokeStyle: "dashed" });
  text({ x: FX + 572, y: ly2 + 2, text: "Vòng sửa bài", fontSize: 20, strokeColor: "#495057" });
  poly([[FX + 760, ly2 + 15], [FX + 820, ly2 + 15]], { strokeColor: LOOP, strokeStyle: "dashed", strokeWidth: 3 });
  text({ x: FX + 832, y: ly2 + 2, text: "Vòng lặp tối ưu chu kỳ sau", fontSize: 20, strokeColor: "#495057" });

  return els;
}
