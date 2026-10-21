import sys, os, glob, io
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for f in sorted(glob.glob(src + "/*.png")):
    im = Image.open(f).convert("RGB")
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    out = os.path.join(dst, os.path.basename(f))
    buf = io.BytesIO(); im.save(buf, "PNG", optimize=True)
    mode = "rgb"
    if buf.tell() > 350_000:
        for colors in (256, 192, 128):
            q = im.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
            buf = io.BytesIO(); q.save(buf, "PNG", optimize=True); mode = f"q{colors}"
            if buf.tell() <= 350_000: break
    open(out, "wb").write(buf.getvalue())
    print(f"{os.path.basename(f):40s} {im.width}x{im.height} {buf.tell()//1024}KB {mode}")
