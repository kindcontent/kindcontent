# Nhận xét: fireworks-tech-graph (Claude Code skill)

- **Repo:** https://github.com/yizhiyanhua-ai/fireworks-tech-graph (MIT, bản đã test: v1.2.0, commit `31fea36`)
- **Số sao:** ~11.790 sao, 947 fork (lấy ngày 21/10/2026)
- **Là gì:** một "skill" cho Claude Code / Codex. Bạn nói bằng lời, Claude viết file JSON mô tả sơ đồ (toạ độ, node, mũi tên), rồi chạy script Python của skill để ra **SVG + PNG**. README nói "7 styles" nhưng bản hiện tại thật ra có **12 style** (1 Flat Icon, 2 Dark Terminal, 3 Blueprint, 4 Notion Clean, 5 Glassmorphism, 6 Claude, 7 OpenAI, 8 Dark Luxury, 9–12 là các style kỹ thuật như C4, Cloud, Kafka, SRE).

## Cách cài vào Claude Code

Lệnh chính thức (theo README):

```bash
npx -y skills@1.5.17 add \
  yizhiyanhua-ai/fireworks-tech-graph/skills/fireworks-tech-graph \
  --agent codex claude-code -g -y --copy
```

Hoặc clone thẳng vào thư mục skill:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/yizhiyanhua-ai/fireworks-tech-graph.git ~/.claude/skills/fireworks-tech-graph
```

Sau đó cài thêm bộ chuyển SVG→PNG: `python3 -m pip install cairosvg`, rồi khởi động lại Claude Code. (Muốn xuất GIF động thì cần thêm ffmpeg và `puppeteer-core`, phần này không bắt buộc.)

## Cách dùng (prompt ví dụ)

Trong Claude Code, gõ:

> Vẽ sơ đồ quy trình Agentic Content từ chiến lược đến thực thi và phân phối, theo nội dung file content.md. Tiếng Việt có dấu, style Flat Icon, xuất cả SVG và PNG.

Claude sẽ tự làm các bước: viết JSON → `fireworks.py validate` → `render` → `check` (kiểm tra va chạm, mũi tên, bố cục) → `export-png` → mở ảnh PNG ra xem lại. Muốn đổi style thì chỉ cần nói "làm lại bằng style Notion Clean / Glassmorphism".

## Kết quả

Đã chạy đúng quy trình của skill (dùng script và bộ render của chính nó, cairosvg cài bằng pip trong venv riêng). Có 3 bản, cả 3 đều qua hết các bước kiểm tra tự động của skill (xml, markers, collisions, geometry, composition). Chế độ `text_policy: strict` báo **không có chữ nào bị cắt**:

| File | Style | Kích thước PNG |
|---|---|---|
| `style1-flat-icon.svg/.png` | 1 · Flat Icon (nền trắng, mỗi giai đoạn một màu) | 2400×1515, ~260 KB |
| `style4-notion-clean.svg/.png` | 4 · Notion Clean (tối giản, hợp chèn vào Notion/blog) | 2400×1515, ~205 KB |
| `style5-glassmorphism.svg/.png` | 5 · Glassmorphism (nền tối, nổi bật khi đăng mạng xã hội) | 2400×1515, ~260 KB |

Muốn xem đủ cả 12 style (thêm bản "bản đồ tàu điện" của style 11 và một file HTML tương tác), mở thư mục `styles/`, bắt đầu từ `STYLES.md` và `manifest.json`.

Các file `*.input.json` là dữ liệu đầu vào Claude đã viết. Sửa chữ trong đó rồi render lại là được.

Nội dung trên sơ đồ khớp với content.md: đủ 3 giai đoạn, 12 bước có đánh số, 2 điểm duyệt của con người (biểu tượng người, viền đậm), vòng "Chưa đạt → quay lại Agent Viết" (nét đứt), vòng "Kết quả đo lường → quay lại Chiến lược" (nét đứt chạy vòng dưới đáy) và chú thích màu. Tiếng Việt hiển thị đúng dấu ở mọi chỗ, kể cả chữ IN HOA ("GIAI ĐOẠN", "BƯỚC").

## Lỗi / hạn chế gặp phải

1. **Không có bố cục tự động:** Claude phải tự tính toạ độ x/y cho từng ô, từng đường đi của mũi tên. Lần render đầu tiên bị từ chối ("locked legend intersects…"), phải dời phần chú thích xuống mới qua. Người dùng không cần làm việc này, nhưng nếu Claude tính sai thì sẽ mất thêm vài lượt sửa.
2. **Vòng lặp vượt chuẩn "showcase" của chính tool:** chuẩn này cho mỗi mũi tên tối đa 2 chỗ gấp và tổng 8 chỗ gấp. Riêng mũi tên phản hồi từ Đo lường về Chiến lược thì về mặt hình học bắt buộc phải gấp 3 lần. Tôi đã nới giới hạn một cách công khai trong JSON (`max_bends_per_edge: 3`, `max_total_bends: 12`, `max_route_stretch: 1.6`), các luật còn lại vẫn giữ nguyên.
3. **Biểu tượng "người duyệt" nhìn như mặt mếu:** đường cong vai trong icon `user_avatar` của tool, khi thu nhỏ, trông giống miệng buồn. JSON không có tuỳ chọn nào để sửa.
4. **Mỗi ô chỉ có 1 dòng mô tả:** dòng nào dài thì tool tự thu nhỏ chữ, không xuống dòng. Vì vậy phải làm ô rộng 380px.
5. **Chú thích "Chưa đạt"** bị đè nhẹ lên viền nét đứt của khung Giai đoạn 2, do khe giữa hai khung hẹp. Vẫn đọc được.
6. **Style Notion Clean** cố ý dùng gần như một màu xanh cho mọi mũi tên, nên phải nhìn nét liền/nét đứt mới phân biệt được loại mũi tên. Trong phần chú thích, mũi tên mẫu luôn vẽ nét liền.
7. **Font:** style dùng Helvetica/Avenir/SF. Trên Linux không có các font này nên máy tự thay bằng Inter (có đủ dấu tiếng Việt). Trên máy khác, font thay thế có thể khác.
8. **GIF động:** `doctor` báo thiếu puppeteer, nên không thử. Không bắt buộc.
9. Không phải chạy `rsvg-convert` hay Playwright, vì cairosvg cài bằng pip là đủ.

## Độ tin cậy của repo

- Tạo ngày 10/04/2026 (khoảng 6 tháng tuổi), lần push gần nhất 05/09/2026. Đã nhận ~11,8k sao.
- Toàn bộ lịch sử chỉ có **72 commit**, khoảng 12 người đóng góp. Phần lớn commit (~52) đến từ một người duy trì (tên hiển thị "Brad 强" / "Bard强"), số còn lại là vài commit lẻ từ người ngoài. 1 issue đang mở, giấy phép MIT.
- Số sao rất cao so với tuổi repo và lượng commit. Điều này có thể do repo được chia sẻ rộng, nhưng không nên coi số sao là thước đo chất lượng. Repo có kèm logo nhà tài trợ.
- Kiểm tra mã: các script Python/JS chỉ đọc/ghi file cục bộ. Chỉ gọi tiến trình con để chạy `git`/`rsvg-convert`/`node`/`ffmpeg`. Không thấy lệnh gọi mạng. Trước khi xuất ảnh, SVG được lọc bỏ script và link ngoài. Có test và CI. Đánh giá chung: mã gọn gàng, không thấy dấu hiệu đáng ngại, nhưng tôi không audit toàn bộ ~13.000 dòng.

## Chấm điểm (1–10)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | 6 | Chỉ cần nói với Claude là có ảnh. Nhưng phải cài qua terminal (npx/pip), và kết quả phụ thuộc vào việc Claude tính toạ độ đúng. |
| Đẹp / dùng được cho content | 8 | Ảnh sạch, chuyên nghiệp, sắc nét ở 2400px, 3 style khác hẳn nhau. Trừ điểm vì icon người dễ hiểu nhầm, mỗi ô chỉ 1 dòng mô tả, và bố cục hơi "kỹ thuật". |
| Hỗ trợ tiếng Việt | 8 | Đủ dấu, kể cả chữ IN HOA. Font thay thế phụ thuộc máy, và cách tool ước lượng độ rộng chữ chỉ là gần đúng. |
| Miễn phí / offline | 8 | MIT, render hoàn toàn offline. Nhưng cần Claude Code (trả phí) hoặc Codex để có phần "từ lời nói ra sơ đồ". |

**Đáng dùng không?** Có, nếu bạn đã dùng Claude Code: tool ra sơ đồ quy trình đẹp, đúng dấu tiếng Việt, nhiều style. Còn nếu chưa từng dùng terminal thì nên chọn công cụ kéo-thả cho nhanh.
