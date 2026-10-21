# D2 — toàn bộ style đã thử (d2 v0.7.1)

Danh sách lấy bằng lệnh `d2 themes` và `d2 layout` trên bản đã cài, không đoán. Ảnh vẽ đúng nội dung "Quy trình Agentic Content". File nguồn nằm trong `src/`: `theme.d2` là bản bỏ màu tự chọn để theme có hiệu lực, `color*.d2` là bản màu tự chọn. Thứ tự hiển thị nằm trong `manifest.json` (đẹp nhất trước).

## 1. Theme (`--theme ID`) — 20/20 đã render
- **Light (18):**
  - 0 Neutral Default, 1 Neutral Grey, 3 Flagship Terrastruct, 4 Cool Classics, 5 Mixed Berry Blue, 6 Grape Soda, 7 Aubergine, 8 Colorblind Clear
  - 100 Vanilla Nitro Cola, 101 Orange Creamsicle, 102 Shirley Temple, 103 Earth Tones, 104 Everglade Green, 105 Buttered Toast
  - 300 Terminal, 301 Terminal Grayscale, 302 Origami, 303 C4
- **Dark (2):** 200 Dark Mauve, 201 Dark Flagship Terrastruct. Ảnh để nguyên nền tối.
- Ghi chú:
  - Theme chỉ đổi màu những khối **không** đặt `fill`/`stroke` bằng tay.
  - Theme 303 C4 làm mất tiêu đề markdown (chữ trắng trên nền trắng).
  - Terminal/Terminal Grayscale tự chuyển chữ sang in hoa monospace; tiếng Việt in hoa vẫn đúng dấu.

## 2. Sketch mode (`--sketch`) — bật/tắt
Đã render 7 bản sketch: màu tự chọn, 0, 102, 104, 200, 300, 302. Font viết tay hiển thị tiếng Việt đúng dấu. Riêng Terminal vẫn giữ font monospace.

## 3. Bố cục miễn phí — 2/2
`elk` và `dagre` là 2 bố cục có sẵn trong bản miễn phí (`d2 layout`). Bản chính dùng ELK; bản dagre có mũi tên cong hơn.
- **TALA** (bố cục trả phí, cho mỗi khung một hướng riêng): **không render được** vì cần cài plugin và mua license riêng.

## 4. Kiểu khối (style keywords) — đã thử
- `shadow`, `border-radius` (bản chính).
- `multiple`, `fill-pattern: dots`.
- `3d`, `fill-pattern: paper`, `double-border`.
- `stroke-dash`, `bold`/`italic`, `font-size`, `font-color` (bản chính).
- Các `fill-pattern` khác (`lines`, `grain`) có trong tài liệu D2, chưa render riêng.

## Có trong D2 nhưng không render
- `--dark-theme ID`: chỉ tạo 1 SVG tự đổi sáng/tối theo hệ điều hành, xuất PNG vẫn chỉ ra 1 bản → không có ảnh riêng.
- `--animate-interval`, layers/scenarios/steps: dùng để làm nhiều trang/hoạt ảnh, không phải style.
- Font tùy chọn (`--font-regular`…) cần file `.ttf`; máy chỉ có Inter `.otf` → dùng font mặc định Source Sans Pro (tiếng Việt chuẩn).
- Xuất PNG trực tiếp bằng d2 vẫn hỏng: d2 phải tải driver Playwright và bị chặn (403). Mọi PNG được chụp lại từ SVG bằng Playwright, rồi thu về ≤ 1600 px, ≤ 350 KB.
