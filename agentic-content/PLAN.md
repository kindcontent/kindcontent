# Hệ thống Agentic Content · Kind Content

Sơ đồ: `he-thong-agentic-content.drawio` (mở và sửa trên app.diagrams.net) · ảnh xem nhanh: `he-thong-agentic-content.png`.

1 agent điều phối + 13 agent chuyên trách, 22 skill, 3 điểm người duyệt. Mỗi agent chỉ làm một việc, đọc **Kho dữ liệu chung** trước khi làm, và bàn giao kết quả bằng **một file có tên cố định**. Agent sau chỉ đọc file đó, không đọc lại toàn bộ lịch sử, nên tiết kiệm token.

## Luồng chạy
| Nhịp | Giai đoạn | Agent |
|---|---|---|
| Mỗi tháng | 1 · Chiến lược | Nghiên cứu → SEO & Từ khóa → Kế hoạch → **G1 duyệt chiến lược** |
| Mỗi bài | 2 · Sản xuất | Brief → Viết → Hình ảnh & Video → Biên tập (QA) → **G2 duyệt nội dung** |
| Hằng ngày | 3 · Phân phối | Chuyển thể → Đăng bài → Tương tác (→ **G3** khi nhạy cảm) |
| Hằng tuần | 4 · Đo lường & tối ưu | Đo lường → Tối ưu → Báo cáo khách hàng (hằng tháng) |

## Agent và skill
| # | Agent | Skill | Kích hoạt | Đọc | Bàn giao | Công cụ / MCP | Mức AI |
|---|---|---|---|---|---|---|---|
| 0 | Điều phối | `kc-orchestrator` | Lịch + yêu cầu mới | Content Board | Việc trên Content Board | Notion/Sheet | vừa |
| 1 | Nghiên cứu | `kc-market-research`, `kc-competitor-watch` | Đầu tháng | Sổ bài học, số liệu tháng trước | `01-insight.md` | Web search, social listening | vừa |
| 2 | SEO & Từ khóa | `kc-keyword-intel` | Sau 1 | `01-insight.md`, Ngân hàng từ khóa | `02-keywords.csv` | Search Console, Ahrefs/Semrush, Trends | nhẹ |
| 3 | Kế hoạch | `kc-content-planner` | Sau 2 | 01, 02, Persona & Trụ cột | `03-content-plan.md` | Content Board | mạnh |
| 4 | Brief | `kc-brief-writer` | Mỗi bài trong lịch | Dòng kế hoạch của bài, 02 | `brief/<mã bài>.md` | Thư viện nội dung | vừa |
| 5 | Viết | `kc-blog-writer`, `kc-social-writer`, `kc-pr-writer` | Có brief | Brief, Brand Kit | `draft/<mã bài>.md` | Thư viện nội dung | mạnh |
| 6 | Hình ảnh & Video | `kc-visual-maker`, `kc-video-script`, `kc-drawio-diagram` | Có bản nháp | Draft, Brand Kit | `assets/<mã bài>/` | Tạo ảnh AI, Canva, draw.io MCP | vừa |
| 7 | Biên tập (QA) | `kc-brand-voice-check`, `kc-fact-check`, `kc-seo-check` | Có draft + assets | Draft, Brief, Brand Kit | `qa/<mã bài>.json` (điểm + lỗi) | Web search, công cụ SEO | nhẹ |
| 8 | Chuyển thể | `kc-repurpose` | Sau G2 | Bài đã duyệt | `variants/<mã bài>/` (6–8 bản) | Thư viện hình ảnh | vừa |
| 9 | Đăng bài | `kc-publisher`, `kc-prepublish-check` | Theo giờ vàng | Variants | `publish-log.json` | WordPress, Meta, TikTok, YouTube, Email | nhẹ |
| 10 | Tương tác | `kc-community-reply` | Bình luận/inbox mới | Kịch bản trả lời, Brand Kit | `leads.csv`, `escalations.md` | Meta inbox, TikTok, CRM | nhẹ |
| 11 | Đo lường | `kc-analytics-report` | Thứ Hai hằng tuần | `publish-log.json` | `report-tuan-NN.md` | GA4, Search Console, Insights | nhẹ |
| 12 | Tối ưu | `kc-content-optimizer` | Sau 11 | Báo cáo tuần, Thư viện nội dung | `learnings.md` + việc mới trên Board | Sổ bài học | mạnh |
| 13 | Báo cáo khách hàng | `kc-client-report` | Cuối tháng | 4 báo cáo tuần, learnings | `bao-cao-thang-MM.pdf` | Google Slides, draw.io MCP | vừa |

