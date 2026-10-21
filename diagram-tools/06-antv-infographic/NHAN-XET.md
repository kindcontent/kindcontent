# AntV Infographic: nhận xét khi thử nghiệm

- **Repo:** https://github.com/antvis/Infographic (npm `@antv/infographic`, bản thử: **0.2.20**, giấy phép MIT)
- **Số sao GitHub:** xem trên GitHub (API GitHub bị chặn trong môi trường thử nên không lấy được con số)
- **Bản chất:** một "engine" vẽ infographic theo kiểu khai báo. Người dùng (hoặc AI) viết một đoạn cú pháp ngắn, dạng YAML thụt lề, rồi thư viện tự dựng thành SVG. Thư viện có **276 template** (danh sách lấy bằng `getTemplates()`), chia theo nhóm `sequence-*`, `list-*`, `hierarchy-*`, `relation-*`, `compare-*` và `chart-*`.

## Có skill/prompt chính thức cho AI agent không? CÓ

Thư mục `skills/` trong repo có 5 skill:
- `infographic-creator`: tạo file HTML có sẵn infographic.
- `infographic-syntax-creator`: chỉ sinh cú pháp. Tài liệu `references/prompt.md` mô tả đầy đủ luật cú pháp, danh sách template và checklist tự kiểm.
- `infographic-structure-creator`, `infographic-item-creator`: tự thiết kế cấu trúc và item mới.
- `infographic-template-updater`: dành cho người phát triển.

Repo có file `.claude-plugin/marketplace.json`, nên cài được thẳng vào Claude Code:
```
/plugin marketplace add https://github.com/antvis/Infographic.git
/plugin install antv-infographic-skills@antv-infographic
```
Skill có quy định rõ "giữ nguyên ngôn ngữ của người dùng", nên viết tiếng Việt thì AI sẽ không tự dịch sang tiếng Trung. Lưu ý: skill `infographic-creator` tạo HTML nạp thư viện từ `unpkg.com/@antv/infographic@latest`, nên khi xem file đó cần có mạng.

## Có web editor / playground online không? CÓ
- https://infographic.antv.vision: có trang Gallery, Editor (`/editor`), AI playground (`/ai`, chat để AI sinh infographic), tài liệu `/learn` và trang tra icon `/icon`.
- Theo mã nguồn của site, trang AI có nhà cung cấp mặc định "AntV" và cũng cho tự nhập Base URL + API key. Trong môi trường thử site bị chặn mạng nên **chưa mở được để kiểm tra trực tiếp**.
- Thư viện có sẵn chế độ chỉnh sửa trực tiếp trên hình (`editable: true`): sửa chữ, kéo phần tử.
- Cộng đồng đã làm plugin cho Obsidian, VS Code, markdown-it, Docsify, Slidev, React và có cả CLI (`infographic-cli`).

## Cách cài (lệnh đã chạy thật)

```bash
mkdir app && cd app && npm init -y
npm i @antv/infographic@0.2.20 @iconify-json/lucide   # lucide: bộ icon offline (xem phần lỗi)
```
Dùng trong trang HTML thuần bằng bản UMD, không cần bundler:
```html
<script src="node_modules/@antv/infographic/dist/infographic.min.js"></script>
<div id="container"></div>
<script>
  const ig = new AntVInfographic.Infographic({ container: '#container', width: 1200 });
  ig.render(`infographic sequence-snake-steps-compact-card
data
  title ...`);
  // xuất file: await ig.toDataURL({ type: 'svg' })  hoặc { type: 'png', dpr: 2 }
</script>
```
Tôi render bằng Playwright + Chromium headless, rồi chụp phần tử `<svg>` (deviceScaleFactor 2–3) và xuất SVG bằng `toDataURL({type:'svg'})`. Script nằm trong `render/`: `page.html`, `render.cjs` và `build-icons.cjs`. Muốn chạy lại thì copy 3 file này vào thư mục đã `npm i`, chạy `node build-icons.cjs` (tạo ra `icons.js`), rồi chạy `W=1200 DPR=2 node render.cjs <thư-mục-ra> *.infographic`.

## Kết quả: 7 biến thể (đều có .infographic + .png + .svg)

| File | Template | Nội dung | Đánh giá |
|---|---|---|---|
| `01-tong-quan-3-giai-doan` | `sequence-steps-badge-card` | 3 giai đoạn có mũi tên nối | Đẹp, sạch. Có một khoảng trắng thừa giữa phụ đề và các thẻ (do template). |
| `02-12-buoc-snake` | `sequence-snake-steps-compact-card` | 12 bước dạng "rắn" 4×3, có icon, mô tả và màu theo giai đoạn | **Đẹp nhất, dùng được ngay cho bài đăng.** |
| `03-12-buoc-roadmap` | `sequence-roadmap-vertical-badge-card` | 12 bước trên "con đường" dọc, đánh số 01–12 | Rất bắt mắt, hợp đăng dạng dọc (story, Pinterest). |
| `04-vong-lap` | `sequence-circular-simple` | Vòng Chiến lược → Thực thi → Phân phối → Đo lường & tối ưu | Đẹp, nhưng vòng không có đầu mũi tên. |
| `05-so-do-luong-day-du` | `relation-dagre-flow-tb-compact-card` | Sơ đồ luồng đủ 12 nút, **có vòng sửa bài (9 → 6) và vòng phản hồi (12 → 1)** | Biến thể duy nhất thể hiện đúng hai vòng lặp. Ảnh rất dài (1800×5874). Nhãn cạnh "tối ưu chu kỳ sau" đặt hơi lệch, dễ gây nhầm. |
| `06-agent-theo-giai-doan` | `hierarchy-structure` + `stylize rough` | Nhóm Agent theo 3 giai đoạn | Rõ ràng. Template chỉ dùng 1 màu, chữ hơi nhỏ so với bề ngang ảnh. |
| `07-mindmap-agent` | `hierarchy-mindmap-branch-gradient-capsule-item` | Mindmap gốc → 3 giai đoạn → các Agent | Đẹp. Template **không hiển thị tiêu đề** (bỏ qua `title`). |

