# Hệ thống Agentic Content · Kind Content

Quy ước: **tên file, thư mục bằng tiếng Anh · nội dung bên trong bằng tiếng Việt.**

Sơ đồ `agentic-content-system.drawio` gồm 6 tab, mở và sửa trên app.diagrams.net. Ảnh xem nhanh từng tab:
- `page-0-overview.png`: toàn bộ hệ thống trên 1 trang.
- `page-1-strategy.png`, `page-2-production.png`, `page-3-distribution.png`, `page-4-measure-optimize.png`: mỗi giai đoạn một trang. Mỗi agent là một khung lớn có ghi tên file agent; các skill là ô riêng bên trong, ghi từng bước. Hai bên khung là đầu vào, file bàn giao và tiêu chí đạt.
- `page-5-orchestration-folders.png`: luật của Agent Điều phối, 6 trạng thái trên Content Board, Kho dữ liệu chung (ai đọc, ai ghi), cấu trúc thư mục và `operations.yaml`.

1 agent điều phối + 13 agent chuyên trách, 21 skill, 3 điểm người duyệt. Mỗi agent chỉ làm một việc, đọc **Kho dữ liệu chung** trước khi làm, và bàn giao kết quả bằng **một file có tên cố định**. Agent sau chỉ đọc file đó, không đọc lại toàn bộ lịch sử, nên tiết kiệm token.

## Agent, skill và cấu hình đặt ở đâu
| Đặt ở đâu | Chứa gì | Ví dụ |
|---|---|---|
| **File agent** `.claude/agents/<name>.md` | Vai trò, khi nào chạy, đọc gì, bàn giao gì, mức AI (`model`), công cụ (`tools`), skill được dùng (`skills`) | `writer.md`, `orchestrator.md` |
| **Skill** `.claude/skills/kc-<name>/SKILL.md` | Tay nghề cố định, dùng lặp lại: các bước, checklist, mẫu, ví dụ, script | `kc-brand-voice-check/` (3 agent cùng dùng) |
| **Cấu hình** `operations.yaml` | Con số hay đổi | điểm QA tối thiểu, hạn duyệt, token mỗi bài |
| **Kho dữ liệu** `shared/` | Dữ liệu agent đọc / ghi | `brand-kit.md`, `learnings.md` |

- **Agent = người làm, skill = cách làm.** Skill không tự chạy; agent cầm ra để làm.
- **1 agent dùng nhiều skill** (Agent Viết có 3 skill) · **1 skill dùng lại cho nhiều agent** (`kc-brand-voice-check` ở Agent 7, 8, 10).
- **Điều phối không có skill riêng:** điều phối là vai trò, không phải tay nghề, nên luật viết thẳng vào `orchestrator.md`; con số đọc từ `operations.yaml`.
- **Mức AI → trường `model`:** mạnh = `opus`, vừa = `sonnet`, nhẹ = `haiku`.
- **Cách agent chạy skill:** nối tiếp (xong skill này mới tới skill kia) · song song · chọn 1 (theo loại bài).
- **Mới bắt đầu:** 1 agent cầm nhiều skill là đủ chạy; khi nhiều việc hoặc cần tiết kiệm token mới tách thành nhiều agent như sơ đồ.

## Cấu trúc thư mục
```
kind-content-agentic/
├── CLAUDE.md               ← luật chung, quy ước tên file, mã bài
├── operations.yaml         ← con số hay đổi
├── .mcp.json               ← kết nối draw.io, Notion, Search Console…
├── .claude/
│   ├── settings.json       ← quyền: ai được đăng bài, cấm đọc mật khẩu
│   ├── agents/             ← 14 file, bảng bên dưới
│   └── skills/             ← 21 thư mục kc-*/ (SKILL.md + examples.md, checklist…)
├── shared/                 ← kho dữ liệu chung
│   ├── brand-kit.md  persona.md  keywords-bank.csv
│   └── content-library.csv  learnings.md  assets-library/
└── 2026-11/                ← việc của từng tháng
    ├── 01-insight.md  02-keywords.csv  03-content-plan.md
    ├── brief/  draft/  assets/  qa/  variants/
    └── publish-log.json  leads.csv  escalations.md  weekly-report-NN.md  client-report-MM.pdf
```

`operations.yaml` (khóa tiếng Anh, chú thích tiếng Việt):
```yaml
qa_min_score: 80                # điểm QA tối thiểu
qa_max_rewrites: 2              # số lần viết lại tối đa
review_deadline_hours: 24       # hạn người duyệt
sensitive_deadline_hours: 2     # hạn xử lý tình huống nhạy cảm
max_tokens_per_post: 60000      # ngân sách token mỗi bài
agent_max_retries: 2            # chạy lại khi agent lỗi
```

