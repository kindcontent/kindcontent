# Nghiên cứu: Video "người thật ngồi nói" khớp môi + giọng clone tiếng Việt

> Ngày khảo sát: 2026-10-21. Chỉ dựa trên bằng chứng (GitHub metadata, README, LICENSE, issue). **Chưa chạy model nào**, vì vậy không có kết quả video/âm thanh thật nào trong file này.
>
> **Giới hạn môi trường lúc nghiên cứu:** không có GPU (chỉ CPU 4 nhân, RAM 15 GB); `huggingface.co` bị chặn (nên không tải được weights); `git clone` và GitHub search (qua MCP) dùng được, còn `api.github.com/repos/...` bị proxy chặn. Vì vậy số sao lấy từ GitHub search, "commit cuối" lấy từ `git log` của bản clone nông, license đọc trực tiếp từ file LICENSE/README.
>
> **Quy ước:** ✅ = sự thật đã kiểm chứng (từ API/README/LICENSE/issue) · 💭 = nhận định của người nghiên cứu (chưa test).

---

## 1. Giải thích ngắn các keyword

| Keyword | Nghĩa ngắn |
|---|---|
| **Lip sync (khớp môi)** | Sửa vùng miệng trong video sao cho khớp với một file audio mới. |
| **(a) Video-to-video (V2V) / dubbing** | Đầu vào là **video thật** của bạn + audio mới, chỉ vẽ lại miệng (hoặc cả đầu). Ví dụ: LatentSync, MuseTalk, Wav2Lip, InfiniteTalk (chế độ V2V). |
| **(b) Image-to-video (I2V) / talking head** | Đầu vào là **1 ảnh** + audio, model tự tạo toàn bộ chuyển động (đầu, mắt, miệng, thân). Ví dụ: Hallo, EchoMimic, Sonic, HunyuanVideo-Avatar, InfiniteTalk (chế độ I2V). |
| **Audio-driven** | Chuyển động được điều khiển bằng âm thanh. |
| **Audio encoder** | Phần "nghe" audio của model lip-sync (Whisper, wav2vec2, HuBERT). Rất quan trọng với tiếng Việt (xem mục 2). |
| **Voice cloning / zero-shot TTS** | Đưa vài giây giọng mẫu, model đọc văn bản mới bằng giọng đó. **Fine-tune / LoRA** = huấn luyện thêm trên 1–30 phút giọng của bạn để giống hơn. |
| **VRAM** | Bộ nhớ của card đồ họa (GPU). Đây là yếu tố quyết định chạy được model nào. |
| **fps** | Số khung hình/giây. Phần lớn model lip-sync được train ở **25 fps**. |
| **Face restore (GFPGAN / CodeFormer)** | Làm nét lại khuôn mặt sau lip-sync. |
| **ComfyUI / Pinokio / Wan2GP** | Giao diện kéo thả (ComfyUI), trình cài một cú nhấp (Pinokio), web UI gộp nhiều model video, tối ưu cho VRAM thấp (Wan2GP). |
| **LSE-C / LSE-D (SyncNet)** | Chỉ số đo độ khớp môi: LSE-C càng cao càng tốt, LSE-D càng thấp càng tốt. |

**Nên chọn loại nào?** 💭 Với creator muốn video **giống người thật nhất**, hãy chọn **loại (a) V2V trên clip thật 10–30 giây của chính bạn**. Lý do: da, tóc, ánh sáng, quần áo, nháy mắt và cử động đầu đều là thật, model chỉ phải sửa vùng miệng nên ít chỗ để "lộ AI". Loại (b) từ 1 ảnh phải "bịa" toàn bộ chuyển động, dễ bị trôi màu, mặt khác dần, chuyển động cứng hoặc quá đà. Loại (b) chỉ nên dùng khi không có video, hoặc làm avatar/nhân vật.

---

## 2. Vì sao lần trước môi không khớp (chẩn đoán)

Chưa có file của lần trước, nên dưới đây là các nguyên nhân hay gặp nhất, xếp theo khả năng xảy ra:

