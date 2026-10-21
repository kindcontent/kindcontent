# Drawnix: toàn bộ style / biến thể (vẽ cùng nội dung "Quy trình Agentic Content")

33 ảnh PNG (rộng ≤ 1600px, mỗi ảnh ≤ 350KB). Thứ tự hiển thị và nhận xét từng ảnh nằm trong `manifest.json`. File nguồn `.drawnix` của từng biến thể ở thư mục `drawnix-src/`; mở bằng ☰ Menu → **Mở** trên drawnix.com.

> **Lưu ý quan trọng:** giao diện Drawnix chỉ cho đổi **chủ đề (theme)**, **màu**, **kiểu nét**, **đầu mũi tên**. Còn **bố cục mind map, kiểu nhánh, kiểu node** thì thư viện Plait bên dưới có hỗ trợ, nhưng **không có nút nào trong giao diện**. Muốn dùng phải sửa file `.drawnix` (JSON) rồi mở lại. Các ảnh đó được đánh dấu "KHÔNG có trong giao diện".

## 1. Chủ đề bảng vẽ (6), có trong giao diện
Đổi ở ô chọn góc dưới bên phải. Chủ đề áp dụng cho cả bảng: nền, màu nhánh mind map, màu mũi tên/viền mặc định.

| Chủ đề | Mind map | Flowchart |
|---|---|---|
| Mặc định (default) | ✅ | ✅ |
| **Đầy màu sắc (colorful)**: đẹp nhất | ✅ | ✅ |
| Nhẹ nhàng (soft) | ✅ | ✅ |
| Cổ điển (retro) | ✅ | ✅ |
| Tối (dark) | ✅ | ✅ |
| Bầu trời sao (starry) | ✅ | ✅ |

**Phát hiện:** flowchart nhập từ Mermaid bị **gắn cứng màu** (khung vàng `#ffffde`, ô tím nhạt). Vì vậy đổi chủ đề chỉ đổi nền và mũi tên. Ở chủ đề **Tối / Bầu trời sao**, chữ chuyển trắng nhưng ô vẫn sáng nên **không đọc được** (`style-flow-mermaid-dark/starry.png`).
**Cách sửa ngay trong giao diện:** Ctrl+A → **Màu tô** → «Màu chủ đề», rồi **Đường viền** → «Màu chủ đề». Sau đó flowchart ăn theo mọi chủ đề (`style-flow-themecolor-*.png`).

## 2. Bố cục mind map (9), KHÔNG có trong giao diện
Thêm vào node gốc trong file `.drawnix`: `"layout": "<giá trị>"`. Tất cả ảnh dùng chủ đề Đầy màu sắc.

| Giá trị | Tên | Đã vẽ |
|---|---|---|
| `right` | Sang phải (mặc định khi nhập Markdown) | ✅ chính là `style-mind-theme-colorful.png` |
| `left` | Sang trái | ✅ |
| `standard` | Hai bên. **Cần thêm** `"rightNodeCount": 2`, nếu không thì trông y hệt `left` | ✅ |
| `downward` | Cây đổ xuống (org chart) | ✅ ảnh có toàn cảnh + phóng to (rất ngang) |
| `upward` | Cây mọc lên | ✅ toàn cảnh + phóng to |
| `right-bottom-indented` | Dàn ý thụt lề (logic/outline) | ✅ đẹp cho infographic dọc |
| `right-top-indented` | Thụt lề, thứ tự lộn ngược | ✅ |
| `left-bottom-indented` | Thụt lề canh phải | ✅ |
| `left-top-indented` | Thụt lề trái, lộn ngược | ✅ |

Không có bố cục **xương cá (fishbone)**, **timeline** hay **sơ đồ tròn/radial** trong Plait/Drawnix.

