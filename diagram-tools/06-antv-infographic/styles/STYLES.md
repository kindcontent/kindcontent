# AntV Infographic: toàn bộ kiểu dáng (template, theme, palette)

Bản thử là `@antv/infographic` 0.2.20. `getTemplates()` trả về **276 template**. Tôi đã render **cả 276** bằng nội dung "Quy trình Agentic Content" (tiếng Việt, font Inter, icon Lucide offline). Kết quả: **276/276 render không lỗi**, nhưng **27 template có lỗi hiển thị hoặc không hợp với nội dung** (`ok:false` trong `templates/index.json`).

Danh mục để xem nhanh:
- `templates/`: 276 ảnh thu nhỏ (≤ 800px, ≤ 150KB) và mã nguồn từng template trong `templates/src/`.
- `sheet-*.png`: ảnh tổng hợp theo nhóm. Tên in đỏ là template `ok:false`.
- `theme-*.png`: 2 template tốt nhất (snake, roadmap) chạy qua mọi theme, palette và stylize.
- `manifest.json`: danh sách sheet và ảnh theme, kèm nhận xét. `tools/` chứa script để tạo lại toàn bộ.

## Danh mục theo nhóm (số lượng)

| Nhóm | Số template | Dữ liệu tôi đưa vào | Ghi chú |
|---|---|---|---|
| `sequence-*` | 47 | 12 bước, hoặc 3 giai đoạn + vòng lặp cho dạng vòng/tháp/phễu/3D | Nhóm hợp nhất với quy trình. 6 bản lỗi (5 bản `-illus` và color-snake-icon-line). |
| `sequence-interaction-*` | 36 | 2 làn **Agent AI / Con người**, 12 nút, mũi tên "chưa đạt" | Thể hiện đúng human-in-the-loop. 3 kiểu chiều rộng × 3 kiểu đường × 4 kiểu nút. |
| `list-*` | 29 | Lưới/cột: 12 bước. Hàng/quạt/tháp/zigzag: 3 giai đoạn + vòng lặp | 6 bản lỗi: circular-progress hiện 0%, chữ chồng, quạt cắt chữ, kim tự tháp mất tầng 4. |
| `hierarchy-tree-*` | 100 | Gốc → 3 giai đoạn → 12 Agent | 4 hướng (TB, BT, LR, RL) × 5 kiểu đường × 5 kiểu nút. Hướng TB/BT quá rộng, LR/RL dễ đọc. Không hiển thị tiêu đề. |
| `hierarchy-mindmap-*` | 10 | Như trên | Đẹp. 2 bản circle-progress hiện 0%. Không hiển thị tiêu đề. |
| `hierarchy-structure*` | 2 | Như trên | Các khối lồng nhau, chỉ dùng 1 màu. |
| `compare-*` | 20 | "Agent AI thực hiện" và "Con người kiểm duyệt"; SWOT/quadrant: 3 giai đoạn + vòng lặp | 9 bản lỗi: gạch chân đè chữ, chữ chồng cột trái. Bản arrow/fold có chữ **PROS/CONS tiếng Anh cố định**. |
| `quadrant-*` | 3 | 3 giai đoạn + vòng lặp | 1 bản `-illus` lỗi. |
| `relation-*` | 18 | dagre: 12 nút có vòng sửa bài và vòng phản hồi. circle/network: vòng 4 giai đoạn | Chỉ dagre vẽ được vòng lặp, nhưng LR quá dẹt và TB quá dài. 3 bản lỗi (network mất hoặc cắt nhãn, circle-progress 0%). |
| `chart-*` | 11 | Số bước mỗi giai đoạn (4/5/3) và word cloud từ khóa | Đây là ánh xạ minh hoạ vì nội dung không có số liệu thật. Word cloud không hiển thị tiêu đề. |
| **Tổng** | **276** | | **249 dùng được, 27 lỗi hoặc không hợp** |

## Theme, palette và stylize có sẵn
- **Theme:** `light`, `dark`, `hand-drawn` (= font 851tegakizatsu + nét phác rough).
- **Palette:** `antv`, `spectral`, hoặc tự đặt mảng màu (tôi dùng 3 màu theo giai đoạn).
- **Stylize:** `rough`, `linear-gradient`, `radial-gradient`, `pattern` (6 mẫu: dot, line, square, diamond, hex, mosaic; tôi thử dot và line).
- **Font:** tự đặt qua `theme > base > text > font-family`. Tôi thử Inter, Be Vietnam Pro, Patrick Hand, Pangolin và 851tegakizatsu.

Đã render 15 tổ hợp cho mỗi template snake và roadmap (30 ảnh), cộng 1 ảnh bonus.

