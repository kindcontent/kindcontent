# Các style của draw.io / next-ai-draw-io, vẽ trên cùng sơ đồ "Quy trình Agentic Content"

Thư mục này gồm **75 PNG** và **65 file `.drawio`** (mỗi kiểu nhìn có một file `.drawio` để mở trong app.diagrams.net).
- Thứ tự hiển thị và nhận xét (tốt nhất trước) nằm trong `manifest.json`.
- Mọi ảnh đều render thật bằng **draw.io gốc (jgraph/drawio 32.5.5) chạy local**. Riêng bản "Minimal" render qua **MCP server của next-ai-draw-io**.
- Kích thước: PNG rộng tối đa 1600px, nặng tối đa 350KB.
- Danh sách tùy chọn lấy từ mã nguồn (`js/diagramly/Editor.js`, `js/grapheditor/Format.js`, `Editor.js`, `resources/dia_vi.txt`) và đối chiếu lại trên giao diện tiếng Việt.

## Top gợi ý cho content creator
1. `style-palette-1-pastel`: pastel theo giai đoạn. Rõ ràng, an toàn nhất.
2. `style-palette-5-gradient`: pastel có chuyển màu. Hợp làm thumbnail.
3. `style-edge-curved`: mũi tên cong, mềm mại, hợp mạng xã hội.
4. `style-shadow`: đổ bóng nhẹ.
5. `style-sketch-font-itim`: vẽ tay mà **chữ tiếng Việt vẫn chuẩn**.
6. `template-adapt-cycle`: mẫu lục giác vòng lặp. Rất hợp làm post hoặc carousel.

---

## 1. Mẫu phong cách cả sơ đồ: tab "Phong cách" khi không chọn gì
**Cách mở:** Định dạng → bỏ chọn hết → tab **Phong cách**. Tab này có 3 ô tick **Bo tròn / Phác thảo / Đổ bóng**, nút **◐ Sáng/Tối**, và **20 ô mẫu** chia 2 trang.
Ảnh giao diện: `ui-format-phong-cach-presets.png`.

- **Đã render:** 19 mẫu, file `style-preset-00` đến `style-preset-19`.
  - Ô số 0 và ô số 10 đều là "trống", nghĩa là xóa hết màu về trắng/đen, nên chỉ render một lần (`preset-00`).
- **Cơ chế:** bấm một mẫu thì draw.io đổi fill, viền và màu chữ của **tất cả** hình và mũi tên thành **một màu duy nhất**.
  - Vì vậy sơ đồ mất cách phân biệt 3 giai đoạn bằng màu.
  - Nhãn trên đường cũng bị mất nền trắng, nên chữ "VÒNG LẶP…" bị nét đứt gạch ngang qua.
- **Màu nền trang:** một số mẫu có kèm màu nền trang, nhưng draw.io 32 **không tự đổi nền** (trong code đặt `ignoreGraphStyle = true`).
  - Nếu giữ nền trắng thì nhiều mẫu bị chữ trắng trên nền trắng.
  - Vì vậy sau khi bấm mẫu, tôi **đặt thêm màu nền trang** đúng như mẫu gợi ý, và **đổi màu chữ tiêu đề/chú giải** cho tương phản. Đây là việc người dùng cũng phải tự làm.
- **Mẫu dùng được ngay:** 01 (cát/cam), 18 (tím than/hồng), 03 (navy/kem), 12 (bạc hà), 09, 15, 02, 16.
- **Mẫu kém:**
  - 13, 06, 14: chữ khó đọc.
  - 17, 19: mũi tên màu trắng biến mất trong các lane nền nhạt.

## 2. Bảng ô màu khi chọn một hình (6 bảng × 8 ô)
**Cách mở:** chọn một hình → tab **Phong cách** → hàng ô màu ở đầu panel (đổi bảng bằng dấu chấm hoặc mũi tên).
Ảnh giao diện: `ui-format-shape-bang-mau.png`.

- **Đã render 6 kiểu nhìn** (`style-palette-1` đến `style-palette-6`). Tôi tô theo từng giai đoạn bằng đúng mã màu của mỗi bảng:
  1. Pastel
  2. Metro rực, chữ trắng
  3. Đậm trầm
  4. Pastel trầm
  5. Gradient
  6. Nền tươi viền đen `#36393d`
- **Lưu ý:** draw.io không có nút "đổi cả sơ đồ sang bảng N". Bảng ô màu áp **từng hình**, nên cách tô theo giai đoạn ở đây là do tôi ghép.

## 3. Hiệu ứng (Phong cách → Hiệu ứng): Bo tròn, Phác thảo, Kính, Đổ bóng
| Hiệu ứng | File | Ghi chú |
|---|---|---|
| Đổ bóng | `style-shadow` | Đẹp, tinh tế |
| Kính | `style-glass` | Trông cũ |
| Bỏ bo tròn | `style-sharp-corners` | Góc vuông, kiểu kỹ thuật |
| Comic (`comic=1`) | `style-comic` | **Không có nút** trên giao diện, phải gõ vào "Chỉnh sửa kiểu…". Khác biệt rất nhẹ |

## 4. Phác thảo (Sketch, vẽ tay bằng rough.js)
Có **7 kiểu tô** (mục "Tô"): Tự động, Kẻ sọc, Đường liền nét, Chấm bi, Đan chéo, Nét đứt, Đường zíc zắc.

