# Mermaid — toàn bộ style đã thử (mermaid 12.2.0 qua mmdc 12.0.0)

Danh sách lấy từ mã nguồn của gói `mermaid` đã cài (`config.type.d.ts`, bộ đăng ký layout và bộ nhận diện loại sơ đồ), không đoán. Mọi ảnh vẽ đúng nội dung "Quy trình Agentic Content", font Inter. File nguồn nằm trong `src/`, thứ tự hiển thị nằm trong `manifest.json` (đẹp nhất trước).

## 1. Theme (`theme:`) — 12/12 đã render
`default`, `neutral`, `dark`, `forest`, `base`, `neo`, `neo-dark`, `redux`, `redux-dark`, `redux-color`, `redux-dark-color`, `null`.
- `neo`, `neo-dark`, `redux*` là theme mới của Mermaid 11–12.
- Theme tối (`dark`, `neo-dark`, `redux-dark`, `redux-dark-color`) xuất với nền tối.
- `null` = không áp theme riêng → giống `default`.
- Chỉ `base` cho đổi màu tự do bằng `themeVariables` (bản "tự phối màu" dùng cách này).

## 2. Look (`look:`) — 3/3
`classic` (mặc định), `handDrawn` (nét vẽ tay bằng rough.js, chỉnh `handDrawnSeed`), `neo`.

## 3. Bố cục (`layout:`) — 10/11 chạy
Đã đăng ký sẵn trong mermaid 12: `elk` (**mặc định**), `dagre`, `swimlane`, `cose-bilkent`, `elk.stress`, `elk.force`, `elk.mrtree`, `elk.sporeOverlap`, `elk.box`, `elk.rectpacking`, cộng `tidy-tree` (gói tùy chọn `@mermaid-js/layout-tidy-tree`, chỉ dùng cho mindmap).
- Dùng tốt: `elk`, `dagre`, `swimlane` (cần nối node↔node, không nối khung↔khung).
- Dùng tạm: `elk.mrtree`, `elk.rectpacking`.
- Kém: `elk.sporeOverlap`, `elk.box`.
- Hỏng (vẫn để ảnh làm bằng chứng): `elk.force`, `elk.stress`.
- **Không render được:** `cose-bilkent` cho flowchart — mmdc báo lỗi trong `cose-bilkent…render` (layout này chỉ dành cho mindmap; mindmap mặc định đang dùng nó).

## 4. Loại sơ đồ hợp với nội dung — 14 loại đã render
flowchart, mindmap (mặc định / nhiều hình node / tidy-tree), stateDiagram-v2, sequenceDiagram, timeline, block, kanban, journey, gantt, treeView-beta, ishikawa, agentflow-beta (mới, dành cho luồng agent: nhóm bằng `flow … end`), architecture-beta.

Có trong mermaid 12 nhưng **không vẽ** vì không hợp nội dung quy trình: class, er, c4, git, pie, quadrant, radar, xychart, sankey, packet, requirement, treemap, venn, wardley, cynefin-beta, railroad-beta, eventmodeling, usecase, zenuml.

## Không làm được / lưu ý
- Icon Font Awesome trong mindmap (`::icon(fa-solid fa-compass)`) **không hiện** khi xuất bằng mmdc offline (thử cả cú pháp `fa fa-…` lẫn `fa-solid fa-…`).
- `agentflow-beta` bỏ qua `direction` trong từng nhóm → chỉ ra 1 hàng ngang rất dài (hoặc 1 cột rất cao), chữ nhỏ.
- `architecture-beta` chỉ có 5 icon có sẵn (cloud, database, disk, internet, server), nhãn bị mũi tên đè; đã bỏ 2 cạnh vòng lặp vì quá rối.
- `journey` không nhận font Inter cho tên bước và cắt chữ dài → phải rút gọn tên.
- Ảnh đã thu về rộng tối đa 1600 px, ≤ 350 KB (sharp, nén palette khi cần).
