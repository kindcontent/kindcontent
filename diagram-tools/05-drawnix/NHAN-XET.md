# 05 — Drawnix: Nhận xét khi vẽ "Quy trình Agentic Content"

- **Repo:** https://github.com/plait-board/drawnix (nhánh mặc định `develop`, license MIT, TypeScript/React, xây trên framework vẽ Plait)
- **Số sao GitHub:** ~14.961 ⭐, ~1.300 fork (tra ngày 21/10/2026)
- **Bản dùng thử online:** https://drawnix.com
- **Commit đã test:** `b138ff8` (07/09/2026)

## Drawnix là gì?
Một bảng trắng (whiteboard) mã nguồn mở, tất cả trong một: **sơ đồ tư duy (mind map), lưu đồ (flowchart), vẽ tự do**, chèn ảnh. Có sẵn 2 công cụ nhập văn bản:
- **Markdown sang Drawnix**: dán dàn ý Markdown (`#`, `##`, `-`) → thành mind map.
- **Mermaid sang Drawnix**: dán code Mermaid → thành lưu đồ **có thể chỉnh sửa** (từng ô, từng mũi tên là đối tượng riêng, kéo thả được).

Xuất được **PNG, JPG, SVG** và file nguồn **`.drawnix`** (JSON). Dữ liệu tự lưu trong trình duyệt, không cần tài khoản.

## Cách dùng
| Cách | Dành cho ai | Ghi chú |
|---|---|---|
| **Online: drawnix.com** | Người không biết code | Mở trình duyệt là dùng, không cần đăng ký. Dữ liệu chỉ nằm trong trình duyệt của bạn. |
| **Docker** | Người biết chút kỹ thuật | `docker pull pubuzhixing/drawnix:latest` (theo README, tôi chưa test vì container không có Docker) |
| **Tự cài từ source** | Lập trình viên | Xem lệnh bên dưới |

Các bước trong app (đã làm đúng như người dùng):
1. Bấm ☰ (Menu ứng dụng) → **Language** → **Tiếng Việt**.
2. Bấm biểu tượng **Công cụ mở rộng** (ô cuối thanh công cụ) → **Markdown sang Drawnix** hoặc **Mermaid sang Drawnix**.
3. Dán nội dung vào ô bên trái, xem trước bên phải → **Chèn** (hoặc Ctrl+Enter).
4. Zoom → **Vừa màn hình**. Chỉnh sửa nếu cần.
5. ☰ → **Xuất hình ảnh** → PNG/JPG/SVG; ☰ → **Lưu thành** → file `.drawnix`.

## Cài đặt (lệnh chính xác đã chạy)
```bash
git clone --depth 1 https://github.com/plait-board/drawnix
cd drawnix
# package-lock.json trỏ một số gói về registry.npmmirror.com (mirror Trung Quốc) → bị chặn 403 ở môi trường của tôi.
# Sửa bằng cách đổi về registry chính thức:
sed -i 's#https://registry.npmmirror.com/#https://registry.npmjs.org/#g' package-lock.json
npm ci                      # ~30 giây, 1.197 gói
npx nx serve web --port=4301 --host=127.0.0.1   # Vite sẵn sàng sau ~1 giây
# README ghi đơn giản: npm install && npm run start  (cổng mặc định 7200)
```
- **Thời gian:** khoảng 2–3 phút từ lúc clone đến lúc app chạy (gồm 1 lần cài lỗi vì npmmirror).
- **Độ khó:** dễ với lập trình viên (Node 22 + npm). Người không biết code **không cần cài**, cứ dùng drawnix.com.

## Kết quả
### a) Markdown → Mind map: **rất tốt** ✅
- `input-mindmap.md` → `03-mindmap-export.png` (2400px), file nguồn `mindmap.drawnix`
- Tiếng Việt hiển thị **đúng dấu 100%** (font Inter), emoji 👤 hiển thị tốt, mỗi giai đoạn tự có màu nhánh riêng, bố cục gọn, đẹp, dùng ngay cho bài đăng được.
- Hạn chế tự nhiên của mind map: **không vẽ được mũi tên vòng lặp** (sửa lại → Agent Viết, đo lường → Chiến lược). Tôi thể hiện chúng bằng nhánh chữ "Chưa đạt → quay lại Agent Viết" và nhánh "Vòng lặp".
- Ảnh chụp: `01-mindmap-hop-thoai-markdown.png` (hộp thoại + xem trước), `02-mindmap-tren-bang.png` (trên bảng vẽ).

### b) Mermaid → Flowchart: **dùng được, nhưng phải chỉnh tay** ⚠️
- `input-flowchart.mmd` → `07-flowchart-export.png` (1800×3767), file nguồn `flowchart.drawnix`
- Đủ 12 bước, 3 khung giai đoạn, 2 hình thoi duyệt 👤, vòng "Chưa đạt" → Agent Viết, nét đứt "Kết quả đo lường → tối ưu chu kỳ sau" quay lại Agent Nghiên cứu. Tiếng Việt đúng dấu.
- Nhìn chung **giống Mermaid gốc** (khung vàng nhạt, ô tím nhạt), chưa "đẹp kiểu content". Hình thoi rất to, ảnh rất dài theo chiều dọc. Muốn đẹp phải tự đổi màu, kích thước trên bảng (làm được vì mọi thứ đều chỉnh sửa được).

