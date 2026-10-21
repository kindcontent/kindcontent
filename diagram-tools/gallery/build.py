"""Copy style renders listed in each diagram-tools/*/styles/manifest.json into the gallery
folder and write styles.json for the page plus batches of published paths."""
import json, os, shutil, sys

SRC = "/home/user/kindcontent/diagram-tools"
OUT = os.path.dirname(os.path.abspath(__file__))
TOOLS = [  # (folder, gallery id, display name)
    ("01-markmap", "markmap", "markmap"),
    ("02-mermaid", "mermaid", "Mermaid"),
    ("03-d2", "d2", "D2"),
    ("04-excalidraw", "excalidraw", "Excalidraw"),
    ("05-drawnix", "drawnix", "Drawnix"),
    ("06-antv-infographic", "antv", "AntV Infographic"),
    ("07-next-ai-draw-io", "drawio", "draw.io"),
    ("08-archify-skill", "archify", "archify"),
    ("09-diagram-design-skill", "diagram-design", "diagram-design"),
    ("10-fireworks-tech-graph-skill", "fireworks", "fireworks-tech-graph"),
]

shutil.rmtree(os.path.join(OUT, "s"), ignore_errors=True)
data, paths, missing = [], [], []
for folder, tid, name in TOOLS:
    man = os.path.join(SRC, folder, "styles", "manifest.json")
    if not os.path.exists(man):
        missing.append(folder)
        continue
    items = []
    for it in json.load(open(man)):
        src = os.path.join(SRC, folder, "styles", it["file"])
        if not os.path.exists(src):
            missing.append(f"{folder}/{it['file']}")
            continue
        rel = f"s/{tid}/{os.path.basename(it['file'])}"
        os.makedirs(os.path.dirname(os.path.join(OUT, rel)), exist_ok=True)
        shutil.copyfile(src, os.path.join(OUT, rel))
        paths.append(rel)
        items.append({k: it.get(k, "") for k in ("name", "how", "note", "group")} | {"src": rel})
    data.append({"id": tid, "name": name, "items": items})

json.dump(data, open(os.path.join(OUT, "styles.json"), "w"), ensure_ascii=False)
paths.append("styles.json")
for i in range(0, len(paths), 240):
    json.dump(paths[i:i + 240], open(os.path.join(OUT, f"batch{i // 240}.json"), "w"))
size = sum(os.path.getsize(os.path.join(OUT, p)) for p in paths)
print(f"{len(paths)} files, {size / 1e6:.1f} MB, batches={(len(paths) + 239) // 240}")
print("missing:", missing)
for t in data:
    print(t["id"], len(t["items"]))
