# 07 — next-ai-draw-io + draw.io: nhận xét

Nội dung vẽ: **Quy trình Agentic Content** (file `../content.md`). Sơ đồ có 3 giai đoạn, 12 bước, 2 điểm người duyệt, vòng sửa bài và vòng lặp phản hồi về Chiến lược.
Ngày test: 21/10/2026, trong container Linux, **không có API key LLM nào**.

## Kết quả (xem file trong thư mục này)

| File | Là gì |
|---|---|
| `agentic-content.drawio` | File sơ đồ gốc. Mở bằng app.diagrams.net (File → Open from → Device) hoặc draw.io Desktop để sửa tiếp |
| `agentic-content-mcp.png` (2730×1846) | PNG do **MCP server của next-ai-draw-io** xuất ra, Claude là người vẽ |
| `agentic-content-mcp.svg` | Bản SVG, cũng do MCP server xuất |
| `agentic-content-drawio.png` (2197×1490) | Cùng file `.drawio` đó, mở trong **draw.io gốc (jgraph/drawio v32.5.5)** chạy local, xuất PNG với scale 1.6 |
| `mcp-input-cells.xml` | Đoạn XML Claude viết rồi gửi vào tool `create_new_diagram` của MCP |
| `ui-next-ai-draw-io-trang-chu.png` | Trang chủ web app next-ai-draw-io (chạy local) |
| `ui-next-ai-draw-io-loi-khong-co-api-key.png` | Gửi prompt tiếng Việt khi chưa có key thì báo lỗi `AI_MODEL environment variable is required` |
| `ui-next-ai-draw-io-cai-dat-model.png` | Bảng Settings → Models: tự nhập API key, có 25 nhà cung cấp |
| `ui-next-ai-draw-io-mo-file-drawio.png` | Web app mở file `.drawio` ở trên (không gọi AI) |
| `ui-mcp-preview-claude-code.png` | Trang preview của MCP server, là thứ bạn thấy khi dùng với Claude Code. Menu draw.io hiện tiếng Việt |
| `ui-drawio-editor-tieng-viet.png` | Trình soạn draw.io gốc, giao diện tiếng Việt, đang mở sơ đồ |

Tiếng Việt có dấu hiển thị đúng hết, kể cả chữ in hoa như "GIAI ĐOẠN", "CHIẾN LƯỢC", "PHÂN PHỐI".

---

## Phần nào đã chạy thật, phần nào chỉ đọc tài liệu

**Đã chạy thật:**
1. Clone `DayuanJiang/next-ai-draw-io` (depth 1), chạy `npm install`, rồi chạy web app bằng `next dev` ở cổng 4303. Đã chụp UI. Có gửi thử 1 prompt tiếng Việt, kết quả là lỗi vì không có model/API key (đúng như dự đoán, **không có kết quả AI nào bị làm giả**). Sau đó đã tắt server.
2. **MCP server `@next-ai-drawio/mcp-server@0.4.6` chạy được mà không cần API key.** Server này không gọi LLM nào. Agent gọi nó (Claude) tự viết XML draw.io, còn server chỉ hiển thị, kiểm tra, chụp ảnh và xuất file. Cách tôi chạy:
   - Viết một MCP client nhỏ bằng `@modelcontextprotocol/sdk`, nói chuyện với server qua stdio giống hệt cách Claude Code làm. Trong container này không đăng ký nó vào Claude Code bằng `claude mcp add`.
   - Lần lượt gọi `get_drawing_guide`, `start_session` (với `BROWSER=none`, `DRAWIO_LANG=vi`), mở URL preview bằng Chromium headless, `create_new_diagram` với XML **do Claude viết** (`screenshot: true` để tự kiểm tra), rồi `export_diagram` ra `.drawio`, `.png`, `.svg`.
   - Claude xem ảnh, chỉnh một lần (dời nhãn "Đạt ✓" lại gần hình thoi) rồi xuất lại.
   - Vì vậy kết quả này đúng là **"dùng qua Claude Code (MCP)"**: Claude viết sơ đồ, next-ai-draw-io hiển thị và xuất file.
3. Clone `jgraph/drawio` (depth 1), phục vụ `src/main/webapp` dạng file tĩnh ở cổng 4304. Nạp file `.drawio` qua chế độ embed (`postMessage` `load`/`export`), xuất PNG và chụp trình soạn (giao diện `lang=vi`). Sau đó đã tắt server.

**Chỉ đọc trong tài liệu, chưa thử:** bản demo online, desktop app, Ollama/DeepSeek/EdgeOne, plugin marketplace của Claude Code, tính năng AI "Generate" có sẵn của draw.io, `@drawio/mcp` chính chủ và `mcp.draw.io`.

---

## 1. next-ai-draw-io

