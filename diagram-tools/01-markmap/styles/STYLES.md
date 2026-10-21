# markmap — toàn bộ tùy chọn style đã thử (markmap-cli 0.18.12)

Danh sách tùy chọn lấy từ mã nguồn `markmap-view` (`IMarkmapJSONOptions` trong `types.d.ts`) và CSS của gói, không đoán. markmap **không có theme có sẵn**: mọi kiểu dáng đều đến từ các tùy chọn bên dưới (đặt trong frontmatter `markmap:` của file .md) cộng với CSS. Thứ tự hiển thị nằm trong `manifest.json` (đẹp nhất trước).

File nguồn `.md` nằm trong `src/`. Font Inter, nền và dark mode được chèn vào HTML bằng CSS (xem `src/build-styles.py`), vì CLI không có tùy chọn font.

## Tùy chọn có trong markmap (frontmatter `markmap:`)
| Tùy chọn | Tác dụng | Đã render |
|---|---|---|
| `color` (mảng màu) | Bảng màu riêng / đơn sắc | ✅ bảng màu riêng, một màu |
| `colorFreezeLevel` | Từ tầng nào trở xuống giữ nguyên màu nhánh | ✅ 0 (cầu vồng), 2 (bản chính), 3 |
| `initialExpandLevel` | Mở sẵn đến tầng mấy | ✅ 2 (chỉ giai đoạn), 3 (đến agent), -1 (mở hết) |
| `maxWidth` | Chiều rộng tối đa của node trước khi xuống dòng | ✅ 460, 300 |
| `spacingVertical`, `spacingHorizontal` | Khoảng cách dọc/ngang | ✅ bản thoáng |
| `lineWidth` (số hoặc mảng theo tầng) | Độ dày nét nhánh | ✅ [8,5,3,2] |
| `paddingX`, `nodeMinHeight` | Đệm chữ / chiều cao tối thiểu node | khác biệt rất nhỏ, không render riêng |
| `duration`, `zoom`, `pan`, `fitRatio`, `maxInitialScale` | Hoạt ảnh và tương tác trong HTML | không thể hiện trên ảnh tĩnh |
| `extraCss`, `extraJs` | Nạp thêm CSS/JS | (cách chuẩn để đổi font; ở đây chèn CSS trực tiếp) |

## Tính năng khác
- **Dark mode**: class `markmap-dark` (nút ◐ trên toolbar).
- **Toolbar**: có sẵn, tắt bằng `--no-toolbar`.
- **Gập riêng từng nhánh**: `<!-- markmap: fold -->`.
- **Markdown phong phú**: đậm/nghiêng/gạch, `code`, checkbox, link, công thức KaTeX. Tất cả đã render. KaTeX hiển thị tiếng Việt trong `\text{}`, nhưng chữ ra kiểu có chân.

## Không làm được
- Không có theme dựng sẵn, sketch/vẽ tay, hay hình khối khác (hình thoi, khung…). Mọi node chỉ là chữ + đường gạch chân.
- Không vẽ được mũi tên vòng lặp: mind map là cây, nên 2 vòng lặp chỉ ghi bằng chữ.
- CLI không xuất PNG/SVG. Mọi ảnh ở đây chụp HTML bằng Playwright, rồi thu về ≤ 1600 px, ≤ 350 KB.