**Mức AI** là để tiết kiệm token: *mạnh* cho việc cần suy luận và viết hay (Kế hoạch, Viết, Tối ưu); *nhẹ* cho việc kiểm tra theo checklist hoặc gọi API (SEO, QA, Đăng bài, Tương tác, Đo lường).

## Điểm người duyệt
| | Ai duyệt | Hạn | Kiểm gì | Chưa đạt |
|---|---|---|---|---|
| G1 · Duyệt chiến lược | Trưởng nhóm content + khách | 24h | Đúng mục tiêu, đúng chân dung khách, đủ ngân sách | Về Agent Kế hoạch |
| G2 · Duyệt nội dung | Biên tập viên / khách | 24h | Đúng thông điệp, đúng giọng, thông tin chuẩn | Góp ý về Agent Viết |
| G3 · Tình huống nhạy cảm | Trưởng nhóm cộng đồng | 2h | Khiếu nại, khủng hoảng, câu hỏi giá/hợp đồng | Người trả lời trực tiếp |

Người duyệt chỉ duyệt trên Content Board (đổi trạng thái + ghi góp ý); Điều phối đọc trạng thái để chạy bước tiếp.

## Vòng lặp
- **QA tự động:** điểm dưới 80 → Agent Viết sửa theo `qa/<mã bài>.json`, tối đa 2 lần; lần 3 vẫn trượt → chuyển thẳng cho người ở G2.
- **G1 / G2 chưa đạt:** quay về Kế hoạch / Viết kèm góp ý.
- **Làm mới bài cũ:** Agent Tối ưu tạo việc mới trên Board (bài cũ tụt hạng, bài tốt cần nhân bản) → Điều phối giao cho Agent Brief.
- **Chu kỳ tháng sau:** `learnings.md` + số liệu quay về Agent Nghiên cứu.

## Kho dữ liệu chung
Brand Kit · Chân dung & Trụ cột · Ngân hàng từ khóa · Thư viện nội dung (kèm hiệu suất) · Thư viện hình ảnh · Sổ bài học. Mọi agent chỉ đọc; riêng Agent Tối ưu ghi Sổ bài học và cập nhật Ngân hàng từ khóa, Thư viện nội dung.

## Quy ước bàn giao
- Thư mục theo tháng: `2026-11/` chứa `01-insight.md`, `02-keywords.csv`, `03-content-plan.md`, `brief/`, `draft/`, `assets/`, `qa/`, `variants/`, `publish-log.json`, `report-tuan-NN.md`, `learnings.md`.
- Mã bài: `<kênh>-<ngày>-<số>`, ví dụ `fb-1105-01`, `blog-1107-02`. Mọi file của một bài dùng cùng mã.
- Mỗi file mở đầu bằng 3 dòng: mã bài, agent tạo, trạng thái.

## Chỉ số theo dõi
Nội dung: lượt tiếp cận, tỷ lệ tương tác, CTR, khách tiềm năng, chuyển đổi.
Vận hành: thời gian làm 1 bài, số lần sửa (QA + G2), chi phí AI (token) / bài.

## Lộ trình triển khai gợi ý
1. **Tuần 1–2:** dựng Kho dữ liệu chung (Brand Kit trước tiên) + Content Board; chạy cụm Sản xuất (Brief → Viết → QA) với người duyệt G2.
2. **Tuần 3:** thêm Hình ảnh & Video, Chuyển thể, Đăng bài (ban đầu đăng thủ công từ `variants/`, sau đó mới nối API).
3. **Tuần 4:** thêm Đo lường + Tối ưu, chạy báo cáo tuần đầu tiên.
4. **Tháng 2:** thêm Nghiên cứu, SEO, Kế hoạch (chu kỳ tháng), Tương tác, Báo cáo khách hàng; cuối cùng giao cho Agent Điều phối tự chạy theo lịch.