- **Repo:** https://github.com/DayuanJiang/next-ai-draw-io
- **Sao GitHub:** khoảng **36.300 ⭐** (36.331, 3.805 fork, lấy ngày 21/10/2026 qua GitHub search. `curl api.github.com` bị proxy chặn trong phiên này). License Apache-2.0.
- **Là gì:** chat với AI để vẽ sơ đồ trên canvas draw.io thật. Có web app, desktop app (Win/Mac/Linux) và MCP server cho Claude Code, Cursor, Codex, VS Code.

### Cần API key gì / chi phí
- **Web app / desktop:** bắt buộc có một model. Hỗ trợ 25 nhà cung cấp: AWS Bedrock (mặc định), OpenAI, Anthropic, Google, Azure, **Ollama (local)**, OpenRouter, DeepSeek, Qwen, GLM, Kimi, SiliconFlow, ModelScope… và loại "OpenAI-compatible" cho LM Studio/vLLM. Kiểu **bring-your-own-key**: key lưu trong trình duyệt.
- **Lựa chọn miễn phí theo tài liệu (chưa thử):**
  - (a) **Demo online** https://next-ai-drawio.jiang.jp/ dùng được ngay nhưng **có giới hạn lượt**.
  - (b) **Ollama** chạy offline, nhưng tài liệu nói thẳng là cần model mạnh (DeepSeek R1, Qwen3-235B), model nhỏ hay vẽ hỏng.
  - (c) Deploy lên **Tencent EdgeOne Pages** thì có quota DeepSeek miễn phí mỗi ngày.
- **MCP server:** **không cần key**. Nếu bạn đã có Claude Code (gói Claude Pro/Max) thì không tốn thêm đồng nào. Sơ đồ do chính Claude vẽ.

### Cách cài
- Dùng ngay: mở https://next-ai-drawio.jiang.jp/
- Tự chạy: `git clone …` → `npm install` → `cp env.example .env.local` (điền `AI_PROVIDER`, `AI_MODEL`, key) → `npm run dev` → http://localhost:6002
- Desktop: tải bộ cài ở trang Releases.

### Cách dùng với Claude Code (MCP), cách được khuyên dùng
```bash
claude mcp add --scope user drawio -- npx @next-ai-drawio/mcp-server@latest
```
Hoặc cài dạng plugin: `/plugin install next-ai-drawio --marketplace anthropics/claude-plugins-community`.

Sau đó mở Claude Code và nhắn, ví dụ: *"Đọc file diagram-tools/content.md và vẽ sơ đồ quy trình bằng tiếng Việt, mỗi giai đoạn một swimlane, người duyệt là hình thoi, có vòng lặp phản hồi."*

Trình duyệt sẽ tự mở trang preview, sơ đồ hiện dần ra. Bạn sửa tay trên đó thì Claude đọc lại được những gì bạn sửa. Mỗi lần AI sửa là một version có thể khôi phục, và file tự lưu vào `~/.next-ai-drawio/`. Muốn có file thì bảo Claude "xuất ra PNG/SVG/.drawio".

Mẹo: muốn menu draw.io trong preview hiện tiếng Việt thì thêm `env` `DRAWIO_LANG=vi` vào cấu hình MCP.

### Kết quả
Sơ đồ rõ, đúng nội dung:
- 3 swimlane màu (xanh dương = Chiến lược, xanh lá = Thực thi, tím = Phân phối)
- 12 bước đánh số, mỗi bước có tên agent đậm và mô tả ngắn
- 2 hình thoi cam "Người duyệt" (human-in-the-loop) với nhánh "Đạt ✓" sang giai đoạn sau
- Vòng "Chưa đạt → sửa lại" (đứt nét đỏ) quay lại Agent Viết
- Vòng lặp lớn đứt nét từ Agent Đo lường quay về Agent Nghiên cứu, có chú thích
- Có chú giải (legend) ở cuối

Mở thẳng trong draw.io để sửa được ngay.

### Lỗi / vướng mắc gặp phải
1. Chạy `npx next dev` trực tiếp thì bỏ qua bước `predev`, nên thiếu bản draw.io đi kèm (`/drawio/index.html` trả 404). Canvas cứ hiện "Loading the canvas…" và chat báo `Chart export timed out after 10 seconds`. Cách sửa: chạy `node scripts/fetch-drawio.mjs` (tải `draw.war` v32.0.2) hoặc dùng `npm run dev` như bình thường.
2. Chưa có model/key thì chat báo `AI_MODEL environment variable is required`. Không vẽ được gì, đúng như dự kiến.
3. Hướng dẫn vẽ của MCP khuyên giữ sơ đồ trong khung 800×600. Quy trình 12 bước không vừa khung đó nên tôi vẽ khoảng 1400×900. Trong preview có thêm một đường ngắt trang (nét đứt dọc), nhưng không xuất hiện trong file xuất.
4. PNG của MCP xuất cố định khoảng 2× (2730px ngang) và không có tùy chọn scale. Muốn nhỏ hơn thì xuất từ draw.io.
5. Giao diện chat của web app chỉ có EN/中文/日本語, **không có tiếng Việt**. Nội dung tiếng Việt trong sơ đồ thì vẫn hiển thị hoàn hảo.
6. Container không có font emoji nên tôi không dùng 👤 trong sơ đồ (sẽ ra ô vuông). Trên máy Windows/Mac emoji hiển thị bình thường.