## 14 agent → 21 skill
| Agent | File agent | Skill | Skill đó làm gì | Cách chạy | Mức AI |
|---|---|---|---|---|---|
| 0. Điều phối | `orchestrator.md` | *(không có skill, luật nằm trong file agent)* | Mỗi giờ đọc Board, gọi agent, nhắc người duyệt, giới hạn token, chạy lại khi lỗi | – | vừa |
| 1. Nghiên cứu | `researcher.md` | `kc-market-research` | Tin ngành, xu hướng, câu khách hay hỏi → 5–7 insight có nguồn | song song | vừa |
| | | `kc-competitor-watch` | 10 bài tốt nhất của mỗi đối thủ → khoảng trống bị bỏ qua | | |
| 2. SEO & Từ khóa | `seo-analyst.md` | `kc-keyword-intel` | Mở rộng, gom cụm, gắn ý định, chọn từ khóa dễ lên top | 1 skill | nhẹ |
| 3. Kế hoạch | `planner.md` | `kc-content-planner` | Lịch 4 tuần theo tỷ lệ trụ cột, gắn KPI, tạo việc trên Board | 1 skill | mạnh |
| 4. Brief | `brief-maker.md` | `kc-brief-writer` | Góc tiếp cận, dàn ý, từ khóa, CTA, nguồn | 1 skill | vừa |
| 5. Viết | `writer.md` | `kc-blog-writer` | Blog SEO 1.200–2.000 chữ + FAQ + meta | chọn 1 | mạnh |
| | | `kc-social-writer` | Post fanpage / LinkedIn: hook, thân ngắn, CTA | | |
| | | `kc-pr-writer` | Bài PR / báo, giọng trung lập | | |
| 6. Hình ảnh & Video | `visual-designer.md` | `kc-visual-maker` | Ảnh bìa, thumbnail, ảnh trong bài đúng khổ | song song | vừa |
| | | `kc-video-script` | Kịch bản reel / TikTok 30–60 giây | | |
| | | `kc-drawio-diagram` | Sơ đồ quy trình / so sánh bằng draw.io | | |
| 7. Biên tập (QA) | `editor.md` | `kc-brand-voice-check` | Giọng, xưng hô, từ cấm, chính tả · /40 điểm | nối tiếp | nhẹ |
| | | `kc-fact-check` | Số liệu, tên riêng, trích dẫn · /30 điểm | | |
| | | `kc-seo-check` | Từ khóa, tiêu đề, meta, heading, link, alt · /30 điểm | | |
| 8. Chuyển thể | `repurposer.md` | `kc-repurpose` | 1 bài gốc → 6–8 bản cho từng kênh + UTM | nối tiếp | vừa |
| | | *dùng lại* `kc-brand-voice-check` | Kiểm giọng từng bản | | |
| 9. Đăng bài | `publisher.md` | `kc-prepublish-check` | Link, UTM, kích thước ảnh, chính tả, đúng lịch | nối tiếp | nhẹ |
| | | `kc-publisher` | Đăng / lên lịch qua API, ghi link | | |
| 10. Tương tác | `community-manager.md` | `kc-community-reply` | Phân loại, trả lời trong 30 phút, ghi lead, đẩy G3 | nối tiếp | nhẹ |
| | | *dùng lại* `kc-brand-voice-check` | Kiểm giọng trước khi gửi | | |
| 11. Đo lường | `analyst.md` | `kc-analytics-report` | Số liệu từng bài so với KPI, top 5 / bottom 5 | 1 skill | nhẹ |
| 12. Tối ưu | `optimizer.md` | `kc-content-optimizer` | Vì sao tốt / kém → bài học, việc làm mới bài cũ | 1 skill | mạnh |
| 13. Báo cáo khách hàng | `client-reporter.md` | `kc-client-report` | Báo cáo tháng slide / PDF | nối tiếp | vừa |
| | | *dùng lại* `kc-drawio-diagram` | Sơ đồ kết quả, phễu traffic | | |

## Luồng chạy
| Nhịp | Giai đoạn | Agent |
|---|---|---|
| Mỗi tháng | 1 · Chiến lược | Nghiên cứu → SEO & Từ khóa → Kế hoạch → **G1 duyệt chiến lược** |
| Mỗi bài | 2 · Sản xuất | Brief → Viết → Hình ảnh & Video → Biên tập (QA) → **G2 duyệt nội dung** |
| Hằng ngày | 3 · Phân phối | Chuyển thể → Đăng bài → Tương tác (→ **G3** khi nhạy cảm) |
| Hằng tuần | 4 · Đo lường & tối ưu | Đo lường → Tối ưu → Báo cáo khách hàng (hằng tháng) |

