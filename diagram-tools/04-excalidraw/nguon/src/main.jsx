import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Excalidraw,
  TTDDialog,
  TTDDialogTrigger,
  convertToExcalidrawElements,
  exportToBlob,
  exportToSvg,
  serializeAsJSON,
  FONT_FAMILY,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { buildHandScene } from "./scene.js";

const FONT_NAME = {
  1: "Virgil",
  2: "Helvetica",
  3: "Cascadia",
  5: "Excalifont",
  6: "Nunito",
  7: "Lilita One",
  8: "Comic Shanns",
  9: "Liberation Sans",
};

let api = null;

async function loadFonts() {
  const sample = "Agent Nghiên cứu ạảãàáâậầấẩẫăắằặẳẵẽẹẻèéêếềểễệịỉọỏốồổỗộơớờởỡợưứừửữựỳýỵỷỹđĐ";
  for (const n of Object.values(FONT_NAME)) {
    try {
      await document.fonts.load(`20px "${n}"`, sample);
    } catch (e) {}
  }
  await document.fonts.ready;
}

function measure(text, size, fam) {
  const c = measure.c || (measure.c = document.createElement("canvas").getContext("2d"));
  c.font = `${size}px "${FONT_NAME[fam]}", Xiaolai, "Segoe UI Emoji"`;
  return c.measureText(text).width;
}

function wrap(text, size, fam, maxW) {
  const out = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const w of para.split(" ")) {
      const t = line ? line + " " + w : w;
      if (measure(t, size, fam) > maxW && line) {
        out.push(line);
        line = w;
      } else line = t;
    }
    out.push(line);
  }
  return out.join("\n");
}

async function mermaidElements(def, fam) {
  const { elements, files } = await parseMermaidToExcalidraw(def, {
    themeVariables: { fontSize: "20px" },
  });
  // Mermaid-to-Excalidraw drops the arrowhead of a reversed link ("A <-.- B"): restore it on the feedback loop.
  for (const el of elements) {
    if (el.type === "arrow" && el.label && /Kết quả/.test(el.label.text) && !el.startArrowhead) el.startArrowhead = "arrow";
  }
  if (fam) {
    for (const el of elements) {
      if (el.type === "text") el.fontFamily = fam;
      if (el.label) el.label.fontFamily = fam;
    }
  }
  return { elements: convertToExcalidrawElements(elements, { regenerateIds: false }), files: files || {} };
}

async function toPng(elements, files, targetW) {
  let scale = 1;
  const blob = await exportToBlob({
    elements,
    files: files || {},
    appState: { exportBackground: true, viewBackgroundColor: "#ffffff" },
    exportPadding: 40,
    getDimensions: (w, h) => {
      scale = targetW ? targetW / w : 1;
      return { width: Math.round(w * scale), height: Math.round(h * scale), scale };
    },
    mimeType: "image/png",
  });
  return await new Promise((r) => {
    const fr = new FileReader();
    fr.onload = () => r(fr.result);
    fr.readAsDataURL(blob);
  });
}

async function toSvg(elements, files) {
  const svg = await exportToSvg({
    elements,
    files: files || {},
    appState: { exportBackground: true, viewBackgroundColor: "#ffffff" },
    exportPadding: 40,
  });
  return svg.outerHTML;
}

function toJSON(elements, files) {
  return serializeAsJSON(elements, { viewBackgroundColor: "#ffffff", gridSize: null }, files || {}, "local");
}

window.X = {
  loadFonts,
  FONT_FAMILY,
  hand: (fam) => convertToExcalidrawElements(buildHandScene(fam, (t, s, w) => wrap(t, s, fam, w)), { regenerateIds: false }),
  mermaidElements,
  toPng,
  toSvg,
  toJSON,
  getApi: () => api,
  fontTest: () => {
    const rows = [
      [5, "Excalifont — mặc định “Hand-drawn” (Vẽ tay)"],
      [6, "Nunito — “Normal” (Bình thường)"],
      [8, "Comic Shanns — “Code” (Mã)"],
      [1, "Virgil — font vẽ tay cũ"],
      [9, "Liberation Sans"],
      [7, "Lilita One"],
      [3, "Cascadia — font code cũ"],
    ];
    const sample = "Người duyệt chiến lược · Thực thi · Phân phối · Đo lường";
    const chars = "ư ơ ạ ả ẫ ệ ợ ữ ỹ ổ ậ ặ đ Đ";
    const els = [{ type: "text", x: 0, y: -90, text: "Kiểm tra font tiếng Việt trong Excalidraw 0.18", fontSize: 34, fontFamily: 6 }];
    rows.forEach(([f, name], i) => {
      const y = i * 150;
      els.push({ type: "text", x: 0, y, text: name, fontSize: 20, fontFamily: 6, strokeColor: "#1971c2" });
      els.push({ type: "text", x: 0, y: y + 32, text: sample, fontSize: 36, fontFamily: f });
      els.push({ type: "text", x: 0, y: y + 86, text: chars, fontSize: 30, fontFamily: f, strokeColor: "#495057" });
    });
    return convertToExcalidrawElements(els, { regenerateIds: false });
  },
};

function App() {
  const params = new URLSearchParams(location.search);
  const scene = params.get("scene");
  const [initial, setInitial] = useState(scene ? null : { elements: [] });
  useEffect(() => {
    if (scene)
      fetch(scene)
        .then((r) => r.json())
        .then((d) => setInitial({ elements: d.elements, appState: { ...d.appState, viewBackgroundColor: "#ffffff" }, files: d.files, scrollToContent: true }));
  }, []);
  if (!initial) return null;
  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw
        initialData={initial}
        langCode={params.get("lang") || "vi-VN"}
        excalidrawAPI={(a) => {
          api = a;
          window.__api = a;
        }}
      >
        <TTDDialog onTextSubmit={async () => { throw new Error("AI không bật trong bản tự host"); }} />
        <TTDDialogTrigger />
      </Excalidraw>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
