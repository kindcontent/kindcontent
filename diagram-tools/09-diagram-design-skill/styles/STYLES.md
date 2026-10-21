# diagram-design: toàn bộ loại sơ đồ và style

Thư mục này có 31 PNG (rộng tối đa 1600px, mỗi file dưới 350KB), `manifest.json` (xếp từ đẹp nhất xuống) và 3 file HTML tốt nhất: `style-loop-full.html`, `style-swimlane.html`, `style-flowchart.html`. Nội dung của mọi hình là quy trình Agentic Content trong `content.md`.

Mọi hình đều được tạo theo template và quy tắc của skill, và đều qua 2 công cụ kiểm tra của skill: `self_check.py` và `verify-geometry.py` báo 0 lỗi. Riêng tiêu đề H1 và chú thích nghiêng dùng **Noto Serif** thay Instrument Serif, vì Instrument Serif không có chữ tiếng Việt.

Lưu ý về số lượng loại: dòng giới thiệu repo ghi "44 diagram types", nhưng README và SKILL.md hiện tại liệt kê **45 loại** (thực tế 45 file `type-*.md`).

## 1. Danh mục 45 loại (theo SKILL.md §3) và việc có vẽ hay không

| # | Loại | Đã vẽ? | Lý do |
|---|---|---|---|
| 1 | Architecture | Bỏ qua | Dành cho thành phần hệ thống và giao thức; nội dung không có, swimlane đã thể hiện luồng |
| 2 | Architecture delta | Bỏ qua | Cần 2 trạng thái trước/sau; nội dung chỉ có 1 quy trình |
| 3 | IT current-state | Bỏ qua | Bức tranh hệ thống IT cũ, không liên quan |
| 4 | Flowchart | **Có** | Quyết định "Nội dung đạt?" |
| 5 | Sequence | **Có** | 5 vai trao đổi theo thời gian, có khung LOOP "chưa đạt" |
| 6 | State machine | **Có** (chuyển thể) | Vòng đời một bài |
| 7 | ER / data model | Bỏ qua | Không có thực thể dữ liệu |
| 8 | Timeline | **Có** (chuyển thể) | Trục là thứ tự bước; nội dung không có mốc thời gian |
| 9 | Swimlane | **Có** | Thêm 9 biến thể style |
| 10 | Quadrant | Bỏ qua | Cần 2 trục điểm số; sẽ phải bịa số |
| 11 | Radar / spider | Bỏ qua | Cần điểm số định lượng |
| 12 | Polar | Bỏ qua | Cần số liệu theo hạng mục vòng |
| 13 | Loop / flywheel | **Có** | Thêm 9 biến thể style |
| 14 | Nested | **Có** (chuyển thể) | Phạm vi lồng nhau |
| 15 | Tree | **Có** | Vượt giới hạn 9 nút (16 nút) |
| 16 | Org chart | Bỏ qua | Nội dung không có quan hệ báo cáo hay quản lý |
| 17 | Layer stack | **Có** (chuyển thể) | 6 tầng |
| 18 | Exploded axonometric | Bỏ qua | Dành cho vật thể tháo rời |
| 19 | Axonometric plan | Bỏ qua | Dành cho mặt bằng tầng nhà hoặc khu đất |
| 20 | Venn | **Có** (chuyển thể) | AI × con người |
| 21 | Pyramid / funnel | Bỏ qua | Không có thứ hạng hay số liệu rơi rụng; nếu vẽ thì độ rộng các tầng sẽ sai, mà skill cấm điều này |
| 22 | Bar | Bỏ qua | Không có số liệu |
| 23 | Waterfall | Bỏ qua | Không có số liệu |
| 24 | Treemap / marimekko | Bỏ qua | Không có tỉ trọng |
| 25 | Heatmap | Bỏ qua | Không có ma trận giá trị |
| 26 | Line (slopegraph, ridgeline, streamgraph, bump) | Bỏ qua | Không có chuỗi số theo thời gian |
| 27 | Gantt | Bỏ qua | Không có thời lượng hay lịch |
| 28 | Scatter (bubble, beeswarm) | Bỏ qua | Không có biến số |
| 29 | High-Level | Bỏ qua | Dành cho data stack trên cluster |
| 30 | Process | **Có** | Đủ 12 bước, chip dữ liệu vào/ra |
| 31 | Medallion | Bỏ qua | Dành cho kho dữ liệu nhiều tầng |
| 32 | Data flow | Bỏ qua | Cùng ngữ pháp với Process (bảng vai × bước); vẽ nữa sẽ trùng |
| 33 | DP integration | Bỏ qua | Dành cho nền tảng dữ liệu |
| 34 | DP security matrix | Bỏ qua | Dành cho ma trận phân quyền |
| 35 | Sankey | Bỏ qua | Cần số lượng chảy qua các nhánh; sẽ phải bịa |
| 36 | Fishbone | **Có** (chuyển thể) | Nhóm yếu tố dẫn tới "bài đạt chuẩn" |
| 37 | Wardley map | Bỏ qua | Cần trục mức độ trưởng thành |
| 38 | Kanban | **Có** (chuyển thể) | Kanban không cho mũi tên nên mất vòng lặp |
| 39 | User journey | Bỏ qua | Cần cảm xúc của người dùng; nội dung không có |
| 40 | Service blueprint | Bỏ qua | Cần hành động của khách hàng; nội dung không có |
| 41 | Deployment | Bỏ qua | Dành cho hạ tầng phần mềm |
| 42 | Dependency graph | Bỏ qua | Dữ liệu là chuỗi một cha và có 2 vòng lặp; loại này chỉ cho phép 1 vòng, skill khuyên dùng Tree/Process |
| 43 | UML class | Bỏ qua | Dành cho lớp lập trình |
| 44 | Story map | Bỏ qua | Cần chia release (MVP/Later) và đường cắt; nội dung không có |
| 45 | Database schema | Bỏ qua | Dành cho bảng SQL |