| Kiểu tô | Có render? | Ghi chú |
|---|---|---|
| Kẻ sọc | Có (`style-sketch-fill-hatch`) | Với màu nhạt, "Tự động" cho ra **đúng y hệt** "Kẻ sọc" nên chỉ giữ một ảnh |
| Đường liền nét | Có (`style-sketch-fill-solid`) | |
| Đan chéo | Có (`style-sketch-fill-cross-hatch`) | |
| Nét đứt | Có (`style-sketch-fill-dashed`) | |
| Đường zíc zắc | Có (`style-sketch-fill-zigzag-line`) | |
| **Chấm bi** | **Không** | Bị **tắt trong code** draw.io ("disabled due to performance problems"), nên luôn hiện như "Tự động" (đã kiểm tra: ảnh giống hệt từng pixel) |

**Font vẽ tay và tiếng Việt** (đã kiểm tra subset trên Google Fonts):
- `Architects Daughter`, font mặc định của Sketch: **không có subset tiếng Việt**. Các chữ như ế, ứ, ộ phải lấy từ font khác nên nhìn lệch (`style-sketch-font-architects-daughter`).
- `Itim` và `Patrick Hand`: **có tiếng Việt**, hiển thị chuẩn. Itim dễ đọc hơn.

## 5. Kiểu mũi tên (Đường thẳng → Điểm tham chiếu)
- **Trực giao:** là bản gốc.
- **Đường cong** (`style-edge-curved`): đẹp nhất.
- **Khuỷu dọc** (`style-edge-elbow-vertical`): gọn.
- **Kiểu nên tránh với sơ đồ có vòng lặp**, đã render để thấy rõ:
  - **Thẳng + xóa điểm tham chiếu** (`style-edge-straight`): đường chéo cắt qua các hộp.
  - **Mối quan hệ của đối tượng** (`style-edge-entity-relation`).
  - **Đẳng cự** (`style-edge-isometric`): rối hoàn toàn.
- **Đường nhảy** (Cung / Khoảng cách / Góc): **không render**, vì trong bản gốc không có hai mũi tên nào cắt nhau nên không thấy gì khác.
- **Mũi tên chuyển động** (`flowAnimation=1`): **không thấy trên PNG**. Chỉ chạy trong trình soạn hoặc file SVG. File `../agentic-content-mcp.svg` có sẵn `@keyframes` cho vòng lặp.

## 6. Chế độ tối
- File: `style-dark-mode`.
- **Cách bật:** ◐ ở tab Phong cách, hoặc Giao diện → Tối. draw.io dùng "adaptive colors" tự đảo màu.
- Lane và hộp đẹp, nhưng **chú giải chữ đen trên nền tối bị chìm**. Cần đặt màu chữ rõ ràng nếu định xuất ảnh tối.

## 7. Giao diện (theme) của trình soạn draw.io
Theme chỉ đổi **khung giao diện**, **không đổi sơ đồ**.

- **Đã chụp:** Cổ điển (Kennedy), Simple, Sketch, Tối giản (min), Atlas, cùng bản Tối của Cổ điển và Simple (`ui-theme-*.png`).
- **Cách đổi:** menu Giao diện.
- Ảnh chụp ở chế độ embed, menu giao diện đã đặt tiếng Việt.

## 8. Bản mẫu (Templates)
**Cách mở:** Sắp xếp → Chèn → **Bản mẫu…**, hoặc Tập tin → Mới… trên app.diagrams.net. Ảnh hộp thoại: `ui-mau-template-dialog.png`.

**Danh mục trong hộp thoại (tiếng Việt):** Cơ bản (11), Từ văn bản (5), Kinh doanh (15), Sơ đồ (6), Đám mây (41), Kĩ thuật (3), Lưu đồ (9), Bản đồ (5), Mạng (13), Khác (12), Phần mềm (12), Bảng (4), UML (8), Venn (8), Wireframe (5).

**Thư mục trong repo** `src/main/webapp/templates/`: basic, business, charts, cloud (aws/azure/gcp/ibm), engineering, flowcharts, layout, maps, network, other, software, tables, uml, venn, wireframes.

- **Đã render 18 mẫu gốc hợp với content** (`template-*.png`): flowchart, swimlanes, mindmap, kanban, cross-functional, workflow, swimlane kinh doanh, timeline 1–2, mind map, concept map, cycle, infographic 1–4, process bar, gantt.
  - Các infographic rất dài đã thu nhỏ còn cao 2400px.
- **Đã chuyển 3 mẫu sang nội dung Agentic Content** (`template-adapt-*`):
  - **Cycle** (lục giác vòng lặp): đẹp nhất cho social.
  - **Mind map**: 4 nhánh = 3 giai đoạn và "Người duyệt & vòng lặp".
  - **Process bar**: 4 chevron.
- **Không render:**
  - Mẫu Đám mây, Mạng, Kĩ thuật, Phần mềm, UML, Venn, Wireframe, ERD, BPMN: không liên quan đến content creator.
  - Nhóm "Từ văn bản": ví dụ tạo sơ đồ từ văn bản kiểu Mermaid/PlantUML, không phải style.

## 9. Style riêng của next-ai-draw-io
- **Cài đặt → Drawing → Diagram style:**
  - **Styled** (mặc định): AI dùng màu và icon. Prompt hệ thống chỉ liệt kê các khóa style (fillColor, rounded, curved, dashed…), **không có bảng màu hay preset riêng**.
  - **Minimal**: trắng đen, container trong suốt. Đã render qua MCP (`style-nextai-minimal`). Phần XML là Claude viết theo đúng luật Minimal trong `lib/system-prompts.ts`.
- **Custom instructions:** ví dụ "Always use a blue color scheme". Với MCP thì ghi vào `~/.next-ai-drawio/instructions.md`. Đây là cách "đặt style" chính.
- **Theme của app:** Sáng / Tối / Theo hệ thống.
- **Biến môi trường cho MCP:**
  - `DRAWIO_UI`: kennedy, atlas, dark, min, sketch hoặc simple. Giống phần 7.
  - `DRAWIO_DARK`.
- **Mũi tên chuyển động:** `flowAnimation`.
