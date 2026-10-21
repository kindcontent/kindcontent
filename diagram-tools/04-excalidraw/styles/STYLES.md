# Excalidraw — tất cả kiểu dáng (style) có thể dùng

Mình kiểm tra trên `@excalidraw/excalidraw` 0.18.1 (cùng bản với excalidraw.com), dựa vào mã nguồn của gói và chụp lại giao diện editor. Mọi ảnh dưới đây đều vẽ lại **cùng sơ đồ “Quy trình Agentic Content”**, mỗi lần chỉ đổi một tùy chọn. Thứ tự hiển thị nằm trong `manifest.json` (bản đẹp nhất xếp trước).

## 4 kiểu dựng sẵn khuyên dùng (có file `.excalidraw` để mở và sửa)

| File | Công thức | Khi nào dùng |
|---|---|---|
| `preset-gon-gang` ⭐ | Architect + Solid + mũi tên Elbow + Nunito | Blog, slide, tài liệu, ai xem cũng dễ đọc |
| `preset-ve-tay` | Cartoonist + Hachure + mũi tên Curve + nền #fffce8 | Fanpage, TikTok, muốn “chất bảng trắng” |
| `preset-nen-toi` | Mặc định + xuất **Dark mode** | Video, slide nền tối |
| `preset-den-trang` | Màu đen/xám + Architect + góc Sharp | In ấn, tài liệu nội bộ |

Cả 4 bản đều dùng font **Nunito (“Normal”)**, vì đây là font duy nhất trong bộ chọn hiển thị đúng tiếng Việt.

## Danh mục đầy đủ

| Nhóm | Các lựa chọn trong editor | Ảnh minh họa |
|---|---|---|
| **Fill (kiểu tô)** | Hachure (gạch chéo), Cross-hatch (ô lưới), Solid (đặc). **Zigzag** là tùy chọn ẩn: giữ Alt rồi bấm nút Hachure | `style-fill-*`, `catalog-fill-x-sloppiness` |
| **Sloppiness (độ nguệch ngoạc)** | Architect (0), Artist (1, mặc định), Cartoonist (2) | `style-rough-*`, `catalog-fill-x-sloppiness` |
| **Stroke width (độ dày nét)** | Thin 1, Bold 2, Extra bold 4 | `style-stroke-thin`, `style-stroke-extra-bold`, `catalog-net-goc-mui-ten` |
| **Stroke style (kiểu nét)** | Solid, Dashed, Dotted | `style-stroke-dotted`, `catalog-net-goc-mui-ten` |
| **Edges (góc)** | Sharp, Round | `style-edges-sharp`, `catalog-net-goc-mui-ten` |
| **Arrow type (kiểu mũi tên)** | Sharp (gấp khúc), Curve (cong), Elbow (vuông góc, tự định tuyến khi kéo ô) | `style-arrow-curve`, `style-arrow-elbow`, `catalog-net-goc-mui-ten` |
| **Arrowheads (đầu mũi tên)** | Không có, arrow, bar, circle, circle_outline, triangle, triangle_outline, diamond, diamond_outline, crowfoot_one, crowfoot_many, crowfoot_one_or_many (11 loại). “dot” là kiểu cũ, vẽ giống circle | `catalog-net-goc-mui-ten` |
| **Font family** | Hand-drawn = Excalifont (mặc định), Normal = Nunito, Code = Comic Shanns, và trong danh sách thêm có Lilita One | `font-so-sanh-tieng-viet`, `style-font-cascadia` |
| **Màu** | Bảng open-color: 12 họ màu (gray, red, pink, grape, violet, blue, cyan, teal, green, yellow, orange, bronze) × 5 sắc độ, cộng đen #1e1e1e, trắng, trong suốt. Ô cuối mở bảng màu đầy đủ hoặc gõ mã hex tùy ý | `catalog-bang-mau`, `style-bang-mau-am` |
| **Nền canvas** | #ffffff, #f8f9fa, #f5faff, #fffce8, #fdf8f6 hoặc mã hex bất kỳ (menu ☰ → Canvas background) | `style-canvas-xanh-nhat`, `preset-ve-tay` |
| **Dark mode** | menu ☰ → Dark mode (editor), hoặc bật Dark mode trong hộp thoại Export image. Khi xuất, Excalidraw **đảo màu** (invert + xoay sắc độ) chứ không dùng bảng màu riêng | `preset-nen-toi` |
| **Hình** | Chữ nhật, hình thoi, elip, mũi tên, đường thẳng, vẽ tự do, chữ, ảnh, frame | `catalog-net-goc-mui-ten` |
| **Độ mờ** | Opacity 0–100 | (không vẽ riêng) |
| **Thư viện** | Nút Library → Browse libraries (libraries.excalidraw.com, 232 bộ miễn phí) | `thu-vien-cong-khai` |

