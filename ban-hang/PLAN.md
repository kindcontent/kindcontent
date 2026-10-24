# Quy trình bán hàng · Agency Content Marketing + Khóa học Agentic Content

Hai sơ đồ (mở và sửa trên app.diagrams.net):
- `quy-trinh-tu-van-agency.drawio` / `.png`: **A · Tư vấn & bán dịch vụ Agency**. Bán kiểu tư vấn, có người ở các điểm quyết định.
- `pheu-khoa-hoc.drawio` / `.png`: **B · Phễu khóa học Agentic Content**. Tự động hoàn toàn: học Free ngay, tự nâng cấp.

Cả hai lấy free traffic từ **Hệ thống Agentic Content của chính agency** (`../agentic-content/`). Hai phễu nối với nhau:
- **Lead Agency chưa sẵn sàng thuê:** Agent Nuôi dưỡng mời họ học khóa Free.
- **Học viên là chủ doanh nghiệp, muốn thuê làm hộ:** Agent Thành công học viên chuyển lead sang Agent Chấm điểm của phễu Agency.

---

## A · Tư vấn & bán dịch vụ Agency
1 agent điều phối (`kc-sales-orchestrator`) + 13 agent · 16 skill · 4 điểm có người.

| # | Agent | Skill | Khi chạy | Kết quả | Mức AI |
|---|---|---|---|---|---|
| 1 | Lead Magnet | `kc-lead-magnet` | Mỗi tháng | Tài liệu miễn phí đổi liên hệ (checklist audit, template lịch, báo cáo ngành) | vừa |
| 2 | Thu lead | `kc-lead-capture` | Có người tải / nhắn | Chatbot hỏi 4 câu → lead vào CRM | nhẹ |
| 3 | Làm giàu dữ liệu | `kc-lead-enrich` | Lead vào CRM | Hồ sơ: website, fanpage, traffic, ngành, đối thủ | nhẹ |
| 4 | Chấm điểm | `kc-lead-score` | Có hồ sơ | Nóng / Ấm / Lạnh | nhẹ |
| 5 | Nuôi dưỡng | `kc-nurture` | Ấm, Lạnh, mất deal | Email + Zalo 6 tuần, mời học khóa Free | vừa |
| 6 | Đặt lịch | `kc-meeting-booker` | Lead Nóng | Link chọn giờ trong 1h, nhắc hẹn | nhẹ |
| 7 | Audit & chuẩn bị | `kc-channel-audit`, `kc-call-prep` | Trước buổi tư vấn | Audit 1 trang + brief cho tư vấn viên | vừa |
| 8 | Ghi chú cuộc gọi | `kc-call-notes` | Sau buổi tư vấn | Nhu cầu, phản đối, bước tiếp → CRM | nhẹ |
| 9 | Đề xuất | `kc-proposal-writer` | Sau ghi chú | Kế hoạch 90 ngày, dự báo traffic, 3 gói | mạnh |
| 10 | Bám đuổi | `kc-followup` | Sau khi gửi đề xuất | Nhắc ngày 2/5/10, case study cùng ngành | nhẹ |
| 11 | Onboarding | `kc-client-onboarding` | Đã ký | Brand Kit, quyền truy cập kênh → bàn giao Hệ thống Agentic Content | vừa |
| 12 | Giữ chân khách | `kc-account-health` | Hằng tuần | Điểm sức khỏe, tín hiệu rời bỏ | nhẹ |
| 13 | Case study | `kc-case-study` | Có kết quả tốt | Case study, review, lời giới thiệu → thành tài liệu thu lead mới | vừa |

Hợp đồng và hóa đơn cọc do skill `kc-contract` soạn từ mẫu khi Sales chốt.

**Điểm có người**
| Điểm | Ai | Hạn | Việc |
|---|---|---|---|
| Buổi tư vấn | Tư vấn viên | trong 48h từ lúc lead Nóng | 30–45 phút, dùng audit + bộ câu hỏi khám phá |
| Duyệt đề xuất & giá | Trưởng nhóm | 24h | Đúng nhu cầu, đúng bảng giá, cam kết làm được |
| Chốt deal | Sales | trong 7 ngày | Đàm phán, ký, nhận cọc |
| Gia hạn / nâng gói | Account Manager | tháng 3 và 6 | Ưu tiên khách có tín hiệu rời bỏ hoặc vượt KPI |

**Vòng lặp:**
- **Lead có tín hiệu mua:** được chấm điểm lại.
- **Đề xuất cần sửa:** quay về Agent Đề xuất.
- **Mất deal:** chuyển sang nuôi dưỡng, liên hệ lại sau 90 ngày.
- **Case study mới:** thành tài liệu miễn phí để thu lead mới.

**Gói dịch vụ:** Khởi động / Tăng trưởng / Toàn diện (số kênh và số nội dung tăng dần; giá theo bảng giá nội bộ).