## Lỗi / vấn đề gặp phải
1. **Cài đặt:** `package-lock.json` có 47 gói trỏ tới `registry.npmmirror.com` → `npm ci` lỗi 403 ở mạng bị chặn. Phải `sed` đổi sang `registry.npmjs.org`.
2. **Mind map cắt mất chữ:** node `1 bài gốc → nhiều định dạng (post, reel, email)` hiển thị thiếu `email)` (xem `03b-mindmap-loi-cat-chu.png`). Trong file `.drawnix` dữ liệu vẫn đủ chữ, nên đây là lỗi đo khung chữ khi hiển thị. **Cách né:** bỏ ngoặc, viết `1 bài gốc → nhiều định dạng: post, reel, email`. File `input-mindmap.md` trong thư mục này là bản đã né lỗi.
3. **Flowchart lần 1 sai bố cục:** viết vòng phản hồi theo cách tự nhiên `C3 -.-> A1` thì bố cục đẩy **Giai đoạn 3 lên trên cùng**, mũi tên "Đạt" chạy ngược cả trang (xem `05-flowchart-lan1-sai-bo-cuc.png`). **Cách né:** viết ngược `A1 <-.-|...| C3`.
4. **Bộ chuyển Mermaid làm mất đầu mũi tên phía bắt đầu** (`<-.-` thành đường không có mũi tên). Tôi sửa **ngay trong giao diện** như người dùng: chọn đường nét đứt → thanh công cụ nổi → **Bắt đầu** → **Mũi tên** (xem `06-flowchart-chinh-mui-ten-tren-bang.png`), rồi xuất lại.
5. Tên khung giai đoạn ("Giai đoạn 2 — Thực thi") bị mũi tên đi vào **đè lên chữ** một chút. Lỗi nhỏ, kéo tay là xong.
6. Bản dịch tiếng Việt đổi tiêu đề màn hình chào thành **"DPIT Draw MindMap"** thay vì "Drawnix" (`vi.ts`, khoá `tutorial.title`). Có vẻ người dịch để lại thương hiệu riêng. Không ảnh hưởng chức năng, nhưng hơi lạ.
7. Ngôn ngữ mặc định là **tiếng Trung**. Phải tự đổi sang tiếng Việt một lần (app nhớ lựa chọn).

Ghi chú kỹ thuật: tôi điều khiển giao diện bằng Playwright (click menu, dán chữ, bấm Chèn, Xuất, Lưu thành, Mở file), **không chèn dữ liệu bằng code**. Mẹo duy nhất: tắt `showSaveFilePicker` của trình duyệt để file tải về qua link thường (hộp thoại "Lưu" gốc không bấm được trong chế độ headless).

## UI có tiếng Việt không?
**Có**, bản dịch đầy đủ: thanh công cụ, menu, hộp thoại Markdown/Mermaid, màu sắc, chủ đề, hướng dẫn. Xem `00-giao-dien-tieng-viet-menu.png`. Chỉ có mục chọn ngôn ngữ vẫn ghi "Language", và cần đổi một lần vì mặc định là tiếng Trung.

## Chấm điểm (1–10)
| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Dễ dùng với người không biết code | **8** | drawnix.com dùng ngay, có tiếng Việt, dán Markdown là ra mind map. Flowchart vẫn cần biết Mermaid. |
| Đẹp / dùng được cho content | **7** | Mind map đẹp, dùng ngay được (8–9). Flowchart từ Mermaid còn thô, phải chỉnh tay (5–6). |
| Hỗ trợ tiếng Việt | **9** | Chữ đúng dấu hoàn toàn, giao diện tiếng Việt. Trừ điểm vì lỗi cắt chữ trong node có ngoặc và tiêu đề "DPIT". |
| Miễn phí / offline | **9** | MIT, miễn phí, không cần tài khoản, tự host được (Docker/source), dữ liệu ở máy bạn. |

## Đáng dùng không?
**Đáng dùng.** Đây là cách nhanh nhất để biến dàn ý Markdown tiếng Việt thành mind map đẹp, chỉnh sửa được, miễn phí. Với flowchart có vòng lặp thì dùng được, nhưng phải chỉnh tay vài chỗ.

## Danh sách file
| File | Nội dung |
|---|---|
| `input-mindmap.md` | Markdown đã dán (bản đã né lỗi cắt chữ) |
| `input-flowchart.mmd` | Mermaid đã dán (bản bố cục đúng) |
| `00-giao-dien-tieng-viet-menu.png` | Giao diện tiếng Việt + menu Công cụ mở rộng |
| `01-mindmap-hop-thoai-markdown.png` | Hộp thoại Markdown sang Drawnix + xem trước |
| `02-mindmap-tren-bang.png` | Mind map trên bảng vẽ |
| `03-mindmap-export.png` | **PNG xuất từ Drawnix**: mind map (kết quả chính) |
| `03b-mindmap-loi-cat-chu.png` | Lần đầu: lỗi cắt chữ "email)" |
| `04-flowchart-hop-thoai-mermaid.png` | Hộp thoại Mermaid sang Drawnix + xem trước |
| `05-flowchart-lan1-sai-bo-cuc.png` | Lần đầu: Giai đoạn 3 bị đẩy lên trên |
| `06-flowchart-chinh-mui-ten-tren-bang.png` | Chọn đường phản hồi để thêm mũi tên đầu |
| `07-flowchart-export.png` | **PNG xuất từ Drawnix**: flowchart (kết quả chính) |
| `mindmap.drawnix`, `flowchart.drawnix` | File nguồn, mở lại được bằng ☰ → Mở trên drawnix.com |