1. **Chọn sai tool (khả năng cao nhất).** ✅ Wav2Lip chỉ vẽ mặt ở **96×96 px** (`hparams.py: img_size=96`) và có issue "Blurry region around the Lips" (#326, #364). README của chính Wav2Lip ghi bản open-source *"trained on faces at a lower resolution"* và giới hạn **non-commercial**. ✅ SadTalker có commit cuối **2023-10-11** (đã ngừng phát triển) và có issue "Audio and video out of sync" (#795, #589). 💭 Cả hai đều thua xa LatentSync 1.6 (512×512) và MuseTalk 1.5.
2. **Audio encoder không "hiểu" tiếng Việt.** ✅ Nhiều model I2V dùng `wav2vec2-base-960h`, model chỉ train trên tiếng Anh LibriSpeech (Hallo2/3, FantasyTalking, OmniAvatar, StableAvatar, EchoMimic v2); một số khác dùng `chinese-wav2vec2-base` (InfiniteTalk, SoulX). 💭 Encoder dựa trên **Whisper** (train đa ngôn ngữ, có tiếng Việt) như LatentSync, MuseTalk, Sonic, HunyuanVideo-Avatar, HuMo, LongCat-Avatar-1.5 nhiều khả năng khớp tiếng Việt tốt hơn. Đây là giả thuyết và cần test.
3. **Sai fps hoặc video điện thoại có fps thay đổi (VFR).** ✅ LatentSync train ở 25 fps (`video_fps: 25`) và tự chuyển sang 25 fps khi đọc video. ✅ MuseTalk khuyến nghị *"input videos with 25fps"*. 💭 Video quay bằng điện thoại thường là VFR, nên audio bị trôi dần khỏi hình. Hãy chuyển sang CFR 25 fps trước khi xử lý.
4. **Audio TTS bẩn.** Có khoảng lặng dài ở đầu/cuối, tiếng thở, nhạc nền, hoặc tiếng lạ ở cuối câu. ✅ viXTTS tự ghi hạn chế: *"input sentences under 10 words… odd trailing sounds"*. Với audio như vậy, miệng sẽ mấp máy trong lúc im lặng hoặc nhép sai.
5. **Audio quá dài trong một lần chạy.** ✅ Issue LatentSync #101 và #132: *"lips glitches after every 30–32 seconds"*. Cách tránh: cắt audio thành đoạn ≤ 25 giây rồi ghép lại.
6. **Khuôn mặt trong khung không phù hợp.** Mặt quá nhỏ (quay toàn thân), quay nghiêng hoặc góc profile, tay hoặc micro che miệng, ảnh chân dung bị cắt sát cằm. Dùng I2V với ảnh nghiêng gần như chắc chắn hỏng. ✅ MuseTalk issue #404 "1080p视频 嘴型问题" (lỗi khẩu hình với video 1080p).
7. **Tham số mặc định quá thấp.** ✅ LatentSync: `inference_steps` 20–50 (cao hơn thì nét hơn), `guidance_scale` 1.0–3.0 (cao hơn thì khớp môi hơn nhưng dễ méo). ✅ InfiniteTalk: *"Audio CFG works optimally between 3–5"*. ✅ MuseTalk: chạy `--use_float16` làm giảm chất lượng.
8. **Lỗi khi ghép audio vào video bằng ffmpeg** (lệch offset, `-shortest` cắt mất đoạn). 💭 Khả năng thấp hơn, nhưng nên kiểm tra.

---

## 3. Bảng repo lip-sync / talking head

Loại: **a** = video→video (sửa miệng trên video thật), **b** = ảnh→video. Cột "Encoder" cho biết model nghe audio bằng gì (liên quan tiếng Việt, xem mục 2.2). Sao và license ✅; điểm 1–10 là 💭 (đánh giá cho mục tiêu *người thật, ngồi nói tiếng Việt, khớp môi chính xác*).

| Repo | ★ | Commit cuối | Loại | VRAM (README) | Encoder (tiếng Việt) | License (thương mại?) | Điểm | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| [bytedance/LatentSync](https://github.com/bytedance/LatentSync) (v1.6) | 6.2k | 2025-06-20 | **a** | **8 GB (v1.5) / 18 GB (v1.6)** | Whisper ✔ | Apache-2.0 ✔ (phụ thuộc `insightface==0.7.3`, model InsightFace có điều khoản riêng) | **9** | v1.6 train ở 512×512 *"to mitigate the blurriness"*. Tự đổi sang 25 fps, tự lặp video nếu audio dài hơn. Có node ComfyUI ([ShmuelRonen/ComfyUI-LatentSyncWrapper](https://github.com/ShmuelRonen/ComfyUI-LatentSyncWrapper), 962★) và bản chạy trên Replicate (`lucataco/latentsync`). Lỗi đã biết: glitch mỗi ~30 giây (#101, #132). |
| [TMElyralab/MuseTalk](https://github.com/TMElyralab/MuseTalk) (v1.5) | 6.8k | 2025-09-26 | **a** | Chạy được trên **4 GB** (RTX 3050 Ti: 8 giây video mất ~5 phút ở fp16) | Whisper-tiny ✔ | MIT, **model dùng thương mại được** ✔ | **7.5** | Realtime 30fps+ (V100). Vùng mặt 256×256. README tự nhận hạn chế: *jitter*, *identity (râu, màu môi)*. Nhiều issue về rung miệng (#98, #190, #389). |
| [MeiGen-AI/InfiniteTalk](https://github.com/MeiGen-AI/InfiniteTalk) | 8.1k | 2026-05-22 | **a + b** | Model 14B; có chế độ low-VRAM; chạy qua Wan2GP | chinese-wav2vec2-base | Apache-2.0 ✔ | **8.5** | V2V "sparse-frame dubbing": khớp môi kèm đầu, thân và biểu cảm theo audio, ra 480p/720p. README cảnh báo: camera *"not identically"*, trôi màu sau ~1 phút. Có issue "Chinese audio lip mismatch" (#26) và "video input → output almost static" (#38). |
| [meituan-longcat/LongCat-Video](https://github.com/meituan-longcat/LongCat-Video) (Avatar 1.5) | 9.2k | 2026-05-27 | b (+ video continuation) | 13.6B, có `--use_int8` | **Whisper-large-v3** ✔ | MIT ✔ | **8** | Bản 1.5 (05/2026) đổi sang Whisper-large *"for more accurate lip synchronization"*. Có sẵn trong Wan2GP. Còn mới, ít đánh giá độc lập. |
| [Tencent-Hunyuan/HunyuanVideo-Avatar](https://github.com/Tencent-Hunyuan/HunyuanVideo-Avatar) | 2.2k | 2025-12-16 | b | Tối thiểu 24 GB (chậm), khuyến nghị 96 GB; **10 GB qua Wan2GP** | Whisper-tiny ✔ | Tencent Hunyuan Community (không áp dụng EU/UK/Hàn; VN dùng được) | 7 | Chuyển động và cảm xúc tốt, nhưng nặng. |
| [jixiaozhong/Sonic](https://github.com/jixiaozhong/Sonic) | 3.3k | 2026-01-08 | b | n/a | Whisper-tiny ✔ | **CC BY-NC-SA 4.0 ✘** (cấm thương mại) | 6.5 | Ảnh→video, khớp môi tốt (💭), nhưng không được dùng kiếm tiền. |
| [Phantom-video/HuMo](https://github.com/Phantom-video/HuMo) | 1.3k | 2026-01-26 | b | n/a (Wan-based) | Whisper-large-v3 ✔ | Apache-2.0 ✔ | 6.5 | Đa điều kiện (ảnh, text, audio). |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) (S2V-14B) | 18.1k | 2026-09-21 | b | **80 GB** (có offload) | wav2vec2-xlsr-53-english | Apache-2.0 ✔ | 6.5 | Thiên về video "điện ảnh" hơn talking head chính xác. |
| [antgroup/echomimic_v3](https://github.com/antgroup/echomimic_v3) (v2: [4.7k](https://github.com/antgroup/echomimic_v2)) | 1.1k | 2026-03-18 | b | **12 GB** | chinese-wav2vec2 / wav2vec2-960h | Apache-2.0 ✔ | 6 | v2 làm nửa thân người, có ComfyUI ([smthemex](https://github.com/smthemex/ComfyUI_EchoMimic)). |
| [Fantasy-AMAP/fantasy-talking](https://github.com/Fantasy-AMAP/fantasy-talking) | 1.6k | 2025-08-20 | b | 40 GB / 20 GB / 5 GB (càng ít VRAM càng chậm) | wav2vec2-960h (EN) | Apache-2.0 ✔ | 6 | Dựa trên Wan2.1-14B. |
| [Omni-Avatar/OmniAvatar](https://github.com/Omni-Avatar/OmniAvatar) | 1.9k | 2025-08-06 | b | có bảng VRAM trong README | wav2vec2-960h (EN) | Apache-2.0 ✔ | 6 | |
| [Francis-Rings/StableAvatar](https://github.com/Francis-Rings/StableAvatar) | 1.3k | 2026-09-25 | b | ~3 GB (offload, rất chậm) | wav2vec2-960h (EN) | MIT ✔ | 6 | Video dài vô hạn, 480p/512. |
| [MeiGen-AI/MultiTalk](https://github.com/MeiGen-AI/MultiTalk) | 3.0k | 2026-05-22 | b | 8 GB qua Wan2GP | chinese-wav2vec2 | Apache-2.0 ✔ | 5.5 | Đã có bản kế nhiệm là InfiniteTalk. |
| [fudan-generative-vision/hallo2](https://github.com/fudan-generative-vision/hallo2) / [hallo3](https://github.com/fudan-generative-vision/hallo3) | 3.75k / 1.4k | 2025-02 / 2025-03 | b | n/a (hallo3 dựa trên CogVideoX, nặng) | wav2vec2-960h (EN) | MIT ✔ | 5 | Thế hệ cũ, gần như không còn cập nhật. |
| [antgroup/ditto-talkinghead](https://github.com/antgroup/ditto-talkinghead) | 0.9k | 2025-11-12 | b | n/a (realtime, có TensorRT) | HuBERT | Apache-2.0 ✔ | 5.5 | Realtime, chỉ chuyển động đầu/mặt. |
| [Alibaba-Quark/LiveAvatar](https://github.com/Alibaba-Quark/LiveAvatar) | 2.5k | 2026-08-24 | b | 80 GB (FP8: 48 GB) | wav2vec2-xlsr-en | Apache-2.0 ✔ | 5 | Thiết kế cho streaming realtime, quá nặng với creator. |
| [Soul-AILab/SoulX-FlashTalk](https://github.com/Soul-AILab/SoulX-FlashTalk) | 1.5k | 2026-07-30 | b | >64 GB (offload: 40 GB) | chinese-wav2vec2 | Apache-2.0 | 4 | Cần server nhiều GPU. |
| [Rudrabha/Wav2Lip](https://github.com/Rudrabha/Wav2Lip) | 13.3k | 2025-06-22 | a | thấp | mel (không cần encoder) | **Chỉ non-commercial ✘** (không có file LICENSE) | 3.5 | Mặt 96×96, vùng miệng mờ. Tác giả đã chuyển sang làm Sync.so (bản thương mại). |
| [OpenTalker/SadTalker](https://github.com/OpenTalker/SadTalker) | 14.1k | **2023-10-11** | b | thấp | — | Apache-2.0 (+ thành phần bên thứ 3) | 3 | Đã bỏ dở. Môi yếu, mặt "đơ". 💭 Rất có thể lần trước đã dùng tool này. |
| [jdh-algo/JoyHallo](https://github.com/jdh-algo/JoyHallo) | 0.5k | 2024-11-21 | b | n/a | (Mandarin) | MIT | 3.5 | Chỉ tối ưu cho tiếng Quan Thoại. |
| [KwaiVGI/LivePortrait](https://github.com/KwaiVGI/LivePortrait) | n/a | 2026-06-02 | (chuyển biểu cảm) | thấp | **không dùng audio** | MIT (InsightFace riêng) | N/A | Không phải lip-sync. Chỉ dùng để "mượn" biểu cảm hoặc chuyển động đầu từ một video khác. |
| [GVCLab/PersonaLive](https://github.com/GVCLab/PersonaLive) | 4.0k | 2026-08-28 | (driving video) | 12 GB | không dùng audio | Apache-2.0 | N/A | Điều khiển bằng video/webcam, không phải audio. |

**Công cụ hỗ trợ (✅):** [deepbeepmeep/Wan2GP](https://github.com/deepbeepmeep/Wan2GP) (commit 2026-10-19, *"run select models with as little as 6 GB"*, có sẵn InfiniteTalk, LongCat Avatar 1.5, Hunyuan Avatar, MultiTalk và cả TTS như IndexTTS2, Qwen3-TTS, OmniVoice, Chatterbox; cài được bằng Pinokio, nhưng README khuyên dùng script cộng đồng *wan2gp* của **Morpheus**; license riêng "WanGP Community License 2.0"). [kijai/ComfyUI-WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper) (6.7k★, node ComfyUI cho InfiniteTalk/MultiTalk/FantasyTalking/HuMo...). [TencentARC/GFPGAN](https://github.com/TencentARC/GFPGAN) (37.7k★, license Tencent/Apache-style). [sczhou/CodeFormer](https://github.com/sczhou/CodeFormer) (18.2k★, **S-Lab License: non-commercial ✘**).

Các hệ thống "người ảo realtime" như [lipku/LiveTalking](https://github.com/lipku/LiveTalking) (10k★) và [Kedreamix/Linly-Talker](https://github.com/Kedreamix/Linly-Talker) (3.5k★) chỉ ghép lại Wav2Lip/MuseTalk/ER-NeRF để chạy realtime. Chúng không cho chất lượng offline tốt hơn, nên không đưa vào khuyến nghị.

---

## 4. Bảng repo voice clone (tiếng Việt)

Sao, license, ngôn ngữ, số giây mẫu: ✅ theo README/LICENSE. Điểm: 💭. Lưu ý: **license code và license weights có thể khác nhau.**

| Repo | ★ | Commit cuối | Tiếng Việt chính thức? | Giây giọng mẫu | License (thương mại?) | Điểm | Ghi chú |
|---|---|---|---|---|---|---|---|
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) (VoxCPM2, 2B) | 39.6k | 2026-10-08 | **✔ Có** (trong 30 ngôn ngữ) | clip ngắn; chế độ "Ultimate Cloning" cần audio + transcript | **Apache-2.0, weights thương mại được ✔** | **8.5** | 48 kHz, có giao diện fine-tune LoRA (`lora_ft_webui.py`), rất hợp với 1–3 phút giọng của bạn. 💭 Ứng viên số 1 về độ tự nhiên, cần nghe thử tiếng Việt. |
| [pnnbao97/VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS) (v3 Turbo) | 2.9k | 2026-10-19 | **✔ Chuyên tiếng Việt** (+ Anh) | **3–8 giây**, tự khử nhiễu | Apache-2.0 ✔ | **8.5** | Train trên 10.000+ giờ dữ liệu, 48 kHz, **chạy được trên CPU** (RTF ≈ 0.5), có LoRA fine-tune, có bộ cài Windows. Bản v4 (giống giọng hơn) là bản đóng, chỉ có qua API vieneu.io. |
| [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice) | 15.3k | 2026-08-24 | ✔ Có (600+ ngôn ngữ; `vi` có ~8.482 giờ dữ liệu) | **3–10 giây** | Apache-2.0 ✔ | 7.5 | Có trong Wan2GP. Clone khác ngôn ngữ sẽ mang theo accent của giọng mẫu, nên hãy dùng giọng mẫu tiếng Việt. |
| [nguyenvulebinh/VietVoice-TTS](https://github.com/nguyenvulebinh/VietVoice-TTS) | 106 | 2025-07-14 | ✔ Chuyên tiếng Việt | n/a | MIT (code) | 6.5 | Có Colab, nhiều giọng vùng miền. Ít người dùng. |
| [tronghieuit/v-tts](https://github.com/tronghieuit/v-tts) | 383 | 2026-07-23 | ✔ Chuyên tiếng Việt | 3–10 giây | **CC BY-NC 4.0 ✘** | 6 | Chỉ 74.8M tham số, chạy CPU, có file .exe cho Windows. Nhẹ nhưng 💭 kém tự nhiên hơn các model lớn. |
| [thinhlpg/vixtts-demo](https://github.com/thinhlpg/vixtts-demo) (viXTTS) | 519 | 2025-04-04 | ✔ (fine-tune XTTS-v2) | ~6–10 giây | Code MPL-2.0; **weights XTTS là non-commercial ✘** | 5.5 | Tác giả ghi *"not being actively maintained"* và câu < 10 từ hay có *"odd trailing sounds"*. 💭 Có thể chính là nguyên nhân gây audio bẩn ở lần trước. |
| [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS) | 15.4k | 2026-10-14 | ✘ Bản gốc chỉ zh/en (danh sách bản cộng đồng trong `SHARED.md` không có tiếng Việt); có bản fine-tune tiếng Việt của cộng đồng trên HF | **< 12 giây** | Code MIT; **weights CC-BY-NC ✘** | 6 | Bản Việt cộng đồng (ví dụ [2tocom/F5-TTS-Vietnamese-Google-Colab](https://github.com/2tocom/F5-TTS-Vietnamese-Google-Colab), 10★) chưa được kiểm chứng. |
| [fishaudio/fish-speech](https://github.com/fishaudio/fish-speech) (S2-Pro / Drama 3) | 33.3k | 2026-10-14 | ? *"about a hundred languages"*, README không ghi rõ có tiếng Việt | **10–30 giây** | Fish Audio Community License: miễn phí khi doanh thu dưới ngưỡng; cấm làm dịch vụ hosted | 6.5 | Chất lượng benchmark top đầu (zh/en). Tiếng Việt cần test. |
| [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox) | 27.1k | 2026-07-21 | **✘** (danh sách 23 ngôn ngữ không có tiếng Việt) | ~5–10 giây | MIT (có watermark PerTh) | 3 | |
| [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice) (v3) | n/a | 2026-05-26 | **✘** (9 ngôn ngữ, không có tiếng Việt) | 3–10 giây | Apache-2.0 | 3 | |
| [index-tts/index-tts](https://github.com/index-tts/index-tts) (2.5) | 24.6k | 2026-09-30 | **✘** (zh/en/ja/es/ar) | vài giây | bilibili Model License | 2 | |
| [QwenLM/Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS) | 13.9k | 2026-03-17 | **✘** (10 ngôn ngữ, không có tiếng Việt) | 3 giây | Apache-2.0 | 2 | |
| [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) | 63.3k | 2026-10-19 | **✘** (zh/en/ja/ko/yue) | 5 giây zero-shot / 1 phút fine-tune | MIT | 2.5 | Phải tự train lại phần text tiếng Việt, không phù hợp với người không code. |
| [idiap/coqui-ai-TTS](https://github.com/idiap/coqui-ai-TTS) (XTTS-v2) / [coqui-ai/TTS](https://github.com/coqui-ai/TTS) (46k★, commit cuối 2024-02) | — | 2026-10-18 | ✘ (17 ngôn ngữ, không có tiếng Việt) | 6 giây | Code MPL; weights XTTS non-commercial | 2 | Chỉ có giá trị vì là nền của viXTTS. |
| [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice), [boson-ai/higgs-audio](https://github.com/boson-ai/higgs-audio), [zai-org/GLM-TTS](https://github.com/zai-org/GLM-TTS), [SparkAudio/Spark-TTS](https://github.com/SparkAudio/Spark-TTS) | 55k / 8.4k / 1.1k / 11k | — | ✘ / "100+ ngôn ngữ" (higgs, không ghi rõ tiếng Việt) / ✘ / ✘ | — | MIT / Apache / Apache / Apache | ≤ 3 | Không nên dùng cho tiếng Việt. |
| [RVC-Project/RVC-WebUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) | 38.9k | 2026-08-04 | (đổi giọng, không phụ thuộc ngôn ngữ) | ≤ 10 phút để train | MIT | 6 (hỗ trợ) | Mẹo: tạo audio tiếng Việt bằng VieNeu/VoxCPM, rồi dùng RVC đổi âm sắc cho giống bạn hơn. |

---

## 5. Pipeline đề xuất

### Chuẩn bị (chung cho cả 2 lựa chọn)
- **Giọng:** thu **1–3 phút** trong phòng yên tĩnh, ít vang, micro (hoặc điện thoại) cách miệng 15–20 cm, không nhạc nền, xuất WAV 44.1/48 kHz. Đọc tự nhiên đúng phong cách làm video, kèm **transcript chính xác**. Cắt riêng 1 đoạn **6–10 giây** sạch nhất để làm giọng mẫu.
- **Video gốc:** quay **2–3 clip, mỗi clip 15–30 giây**, 1080p. Mặt chính diện (lệch tối đa khoảng 20°), ánh sáng đều, mặt chiếm khoảng 1/4–1/3 chiều cao khung. Không để tay hay micro che miệng, máy quay cố định, ngồi nói tự nhiên (đầu có cử động nhẹ, có nháy mắt).
- **Chuẩn hóa trước khi lip-sync** (bằng ffmpeg hoặc CapCut):
  - Video: chuyển sang **CFR 25 fps**.
  - Audio: cắt khoảng lặng đầu/cuối, chuẩn hóa âm lượng khoảng −16 LUFS, **chia đoạn ≤ 25 giây** (tránh lỗi 30 giây của LatentSync).

### Lựa chọn 1: CHẤT LƯỢNG CAO NHẤT (open-source)
1. **Giọng:** **VoxCPM2** (fine-tune LoRA bằng 1–3 phút giọng) **và** **VieNeu-TTS v3 Turbo** (clone 3–8 giây, có LoRA). Cho mỗi model đọc cùng 5 câu mẫu, nghe mù rồi chọn bản hay hơn. Phương án 3: OmniVoice. Nếu âm sắc chưa giống, chạy thêm **RVC** (train bằng 3–10 phút giọng của bạn).
2. **Lip-sync:** **LatentSync 1.6** trên clip thật, `inference_steps` 40–50, `guidance_scale` khoảng 1.5–2.0 (tăng dần nếu môi chưa khớp). Nếu audio dài hơn clip, LatentSync tự lặp clip.
   - Nếu muốn **đầu và thân cử động theo giọng** (sinh động hơn), chạy thêm **InfiniteTalk V2V 720p** (audio CFG 3–5) rồi so sánh với LatentSync. Hoặc thử **LongCat-Video-Avatar 1.5**, model dùng encoder Whisper-large nên 💭 có thể hợp tiếng Việt hơn.
3. **(Tùy chọn) Hậu kỳ:** dùng **GFPGAN** làm nét mặt ở mức nhẹ (weight 0.3–0.5). Không dùng CodeFormer cho video kiếm tiền vì license non-commercial. Có thể upscale nhẹ (Real-ESRGAN) và chỉnh màu trong CapCut/Premiere.
4. **Chạy ở đâu:** **RunPod** (thuê GPU theo giờ, có template ComfyUI) với **RTX 4090 24 GB** (đủ cho LatentSync 1.6 cần 18 GB; giá thường khoảng $0.4–0.7/giờ) hoặc **L40S/A6000 48 GB** cho InfiniteTalk/LongCat 720p (khoảng $0.8–1.2/giờ). Giá là tham khảo, cần kiểm tra lại. 💭 Ước tính một video 60 giây mất khoảng 10–30 phút GPU, tức chi phí dưới $1 cho mỗi video, chưa tính thời gian cài đặt lần đầu.

### Lựa chọn 2: DỄ NHẤT / RẺ NHẤT (không cần code)
1. **Giọng:** **VieNeu-TTS**: tải bộ cài Windows ở vieneu.io (chạy được trên CPU, không cần GPU) hoặc dùng Colab trong README. Đưa đoạn 6–10 giây giọng mẫu, gõ kịch bản, xuất WAV. Phương án khác: ElevenLabs Starter (~$5/tháng, có Instant Voice Clone).
2. **Lip-sync, chọn 1 trong 3 cách:**
   - (a) **Replicate `lucataco/latentsync`** (link có ngay trong README LatentSync): upload video + audio trên web, trả tiền theo mỗi lần chạy, không cần cài gì. Đây là cách dễ nhất.
   - (b) **Pinokio → Wan2GP** (script cộng đồng của Morpheus) nếu máy có card NVIDIA ≥ 8–12 GB: chọn InfiniteTalk, nạp video + audio.
   - (c) **Google Colab:** gói miễn phí (T4 16 GB) chạy được LatentSync **1.5** (8 GB); bản **1.6** (18 GB) cần Colab Pro với GPU L4/A100.
3. Ghép phụ đề và nhạc trong CapCut. **Lưu ý:** chỉ chèn nhạc *sau* khi đã lip-sync xong; audio đưa vào lip-sync phải sạch, không có nhạc.

---

## 6. Dịch vụ thương mại để so sánh

Giá dưới đây lấy từ tìm kiếm web (nguồn bên thứ 3, có chỗ mâu thuẫn), cần kiểm tra lại trên trang chính thức.

| Dịch vụ | Làm gì | Tiếng Việt | Giá tham khảo | Nhận xét 💭 |
|---|---|---|---|---|
| **HeyGen** (Avatar IV/V, Video Translate) | Quay clip để tạo avatar chính mình, clone giọng, dịch video có lip-sync | Có (175+ ngôn ngữ ở gói trả phí, theo nguồn bên thứ 3) | Creator ~$29/tháng, Business ~$149/tháng; Avatar IV tốn ~20 credit/phút | Dễ nhất và đồng đều nhất. Giọng Việt clone cần nghe thử. |
| **ElevenLabs** (giọng) | Instant/Professional Voice Clone | Có tiếng Việt trong họ model v4 (theo docs hiện tại; một trang cũ không liệt kê) | Starter ~$5 (IVC), Creator ~$22 (PVC) | Giọng thương mại tốt nhất. Có thể kết hợp với lip-sync open-source. |
| **Sync.so** (lipsync-2 / -2-pro) | Lip-sync V2V bản thương mại | Không phụ thuộc ngôn ngữ | Trả theo phút, qua API/web | Do chính tác giả Wav2Lip làm. README Wav2Lip ghi *"much higher quality than the old open source model"*. |
| **Hedra** (Character-3) | Ảnh thành talking head | Không phụ thuộc ngôn ngữ (audio tự đưa vào) | Gói tháng | Mạnh ở loại (b), từ 1 ảnh. |
| **Captions (Mirage)** | Avatar và AI creator, sửa lời có lip-sync | Cần kiểm tra | Gói tháng | Hướng tới creator mạng xã hội. |
| **Kling AI Lip Sync / Avatar**, **Akool**, **D-ID**, **Synthesia** | Lip-sync và avatar | Đa số có tiếng Việt | Gói tháng / credit | Đáng thử như phương án dự phòng. |
| **VieNeu v4 API**, **Vbee**, **FPT.AI** (giọng Việt) | TTS và clone giọng tiếng Việt | Chuyên tiếng Việt | API / gói | Người Việt bản địa đánh giá tự nhiên hơn (💭 cần nghe thử). |

---

## 7. Kế hoạch test thật (bước tiếp theo)

**Cần có:**
1. **GPU:** tối thiểu 1× RTX 4090 24 GB (cho LatentSync 1.6, MuseTalk, VoxCPM2, VieNeu); để test InfiniteTalk/LongCat ở 720p thì cần 48–80 GB (L40S/A100). Môi trường hiện tại **không có GPU**.
2. **Mở mạng:** `huggingface.co` (gần như tất cả weights đều ở đây), `modelscope.cn` (nguồn dự phòng), Google Drive (checkpoint Wav2Lip), và tải release GitHub.
3. **File của bạn:** (a) 1–3 phút giọng WAV kèm transcript; (b) 2–3 clip mặt chính diện, 15–30 giây, 1080p; (c) 1 ảnh chân dung chính diện (để test loại b); (d) 3 kịch bản tiếng Việt dài khoảng 10 giây, 30 giây và 60 giây (có câu ngắn, có số, có tên riêng).

**Ma trận test:**
- **Giọng:** VoxCPM2 (zero-shot và LoRA), VieNeu v3 Turbo (zero-shot và LoRA), OmniVoice, (+ RVC), so sánh với ElevenLabs. Đo bằng:
  - **WER** (độ đọc đúng chữ) bằng Whisper-large-v3 hoặc PhoWhisper,
  - **độ giống giọng** (speaker similarity, ECAPA),
  - **nghe mù** chấm điểm 1–5 (bạn và 2–3 người quen).
- **Lip-sync:** LatentSync 1.6, MuseTalk 1.5, InfiniteTalk V2V, LongCat-Avatar 1.5, (đối chứng: Wav2Lip, SadTalker), và loại (b) với Sonic/HunyuanAvatar từ ảnh. Đo bằng:
  - **LSE-C/LSE-D** bằng script có sẵn trong `LatentSync/eval/eval_sync_conf.sh` (SyncNet),
  - kiểm tra bằng mắt: răng, môi, viền mặt, độ rung, trôi màu, các mốc 30 giây.
- **Kết quả bàn giao:** thư mục `lipsync-voice/test/` chứa từng cặp video, bảng điểm, và pipeline cuối cùng có kèm lệnh hoặc workflow ComfyUI để bạn bấm chạy lại.

---
*Nguồn dữ liệu: GitHub search (sao, ngày 2026-10-21), `git clone --depth 1` (commit cuối, README, LICENSE), GitHub issue search; giá thương mại lấy từ tìm kiếm web ([arcade.software/heygen-pricing](https://www.arcade.software/post/heygen-pricing), [eesel.ai/heygen-pricing](https://eesel.ai/blog/heygen-pricing), [ElevenLabs PVC languages](https://elevenlabs.io/docs/help-center/product/voice-customization/voice-cloning/what-languages-are-supported-with-professional-voice-cloning-pvc), [ElevenLabs voice cloning](https://elevenlabs.io/voice-cloning)).*
