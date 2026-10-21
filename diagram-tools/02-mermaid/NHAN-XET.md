# Nhận xét: Mermaid

- **Repo:** https://github.com/mermaid-js/mermaid
- **Số sao GitHub:** ~90.777 ⭐ (tra ngày 21/10/2026)
- **Loại công cụ:** Text → nhiều loại sơ đồ (flowchart, mindmap, sequence, gantt, timeline…)
- **Phiên bản đã test:** `@mermaid-js/mermaid-cli` 12.0.0 (lõi mermaid 12.2.0), lệnh `mmdc`

## File trong thư mục

| File | Mô tả |
|---|---|
| `flowchart.mmd` | Nguồn flowchart: 3 subgraph (3 giai đoạn), hình thoi quyết định ở bước 9, vòng sửa bài (đỏ), vòng lặp phản hồi (tím, nét đứt) |
| `flowchart.png` / `flowchart.svg` | Flowchart đã render (PNG 1960×1335 px, nền trắng) |
| `mindmap.mmd` | Nguồn mind map |
| `mindmap.png` / `mindmap.svg` | Mind map đã render (PNG 1960×993 px) |
| `mermaid-config.json` | Theme `base`, font Inter, màu |
| `mermaid-style.css` | CSS phóng to tiêu đề flowchart |
| `puppeteer-config.json` | Trỏ mmdc tới Chromium có sẵn + `--no-sandbox` |

## Cách cài (lệnh đã chạy được)

```bash
mkdir work && cd work && npm init -y
PUPPETEER_SKIP_DOWNLOAD=1 npm i @mermaid-js/mermaid-cli   # không tải Chromium riêng

# puppeteer-config.json:
# {"executablePath": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", "args": ["--no-sandbox"]}

npx mmdc -p puppeteer-config.json -c mermaid-config.json -C mermaid-style.css -b white \
  -i flowchart.mmd -o flowchart.png -s 2.5
npx mmdc -p puppeteer-config.json -c mermaid-config.json -C mermaid-style.css -b white \
  -i flowchart.mmd -o flowchart.svg
npx mmdc -p puppeteer-config.json -c mermaid-config.json -b white -i mindmap.mmd -o mindmap.png -s 2.5
```

Không muốn cài gì: dán code vào https://mermaid.live (có nút tải PNG/SVG). Mermaid còn được **GitHub, Notion, Obsidian, GitLab** hiển thị trực tiếp trong khối ```` ```mermaid ````.

- **Thời gian cài:** ~30 giây (npm). Render mỗi sơ đồ ~2 giây.
- **Độ khó cài:** Trung bình. Bình thường `npm i` tự tải Chromium (~150 MB); trong môi trường bị chặn phải tự trỏ tới Chromium có sẵn bằng file cấu hình puppeteer.

## Kết quả

- **Flowchart:** thể hiện đúng cả 12 bước theo 3 khung giai đoạn đặt từ trái sang phải, người duyệt chiến lược (lục giác) và người duyệt nội dung (hình thoi "Đạt chưa?"), mũi tên đỏ "❌ Chưa đạt → sửa lại" quay về Agent Viết, và vòng lặp tím nét đứt từ Giai đoạn 3 về Giai đoạn 1. Dùng được luôn cho bài viết/slide.
- **Mindmap:** ra sơ đồ tỏa tròn nhiều màu, đủ 12 bước + vòng lặp (vòng lặp chỉ ghi bằng chữ). Nhìn vui mắt nhưng hơi "trẻ con", thứ tự các nhánh do máy tự xếp (không theo chiều kim đồng hồ 1→4).
- Tiếng Việt đúng dấu hoàn toàn với font Inter (kể cả chữ in đậm `<b>`, emoji).

## Lỗi / hạn chế gặp phải

1. **Subgraph không giữ được hướng riêng.** Khi các node bên trong nối ra ngoài khung, `direction TB` trong subgraph bị bỏ qua → bản đầu tiên ra một cột dọc rất dài (1568×4680 px). Cách sửa: nối **khung với khung** (`S1 ==> S2`) thay vì node với node.
2. **Vòng lặp làm đảo thứ tự khung.** Có cạnh S3 → S1 thì bộ xếp hình (dagre) đặt Giai đoạn 3 lên bên trái. Mẹo sửa: khai báo các subgraph theo thứ tự ngược (S3, S2, S1) trong file. Đây là mẹo "mò" ra, người mới khó tự biết.
3. Cú pháp `A <-. "nhãn" .- B` (mũi tên ở đầu) không chạy đúng — mũi tên vẫn vẽ ở cuối.
4. Bố cục ELK (`layout: elk`) không có sẵn trong mmdc (không báo lỗi, chỉ lặng lẽ dùng dagre).
5. `mmdc` bản 12 không còn tuỳ chọn `-w` (độ rộng) → báo `unknown option '-w'`, phải dùng `-s` (scale).
6. Mindmap bỏ qua `title` trong frontmatter (không hiện tiêu đề).
7. Tô màu riêng cho mũi tên phải dùng `linkStyle <số thứ tự cạnh>` → phải tự đếm cạnh, dễ sai khi sửa sơ đồ.

## Chấm điểm (1–10)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | **6** | Cú pháp đơn giản, có mermaid.live; nhưng chỉnh bố cục đẹp cần mẹo |
| Đẹp / dùng được cho content | **7** | Flowchart rõ ràng, dùng được; hơi "kỹ thuật", ít chất "thiết kế" |
| Hỗ trợ tiếng Việt | **9** | Dấu chuẩn, chọn được font Inter qua config |
| Miễn phí / offline | **10** | MIT, CLI chạy offline (cần Chromium) |

**Đáng dùng không?** Có — là lựa chọn an toàn nhất: phổ biến nhất, chạy ngay trong GitHub/Notion/Obsidian, đủ loại sơ đồ; chỉ cần chấp nhận phải mò mẹo khi muốn bố cục đẹp.
