# Kết quả test công cụ Diagram

Mọi công cụ đều vẽ cùng một nội dung: `content.md` (Quy trình Agentic Content, 12 bước). Mỗi thư mục có ảnh kết quả và `NHAN-XET.md` chi tiết.

## Nên dùng gì

| Nhu cầu | Chọn | Vì sao |
|---|---|---|
| Tự kéo thả, hình kiểu vẽ tay | **Excalidraw** | Đẹp, dễ dùng. Phải đổi font sang "Normal" thì mới không lỗi dấu tiếng Việt |
| Sơ đồ quy trình chuyên nghiệp, sửa được | **draw.io** (+ **next-ai-draw-io** để Claude vẽ hộ qua MCP) | Miễn phí, có giao diện tiếng Việt, xuất PNG/PDF |
| Infographic đăng mạng xã hội | **AntV Infographic** | 276 mẫu, có skill cho Claude |
| Mind map tiếng Việt | **Drawnix** hoặc **markmap** | Dán dàn ý Markdown là ra mind map ngay |
| Nhờ Claude Code vẽ hình đẹp sẵn | **fireworks-tech-graph** | Đẹp nhất trong 3 skill đã test |

## Bảng điểm (1–10)

| # | Công cụ | ⭐ GitHub | Dễ dùng | Đẹp | Tiếng Việt | Miễn phí | Kết luận |
|---|---|---|---|---|---|---|---|
| 01 | [markmap](https://github.com/markmap/markmap) | 13.2k | 8 | 7 | 9 | 10 | Mind map từ dàn ý, rất nhanh |
| 02 | [mermaid](https://github.com/mermaid-js/mermaid) | 90.8k | 6 | 7 | 9 | 10 | An toàn, dùng được trong Notion/GitHub |
| 03 | [d2](https://github.com/terrastruct/d2) | 25.7k | 4 | 8 | 8 | 8 | Đẹp nhưng khó cài, khó dàn trang |
| 04 | [Excalidraw](https://github.com/excalidraw/excalidraw) | 134.3k | 8 | 8 | 6 | 9 | Đáng dùng, nhớ đổi font "Normal" |
| 05 | [Drawnix](https://github.com/plait-board/drawnix) | 15.0k | 8 | 7 | 9 | 9 | Mind map rất đẹp, giao diện tiếng Việt |
| 06 | [AntV Infographic](https://github.com/antvis/Infographic) | 7.0k | 6 | 8.5 | 8 | 7 | Đáng dùng để làm infographic |
| 07 | [next-ai-draw-io](https://github.com/DayuanJiang/next-ai-draw-io) | 36.3k | 7 | 8 | 7 | 6 | Dùng qua Claude Code không cần API key |
| 07 | [draw.io](https://github.com/jgraph/drawio-desktop) | 63.6k | 8 | 8 | 9 | 10 | Công cụ nền tốt nhất để sửa/xuất |
| 08 | [archify](https://github.com/tt-a1i/archify) | 86.6k | 6 | 7 | 7 | 9 | Ổn nếu đã dùng Claude Code |
| 09 | [diagram-design](https://github.com/cathrynlavery/diagram-design) | 59.1k | 6 | 8 | 7 | 7 | Đẹp kiểu tạp chí, giới hạn 9 ô |
| 10 | [fireworks-tech-graph](https://github.com/yizhiyanhua-ai/fireworks-tech-graph) | 11.8k | 6 | 8 | 8 | 8 | Đẹp, rõ ràng, phải dùng Claude Code |

Số sao lấy ngày 21/10/2026. archify, diagram-design và fireworks mới ra từ tháng 4/2026 nhưng sao tăng rất nhanh: code thật và chạy được, nhưng số sao không phản ánh chất lượng.

## Tất cả style
Mỗi thư mục có `styles/` (ảnh + `STYLES.md` liệt kê đủ catalog + `manifest.json`). Xem trực quan: https://claude.ai/artifact/BsaCNoPNYXfZ3ZkifGSFkA#styles

| Công cụ | Số ảnh | Có gì |
|---|---|---|
| markmap | 15 | Không có theme; chỉ màu nhánh, thu gọn, dark mode |
| Mermaid | 40 | 12 theme, 3 look (classic, handDrawn, neo), 10 layout, 14 loại sơ đồ |
| D2 | 31 | 20 theme, sketch, layout elk/dagre |
| Excalidraw | 24 | 4 preset, fill, độ nguệch ngoạc, mũi tên, font (chỉ Nunito đúng dấu) |
| Drawnix | 33 | 6 theme, 9 bố cục mind map (bố cục chỉ sửa được trong file) |
| AntV Infographic | 45 + 276 mẫu | 276 template, 3 theme, 2 palette, 4 kiểu tô |
| draw.io | 75 | 19 preset, 6 bảng màu, Sketch, comic, glass, kiểu đường nối, template |
| archify | 21 | 7 loại sơ đồ, 4 preset × sáng/tối, 4 kiểu trang giải thích |
| diagram-design | 31 | 13/45 loại sơ đồ, 9 tùy chọn style |
| fireworks-tech-graph | 13 | 12 style + 1 bản metro map |

## Lỗi chung cần biết
- Font vẽ tay thường thiếu dấu tiếng Việt: Excalidraw (dùng Nunito), AntV hand-drawn (dùng Patrick Hand/Pangolin), draw.io Sketch (dùng Itim), tiêu đề diagram-design (dùng Noto Serif).
- Mind map (markmap, Drawnix, mermaid mindmap) không vẽ được mũi tên vòng lặp, chỉ ghi chú bằng chữ.
- Test trên máy cloud không có GPU và không có API key AI, nên các tính năng chat AI chỉ đọc tài liệu, không chạy thật.
