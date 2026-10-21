# tasks.md

> **Quy tắc file này:** cực kỳ ngắn gọn, chỉ đủ ngữ cảnh cho Agent. Trên cùng là 1 checklist tiếng Việt ngắn (đã làm / đang làm). Bên dưới là ngữ cảnh cho Agent. Không thêm gì khác. Mỗi session phải cập nhật file này.

## Checklist
- [x] Xóa toàn bộ dự án cũ (repo chỉ còn README giới thiệu Kind Content, đã xóa)
- [x] Giải thích keyword: Diagram (mind map, flowchart, whiteboard, infographic, diagram-as-code, AI diagram)
- [x] Đề xuất danh sách repo diagram nhiều sao
- [ ] Cài & test 10 repo, vẽ cùng nội dung "Quy trình Agentic Content" → `diagram-tools/`
- [ ] Tổng hợp so sánh + chấm điểm → `diagram-tools/README.md`
- [ ] Tìm giải pháp video người nói chuyện khớp môi (lip sync) + giọng tự nhiên học từ giọng user → `lipsync-voice/`

## Ngữ cảnh cho Agent
- Mục tiêu repo: test repo GitHub xem có đáng dùng không cho user (content creator, tiếng Việt, không code).
- Nội dung mẫu chung: `diagram-tools/content.md`. Mỗi tool 1 thư mục `diagram-tools/NN-ten/` gồm source, PNG, `NHAN-XET.md` (điểm 1–10).
- Tool: 01 markmap, 02 mermaid, 03 d2, 04 excalidraw, 05 drawnix, 06 antv-infographic, 07 next-ai-draw-io (+draw.io), 08 archify-skill, 09 diagram-design-skill, 10 fireworks-tech-graph-skill.
- Lip sync: user từng thử, môi không khớp. Cần giọng tiếng Việt clone từ giọng user. Bản nháp nghiên cứu: `lipsync-voice/NGHIEN-CUU.md`. Test thật cần GPU + mở huggingface.co + file giọng/video của user.
- Môi trường cloud: không GPU, huggingface.co bị chặn, không có API key LLM; tải release GitHub bị chặn (npm, pypi, proxy.golang.org, git clone OK). Cài đặt vào scratchpad, không để node_modules trong repo.