## Font và tiếng Việt (quan trọng)

| Font | Có trong editor? | Tiếng Việt |
|---|---|---|
| **Nunito** (“Normal”) | Có | ✅ Đúng hết |
| Cascadia | Không (đã ngừng, chỉ còn nếu file cũ dùng) | ✅ Đúng, nhưng là font code, chữ rộng |
| Excalifont (“Hand-drawn”, mặc định) | Có | ❌ Thiếu 46/68 ký tự có dấu → chữ lẫn font |
| Comic Shanns (“Code”) | Có | ❌ Thiếu 48/68, thiếu cả “đ” |
| Lilita One | Có (danh sách thêm) | ❌ Thiếu 52/68 |
| Virgil | Không (ngừng) | ❌ Thiếu 46/68 |
| Liberation Sans | Không (chỉ dùng khi xuất phía server) | ❌ Thiếu 46/68 |
| Helvetica | Không (ngừng, font hệ thống) | Tùy máy |

Ảnh `font-so-sanh-tieng-viet.png` cho thấy rõ: với font lỗi, các ký tự như ư, ơ, ạ, ệ, ợ bị trình duyệt mượn từ font hệ thống, nên một chữ lẫn hai kiểu font.

## Thư viện công khai hợp với sơ đồ quy trình / mind map

Danh mục lấy từ `excalidraw/excalidraw-libraries`. Trên excalidraw.com: nút **Library → Browse libraries**.

- **Flow Chart Symbols** (finfin): Start/End, Process, Decision, Document, Database… *(có trong ảnh)*
- **Sticky Notes** (ferminrp), **Simple Sticky Notes** (kleinpetr): giấy ghi chú *(ferminrp có trong ảnh)*
- **Robots** (kaligule): minh họa “Agent” *(có trong ảnh)*
- **Stick Figures** (youritjang), **Stick people** (dhtoran), **Stick Figures Collaboration**: minh họa “Người duyệt” *(youritjang có trong ảnh)*
- **Some hand-drawn signs** (kwirke): dấu tick/chéo vẽ tay *(có trong ảnh)*
- **Clouds** (dimitrios-fkliaras): đám mây cho mind map. *Không đưa vào ảnh* vì mỗi đám mây quá to, chiếm gần hết trang.
- Cũng có: **Customer Journey Map**, **Business Model Templates**, **Gantt Diagram**, **Organization Chart**, **Awesome Slides**, **Presentation Templates**, **Emojis**, **Thicc arrow**.
- Excalidraw **không có “template” sơ đồ** dựng sẵn theo kiểu Canva. Chỉ có các thư viện thành phần như trên, và tính năng chuyển Mermaid hoặc AI “Text to diagram” (AI cần Excalidraw+).

## Những thứ không vẽ riêng (và lý do)

- **Opacity, Layers, Align, Group, Lock**: là thao tác bố cục, không phải phong cách. Đổi độ mờ chỉ làm sơ đồ nhạt đi.
- **Font size S/M/L/XL**: các ảnh đã dùng nhiều cỡ chữ (tiêu đề 40, tên bước 22, mô tả 18).
- **Từng đầu mũi tên trên cả sơ đồ**: gom vào một bảng `catalog-net-goc-mui-ten` vì 12 sơ đồ gần như giống hệt nhau.
- **Stroke style Dashed**: sơ đồ nào cũng đã dùng nét gạch (ô Người duyệt, vòng lặp). Ảnh riêng chỉ làm cho Dotted.
- **Font lỗi (Excalifont, Comic Shanns, Lilita One, Virgil, Liberation Sans)**: không vẽ cả sơ đồ, chỉ so sánh 3 ô trong `font-so-sanh-tieng-viet` (có nhãn ❌ LỖI DẤU). Bản đầy đủ bằng Excalifont nằm ở thư mục cha: `../quy-trinh-agentic-content-font-excalifont.png`.
- **Elbow arrow**: khi xuất ảnh thì nhìn gần giống Sharp (sơ đồ vốn vuông góc). Khác biệt thật nằm trong editor: mũi tên tự đi lại đường khi kéo ô.
- **Curve arrow**: Excalidraw uốn cong theo các điểm gãy. Với đường gấp khúc dài, mũi tên bị xoắn vòng ở góc, nên trong ảnh mình đặt điểm uốn bằng tay (đường chéo mềm).

## Ghi chú kỹ thuật

- Ảnh PNG được xuất bằng `exportToBlob` rộng 1400–1600px. Một số ảnh được giảm còn 256 màu để dưới 350KB; chữ vẫn sắc.
- Mã nguồn để vẽ lại: `../nguon/src/scene.js` (tham số style), `../nguon/src/catalog.js`, `../nguon/styles.mjs`.
