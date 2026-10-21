# Kết quả benchmark (21/10/2026)

3 agent mới, mỗi agent 1 repo, cùng 3 prompt trong `PROMPTS.md`. Giám khảo là agent riêng, chấm mù (ảnh đổi tên ngẫu nhiên, khóa ở `blind_key.json`, điểm chi tiết ở `judge.json`).

## Chất lượng (giám khảo chấm mù, 1–10)
| Repo | P1 timeline dọc | P2 vòng tròn | P3 hai làn | Đúng đủ | Đúng cấu trúc | Dễ hiểu | Clean | Hoàn thiện | **TB** |
|---|---|---|---|---|---|---|---|---|---|
| draw.io (next-ai-draw-io MCP) | **9.4** 🥇 | **8.4** 🥇 | **8.8** 🥇 | 10 | 9.7 | 8.7 | 8.3 | 7.7 | **8.9** |
| Excalidraw | 8.6 🥈 | 7.8 🥈 | 7.8 🥉 | 10 | 9.0 | 8.0 | 7.0 | 6.3 | **8.1** |
| fireworks-tech-graph | 6.6 🥉 | 6.4 🥉 | 8.8 🥈 | 9.3 | 6.0 | 6.7 | 7.3 | 7.0 | **7.3** |

## Chi phí
| Repo | Token agent (cài + 3 prompt) | Lượt gọi tool | Thời gian agent | Cài đặt | Dung lượng | Giây P1 / P2 / P3 | Số lần sửa P1/P2/P3 | RAM đỉnh / lần render |
|---|---|---|---|---|---|---|---|---|
| draw.io | 135k | 42 | 10.9 phút | 89 s | 100 MB | 170 / 122 / 74 | 3 / 3 / 3 | ~180 MB, ~10 s |
| Excalidraw | **126k** | 41 | 11.2 phút | 185 s | 307 MB | 90 / 147 / 110 | 3 / 3 / 2 | ~178 MB, ~1.7 s |
| fireworks | 241k | 53 | 16.8 phút | 44 s (+~6 phút đọc code) | **47 MB** | 72 / 246 / 242 | 2 / 3 / 1 | **44 MB**, ≤1.5 s |

Ghi chú: mỗi prompt chạy 1 lần nên có sai số; RAM là tiến trình lớn nhất (Chromium nhiều tiến trình nên số thật cao hơn); 3 agent chạy song song cùng máy.
