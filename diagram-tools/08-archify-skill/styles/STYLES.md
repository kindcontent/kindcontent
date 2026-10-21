# archify: toàn bộ kiểu sơ đồ và phong cách (đã đối chiếu với mã nguồn v3.2.0)

Danh mục dưới đây lấy từ `SKILL.md`, các file `schemas/*.schema.json` và mã của trình xem (`viewer/`) trong repo, không đoán. Có 21 ảnh PNG đã render với nội dung Agentic Content. Mọi bản đều được làm theo đúng quy trình của skill (`finalize` qua các bước kiểm tra), rồi xuất ảnh bằng chính nút **Xuất → PNG** trong HTML. Thứ tự hiển thị và nhận xét từng ảnh nằm trong `manifest.json`.

## 1. Loại sơ đồ (`diagram_type`)

| Loại | Đã render? | Ghi chú |
|---|---|---|
| `workflow` (quy trình theo làn) | Có, 10 ảnh | Kiểu hợp nhất với nội dung này. Tối đa 6 cột nên 12 bước phải xếp chồng hình zig-zag. |
| `explainer` (trang trả lời một trang) | Có, 5 ảnh | Viết bằng Markdown (`.archify.md`). Gồm kết luận, sơ đồ chia hàng theo giai đoạn, 12 bước, bảng và ghi chú. **Không hỗ trợ dịch giao diện**: các chữ "Answer", "Applies to", chân trang, menu Export/Style vẫn là tiếng Anh. |
| `tree` (cây phân cấp) | Có, 2 ảnh (`down`, `right`) | Không vẽ được vòng lặp. Hướng `right` bị che ô cuối khi xem trong trang. |
| `sequence` (tuần tự, ai gửi cho ai) | Có | Bản 12 người tham gia thì quá rộng (cần 1288px, bị chặn vì chữ sẽ quá nhỏ), nên phải gộp thành 5 vai trò. |
| `lifecycle` (vòng đời trạng thái) | Có | 12 trạng thái thì quá rộng (3482px, giới hạn khoảng 1395px), nên phải gộp thành 6 trạng thái theo giai đoạn. |
| `architecture` (thành phần + khung) | Có | Dùng lưới 3 cột, mỗi giai đoạn một khung. Mũi tên vòng lặp cắt ngang các khung. |
| `dataflow` (luồng dữ liệu) | Có | 5 cột. Phải rút gọn tên ô vì ô chỉ rộng 112px. |
| `timeline` | **Không** | Cần mốc thời gian thật (ISO). Nội dung mẫu không có ngày giờ, vẽ ra sẽ phải bịa. |
| `waterfall` | **Không** | Cần thời lượng từng bước (ms/giây). Nội dung mẫu không có. |
| `erd` | **Không** | Dành cho bảng cơ sở dữ liệu và các cột. Không hợp nội dung. |
| `class` | **Không** | Dành cho lớp và interface trong code. Không hợp nội dung. |

## 2. Phong cách hiển thị (sơ đồ thường: `meta.visual_preset`)

`classic` (mặc định), `signal-flow`, `blueprint`, `editorial`. Có thể đặt sẵn trong file JSON, hoặc người xem tự đổi bằng nút **Phong cách** trong HTML. Mình đã render đủ 4 kiểu × sáng/tối cho workflow (8 ảnh). Khi chụp ảnh tĩnh, `classic` và `signal-flow` khác nhau rất ít. `editorial` (serif, nền kem) và `blueprint` (nét đứt, xanh bản vẽ) thì khác rõ.

## 3. Phong cách trang explainer (`@meta style=`)

`clean`, `editorial`, `product`, `swiss`. Cả 4 đã render (bản sáng), riêng `clean` có thêm bản tối. Trên trang có nút **Style** và **System / Light / Dark** để người đọc tự đổi.

## 4. Chế độ màu

Sáng / Tối. Sơ đồ thường tự theo cài đặt máy, có nút chuyển và tham số URL `?theme=dark`. Explainer có thêm lựa chọn "System". Ảnh xuất PNG theo đúng chế độ đang bật.

## 5. Mật độ và các tùy chọn bố cục khác

- `meta.quality_profile`: `showcase` (mặc định, kiểm tra kỹ hơn) hoặc `standard` (dày hơn). Đã render một ảnh `standard`; khác biệt chỉ khoảng 5% bề ngang.
- `tree.layout.direction`: `down` hoặc `right`; ngoài ra có `gapX`, `gapY`, `nodeW`, `nodeMaxW`.
- `sequence.meta.column_fit`: `spread` hoặc `fixed`.
- `architecture.layout.mode=grid` (lưới) hoặc đặt tọa độ tự do (`pos`/`size`).
- `meta.engineering_profile=deployment-ownership`: chỉ dành cho sơ đồ hạ tầng triển khai, **không render** vì không liên quan nội dung.
- `meta.legend.mode`: `auto`, `all`, `hidden`; có thể đổi chữ trong chú giải.
- `icon` cho từng nút: calendar, clock, person, briefcase, flag, moon và các biểu tượng kỹ thuật. Mình dùng `person` cho 2 người duyệt.
- `brand`: gắn logo thương hiệu thật cho nút (không dùng ở đây).

## 6. Kiểu xuất file (menu Xuất trong HTML)

- PNG, JPEG, WebP.
- SVG Tự động / Sáng / Tối (vector, sửa được).
- **WebM 6 giây**: video chuyển động; không render vì đây là video, không phải ảnh.
- Sao chép PNG vào bộ nhớ tạm.
- **Thẻ chia sẻ đường đi** 1200×630: đã render (`style-route-share-card.png`).
- **Thẻ chia sẻ phạm vi** 1200×630: đã thử. Vì quy trình là vòng khép kín nên thẻ này làm nổi gần như toàn bộ sơ đồ, không có giá trị riêng, nên không đưa vào.
- Explainer có thêm in hoặc lưu PDF.

Chế độ **Trình chiếu** (toàn màn hình) và **Chuyển động / Tĩnh** chỉ là trạng thái khi xem, không tạo ra ảnh khác.

## File HTML giữ lại (mở bằng trình duyệt, tương tác được)

- `style-explainer-clean.html`: trang một trang. Bấm Style để tự xem 4 phong cách.
- `style-sequence.html`
- `style-lifecycle.html`

Bản workflow và tree đầy đủ nằm ở thư mục cha (`../quy-trinh-agentic-content.*.html`). Trong các file HTML này có thể tự chuyển phong cách và sáng/tối. File nguồn để làm lại các ảnh nằm trong `nguon/`.

## Lưu ý chung

- Dấu tiếng Việt hiển thị đúng ở mọi kiểu.
- Sơ đồ thường dùng font monospace. Explainer dùng font sans (Inter), nên trông "mềm" và dễ đọc hơn cho content.
- Tên file khi bấm Xuất bị mất dấu (`s-quy-tr-nh-...png`). Đây là lỗi đã biết của repo (issue #1024).
- Giao diện tiếng Việt của sơ đồ thường là bản mình (agent) tự dịch 486 chuỗi, máy dịch, chưa có người Việt rà lại. Một số cụm còn gượng, ví dụ thẻ chia sẻ ghi "Phạm vi Xuôi dòng".
