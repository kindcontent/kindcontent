# fireworks-tech-graph: toàn bộ style và tuỳ chọn

Bản đã kiểm tra là v1.2.0 (commit `31fea36`). Danh mục dưới đây được đối chiếu trực tiếp với mã nguồn: `scripts/semantic_contracts.py`, `scripts/generate-from-template.py`, `scripts/motion.py` và thư mục `references/`.

Tất cả các bản dưới đây vẽ cùng một nội dung (Quy trình Agentic Content, 12 bước). Mỗi bản đều chạy đủ quy trình của skill: `validate` → `render` → `check` → `export-png` (1600px). Bản nào cũng qua hết các bước kiểm tra tự động, và ở chế độ `text_policy: strict` không có chữ nào bị cắt. Thứ tự xem gợi ý nằm trong `manifest.json`, xếp từ hợp với content nhất trở xuống.

## 12 style

| # | Style | Đã vẽ | File | Ghi chú |
|---|---|---|---|---|
| 1 | Flat Icon (mặc định) | ✅ | `style-01-flat-icon` | Hợp với content nhất |
| 2 | Dark Terminal | ✅ | `style-02-dark-terminal` | Có thanh cửa sổ 3 chấm. Font SF Mono/Fira Code không có trên máy test, nên chữ hiển thị bằng Inter (không còn chất "mono") |
| 3 | Blueprint | ✅ | `style-03-blueprint` | Có thêm số thứ tự `01 //` trước tên giai đoạn và khung tên kiểu bản vẽ kỹ thuật |
| 4 | Notion Clean | ✅ | `style-04-notion-clean` | Mũi tên gần như một màu, đúng chất của style |
| 5 | Glassmorphism | ✅ | `style-05-glassmorphism` | |
| 6 | Claude Official | ✅ | `style-06-claude-official` | |
| 7 | OpenAI Official | ✅ | `style-07-openai` | |
| 8 | Dark Luxury | ✅ (AI tự viết SVG) | `style-08-dark-luxury` | Style này **không có bộ sinh JSON**. Skill hướng dẫn AI tự viết SVG theo `references/style-8-dark-luxury.md`. Tôi đã viết SVG với cùng bố cục, đường đi mũi tên lấy từ bản style 1, sau đó chạy `check` + `export-png` và qua hết |
| 9 | C4 Review Canvas | ✅ (chỉ lấy giao diện) | `style-09-c4-review-canvas` | Phải đặt `semantic_profile: generic`. Bản gốc yêu cầu dữ liệu kiến trúc C4 (cấp độ C4, công nghệ, giao thức trên mỗi mũi tên), không khớp với một quy trình content |
| 10 | Cloud Fabric | ✅ (chỉ lấy giao diện) | `style-10-cloud-fabric` | Bản gốc yêu cầu dữ liệu region/VPC và manifest icon cloud. Con dấu góc phải luôn ghi "0 REGIONS" |
| 11 | Event Transit | ✅ chỉ lấy giao diện **và** ✅ bản đầy đủ ngữ nghĩa | `style-11-event-transit`, `style-11b-event-transit-metro` | Bản "11b" dùng ngữ nghĩa event-transit thật: 3 tuyến (topic) tương ứng 3 giai đoạn, các ga đánh số, 2 điểm duyệt là "junction". Đây là kiểu bản đồ tàu điện, rất hợp để minh hoạ quy trình. Đổi lại, mô tả mỗi ga phải rút gọn vì ô hẹp |
| 12 | Ops Pulse | ✅ (chỉ lấy giao diện) | `style-12-ops-pulse` | Bản gốc yêu cầu 4 "golden signals", trace và critical path, đều là khái niệm vận hành hệ thống. Con dấu luôn có dòng "UNKNOWN · CORRELATED TRACE" |

Ghi chú chung cho style 9–12: đây là các style dành cho review kỹ thuật (kiến trúc C4, triển khai cloud, Kafka, SRE). Khi chỉ lấy giao diện (`semantic_profile: generic`), những nét đặc trưng riêng như thẻ C4, đường ray tàu, chỉ số live đều không xuất hiện, chỉ còn màu nền, khung và con dấu góc phải. Riêng style 11 có bản đầy đủ (11b), vì ý tưởng "tuyến tàu" khớp được với quy trình content.

## Các tuỳ chọn khác

