# 08 · archify (agent skill cho Claude Code / Codex / Cursor)

- **Repo:** https://github.com/tt-a1i/archify · MIT · phiên bản skill thử nghiệm: v3.2.0 (2026-10-18)
- **Số sao:** ~86.566 sao, 5.853 fork, 271 issue đang mở (số liệu GitHub ngày 21/10/2026). Repo tạo ngày 15/04/2026.
- **Bản chất:** không phải app hay trang web. Đây là một "skill" (bộ hướng dẫn + công cụ dòng lệnh Node.js) để agent AI (Claude Code…) đọc, rồi tự viết file JSON mô tả sơ đồ, kiểm tra và xuất ra **một file HTML tương tác duy nhất** (có sáng/tối, phóng to/thu nhỏ, dò đường đi, xuất PNG/SVG/WebM).

## Cách cài vào Claude Code (lệnh chính thức trong README)

```bash
# cách ngắn (trình cài sẽ hỏi chọn agent)
npx skills add tt-a1i/archify -g

# cách cài thẳng cho Claude Code, không hỏi gì (lệnh có trong trang hướng dẫn của repo)
npx -y skills add tt-a1i/archify --skill archify --agent claude-code --global --copy --yes
```

Cách thủ công: chép thư mục `archify/` (thư mục con trong repo, nơi có `SKILL.md`) vào `~/.claude/skills/archify/` (hoặc `.claude/skills/` của từng dự án). Cần Node.js ≥ 18; muốn chạy bước kiểm tra bằng trình duyệt thì máy cần Chrome/Chromium. (Lần test này mình không cài vào `~/.claude` mà làm theo `SKILL.md` ngay từ bản clone.)

## Cách dùng (prompt ví dụ)

Mở Claude Code rồi gõ bằng tiếng Việt, ví dụ:

> Dùng archify vẽ sơ đồ quy trình Agentic Content từ chiến lược đến thực thi và phân phối. Nội dung: [dán content.md]. Làm bằng tiếng Việt.

Muốn bản tổng quan dạng cây thì nói thêm: *"vẽ thêm một bản tổng quan dạng cây (tree)"*. Sau đó có thể nói tiếp: "đổi sang giao diện tối", "làm nổi vòng lặp sửa bài"…

Agent sẽ chọn loại sơ đồ (10 loại: architecture, workflow, sequence, dataflow, lifecycle, ERD, class, tree, timeline, waterfall), viết file JSON, chạy `finalize` (kiểm tra cấu trúc, độ dễ đọc, rồi mở thử trong trình duyệt thật). Bạn chỉ nhận file `.html`.

## Kết quả (đúng nội dung content.md, tiếng Việt có dấu)

| File | Là gì |
|---|---|
| `quy-trinh-agentic-content.workflow.html` | Bản 1: **sơ đồ quy trình** (workflow). 12 bước, 3 giai đoạn ở tiêu đề cột, làn "Agent AI" và làn "Người duyệt · human-in-the-loop", vòng sửa "chưa đạt → sửa" về Agent Viết, vòng lặp nét đứt "tối ưu chu kỳ sau" từ Đo lường về Nghiên cứu, 3 thẻ ghi chú. |
| `quy-trinh-agentic-content.tree.html` | Bản 2: **sơ đồ tổng quan dạng cây** (tree, kiểu mind-map). Gốc → 3 giai đoạn → 12 bước, mô tả đầy đủ từng bước. Dạng cây chỉ thể hiện "thuộc về", không vẽ được mũi tên vòng lặp, nên hai vòng lặp nằm ở thẻ ghi chú. |
| `01-quy-trinh-workflow-trang-day-du.png` | Ảnh chụp cả trang HTML bản 1 (2016px), có trình xem, thẻ ghi chú, danh mục nút |
| `02-quy-trinh-workflow-xuat-png.png` | Ảnh từ nút **Xuất → PNG** có sẵn trong HTML (thu về 2400px). **Nên dùng ảnh này cho content**: có đủ các dòng phụ (tag) |
| `03-tong-quan-tree-trang-day-du.png` | Ảnh chụp cả trang HTML bản 2 (2016px) |
| `04-tong-quan-tree-xuat-png.png` | Ảnh từ nút **Xuất → PNG** của bản 2 (2400px) |
| `nguon/*.candidate.json` | File JSON nguồn do agent viết theo skill (sửa file này rồi chạy lại `finalize` là ra sơ đồ mới) |
| `nguon/receipts-*`, `nguon/review-*` | Biên nhận kiểm tra tự động của archify (không cần quan tâm) |