## Đọc gì, bàn giao gì
| # | Agent | Kích hoạt | Đọc | Bàn giao | Công cụ / MCP |
|---|---|---|---|---|---|
| 0 | Điều phối | Mỗi giờ | Content Board, `operations.yaml` | Việc trên Content Board | Notion / Sheet |
| 1 | Nghiên cứu | Đầu tháng | `shared/learnings.md`, `weekly-report-*.md` | `01-insight.md` | Web search, social listening |
| 2 | SEO & Từ khóa | Sau 1 | `01-insight.md`, `shared/keywords-bank.csv` | `02-keywords.csv` | Search Console, Ahrefs/Semrush, Trends |
| 3 | Kế hoạch | Sau 2 | 01, 02, `shared/persona.md` | `03-content-plan.md` | Content Board |
| 4 | Brief | Mỗi bài trong lịch | Dòng kế hoạch của bài, 02 | `brief/<post-id>.md` | Thư viện nội dung |
| 5 | Viết | Có brief | Brief, `shared/brand-kit.md` | `draft/<post-id>.md` | Thư viện nội dung |
| 6 | Hình ảnh & Video | Có bản nháp | Draft, Brand Kit | `assets/<post-id>/` | Tạo ảnh AI, Canva, draw.io MCP |
| 7 | Biên tập (QA) | Có draft + assets | Draft, Brief, Brand Kit | `qa/<post-id>.json` (điểm + lỗi) | Web search, công cụ SEO |
| 8 | Chuyển thể | Sau G2 | Bài đã duyệt | `variants/<post-id>/` (6–8 bản) | Thư viện hình ảnh |
| 9 | Đăng bài | Theo giờ vàng | Variants | `publish-log.json` | WordPress, Meta, TikTok, YouTube, Email |
| 10 | Tương tác | Bình luận/inbox mới | Kịch bản trả lời, Brand Kit | `leads.csv`, `escalations.md` | Meta inbox, TikTok, CRM |
| 11 | Đo lường | Thứ Hai hằng tuần | `publish-log.json` | `weekly-report-NN.md` | GA4, Search Console, Insights |
| 12 | Tối ưu | Sau 11 | Báo cáo tuần, Thư viện nội dung | `shared/learnings.md` + việc mới trên Board | Sổ bài học |
| 13 | Báo cáo khách hàng | Cuối tháng | 4 báo cáo tuần, learnings | `client-report-MM.pdf` | Google Slides, draw.io MCP |

## Điểm người duyệt
| | Ai duyệt | Hạn | Kiểm gì | Chưa đạt |
|---|---|---|---|---|
| G1 · Duyệt chiến lược | Trưởng nhóm content + khách | 24h | Đúng mục tiêu, đúng chân dung khách, đủ ngân sách | Về Agent Kế hoạch |
| G2 · Duyệt nội dung | Biên tập viên / khách | 24h | Đúng thông điệp, đúng giọng, thông tin chuẩn | Góp ý về Agent Viết |
| G3 · Tình huống nhạy cảm | Trưởng nhóm cộng đồng | 2h | Khiếu nại, khủng hoảng, câu hỏi giá/hợp đồng | Người trả lời trực tiếp |

Người duyệt chỉ duyệt trên Content Board (đổi trạng thái + ghi góp ý); Điều phối đọc trạng thái để chạy bước tiếp. Hạn duyệt lấy từ `operations.yaml`.

## Vòng lặp
- **QA tự động:** điểm dưới `qa_min_score` → Agent Viết sửa theo `qa/<post-id>.json`, tối đa `qa_max_rewrites` lần; vẫn trượt → chuyển thẳng cho người ở G2.
- **G1 / G2 chưa đạt:** quay về Kế hoạch / Viết kèm góp ý.
- **Làm mới bài cũ:** Agent Tối ưu tạo việc mới trên Board → Điều phối giao cho Agent Brief.
- **Chu kỳ tháng sau:** `shared/learnings.md` + số liệu quay về Agent Nghiên cứu.

## Quy ước bàn giao
- Mã bài (`post-id`): `<kênh>-<MMDD>-<số>`, ví dụ `fb-1105-01`, `blog-1107-02`. Mọi file của một bài dùng cùng mã.
- Mỗi file mở đầu bằng 3 dòng: mã bài, agent tạo, trạng thái.

## Chỉ số theo dõi
Nội dung: lượt tiếp cận, tỷ lệ tương tác, CTR, khách tiềm năng, chuyển đổi.
Vận hành: thời gian làm 1 bài, số lần sửa (QA + G2), chi phí AI (token) / bài.

## Lộ trình triển khai gợi ý
1. **Tuần 1–2:** dựng `shared/` (Brand Kit trước tiên) + Content Board; chạy cụm Sản xuất (Brief → Viết → QA) với người duyệt G2.
2. **Tuần 3:** thêm Hình ảnh & Video, Chuyển thể, Đăng bài (ban đầu đăng thủ công từ `variants/`, sau đó mới nối API).
3. **Tuần 4:** thêm Đo lường + Tối ưu, chạy báo cáo tuần đầu tiên.
4. **Tháng 2:** thêm Nghiên cứu, SEO, Kế hoạch, Tương tác, Báo cáo khách hàng; cuối cùng cho `orchestrator.md` tự chạy theo lịch (scheduled task mỗi giờ).