**Tiếng Việt:** tất cả dấu (ư, ơ, ạ, ế, ổ, ỹ, Đ...) hiển thị đúng, không có chữ lỗi dấu. Lý do là thư viện đo chữ bằng canvas của trình duyệt theo đúng font đang dùng (Inter), nên chữ tự xuống dòng gọn trong thẻ. Emoji 👤 hiển thị thành emoji màu.

## Lỗi / hạn chế gặp phải
1. **Icon cần Internet và dùng server ở Trung Quốc.** Khi ghi icon bằng từ khóa (`icon rocket`), thư viện gọi `https://www.weavefox.cn/api/v1/infographic/icon` để tìm icon. Trong môi trường thử host này bị chặn, nên icon thành **hình tròn trống** (đã kiểm chứng). Cách khắc phục: đăng ký `registerResourceLoader` với bộ icon offline `@iconify-json/lucide`, rồi ghi `icon lucide/search`. Muốn làm vậy phải biết code một chút. Với người dùng bình thường có mạng thì icon tự chạy, nhưng việc phụ thuộc server bên thứ ba vẫn là rủi ro.
2. **Font mặc định tải từ CDN `assets.antv.antgroup.com`** (Alibaba PuHuiTi, Source Han, LXGW WenKai, 851tegakizatsu). Host này cũng bị chặn. Tôi đặt `theme > base > text > font-family Inter` cho mọi biến thể và kết quả ổn. Các font Trung/Nhật mặc định không được thiết kế cho tiếng Việt. Theme `hand-drawn` dùng font Nhật 851tegakizatsu nên **không nên dùng cho tiếng Việt** (chưa kiểm tra được vì CDN bị chặn).
3. **Chữ tràn khỏi thẻ khi mô tả dài.** Ở lần thử đầu của `sequence-steps-badge-card` và với `sequence-circle-arrows-indexed-card`, mô tả 3 dòng bị tràn ra ngoài khung. Phải viết ngắn lại (đã sửa trong bản cuối).
4. **Vòng lặp và nhánh:** chỉ nhóm `relation-dagre-*` vẽ được mũi tên quay lui. Các template "đẹp" (sequence/list) chỉ vẽ đường thẳng, nên vòng "chưa đạt → quay lại Agent Viết" phải ghi bằng chữ. Kiểu dagre có tỉ lệ ảnh rất cực đoan: TB thì quá dài, LR thì quá dẹt (3275×391 đơn vị), không có kiểu "xếp nhiều hàng".
5. Một số template bỏ qua dữ liệu hoặc palette: mindmap không vẽ tiêu đề, `hierarchy-structure` chỉ dùng màu đầu của palette, và thứ tự màu trong mindmap phải mò (màu đầu là nút gốc).
6. File SVG xuất ra **không nhúng font**, chỉ ghi `font-family="Inter"`, nên mở ở máy không có Inter sẽ bị đổi font. Icon thì đã được nhúng sẵn trong `<defs>`.
7. Không có giao diện kéo-thả để tạo từ đầu: cách dùng chính là viết cú pháp (hoặc nhờ AI viết), rồi sửa trên editor.

## Bảng điểm (1–10)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| Dễ dùng với người không biết code | **6** | Cú pháp đơn giản, có web editor/AI playground và skill cho Claude Code. Nhưng phải chọn đúng tên template trong 276 cái, và icon/font offline cần biết code. |
| Đẹp / dùng được cho content | **8.5** | Bản snake, roadmap, vòng tròn và mindmap đạt chất lượng đăng mạng xã hội ngay. Trừ điểm vì chữ tràn khi mô tả dài và template thường không thể hiện được vòng lặp. |
| Hỗ trợ tiếng Việt | **8** | Dấu chuẩn 100% với Inter, tự xuống dòng đúng. Font mặc định và font "viết tay" không dành cho tiếng Việt, nên phải tự đặt font. |
| Miễn phí / offline | **7** | MIT, miễn phí. Chạy offline được, nhưng icon theo từ khóa và font mặc định cần server ngoài (weavefox.cn, antgroup CDN). |

**Đáng dùng không?** Có. Đây là lựa chọn rất đáng dùng để biến dàn ý tiếng Việt thành infographic đẹp, nhất là khi để Claude viết cú pháp qua skill chính thức. Nên tự đặt font Inter, viết mô tả ngắn, và dùng `relation-dagre` khi cần vẽ vòng lặp.

## Xem toàn bộ kiểu dáng
Thư mục `styles/` có ảnh thu nhỏ của **cả 276 template** chạy bằng nội dung này, ảnh tổng hợp theo nhóm, và 31 ảnh theme/palette/font cho snake và roadmap (gồm cả lỗi font tiếng Việt của theme hand-drawn và cách sửa). Danh mục, top 15 và các lỗi nằm trong `styles/STYLES.md`.