Nhận xét về hình: gọn, sạch, giống sơ đồ kỹ thuật/dev. Chữ trong ô dùng font monospace (JetBrains Mono, nhúng sẵn), dấu tiếng Việt hiển thị đúng hoàn toàn, kể cả trong ảnh xuất. HTML tự chứa mọi thứ (~830 KB), mở offline được, không tải Google Fonts hay CDN nào. Thanh công cụ (Xuất, Sáng/Tối, Phong cách, Trình chiếu, tìm nút…) hiện tiếng Việt vì mình đã cung cấp bản dịch (xem mục lỗi).

## Lỗi / hạn chế gặp phải (nói thật)

1. **Không có sẵn giao diện tiếng Việt.** Trình xem chỉ có sẵn en, zh-CN, zh-TW, es, ko, ar. Muốn nút bấm hiện tiếng Việt thì skill yêu cầu agent tự dịch **486 chuỗi** giao diện và nhét vào `meta.translations`. Mình (agent) đã dịch hết. Bản dịch là máy dịch, chưa có người Việt rà lại. Nếu bỏ bước này thì nội dung sơ đồ vẫn tiếng Việt, nhưng nút bấm sẽ là tiếng Anh.
2. **Dòng mô tả trong ô không tự xuống dòng (bản workflow).** Mỗi ô rộng tối đa khoảng 200px và canvas tối đa 1240px. Câu tiếng Việt dài bị trình kiểm tra chặn (`workflow/sublabel-readability`). Mình phải rút gọn: "insight khách hàng" → "insight", "content pillar" → "pillar", "kiểm chứng thông tin" → "kiểm chứng", "bài blog" → "blog". Còn "khoảng trống nội dung", "kịch bản video ngắn", "giọng thương hiệu" phải chuyển xuống dòng tag. Danh sách kênh Website/Fanpage/TikTok/YouTube/Email được đưa vào thẻ ghi chú. Bản tree thì xuống dòng được nên giữ đủ chữ.
3. **Tag bị ẩn khi xem ở mức 100%.** Trình xem chỉ hiện tag khi phóng to từ 175% trở lên, nên ảnh chụp trang (file 01) thiếu 3 dòng tag nói trên và chữ "human-in-the-loop" ở 2 ô người duyệt. Ảnh từ nút Xuất PNG (file 02) thì có đủ.
4. **Phải sửa 2 lần mới qua kiểm tra** (agent tự sửa, người dùng không phải làm gì): lần 1 canvas rộng 1242px, vượt mức 1240px. Lần 2 không tìm được đường cho mũi tên vòng lặp Đo lường → Nghiên cứu (`solver-budget-exhausted`); sửa bằng cách ghim mũi tên đi ra và vào từ cạnh trên.
5. **Bố cục cây hướng "right" bị lỗi hiển thị:** ô 12 bị thanh điều khiển dưới đáy che mất. Mình đổi sang hướng "down" thì hết lỗi và dễ đọc hơn. Repo cũng có issue mở gần giống (#1041, cắt mất phần trên khi thu nhỏ sơ đồ cao).
6. **Tên file khi bấm Xuất bị mất dấu và lỗi chữ:** `s-quy-tr-nh-agentic-content-t-chi-n-l-c...png`. Đây là lỗi đã biết của repo (issue #1024, tên file xuất làm hỏng tiêu đề không phải chữ Latin cơ bản). Chỉ cần đổi tên file sau khi tải.
7. Bố cục workflow bị ép: tối đa 6 cột cho 12 bước, nên các bước phải xếp chồng 2 tầng theo hình zig-zag. Mũi tên khá nhiều góc gập. Vài nhãn ("duyệt", "gửi duyệt") nằm đè lên viền làn. Dưới chú giải còn một khoảng trống lớn. Đây là lựa chọn bố cục của renderer, không phải lỗi vỡ hình.
8. Skill có tính năng kiểm tra cập nhật (gửi 1 lệnh GET tới `tt-a1i.github.io`, không tự cài gì). Tắt bằng `ARCHIFY_UPDATE_CHECK_DISABLED=1`. Lần chạy này không hiện thông báo cập nhật nào.

## Độ tin cậy của repo (kiểm tra nhanh, trình bày trung lập)

- **Code là thật và làm kỹ:** 1.741 commit (đã fetch toàn bộ lịch sử), 104 tác giả commit khác nhau, 24 tag phát hành, khoảng 550 merge PR. Có test, JSON schema, CHANGELOG dài, SECURITY.md. Mình đọc qua script trước khi chạy: chỉ gọi Node và Chrome cục bộ, và kiểm tra cập nhật bằng một lệnh GET tới manifest cố định. Không thấy mã đáng ngờ.
- **Hoạt động thật:** issue/PR đã lên tới khoảng #1041. Issue mới mở trong tuần do người ngoài và contributor viết, có phản hồi. Chủ repo `tt-a1i` chiếm 1.127/1.741 commit.
- **Tăng trưởng rất dồn dập:** 34 commit trong tháng 4, gần như im lặng tháng 5–6, rồi bùng lên 674 commit (tháng 9) và 839 commit (tháng 10). Điều này khớp với việc README nói repo đạt **#1 GitHub Trending tuần** ngày 01/09/2026 và được QbitAI đưa tin.
- **Điểm nên dè dặt:** 86k sao trong khoảng 6 tháng là mức hiếm gặp. Mình không kiểm chứng được sao thật hay ảo (không có công cụ phân tích danh sách người gắn sao). Tỉ lệ fork/sao khoảng 6,8%, nằm trong mức bình thường. Badge "130K+ installs" là số tự công bố. README có một phần tài trợ dài, quảng cáo các dịch vụ trung gian bán API Claude/OpenAI/Gemini "giá 1–9% giá gốc" kèm link giới thiệu (referral). Bản thân tool không phụ thuộc vào các dịch vụ đó, nhưng **không nên** coi đây là lời khuyên dùng các dịch vụ API trung gian.
- **Kết luận độ tin cậy:** phần mềm có thật, chạy đúng như mô tả và được bảo trì tích cực. Con số sao thì nên coi là chỉ số "đang hot", không phải thước đo chất lượng.

## Chấm điểm (1–10)

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Dễ dùng với người không biết code | **6** | Chỉ cần gõ một câu cho Claude Code. Nhưng phải có Claude Code/Codex (trả phí), Node.js và biết mở terminal để cài. Agent làm hết phần JSON, sửa lỗi và kiểm tra. |
| Đẹp / dùng được cho content | **7** | Sạch, chuyên nghiệp, có nút Xuất PNG/SVG đẹp, file HTML tương tác gửi được cho người khác. Nhưng phong cách khá "kỹ thuật/dev" (font monospace, ô nhỏ), bản workflow nhiều đường gập. Để đăng mạng xã hội thì bản tree dễ nhìn hơn. |
| Hỗ trợ tiếng Việt | **7** | Dấu hiển thị chuẩn 100% ở cả HTML lẫn PNG. Trừ điểm: không có sẵn giao diện tiếng Việt (phải dịch 486 chuỗi), ô workflow không xuống dòng nên câu tiếng Việt dài bị cắt bớt, tên file xuất bị hỏng dấu. |
| Miễn phí / offline | **9** | MIT, miễn phí, HTML xem offline không cần mạng. Để *tạo* sơ đồ vẫn cần một agent AI (thường trả phí). Có một lệnh kiểm tra cập nhật (tắt được). |

**Đáng dùng không?** Có. Đáng dùng nếu bạn đã dùng Claude Code/Codex: chỉ một câu lệnh là ra sơ đồ HTML tương tác, tiếng Việt chuẩn dấu, xuất PNG đẹp. Nếu chưa dùng agent AI nào thì đây không phải công cụ để bắt đầu, và nên dùng bản cây hoặc ảnh "Xuất PNG" cho content thay vì ảnh chụp màn hình.