**Tổng: vẽ 13 loại** (process, swimlane, loop, flowchart, sequence, state, timeline, tree, nested, layers, kanban, fishbone, venn), bỏ qua 32 loại.

## 2. Các tuỳ chọn style và theme (đã đối chiếu file trong repo)

| Tuỳ chọn | File trong skill | Đã vẽ cho swimlane và loop? |
|---|---|---|
| Minimal light (mặc định) | `assets/template.html` | Có (`style-swimlane`, `style-loop`) |
| Minimal dark | `assets/template-dark.html`, token dark trong `style-guide.md` | Có |
| Full editorial (tiêu đề lớn + 3 thẻ + footer) | `assets/template-full.html` | Có |
| Terminal skin (cửa sổ CLI, toàn mono) | `assets/template-terminal.html`, `primitive-terminal.md` | Có |
| Sketchy (nét vẽ tay) | `primitive-sketchy.md` | Có |
| Nền chấm và nền trơn | `style-guide.md` (nền trơn là mặc định; các example dùng chấm) | Có (`-clean` là nền trơn) |
| Container framed | `layout-budget.md` § Page layout | Có |
| Font hệ thống (offline) | `style-guide.md` § Font source: `system` | Có; `self_check.py --offline` đạt |
| Brand tuỳ chỉnh (onboarding: URL / skill / thư mục / dán token / profile) | `onboarding.md`, `profiles.md` | Có, theo cách dán token với **bảng màu ví dụ** (xanh lá + kem, font Be Vietnam Pro). Không phải thương hiệu thật |
| Chú thích editorial (chữ nghiêng serif) | `primitive-annotation.md` | Có |
| Animation (reveal / step / loop) | `assets/template-motion.html`, `animation.md` | **Không**: PNG không thể hiện chuyển động; khung tĩnh giống bản light |
| Consultant special (ma trận 2×2 kiểu BCG) | chỉ dành cho Quadrant | Không: Quadrant bị bỏ qua (không có số liệu) |
| Series palette (5 màu) | chỉ dành cho radar/chart | Không áp dụng |
| Bộ icon (server, DB, K8s…) | `primitive-icons.md` | Không: icon kỹ thuật không hợp nội dung marketing |

## 3. Nhận xét nhanh

- **Tiếng Việt:** Geist và Geist Mono có bộ chữ tiếng Việt nên mọi nhãn, kể cả chữ in hoa nhỏ ("CHƯA ĐẠT", "GĐ1 · CHIẾN LƯỢC"), đều đúng dấu. Chỉ có Instrument Serif (tiêu đề và chú thích nghiêng) thiếu tiếng Việt.
- **Giới hạn 9 nút** của skill buộc phải gộp bước (swimlane còn 9, loop còn 8). Chỉ process và tree giữ đủ 12 bước; tree đã vượt giới hạn.
- **Terminal skin** với chữ mono to hơn 2px làm tràn hộp 128px, nên phải nới hộp lên 164px. Skill không tự tính chuyện này.
- **Sketchy** ở thông số mặc định (scale 1.5) gần như không thấy khi xem ở khổ 1600px.
- Kanban, fishbone, nested, venn, layers chỉ là bản **chuyển thể** để minh hoạ catalog. Chúng không phải cách tốt để trình bày một quy trình.
