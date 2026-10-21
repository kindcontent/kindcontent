#!/bin/bash
# usage: run.sh src.d2 outname [d2 flags...]
W=/tmp/claude-0/-home-user-kindcontent/7da89d85-3d54-54c3-b9f1-3c1d3608d6ae/scratchpad/work-text
OUT=/home/user/kindcontent/diagram-tools/03-d2/styles
src=$1; name=$2; shift 2
$W/go/bin/d2 "$@" "$src" "svg/$name.svg" >/dev/null 2>err.txt || { echo "FAIL $name: $(tail -2 err.txt)"; exit 1; }
node $W/svg2png.js "svg/$name.svg" "raw/$name.png" 1600 >/dev/null && node $W/fitpng.js "raw/$name.png" "$OUT/$name.png"
