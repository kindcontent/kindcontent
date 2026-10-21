# 09 — diagram-design (Claude Code skill)

**Repo:** https://github.com/cathrynlavery/diagram-design
**Mô tả:** "Editorial diagram design for Claude Code, Codex…" — một *skill* (bộ hướng dẫn + template HTML/SVG + vài script Python) để AI agent tự vẽ sơ đồ. Bản thử: v2.6 (plugin 2.6.115), giấy phép MIT.
**Số sao:** khoảng 59k theo thông tin được cung cấp. Mình **không kiểm chứng được**, vì từ môi trường này GitHub API và trang github.com đều trả về 403 (bị proxy chặn), shields.io và skills.sh cũng bị chặn.

---

## 1. Cách cài vào Claude Code (lệnh chính thức trong README)

Gõ trong Claude Code:

```text
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
```

Cách khác (dùng chung cho nhiều agent: Cursor, Codex, Gemini CLI…), gõ trong terminal:

```bash
npx skills add cathrynlavery/diagram-design
```

README khuyên bật auto-update: gõ `/plugin`, chọn **Marketplaces → diagram-design → Enable auto-update**.
Trong bài test này mình **không cài vào `~/.claude`**. Mình clone repo vào thư mục tạm, đọc `SKILL.md` và các file `references/`, rồi làm theo đúng như Claude Code sẽ làm sau khi cài.

## 2. Cách dùng (prompt ví dụ)

Sau khi cài, chỉ cần nói bằng ngôn ngữ tự nhiên:

> Vẽ sơ đồ quy trình Agentic Content từ chiến lược đến thực thi và phân phối: 3 giai đoạn, 12 bước (Agent Nghiên cứu, Agent SEO & Từ khóa, Agent Kế hoạch, Người duyệt chiến lược, …, Agent Đo lường), 2 điểm duyệt của con người, nội dung chưa đạt thì quay lại Agent Viết, kết quả đo lường quay về Giai đoạn 1. Dùng tiếng Việt có dấu. Cho mình 3 kiểu: process, swimlane và loop.

Skill làm việc theo trình tự sau:
1. Lần đầu dùng, skill **hỏi bạn có muốn đổi bộ màu/font theo thương hiệu không** (cho link website, dán mã màu, hoặc giữ mặc định). Bài test chọn "giữ mặc định".
2. Chọn loại sơ đồ trong danh mục 45 loại, rồi đọc file hướng dẫn riêng của loại đó.
3. Báo trước kế hoạch: chọn loại nào, khổ nào, phải gộp hay bỏ gì.
4. Xuất ra **một file `.html` duy nhất** (SVG nhúng sẵn), mở bằng trình duyệt nào cũng được.
5. Chỉ xuất PNG/SVG khi bạn yêu cầu: "export as PNG", hoặc lệnh `/diagram-design:export-diagram <file>`.

## 3. Kết quả (3 biến thể, đều theo template và quy tắc của skill)

| File | Loại trong catalog | Nội dung thể hiện |
|---|---|---|
| `v1-process.html` / `.png` (2400×989) | **Process** (`type-process.md`, layout tính theo công thức) | Đủ **12 bước** theo cột, 4 làn (Con người duyệt, GĐ1, GĐ2, GĐ3). Ô "Duyệt nội dung" là điểm nhấn màu cam. Có chip dữ liệu vào/ra, vòng "CHƯA ĐẠT" quay về Agent Viết, vòng "KẾT QUẢ → CHU KỲ SAU" quay về Agent Nghiên cứu, và chú thích 4 dòng. |
| `v2-swimlane.html` / `.png` (2160×1001) | **Swimlane** (`type-swimlane.md`, theo `example-swimlane.html`) | Bản tổng quan có **9 nút**: phải gộp vì skill giới hạn tối đa 9 nút cho mỗi sơ đồ. Hai điểm duyệt nằm chung một làn "Con người duyệt", vòng sửa bài và vòng phản hồi là nét đứt. Bản này dễ đọc nhất. |
| `v3-loop.html` / `.png` (1920×2153) | **Loop / flywheel** (`type-loop.md`) trên template **full editorial** (`template-full.html`) | 8 trạm xếp theo chiều kim đồng hồ quanh hub "Insight & dữ liệu". Bên dưới có 3 thẻ (rộng khác nhau, theo quy tắc của skill) liệt kê **đủ 12 bước** của 3 giai đoạn. Đây là bản hợp nhất để đăng bài hoặc đưa vào slide. |
| `loi-font-tieu-de-mac-dinh.png` | — | Ảnh chụp lỗi font tiêu đề khi giữ nguyên font mặc định (xem mục 4). |