### Vấn đề tiếng Việt của theme hand-drawn
Font mặc định 851tegakizatsu là font Nhật. Đối chiếu bảng glyph, font này **thiếu 45/55 chữ có dấu tiếng Việt** (ạ ả ấ ầ … ế ệ ợ ộ ỹ). Khi render, các chữ đó bị lấy từ font khác nên nét lệch hẳn so với chữ xung quanh: xem `theme-*--handdrawn-font-goc.png`. Bản này còn biến emoji 👤 thành hình người đen. Cách khắc phục là giữ theme hand-drawn nhưng đổi font sang **Patrick Hand** hoặc **Pangolin** (có bộ chữ tiếng Việt, cài qua `@fontsource`). Kết quả đủ dấu và vẫn giữ chất vẽ tay: xem `theme-*--handdrawn-patrick-hand.png` và `theme-*--handdrawn-pangolin.png`.

## Top 15 cho người làm content
1. `sequence-snake-steps-compact-card`: 12 bước dạng rắn, rõ, có icon và mô tả. Bản dark + màu giai đoạn rất đẹp.
2. `sequence-roadmap-vertical-badge-card`: "con đường" dọc 01→12, hợp đăng story hoặc Pinterest. Đẹp với radial-gradient và hand-drawn + Patrick Hand.
3. `sequence-interaction-wide-badge-card`: làn Agent AI và Con người, có mũi tên "chưa đạt". Đây là cách thể hiện human-in-the-loop tốt nhất.
4. `list-grid-badge-card`: lưới thẻ 12 Agent, gọn, màu theo giai đoạn.
5. `list-grid-candy-card-lite`: lưới thẻ viền màu, nhẹ nhàng.
6. `hierarchy-mindmap-branch-gradient-capsule-item`: mindmap 3 giai đoạn → Agent (phải tự thêm tiêu đề).
7. `hierarchy-tree-lr-curved-line-capsule-item`: cây ngang, dễ đọc với 12 lá.
8. `sequence-circular-simple`: vòng Chiến lược → Thực thi → Phân phối → Đo lường.
9. `sequence-pyramid-simple`: tháp 4 tầng, có màu và mô tả.
10. `sequence-ascending-stairs-3d-simple`: bậc thang 3D, bắt mắt cho 4 giai đoạn.
11. `sequence-mountain-underline-text`: tranh núi minh hoạ, hợp ảnh bìa.
12. `list-row-horizontal-icon-arrow`: hàng mũi tên 4 giai đoạn, hợp banner ngang.
13. `relation-dagre-flow-tb-compact-card`: sơ đồ luồng duy nhất vẽ đủ 2 vòng lặp (ảnh dài).
14. `compare-hierarchy-row-letter-card-compact-card`: "AI làm" và "Người duyệt" hai cột.
15. `compare-quadrant-quarter-circular`: 4 góc gồm 3 giai đoạn + vòng lặp.

Tổ hợp theme nên dùng: **dark + palette màu giai đoạn**, **hand-drawn + Patrick Hand hoặc Pangolin**, **roadmap + radial-gradient**, và **light + Be Vietnam Pro** (font Việt).

## Những gì hỏng hoặc chưa ổn
- **Gradient trên `sequence-snake-steps-compact-card`:** thẻ nền trắng bị phủ gradient tối và tiêu đề thẻ gần như biến mất (`theme-snake--linear-gradient.png`, `theme-snake--radial-gradient.png`). Pattern trên template này thì gần như không thấy. Cùng các stylize đó lại đẹp trên roadmap (thẻ có màu).
- **8 template `-illus`:** cần ảnh minh hoạ unDraw tải từ GitHub, bị chặn trong môi trường thử. Tôi thay bằng icon Lucide nên trông to và thô, và đánh lỗi cả 8 (có mạng thì có thể đẹp hơn, chưa kiểm chứng).
- **circular-progress / circle-progress (5 bản):** cần giá trị %, nội dung quy trình không có nên hiện "0%".
- **Chồng hoặc cắt chữ:** compare-binary simple/underline-text (6), compare-hierarchy-left-right (2), list-row-horizontal-icon-line, list-sector-simple, sequence-color-snake-steps-horizontal-icon-line, relation-network-icon-badge.
- **Mất dữ liệu:** list-pyramid-rounded-rect-node chỉ vẽ 3/4 mục; relation-network-simple-circle-node không có nhãn; relation-circle-icon-badge không vẽ cạnh nối.
- **Chữ tiếng Anh cố định:** "PROS / CONS" trong compare-binary arrow/fold, "VS" trong bản -vs.
- **Bỏ qua tiêu đề:** mọi hierarchy-tree, hierarchy-mindmap và chart-wordcloud.
- **Bố cục quá rộng/dài với 12 mục:** zigzag ngang, dagre LR, cây TB/BT (chữ rất nhỏ). Nên dùng ít mục hơn hoặc đổi hướng.
- **Icon theo từ khóa và font mặc định cần mạng** (weavefox.cn, CDN antgroup): toàn bộ bộ này dùng loader Lucide offline và font cài qua npm.
