# Kết quả benchmark vòng 2 (22/10/2026)

6 agent mới (3 tool × 2 quy trình), cùng đề `../PROMPTS-V2.md` và cùng bộ "Bài học vòng 1". Giám khảo chấm mù 18 ảnh theo gu người dùng (ghét thừa khoảng trắng, ghét sai cấu trúc). Điểm chi tiết: `judge2.json`, khóa: `blind2_key.json`.

## Chất lượng (TB 5 tiêu chí, 1–10)
| Repo | A·P1 | A·P2 | A·P3 | **A phức tạp** | B·P1 | B·P2 | B·P3 | **B đơn giản** | **Chung** |
|---|---|---|---|---|---|---|---|---|---|
| draw.io | **9.2** | **8.4** | **8.6** | **8.7** | 9.4 | **9.2** | **9.0** | **9.2** | **9.0** 🥇 |
| Excalidraw | 8.4 | 7.4 | 7.8 | 7.9 | 8.6 | 8.0 | 8.8 | 8.5 | 8.2 🥈 |
| fireworks | 6.2 | 5.6 | 7.8 | 6.5 | **9.4** | 8.8 | 8.4 | 8.9 | 7.7 🥉 |

draw.io đứng nhất 5/6 nhóm; fireworks nhất B·P1 (hòa điểm, thắng vì lấp đầy khung).

## Chi phí (mỗi agent = 1 quy trình × 3 prompt, đã cài sẵn từ vòng 1)
| Repo | Token B đơn giản | Token A phức tạp | Tăng | Thời gian B | Thời gian A | Lượt tool B / A |
|---|---|---|---|---|---|---|
| draw.io | 134k | 191k | +43% | 9.5 phút | 19 phút | 24 / 34 |
| Excalidraw | 138k | 188k | +36% | 10.4 phút | 19.1 phút | 33 / 36 |
| fireworks | 226k | 392k | +73% | 16.5 phút | 43.9 phút | 61 / 89 |

RAM đỉnh mỗi lần render: draw.io ~180 MB, Excalidraw ~178 MB, fireworks ~44 MB.

## Nhận xét
- draw.io ổn định nhất ở cả quy trình đơn giản lẫn phức tạp, chữ đậm dễ đọc, cấu trúc đúng.
- Excalidraw đúng cấu trúc nhưng font mảnh (Nunito 1 độ đậm) bị trừ điểm dễ đọc; vòng tròn phức tạp bị rối.
- fireworks đẹp với quy trình đơn giản nhưng gãy với quy trình phức tạp: không vẽ được đường cong, không tự dàn trang, phải sửa SVG bằng tay; tốn gần gấp đôi token và gấp 2–2.3 lần thời gian. Bản B·P2 không qua bước `check` của chính skill (mũi tên cong bị coi là lỗi).
