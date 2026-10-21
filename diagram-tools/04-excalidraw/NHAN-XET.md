# 04 — Excalidraw

- **Repo:** https://github.com/excalidraw/excalidraw
- **Số sao GitHub:** ~134.300 ⭐ (134.290 lúc kiểm tra ngày 21/10/2026), giấy phép MIT
- **Phong cách:** bảng trắng, nét vẽ tay (hand-drawn)
- **Bản đã thử:** npm `@excalidraw/excalidraw` 0.18.1 + `@excalidraw/mermaid-to-excalidraw` 2.2.2

## Cách dùng (cho người làm content)

1. **Dùng web miễn phí (cách dễ nhất):** mở https://excalidraw.com, không cần tài khoản. Kéo thả hình, gõ chữ, nối mũi tên. Muốn mở sơ đồ trong thư mục này: menu ☰ → *Open* → chọn file `.excalidraw`. Xuất ảnh: menu ☰ → *Export image* → PNG/SVG.
2. **Từ Mermaid:** thanh công cụ → biểu tượng *More tools* → *Mermaid to Excalidraw* → dán đoạn mã (file `quy-trinh.mmd`) → *Insert*. Sơ đồ chèn vào vẫn sửa, kéo, đổi màu được như bình thường.
3. **Tự host / offline:** excalidraw.com là PWA, cài được như ứng dụng và chạy được khi mất mạng. Có thể tự host (Docker image chính thức, hoặc nhúng gói npm vào trang web). Bản cộng tác/lưu đám mây nâng cao là *Excalidraw+* (trả phí), nhưng bản miễn phí đã đủ để vẽ sơ đồ này.

## Cách cài mình đã dùng để test

- Một trang Vite + React dùng `@excalidraw/excalidraw` (component editor, `convertToExcalidrawElements`, `exportToBlob`, `exportToSvg`, `serializeAsJSON`) và `@excalidraw/mermaid-to-excalidraw`. Chạy bằng Chromium headless qua Playwright.
- Font: copy `node_modules/@excalidraw/excalidraw/dist/prod/fonts` ra thư mục public rồi đặt `window.EXCALIDRAW_ASSET_PATH = location.origin + "/"` để không phải tải font từ CDN.
- Phải ghim `mermaid@11.12.1` bằng `overrides` (xem phần lỗi).
- Mã nguồn để chạy lại: `nguon/` (`src/scene.js` dựng sơ đồ vẽ tay, `run.mjs` xuất PNG/SVG/.excalidraw, `editor*.mjs` chụp màn hình editor, `glyphs.py` + `fontprobe.mjs` kiểm tra font).

## Kết quả

| File | Nội dung |
|---|---|
| `quy-trinh-agentic-content.png` / `.svg` / `.excalidraw` | **Sơ đồ chính, dựng tay**: 3 khung giai đoạn có màu riêng (xanh dương / xanh lá / tím), 12 bước, 2 điểm duyệt 👤 (nền vàng, viền nét đứt), vòng sửa bài 9 → 6 (đỏ), vòng lặp phản hồi 12 → Giai đoạn 1 (hồng), chú thích. Font **Nunito**. PNG rộng 2200px. |
| `quy-trinh-agentic-content-font-excalifont.png` / `.excalidraw` | Cùng sơ đồ đó nhưng để font mặc định Excalifont (vẽ tay), dùng để so sánh lỗi dấu. |
| `mermaid-to-excalidraw.png` / `.svg` / `.excalidraw` | Test (a): chuyển từ Mermaid (`quy-trinh.mmd`), đổi chữ sang Nunito. |
| `mermaid-to-excalidraw-font-excalifont.png` | Test (a) với font mặc định. |
| `kiem-tra-font-tieng-viet.png` | Bảng so sánh 7 font của Excalidraw với chữ tiếng Việt. |
| `screenshots/editor-so-do-ve-tay.png` | Editor Excalidraw đang mở sơ đồ chính. |
| `screenshots/editor-bang-thuoc-tinh-font.png` | Chọn một ô chữ: bảng thuộc tính bên trái, mục *Font family*. |
| `screenshots/editor-chon-font-excalifont.png` | Danh sách font trong editor (Excalifont, Comic Shanns, Lilita One, Nunito). |
| `screenshots/editor-hop-thoai-mermaid.png`, `editor-mermaid-da-chen.png` | Hộp thoại *Mermaid to Excalidraw* có sẵn, và kết quả sau khi bấm *Insert*. |

**Chất lượng:** sơ đồ dựng tay rất hợp làm content: nhìn thân thiện, kiểu "vẽ trên bảng", màu sắc rõ, đúng toàn bộ nội dung mẫu. Bản Mermaid vẫn đúng logic (3 nhóm, 12 bước, 2 điểm duyệt hình thoi, vòng sửa, vòng phản hồi). Nhưng bố cục do máy xếp nên các khung bị lệch so le và chữ hơi nhỏ, nên chỉ dùng làm bản nháp rồi kéo chỉnh lại bằng tay.

## Lỗi gặp phải

### 1. ⚠️ Font vẽ tay mặc định KHÔNG hỗ trợ đủ tiếng Việt (phát hiện quan trọng nhất)

Mình kiểm tra bảng ký tự (cmap) của các file font đi kèm gói npm, với 68 ký tự có dấu tiếng Việt:

