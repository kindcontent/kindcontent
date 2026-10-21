# Nhận xét: markmap

- **Repo:** https://github.com/markmap/markmap
- **Số sao GitHub:** ~13.182 ⭐ (tra ngày 21/10/2026)
- **Loại công cụ:** Text → mind map (viết dàn ý Markdown, ra sơ đồ tư duy tương tác)
- **Phiên bản đã test:** `markmap-cli` 0.18.12

## File trong thư mục

| File | Mô tả |
|---|---|
| `quy-trinh-agentic-content.md` | Nguồn: dàn ý Markdown (heading `#`, `##`, `###` và gạch đầu dòng) |
| `quy-trinh-agentic-content.html` | Mind map tương tác, chạy offline (đóng gói sẵn JS), bấm vào nút để thu gọn/mở nhánh, kéo/zoom được |
| `quy-trinh-agentic-content.png` | Ảnh chụp 2300×1520 px, nền trắng, font Inter |
| `chup-png.js` | Script Playwright để chụp HTML thành PNG (markmap không có lệnh xuất PNG) |

## Cách cài (lệnh đã chạy được)

```bash
mkdir work && cd work && npm init -y
npm i markmap-cli playwright-core        # playwright-core chỉ để chụp PNG

# Tạo HTML (offline = nhúng hết JS/CSS vào 1 file)
npx markmap --no-open --offline -o quy-trinh-agentic-content.html quy-trinh-agentic-content.md

# Chụp PNG bằng Chromium có sẵn
node chup-png.js quy-trinh-agentic-content.html quy-trinh-agentic-content.png
```

Không muốn cài gì: dán Markdown vào https://markmap.js.org/repl (chạy trên trình duyệt), hoặc dùng extension **Markmap** cho VS Code / plugin Obsidian.

- **Thời gian cài:** ~30 giây (npm install). Render HTML: ~1 giây.
- **Độ khó cài:** Dễ. Chỉ cần Node.js. Tuỳ chỉnh qua frontmatter `markmap:` (maxWidth, colorFreezeLevel, khoảng cách...).

## Kết quả

- Vẽ đúng toàn bộ nội dung: 3 giai đoạn, 12 bước, 2 điểm duyệt của người (👤), vòng sửa bài và vòng lặp phản hồi.
- Tiếng Việt hiển thị đúng dấu hoàn toàn (kể cả chữ in đậm, emoji).
- Mỗi nhánh tự có một màu, đường cong mềm, nhìn khá "sạch", hợp để đăng dạng "dàn ý / tổng quan".
- File HTML tương tác là điểm mạnh: người xem bấm vào để thu gọn/mở từng giai đoạn.

## Lỗi / hạn chế gặp phải

1. **Không vẽ được mũi tên luồng/vòng lặp.** Mind map chỉ là cây, nên "chưa đạt → quay lại Agent Viết" và "đo lường → quay lại Chiến lược" chỉ ghi được bằng chữ, không có mũi tên quay vòng. Không thể hiện được tính *quy trình*.
2. **Không có lệnh xuất PNG/SVG** từ CLI. Phải tự chụp bằng trình duyệt (mình dùng Playwright). Trên bản web REPL có nút tải SVG.
3. **Không có tuỳ chọn font** trong CLI. Mặc định là `sans-serif` (ra Arial/Liberation). Mình phải chèn CSS `--markmap-font: ... Inter` vào file HTML, và phải dùng `!important` vì style mặc định của markmap đè lên.
4. Chữ dài bị xuống dòng (`maxWidth` mặc định nhỏ) → đã tăng `maxWidth: 460`.
5. Không có hình khối (hình thoi quyết định, khung giai đoạn…): chỉ có chữ + đường nối.

## Chấm điểm (1–10)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | **8** | Chỉ cần biết viết Markdown; có bản web REPL không cần cài |
| Đẹp / dùng được cho content | **7** | Đẹp, gọn cho mind map; nhưng không thể hiện được luồng & vòng lặp |
| Hỗ trợ tiếng Việt | **9** | Dấu chuẩn; chỉ trừ điểm vì phải tự chèn CSS để đổi font |
| Miễn phí / offline | **10** | MIT, chạy offline hoàn toàn (`--offline`) |

**Đáng dùng không?** Có — nếu cần mind map/dàn ý tương tác nhanh từ Markdown; không — nếu cần sơ đồ quy trình có mũi tên, vòng lặp.