### Chấm điểm (1–10)
| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | 7 | Demo online gõ prompt là xong, nhưng hết lượt thì phải tự lấy API key. Đường MCP cần biết dùng Claude Code |
| Đẹp / dùng được cho content | 8 | Ra sơ đồ draw.io thật, sửa tay được, xuất PNG/SVG nét. Đẹp hay không phụ thuộc model (Claude vẽ tốt) |
| Hỗ trợ tiếng Việt | 7 | Chữ có dấu trong sơ đồ chuẩn 100%. UI chat không có tiếng Việt, canvas draw.io thì có |
| Miễn phí / offline | 6 | Mã nguồn mở, nhưng AI cần key trả phí (hoặc demo giới hạn, hoặc Ollama cần máy mạnh). MCP miễn phí nếu đã có Claude Code |

**Đáng dùng không?** **Có.** Nếu bạn đã dùng Claude Code thì cài MCP là cách nhanh nhất để có sơ đồ draw.io tiếng Việt đẹp, sửa được, không tốn thêm tiền. Nếu không dùng Claude Code thì thử demo online trước.

---

## 2. draw.io (diagrams.net)

- **Repo:** https://github.com/jgraph/drawio (trình soạn JS, khoảng **8.900 ⭐**) · https://github.com/jgraph/drawio-desktop (app desktop, khoảng **63.600 ⭐**). Số liệu lấy qua GitHub search ngày 21/10/2026. Ngoài ra còn https://github.com/jgraph/drawio-mcp (MCP chính chủ, khoảng 5.700 ⭐, chưa thử). License Apache-2.0.
- **Bản online:** https://app.diagrams.net, không cần tài khoản, lưu file về máy hoặc Google Drive/OneDrive.

### Cần API key gì / chi phí
Vẽ tay thì **không cần gì, miễn phí hoàn toàn**. Desktop app chạy **offline**. Theo tài liệu next-ai-draw-io, draw.io có công cụ AI riêng (Arrange → Insert → Generate) dùng model miễn phí do draw.io host hoặc key của bạn. Tôi **chưa thử** tính năng này.

### Cách cài
- Dùng online: mở app.diagrams.net
- Offline: cài draw.io Desktop (Windows/Mac/Linux) từ trang Releases của `drawio-desktop`
- Tự host: `docker run -d -p 8080:8080 jgraph/drawio`, hoặc như tôi làm là phục vụ thư mục `src/main/webapp` dạng file tĩnh

### Cách dùng với Claude Code
- (a) Dùng MCP của next-ai-draw-io ở trên, vì nó nhúng sẵn draw.io.
- (b) Dùng MCP chính chủ `@drawio/mcp` hoặc `https://mcp.draw.io/mcp` (theo bảng so sánh trong README của next-ai-draw-io, chưa thử).
- (c) Đơn giản nhất: nhờ Claude viết file `.drawio` rồi bạn mở bằng draw.io.

### Kết quả
Mở `agentic-content.drawio` trong draw.io gốc: hiển thị giống hệt bản MCP, giao diện menu tiếng Việt ("Tập tin, Chỉnh sửa, Xem, Sắp xếp…"). Xuất PNG scale 1.6 ra 2197px, nét và dễ đọc.

### Lỗi gặp phải
Không có lỗi. Chỉ lưu ý: font mặc định là Helvetica. Trên Windows chữ sẽ hiện bằng Arial, vẫn đủ dấu tiếng Việt.

### Chấm điểm (1–10)
| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | 8 | Kéo thả quen thuộc, nhưng tự vẽ 12 bước và các mũi tên vòng lặp thì mất khoảng 30–60 phút |
| Đẹp / dùng được cho content | 8 | Chuyên nghiệp, nhiều mẫu, xuất PNG/SVG/PDF. Muốn đẹp phải tự chỉnh màu |
| Hỗ trợ tiếng Việt | 9 | Có UI tiếng Việt, gõ và hiển thị dấu chuẩn |
| Miễn phí / offline | 10 | Miễn phí, mã nguồn mở, desktop chạy offline, không cần tài khoản |

**Đáng dùng không?** **Có.** Đây là công cụ nền miễn phí tốt nhất để sửa và xuất sơ đồ. Kết hợp với AI (next-ai-draw-io MCP hoặc Claude viết `.drawio`) thì không phải vẽ tay từ đầu.