Kiểm tra bằng chính công cụ của skill: `scripts/self_check.py` và `scripts/verify-geometry.py` (ở gốc repo) đều báo **0 lỗi** trên cả 3 file. Mình đã xem từng PNG và sửa các lỗi hiển thị trước khi chốt. Script xuất PNG của skill (`export_png.py`) cũng chạy được, nhưng nó chỉ chụp phần SVG và bỏ tiêu đề, nên các PNG trên được chụp nguyên trang bằng Playwright.

**Nhận xét về hình ảnh:** phong cách "editorial": nền xám nhạt, chữ đậm, chỉ 1–2 điểm nhấn cam, mũi tên vuông góc gọn gàng, không đổ bóng. Nhìn sang và chuyên nghiệp, không bị "AI slop". Bản swimlane và loop dùng được ngay cho bài viết hoặc slide. Bản process có nhiều thông tin nhất, nhưng chữ quá nhỏ (theo spec chỉ 6–9px) nên khó đọc trên điện thoại.

## 4. Lỗi / vướng mắc gặp phải

1. **Font tiêu đề không có tiếng Việt.** Font tiêu đề mặc định *Instrument Serif* trên Google Fonts không có bộ ký tự Vietnamese. Các chữ như ừ, ế, ượ, ự, ố bị lấy từ font khác (Noto Serif), làm tiêu đề lệch nét và lệch độ đậm (xem `loi-font-tieu-de-mac-dinh.png`). Skill có hướng dẫn riêng cho tiếng Hàn, tiếng Trung và Cyrillic, **nhưng không có cho tiếng Việt**. Mình đã sửa bằng cách cho riêng tiêu đề H1 dùng *Noto Serif* (đã có sẵn trong link font của template). Phần chữ còn lại dùng Geist / Geist Mono: hai font này có bộ ký tự tiếng Việt nên dấu hiển thị đúng, kể cả chữ in hoa nhỏ như "DUYỆT", "CHƯA ĐẠT".
2. **Giới hạn số nút tự mâu thuẫn.** Quy tắc chung của skill là tối đa 9 nút và 12 mũi tên cho mỗi sơ đồ, nhưng loại Process lại cho phép 12 bước (ví dụ mẫu của chính skill có 11 nút). Nội dung của mình có 12 bước, nên swimlane phải gộp còn 9 nút và loop còn 8 trạm. Đây là triết lý "xóa bớt" của skill, nhưng người dùng nên biết trước.
3. **Process không có quy tắc cho vòng quay ngược dài** (từ bước 12 về bước 1). Mình phải thêm một hành lang 24px dưới làn cuối, tức là lệch khỏi công thức layout của skill. Mũi tên "chưa đạt" cắt qua một mũi tên khác nên phải dùng "cầu vượt" (hop). Quy tắc focal-out (mọi mũi tên đi ra từ nút trọng tâm phải màu cam, nét liền) cũng xung đột với vòng sửa bài, nên mình chọn nét đứt màu cam.
4. **Loop cần một "hub" tích lũy dữ liệu.** Mình đặt hub là "Insight & dữ liệu" (diễn giải vòng phản hồi về Chiến lược). Vòng sửa bài chỉ được ghi ở dòng phụ của trạm "Duyệt nội dung", không vẽ thành mũi tên riêng.
5. **Xuất PNG cần cài thêm.** Cần cài Python Playwright; máy này chưa có nên mình cài vào venv tạm. Người không biết code sẽ phải nhờ Claude cài.
6. **Cần mạng.** File HTML tải font từ Google Fonts. Muốn chạy offline hoàn toàn thì phải dùng chế độ `system` fonts: khi đó chữ tiếng Việt vẫn đúng dấu, nhưng không còn đúng font thiết kế.
7. Không kiểm chứng được số sao (GitHub API bị chặn từ môi trường test).

