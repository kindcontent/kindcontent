# Nhận xét: D2

- **Repo:** https://github.com/terrastruct/d2 (nay là https://github.com/d2lang/d2)
- **Số sao GitHub:** ~25.695 ⭐ (tra ngày 21/10/2026)
- **Loại công cụ:** Ngôn ngữ text → sơ đồ (Go), có theme, sketch mode (nét vẽ tay), nhiều bộ xếp hình (dagre, ELK, TALA trả phí)
- **Phiên bản đã test:** d2 v0.7.1 (cài bằng `go install ...@latest`)

## File trong thư mục

| File | Mô tả |
|---|---|
| `quy-trinh-agentic-content.d2` | Nguồn chính: 3 container (3 giai đoạn), hình thoi duyệt nội dung, vòng sửa bài, vòng lặp phản hồi |
| `quy-trinh-agentic-content.svg` / `.png` | Bản chính, màu tự chọn (PNG 2000×1662 px) |
| `quy-trinh-agentic-content-sketch.svg` / `.png` | Cùng nguồn, bật `--sketch` (nét vẽ tay, font viết tay) |
| `quy-trinh-agentic-content-theme.d2` | Bản bỏ màu tự chọn để dùng theme có sẵn |
| `quy-trinh-agentic-content-theme-terminal.svg` / `.png` | Theme 300 "Terminal" (chữ in hoa kiểu monospace) |
| `svg-sang-png.js` | Script Playwright chuyển SVG → PNG |

## Cách cài (lệnh đã chạy được)

Tải bản cài từ GitHub Releases bị chặn (403), nên cài từ mã nguồn qua Go proxy:

```bash
export GOPATH=$PWD/go GOMODCACHE=$PWD/go/mod GOCACHE=$PWD/go/cache
go install oss.terrastruct.com/d2@latest        # ra file ./go/bin/d2
./go/bin/d2 --version                            # v0.7.1

./go/bin/d2 quy-trinh-agentic-content.d2 quy-trinh-agentic-content.svg
./go/bin/d2 --sketch quy-trinh-agentic-content.d2 quy-trinh-agentic-content-sketch.svg
./go/bin/d2 --theme 300 quy-trinh-agentic-content-theme.d2 quy-trinh-agentic-content-theme-terminal.svg

# PNG: d2 tự xuất PNG được nhưng phải tải driver Playwright -> bị chặn, nên chụp SVG bằng Playwright:
node svg-sang-png.js quy-trinh-agentic-content.svg quy-trinh-agentic-content.png 2000
```

Máy bình thường: tải bản cài sẵn ở trang Releases hoặc `curl -fsSL https://d2lang.com/install.sh | sh -s --`. Không muốn cài: dùng https://play.d2lang.com (playground trên web).

- **Thời gian cài:** ~1 phút (go install tải và biên dịch). Render mỗi sơ đồ 2–4 giây.
- **Độ khó cài:** Trung bình–khó với người không biết code (cần Go, hoặc tải file chạy và dùng dòng lệnh).

## Kết quả

- Bản chính: 3 khung giai đoạn màu xanh dương / xanh lá / hồng đặt cạnh nhau, mũi tên đậm "✅ Duyệt", "✅ Đạt" giữa các khung, hình thoi "👤 9. Người duyệt nội dung — Đạt chưa?" có mũi tên đỏ "❌ Chưa đạt → sửa lại" quay về Agent Viết, và hình oval tím nét đứt "🔁 Vòng lặp phản hồi" nối Giai đoạn 3 → Giai đoạn 1. Có bóng đổ, bo góc: nhìn "có thiết kế" hơn Mermaid.
- **Sketch mode** là điểm sáng: ra ngay phong cách vẽ tay kiểu Excalidraw, rất hợp đăng mạng xã hội. **Tiếng Việt vẫn đúng dấu** trong font viết tay.
- Theme Terminal: đổi phong cách 1 tham số, tiếng Việt in hoa đúng dấu.
- Font mặc định (Source Sans Pro) hiển thị tiếng Việt chuẩn.

## Lỗi / hạn chế gặp phải

1. **Không tải được file cài từ GitHub Releases (403)** → phải dùng `go install` (cần cài Go).
2. **Xuất PNG trực tiếp thất bại:** `d2 file.d2 file.png` báo `failed to install Playwright: could not download driver ... Forbidden`. Phải tự chụp SVG bằng Playwright.
3. **Hướng riêng trong từng khung (`direction: down` trong container) chỉ chạy với bộ xếp hình TALA (trả phí).** Với dagre/ELK miễn phí, bản đầu ra 1 hàng ngang dài 4710 px. Thử `grid-columns: 1` trong khung thì mũi tên bị vẽ thẳng xuyên qua các ô — rất rối. Cách cuối cùng chạy được: đặt **lưới 3 cột ở gốc** (`grid-rows: 2; grid-columns: 3`), mỗi giai đoạn là 1 ô, thêm 2 ô ẩn để đặt vòng lặp ở giữa hàng dưới.
4. Mũi tên nối giữa các ô lưới là đường thẳng: 2 mũi tên vòng lặp (nét đứt tím) cắt qua góc dưới của khung Giai đoạn 2 — chấp nhận được nhưng chưa thật gọn.
5. **Muốn dùng font Inter phải có file `.ttf`**: `--font-regular` báo lỗi `expected .ttf file but ... has extension .otf` (máy chỉ có Inter dạng .otf) → dùng font mặc định của d2.
6. Theme có sẵn chỉ đổi màu khi không đặt màu tay; muốn dùng theme phải bỏ hết `fill/stroke` (file `-theme.d2`).
7. Nhiều khoảng trắng phía trên tiêu đề; layout grid làm các khung cao bằng nhau nên có vùng trống trong khung.

## Chấm điểm (1–10)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | **4** | Cú pháp dễ đọc, có playground web; nhưng cài đặt + bố cục khó, tính năng hay nhất (TALA) trả phí |
| Đẹp / dùng được cho content | **8** | Đẹp nhất trong 3 công cụ text; sketch mode rất hợp mạng xã hội |
| Hỗ trợ tiếng Việt | **8** | Đúng dấu cả font thường lẫn sketch; trừ điểm vì font tuỳ chọn phải là .ttf |
| Miễn phí / offline | **8** | MPL-2.0, chạy offline; nhưng TALA trả phí, xuất PNG cần tải Playwright |

**Đáng dùng không?** Có, nếu cần sơ đồ đẹp/kiểu vẽ tay để đăng bài và chấp nhận dùng dòng lệnh (hoặc play.d2lang.com); người hoàn toàn không biết code nên dùng Mermaid trước.