| Tuỳ chọn | Có thật trong code? | Đã dùng/thử? | Ghi chú |
|---|---|---|---|
| **Loại sơ đồ** (`mode`/`template_type`): architecture, data-flow, flowchart, agent, memory, sequence, comparison, timeline, mind-map, use-case, class, state-machine, er-diagram, network-topology (+ flow) | Có | Dùng `agent` (và `flow` cho bản 11b) | Trong renderer, `mode` chỉ đổi kích thước khung mặc định và metadata, **không đổi cách bố cục**. Vị trí các ô vẫn do AI tự tính, nên không có bản "flowchart" hay "mind-map" nào khác biệt để vẽ thêm |
| **"14 loại UML"** | Chỉ là hướng dẫn cho AI (README/references) | Không | Không có bộ vẽ riêng cho từng loại UML. Nội dung của mình cũng không phải sơ đồ UML |
| **"AI/Agent domain patterns"**: RAG, Agentic RAG, Agentic Search, Mem0, Agent Memory Types, Multi-Agent, Tool Call | Chỉ là kiến thức mẫu cho AI (README, một số fixture) | Không | Đây là các cấu trúc mẫu (ví dụ Multi-Agent là "Orchestrator → các sub-agent → Aggregator"), không phải tuỳ chọn để render. Quy trình Agentic Content là một chuỗi tuần tự có vòng lặp. Ép vào các mẫu này sẽ làm sai nội dung nên không vẽ |
| **Hình dạng ô** (`kind`): rect, double_rect, hexagon, cylinder, document, folder, terminal, speech, icon_box, user_avatar, bot, circle_cluster; transit_station/junction/terminal; review_card; cloud_service; ops_service; trace_span; otel_collector | Có | Dùng rect, user_avatar, transit_station/junction | Icon `user_avatar` khi thu nhỏ trông giống mặt mếu |
| **Kiểu mũi tên** (`flow`): control, write, read, data, async, feedback, neutral + `dashed`, `label_style`, `route_points`, `corridor_x/y` | Có | Có | Có thể tự đặt màu (`color`), nhưng khi đó đầu mũi tên vẫn lấy màu theo palette của style, nên có thể lệch màu |
| `quality_profile` (standard/showcase) + `composition` | Có | showcase, có nới giới hạn | Vòng phản hồi từ Đo lường về Chiến lược bắt buộc phải gấp 3 lần, nên đã đặt `max_bends_per_edge: 3`, `max_total_bends: 12`, `max_route_stretch: 1.6` |
| `text_policy: strict` | Có | Có | Báo lỗi nếu có chữ bị cắt |
| Trang trí theo style: `window_controls`, `meta_*` (style 2), `header_prefix`, `blueprint_title_block` (style 3), `side_label` (style 6), `style_overrides`, `legend_box` | Có | Dùng cho style 2 và 3 | `side_label` không hợp với bố cục 3 cột nên không dùng |
| **Bộ icon**: `assets/icons/cloud/manifest-v1.json` (glyph cloud trung tính, dùng cho style 10); README liệt kê logo sản phẩm (OpenAI, Kafka, AWS…) | Có, chỉ cho cloud | Không | Không có icon nào cho content (Facebook, TikTok…) |
| **Xuất HTML tương tác** (`export-html`) | Có | ✅ `style-01-flat-icon-interactive.html` | Một file chạy offline: phóng to/thu nhỏ, đổi theme sáng/tối, copy SVG, tải PNG/JPEG/WebP 1–4×. Đã mở thử bằng Chromium, hiển thị đúng |
| **GIF động** (`animate`, 12 preset: memory-weave, tool-grounding, service-blueprint, memory-lifecycle, agent-orchestration, governed-runtime, token-stream, golden-circuit, review-trace, cloud-flow, event-transit, ops-pulse) | Có | ❌ Không làm được | Mỗi preset bắt buộc sơ đồ phải có **đúng** số mũi tên và vai trò như sơ đồ mẫu (ví dụ style 5 cần đúng 9 mũi tên với vai trò cố định). Chạy thử `--dry-run` báo lỗi `MOTION_METADATA: … requires explicit motion metadata on every edge` / `Style 11 requires dead-letter and state branches`. Vì vậy không thể làm GIF cho sơ đồ 13 mũi tên của mình. Ngoài ra còn cần cài thêm puppeteer-core |
| "Dark variants" | Không có công tắc sáng/tối | – | Bản tối chính là các style 2, 3, 5, 8, 12. Chỉ file HTML tương tác có nút đổi theme cho phần khung trang |

## Thư mục

- `*.png`: rộng 1600px, mỗi file dưới 230 KB.
- `*.svg`: file gốc để chỉnh sửa.
- `input/*.json`: dữ liệu đầu vào cho bộ sinh. Style 8 không có JSON vì SVG được viết tay.
- `manifest.json`: thứ tự xem gợi ý kèm nhận xét ngắn.