## 3. Kiểu nhánh và kiểu node mind map, KHÔNG có trong giao diện
- **Kiểu nhánh** `branchShape`: `bight` (đường cong, mặc định) và `polyline` (gấp khúc vuông góc). ✅ `style-mind-branch-polyline.png`
- **Kiểu node** `shape`: `round-rectangle` (khung bo góc, mặc định) và `underline` (chỉ gạch chân). ✅ `style-mind-shape-underline.png`
  - Lưu ý: không đặt `underline` cho node gốc, nếu không chữ trắng của node gốc mất nền và biến mất.
- Kết hợp gạch chân + gấp khúc: ✅ `style-mind-underline-polyline.png`
- `branchWidth` (độ dày nhánh), `branchColor`, `fill`, `strokeColor` của từng node: chỉnh màu được trong giao diện (Màu tô / Màu chữ / Đường viền). Không vẽ riêng vì chỉ là đổi màu.

## 4. Flowchart: hình, mũi tên, nét (có trong giao diện)
`style-catalog-shapes-arrows-pen-*.png` vẽ hoàn toàn bằng thanh công cụ (3 chủ đề: Mặc định, Đầy màu sắc, Tối):
- **9 hình dạng:** Chữ nhật, Chữ nhật bo tròn, Elip, Thoi, Tam giác, Bình hành, Terminal, Ngoặc móc trái, Ngoặc móc phải.
- **3 kiểu mũi tên:** Thẳng, Vuông góc (elbow), Cong. Chỉ chọn được **lúc vẽ mũi tên mới**; không có nút đổi kiểu cho mũi tên có sẵn.
- **3 kiểu nét:** Nét liền, Nét đứt, Nét chấm (chọn mũi tên → Đường viền).
- **Đầu mũi tên:** mỗi đầu chỉ có 2 lựa chọn, «Không» hoặc «Mũi tên» (không có tam giác rỗng, chấm tròn, kim cương...).
- **Bút vẽ tự do:** bút + tẩy, 3 mẫu nét có sẵn (mảnh đen 2px, vừa đỏ 6px, dày xanh 10px); chỉnh màu và độ dày 1–24px.

Áp kiểu mũi tên cho cả flowchart Mermaid (sửa JSON):
- **Vuông góc (elbow):** ✅ `style-flow-arrow-elbow.png`. Chạy được nhưng định tuyến hơi rối.
- **Cong (curve): KHÔNG vẽ được.** Đổi tất cả mũi tên sang `curve` làm trang **treo với lỗi "Maximum call stack size exceeded"** (thử cả giữ và bỏ các điểm gấp). Mũi tên cong vẽ tay riêng lẻ thì vẫn bình thường (có trong bảng mẫu).

## 5. Những thứ khác không vẽ
- **Chèn ảnh, emoji, liên kết:** có trong giao diện, nhưng là nội dung, không phải style.
- **Tô nền flowchart theo từng giai đoạn:** làm được bằng tay (chọn ô → Màu tô). Đây là tùy biến tự do, không phải style có sẵn.
- **Kiểu "vẽ tay" (rough/sketchy) như Excalidraw:** Drawnix dùng `roughjs` để vẽ nhưng khoá cứng `roughness: 0` (`packages/react-board/src/board.tsx`), nên **không có tùy chọn nét vẽ tay** cho hình.
- **Mermaid sequence/class diagram:** hộp thoại có hỗ trợ, nhưng nội dung này là quy trình nên không áp dụng.

## Cách làm
Mọi ảnh đều xuất bằng chức năng **☰ → Xuất hình ảnh → PNG** của Drawnix (chạy local, điều khiển bằng Playwright), rồi thu nhỏ còn 1600px. Ảnh quá ngang (upward/downward) được ghép thêm một đoạn phóng to. Những biến thể không có trong giao diện được tạo bằng cách sửa file `.drawnix` rồi **Mở** lại trong app. Đổi chủ đề, đổi màu, vẽ hình, mũi tên, nét và bút đều làm trực tiếp trên giao diện.