## 5. Độ tin cậy của repo (kiểm tra nhanh, trung lập)

- **Lịch sử commit** (clone đầy đủ): commit đầu ngày 2026-04-16, mới nhất 2026-10-20, tổng 367 commit. Khoảng 345 commit rơi vào tháng 8–10/2026. Có 103 commit do bot `github-actions` tạo (tự tăng version: 2.6.115). Số PR đã lên tới khoảng #455.
- **Người đóng góp:** khoảng 60 danh tính tác giả. Phần lớn commit là của tác giả Cathryn Lavery (email @bestself.co; README ghi công ty LittleMight). Có 6 commit từ một kỹ sư dùng email @trailofbits.com (công ty bảo mật).
- **Quản trị:** có CI, dependabot, zizmor (công cụ quét bảo mật GitHub Actions), SECURITY.md, PRIVACY.md, CODEOWNERS, CONTRIBUTING rất chi tiết, giấy phép MIT.
- **An toàn khi dùng:** mình đã đọc `self_check.py`, `verify-geometry.py` và `export_png.py` trước khi chạy. Hai script kiểm tra chỉ dùng thư viện chuẩn và chỉ đọc file. Theo PRIVACY.md, lời gọi mạng duy nhất là tải Google Fonts. Mình không thấy telemetry trong phần đã xem.
- **Số sao:** khoảng 59k sao trong khoảng 6 tháng là cao bất thường so với một skill vẽ sơ đồ. Từ đây mình không xem được số sao, số fork hay danh sách stargazer, nên **không kết luận được** sao là thật hay bị thổi phồng. Điều kiểm chứng được là repo có hoạt động phát triển thật, nhiều người tham gia và được bảo trì đều đặn.

## 6. Chấm điểm (1–10)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | **6** | Chỉ cần 2 lệnh cài, sau đó ra lệnh bằng lời. Nhưng phải dùng Claude Code (hoặc agent khác). Xuất PNG cần Playwright. Lần đầu skill hỏi về bộ nhận diện thương hiệu. |
| Đẹp / dùng được cho content | **8** | Editorial, tinh tế, có 45 loại sơ đồ, bản light/dark/full. Swimlane và loop đẹp, dùng được ngay. Process đủ ý nhưng chữ nhỏ, không hợp đăng mạng xã hội. |
| Hỗ trợ tiếng Việt | **7** | Geist có bộ ký tự tiếng Việt nên dấu đúng. Font tiêu đề mặc định thiếu tiếng Việt nên bị lệch nét (sửa được). Skill không có hướng dẫn riêng cho tiếng Việt. |
| Miễn phí / offline | **7** | Mã nguồn MIT, miễn phí. Nhưng cần một AI agent (thường là gói trả phí) để vẽ, và font mặc định tải từ Google Fonts. Có chế độ offline dùng font hệ thống. |

**Đáng dùng không?** Có, nếu bạn đã dùng Claude Code: chỉ cần một câu lệnh là ra sơ đồ HTML/PNG đẹp, đúng dấu tiếng Việt. Chỉ cần nhắc AI dùng Noto Serif cho tiêu đề và chấp nhận chuyện skill sẽ gộp bớt bước khi quy trình dài hơn 9 nút.