| Font trong Excalidraw | Nút trong editor | Thiếu ký tự tiếng Việt | Kết quả |
|---|---|---|---|
| **Excalifont** (mặc định) | ✏️ *Hand-drawn* | 46/68 (thiếu ư, ơ, ạ, ả, ậ, ệ, ợ, ữ, ỹ…) | ❌ chữ bị trộn font |
| Virgil (font vẽ tay cũ) | – | 46/68 | ❌ |
| Comic Shanns | `</>` *Code* | 48/68, thiếu cả "đ" | ❌ |
| Liberation Sans | – | 46/68 | ❌ |
| Lilita One | trong danh sách | 52/68 | ❌ |
| **Nunito** | **A *Normal*** | **0/68** | ✅ đúng hoàn toàn |
| Cascadia (font code cũ) | không còn trong danh sách | 0/68 | ✅ (chỉ hiện nếu file cũ đã dùng) |

- Khi dùng Excalifont, các chữ như "Người", "lược", "duyệt" **vẫn đọc được nhưng bị lệch font**: ký tự thiếu được trình duyệt mượn từ font hệ thống (trong máy test là font có chân Liberation Serif), nên giữa một chữ vẽ tay lại lẫn vài ký tự kiểu Times. Xem `kiem-tra-font-tieng-viet.png`, ở dòng thứ hai của mỗi font. Đo bằng Chrome DevTools: một câu tiếng Việt 96 ký tự viết bằng Excalifont có 16 ký tự phải lấy từ font khác. Font mượn trên Windows/macOS sẽ khác máy test, nhưng chữ vẫn bị trộn font.
- **Cách khắc phục:** chọn chữ → *Font family* → **"Normal" (Nunito)**. Đây là font duy nhất trong danh sách vừa hiện đúng mọi dấu tiếng Việt vừa còn dễ thương. Hình và nét vẫn giữ kiểu vẽ tay, chỉ chữ là font thường. Sơ đồ chính trong thư mục này dùng Nunito.
- Đừng chọn "Code" (Comic Shanns) vì font này còn tệ hơn với tiếng Việt.
- Excalidraw không cho thêm font riêng (font vẽ tay có tiếng Việt) trên excalidraw.com.

### 2. Giao diện không có tiếng Việt
Bản dịch vi-VN chỉ đạt 49% nên Excalidraw ẩn luôn khỏi danh sách ngôn ngữ, giao diện hiện bằng tiếng Anh. Truyền `langCode="vi-VN"` khi nhúng cũng không có tác dụng. Nội dung trên sơ đồ thì vẫn gõ tiếng Việt bình thường.

### 3. Mermaid → Excalidraw: vài lỗi nhỏ
- **Subgraph bị lỗi với mermaid bản mới:** khi `npm install`, máy kéo về `mermaid@11.17.2` và mọi sơ đồ có `subgraph` đều báo `SubGraph element not found`, nên chỉ chèn được một **ảnh tĩnh** (không sửa được). Ghim `mermaid@11.12.1` thì hết lỗi. Lỗi này chỉ gặp khi tự cài bằng npm, mình chưa thấy trên excalidraw.com.
- Ký tự `<br/>` trong nhãn hiện nguyên văn. Phải dùng chuỗi markdown (`` "`dòng 1⏎dòng 2`" ``) để xuống dòng.
- Trong chuỗi markdown, "1. " bị hiểu thành danh sách nên mất số thứ tự. Viết `**1.**` thì giữ được. Còn `1\.` thì hiện cả dấu `\`.
- Mũi tên ngược `A <-.- B` bị mất đầu mũi tên. Trong file `.excalidraw` mình đã thêm lại bằng code (trên web thì bấm vào mũi tên → *Arrowheads* là xong).
- `direction LR` trong subgraph bị bỏ qua nếu có nút bên trong nối ra ngoài, nên mình nối giữa các khung (G1 → G2 → G3) thay vì nối 4 → 5.
- Ô nhập mã trong hộp thoại hiển thị dấu tiếng Việt hơi lệch (font monospace hệ thống), nhưng chỉ ở ô nhập, sơ đồ tạo ra vẫn đúng.

### 4. Không có tự động dàn trang
Sơ đồ đẹp nhất là bản tự sắp vị trí từng ô. Người không biết code sẽ phải kéo thả 12 ô + 5 mũi tên vòng, mất khoảng 20–40 phút, nhưng làm hoàn toàn bằng chuột.

## Chấm điểm

| Tiêu chí | Điểm (1–10) | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | **8** | Web kéo thả, không cần đăng ký. Trừ điểm vì không tự dàn trang và nhập Mermaid vẫn phải viết mã. |
| Đẹp / dùng được cho content | **8** | Phong cách vẽ tay nổi bật, hợp bài blog/fanpage. Xuất PNG/SVG sắc nét. |
| Hỗ trợ tiếng Việt | **6** | Font mặc định lỗi dấu (trộn font), giao diện không có tiếng Việt. Đổi sang Nunito thì chữ hiển thị đúng 100%. |
| Miễn phí / offline | **9** | MIT, web miễn phí, PWA chạy offline, tự host được. Tính năng nâng cao thuộc Excalidraw+ (trả phí). |

**Đáng dùng không?** Có: đây là lựa chọn đẹp và dễ nhất để vẽ sơ đồ kiểu "vẽ tay" cho content, miễn là **đổi font chữ sang "Normal" (Nunito)**, vì font vẽ tay mặc định làm chữ tiếng Việt bị lệch font.
