# tasks.md

> **Quy tắc file này:** cực kỳ ngắn gọn, chỉ đủ ngữ cảnh cho Agent. Trên cùng là 1 checklist tiếng Việt ngắn (đã làm / đang làm). Bên dưới là ngữ cảnh cho Agent. Không thêm gì khác. Mỗi session phải cập nhật file này.

## Checklist
- [x] Xóa dự án cũ; repo dùng để test repo GitHub cho user
- [x] Test 10 repo diagram + benchmark 2 vòng → **chốt draw.io (qua next-ai-draw-io MCP)**; đã xóa toàn bộ dữ liệu test
- [x] Thiết kế Hệ thống Agentic Content (1 điều phối + 13 agent, 22 skill `kc-*`, 3 điểm duyệt) → `agentic-content/` (sơ đồ .drawio/.png + PLAN.md)
- [x] Quy trình bán hàng: A · tư vấn & bán dịch vụ Agency (13 agent, 16 skill, 4 điểm người) + B · phễu khóa học Agentic Content tự động (12 agent, 14 skill, 2 điểm người) → `ban-hang/`
- [x] Nghiên cứu lip sync + clone giọng tiếng Việt → `lipsync-voice/NGHIEN-CUU.md`
- [ ] Test thật lip sync + giọng (chờ: GPU, mở huggingface.co, file giọng + video của user)

## Ngữ cảnh cho Agent
- Mục tiêu repo: test/chọn công cụ GitHub và thiết kế quy trình agent cho user (content creator, Kind Content, tiếng Việt, không code).
- Công cụ vẽ sơ đồ đã chốt: draw.io qua MCP `@next-ai-drawio/mcp-server` (Claude Code: `claude mcp add --scope user drawio -- npx @next-ai-drawio/mcp-server@latest`). Sửa sơ đồ: load_diagram file `.drawio` → edit_diagram → export_diagram.
- Gu thiết kế của user: clean, tối giản, lấp đầy khung (ghét khoảng trắng lớn, ghét 1 hàng dài nhiều ô), chữ đậm đủ to, đúng cấu trúc, nhãn đời thường, vòng lặp vẽ bằng mũi tên.
- Agency: Content Marketing đa kênh bằng Agentic Content, hướng free traffic; khóa học Agentic Content bán tự động (Free → Pro / Team). 2 phễu nối chéo: lead chưa sẵn sàng → khóa Free; học viên chủ doanh nghiệp → lead Agency.
- `agentic-content/PLAN.md`, `ban-hang/PLAN.md` là nguồn sự thật: bảng agent/skill, file bàn giao, điểm duyệt, vòng lặp, lộ trình. Sửa PLAN thì sửa sơ đồ cho khớp. Skill đặt tên `kc-*`.
- Lip sync: đề xuất video thật → LatentSync 1.6; giọng: VieNeu-TTS / VoxCPM2.
- Môi trường cloud: không GPU, huggingface.co bị chặn, không API key LLM; npm/pypi/git clone OK. Cài vào scratchpad, không để node_modules trong repo.