**Chỉ số theo dõi:**
- **Tỷ lệ chuyển đổi qua phễu:** lead → Nóng → tư vấn → đề xuất → ký.
- **Tốc độ:** thời gian từ lead tới buổi tư vấn.
- **Giữ chân khách:** tỷ lệ gia hạn.
- **Nguồn lead:** doanh thu theo từng nguồn traffic.

---

## B · Phễu khóa học Agentic Content
1 agent điều phối (`kc-course-orchestrator`) + 12 agent · 14 skill · 2 điểm có người. Không có bước tư vấn.

| # | Agent | Skill | Khi chạy | Kết quả | Mức AI |
|---|---|---|---|---|---|
| 1 | Mồi khóa học | `kc-course-teaser` | Mỗi bài học mới | Reel / TikTok / blog "học thử 5 phút" | vừa |
| 2 | Landing page | `kc-landing-optimizer` | Hằng tuần | A/B tiêu đề, video, nút đăng ký | nhẹ |
| 3 | Chào mừng | `kc-signup-onboarding` | Vừa đăng ký | Hỏi 3 câu → lộ trình riêng, mở bài 1 ngay | nhẹ |
| 4 | Trợ giảng AI | `kc-ai-tutor` | Học viên hỏi / nộp bài | Hỏi đáp 24/7, chấm bài, gợi ý bài tiếp | vừa |
| 5 | Kích hoạt | `kc-activation-nudge` | Không học quá 24h | Nhắc ngày 1/3/7, dẫn tới "Aha" | nhẹ |
| 6 | Cộng đồng | `kc-community-host` | Hằng ngày | Thử thách 7 ngày, trả lời group | nhẹ |
| 7 | Tín hiệu nâng cấp | `kc-upgrade-signal` | Liên tục | Điểm sẵn sàng (học ≥ 60% Free, chạm giới hạn) | nhẹ |
| 8 | Ưu đãi | `kc-upgrade-offer` | Đủ điểm sẵn sàng | Bảng Free / Pro / Team đúng lúc, ưu đãi 72h | vừa |
| 9 | Thanh toán | `kc-checkout`, `kc-cart-recovery` | Chọn gói | Thanh toán, mở khóa ngay, hóa đơn; nhắc bỏ giỏ 1h/24h | nhẹ |
| 10 | Thành công học viên | `kc-learner-success` | Sau nâng cấp | Tiến độ Pro, chứng chỉ; chủ doanh nghiệp → lead Agency | nhẹ |
| 11 | Giới thiệu | `kc-referral` | Có chứng chỉ | Mã giới thiệu, hoa hồng affiliate | nhẹ |
| 12 | Phản hồi | `kc-course-feedback` | Mỗi tháng | Bài nhiều người bỏ dở → đề xuất sửa | vừa |

**Khoảnh khắc "Aha" (mục tiêu của 7 ngày đầu):** học viên dùng Brand Kit của chính mình để chạy agent và viết ra bài đầu tiên đăng được. Mọi agent ở bước 3–6 đều hướng học viên tới điểm này.

**Gói:**
- **Free:** 5 bài nền tảng, 3 template agent (Brief, Viết, Biên tập), cộng đồng, trợ giảng AI có giới hạn câu hỏi mỗi ngày.
- **Pro:** toàn bộ khóa, bộ 22 skill mẫu, chứng chỉ.
- **Team:** nhiều tài khoản cho doanh nghiệp, báo cáo tiến độ nhóm.

**Điểm có người:**
- **Hỗ trợ:** xử lý ngoại lệ trong 24h (hoàn tiền, lỗi thanh toán, hóa đơn công ty).
- **Giảng viên:** cập nhật bài học mỗi tháng theo đề xuất của Agent Phản hồi.

**Vòng lặp:**
- **Chưa nâng cấp:** học tiếp Free, chấm điểm lại sau 7 ngày.
- **Học viên mới từ mã giới thiệu:** quay lại landing page.

**Chỉ số theo dõi:**
- **Tỷ lệ qua phễu:** đăng ký → Aha (trong 7 ngày) → học xong Free → nâng cấp → giới thiệu.
- **Doanh thu và hoàn tiền:** doanh thu mỗi học viên đăng ký, tỷ lệ hoàn tiền.

---

## Thứ tự triển khai gợi ý
1. **Tuần 1–2:** CRM + Agent Thu lead, Chấm điểm, Đặt lịch, Đề xuất (phễu Agency chạy được với người làm phần còn lại).
2. **Tuần 3:** landing page + gói Free + Agent Chào mừng, Trợ giảng AI, Thanh toán (phễu khóa học bán được).
3. **Tuần 4:** Agent Kích hoạt, Tín hiệu nâng cấp, Ưu đãi, Nuôi dưỡng (nối 2 phễu với nhau).
4. **Tháng 2:** Audit, Bám đuổi, Giữ chân khách, Case study, Cộng đồng, Giới thiệu, Phản hồi; cuối cùng giao 2 agent Điều phối tự chạy.
