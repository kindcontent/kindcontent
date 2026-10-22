# tasks.md

> **Quy tắc file này:** cực kỳ ngắn gọn, chỉ đủ ngữ cảnh cho Agent. Trên cùng là 1 checklist tiếng Việt ngắn (đã làm / đang làm). Bên dưới là ngữ cảnh cho Agent. Không thêm gì khác. Mỗi session phải cập nhật file này.

## Checklist
- [x] Xóa toàn bộ dự án cũ (repo chỉ còn README giới thiệu Kind Content, đã xóa)
- [x] Giải thích keyword: Diagram (mind map, flowchart, whiteboard, infographic, diagram-as-code, AI diagram)
- [x] Đề xuất danh sách repo diagram nhiều sao
- [x] Cài & test 10 repo, vẽ cùng nội dung "Quy trình Agentic Content" → `diagram-tools/`
- [x] Tổng hợp so sánh + chấm điểm → `diagram-tools/README.md` + gallery https://claude.ai/artifact/BsaCNoPNYXfZ3ZkifGSFkA
- [x] Render tất cả style/theme/template của từng repo diagram (328 ảnh + 276 mẫu AntV) → `diagram-tools/NN-*/styles/` + gallery mục "Tất cả style"
- [x] Lọc Top 3 cho đăng bài (clean, ai cũng hiểu): chấm theo cả kho repo (8 tiêu chí) → draw.io 8.3 > Excalidraw 8.1 > fireworks 7.6
- [x] Benchmark: 3 agent mới, mỗi agent 1 repo (draw.io, Excalidraw, fireworks), cùng 3 prompt (timeline dọc, vòng tròn, 2 làn AI/Người) → `diagram-tools/benchmark/`; đo token, thời gian, RAM, dung lượng; giám khảo chấm mù → draw.io 8.9 > Excalidraw 8.1 > fireworks 7.3; token: Excalidraw 126k < draw.io 135k < fireworks 241k (`benchmark/KET-QUA.md`). User chấm lại P3: fireworks 9, 2 cái kia 6 (hàng dài, thừa khoảng trắng) → draw.io 7.9 > Excalidraw 7.5 > fireworks 7.3
- [x] Benchmark vòng 2: Marketing phức tạp (A) + tư vấn content Social đơn giản (B) → `benchmark/round2/KET-QUA.md`: draw.io 9.0 > Excalidraw 8.2 > fireworks 7.7 (fireworks phức tạp chỉ 6.5, tốn 392k token)
- [x] Nghiên cứu lip sync (khớp môi) + clone giọng tiếng Việt → `lipsync-voice/NGHIEN-CUU.md`
- [ ] Test thật lip sync + giọng (chờ: GPU, mở huggingface.co, file giọng + video của user)

## Ngữ cảnh cho Agent
- Mục tiêu repo: test repo GitHub xem có đáng dùng không cho user (content creator, tiếng Việt, không code).
- Nội dung mẫu chung: `diagram-tools/content.md`. Mỗi tool 1 thư mục `diagram-tools/NN-ten/` gồm source, PNG, `NHAN-XET.md` (điểm 1–10).
- Tool: 01 markmap, 02 mermaid, 03 d2, 04 excalidraw, 05 drawnix, 06 antv-infographic, 07 next-ai-draw-io (+draw.io), 08 archify-skill, 09 diagram-design-skill, 10 fireworks-tech-graph-skill.
- Lip sync: user từng thử, môi không khớp. Cần giọng tiếng Việt clone từ giọng user. Đề xuất: video thật → LatentSync 1.6; giọng: VieNeu-TTS / VoxCPM2 (Apache-2.0, có tiếng Việt). Test thật cần GPU + mở huggingface.co + file giọng/video của user.
- Styles: mỗi `styles/` có `manifest.json` [{file,name,how,note}] + `STYLES.md`; gallery dựng từ manifest (nguồn: `diagram-tools/gallery/` — chép index.html + build.py vào scratchpad rồi chạy build.py; artifact giữ nguyên URL, publish chia 2 lô vì giới hạn 255 file).
- "Style" với user = CẤU TRÚC bố cục (cột, hàng, timeline, vòng tròn, metro…), không phải đổi màu. 11 cấu trúc S01–S11: cột dọc, hàng ngang, timeline ngang, timeline dọc, rắn lượn, vòng tròn, trục trung tâm, metro, làn vai trò, bậc thang, chevron. Bắt buộc đủ 12 bước, 2 điểm duyệt, 2 mũi tên vòng lặp; nhãn đời thường.
- Sở thích user khi chấm: lấp đầy khung, ít khoảng trắng; ghét 1 hàng dài nhiều ô; đúng cấu trúc đề quan trọng.
- Kết luận diagram: Excalidraw (font Normal), draw.io + next-ai-draw-io MCP, AntV Infographic, Drawnix/markmap cho mind map, fireworks-tech-graph nếu dùng Claude Code.
- Môi trường cloud: không GPU, huggingface.co bị chặn, không có API key LLM; tải release GitHub bị chặn (npm, pypi, proxy.golang.org, git clone OK). Cài đặt vào scratchpad, không để node_modules trong repo.
