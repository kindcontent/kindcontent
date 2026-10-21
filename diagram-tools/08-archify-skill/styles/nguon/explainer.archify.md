# Quy trình Agentic Content hoạt động thế nào? {#agentic-content}

Một chu kỳ nội dung đi qua **12 bước trong 3 giai đoạn**: Chiến lược → Thực thi → Phân phối. Quy trình có 10 agent AI và 2 điểm duyệt của con người.

- Giai đoạn Chiến lược: 3 agent nghiên cứu, làm SEO và lập kế hoạch, rồi người duyệt chốt chiến lược.
- Giai đoạn Thực thi: 4 agent viết brief, viết bài, làm hình ảnh và biên tập. Người duyệt nội dung cho qua hoặc trả về Agent Viết.
- Giai đoạn Phân phối: 3 agent chuyển thể, đăng bài và đo lường; kết quả đo lường quay lại Chiến lược cho chu kỳ sau.

@answer scope="Quy trình mẫu · 12 bước · 2 điểm duyệt của con người"
@meta locale=vi style=clean

## 12 bước nối với nhau ra sao? {#flow}

@workflow id=agentic-flow title="Quy trình Agentic Content"
| lane strategy | Chiến lược |
| lane execution | Thực thi |
| lane distribution | Phân phối |
| research | Agent Nghiên cứu | backend | strategy |
| seo | Agent SEO & Từ khóa | backend | strategy |
| plan | Agent Kế hoạch | backend | strategy |
| sreview | Người duyệt chiến lược | security | strategy |
| brief | Agent Brief | backend | execution |
| writer | Agent Viết | backend | execution |
| visual | Agent Hình ảnh & Video | backend | execution |
| editor | Agent Biên tập | backend | execution |
| creview | Người duyệt nội dung | security | execution |
| adapt | Agent Chuyển thể | backend | distribution |
| publish | Agent Đăng bài | backend | distribution |
| measure | Agent Đo lường | backend | distribution |
| research > seo | |
| seo > plan | |
| plan > sreview | gửi duyệt | security |
| sreview > brief | duyệt | emphasis |
| brief > writer | |
| writer > visual | |
| visual > editor | |
| editor > creview | gửi duyệt | security |
| creview > adapt | đạt | emphasis |
| creview > writer | chưa đạt | security |
| adapt > publish | |
| publish > measure | |
| measure > research | chu kỳ sau | dashed |

@steps id=flow-steps
| s1 | Agent Nghiên cứu | Phân tích thị trường, đối thủ, insight khách hàng. | agentic-flow | research |
| s2 | Agent SEO & Từ khóa | Nghiên cứu từ khóa, search intent, khoảng trống nội dung. | agentic-flow | seo |
| s3 | Agent Kế hoạch | Persona, content pillar, lịch nội dung. | agentic-flow | plan |
| s4 | Người duyệt chiến lược | Con người duyệt chiến lược trước khi sản xuất. | agentic-flow | sreview |
| s5 | Agent Brief | Dàn ý, outline, thông điệp chính. | agentic-flow | brief |
| s6 | Agent Viết | Bản nháp bài blog, fanpage, PR. | agentic-flow | writer |
| s7 | Agent Hình ảnh & Video | Visual, thumbnail, kịch bản video ngắn. | agentic-flow | visual |
| s8 | Agent Biên tập | SEO on-page, kiểm chứng thông tin, giọng thương hiệu. | agentic-flow | editor |
| s9 | Người duyệt nội dung | Chưa đạt thì quay lại Agent Viết. | agentic-flow | creview |
| s10 | Agent Chuyển thể | Một bài gốc thành nhiều định dạng: post, reel, email. | agentic-flow | adapt |
| s11 | Agent Đăng bài | Lên lịch và đăng lên Website, Fanpage, TikTok, YouTube, Email. | agentic-flow | publish |
| s12 | Agent Đo lường | Đo traffic, tương tác, chuyển đổi. | agentic-flow | measure |

## Con người can thiệp ở đâu? {#human}

| Điểm duyệt | Duyệt gì | Nếu chưa đạt |
| --- | --- | --- |
| Bước 4 · Người duyệt chiến lược | Persona, content pillar, lịch nội dung | Chưa sang giai đoạn Thực thi |
| Bước 9 · Người duyệt nội dung | Bài đã biên tập, hình ảnh, video | Quay lại Agent Viết {caution:Vòng sửa} |

## Quy trình tự cải thiện bằng cách nào? {#loop}

@callout level=note title="Vòng lặp phản hồi"
| Kết quả của Agent Đo lường (traffic, tương tác, chuyển đổi) quay lại Giai đoạn 1 – Chiến lược để tối ưu chu kỳ sau. |
