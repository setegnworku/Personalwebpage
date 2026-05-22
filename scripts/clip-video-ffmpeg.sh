#!/usr/bin/env bash
# Clip 00:00:00 → 00:05:20 from a source video (Video 4 segment).
# Usage:
#   ./scripts/clip-video-ffmpeg.sh /path/to/source.mp4
# Requires: ffmpeg installed (sudo apt install ffmpeg / brew install ffmpeg)

set -euo pipefail

INPUT="${1:?Usage: $0 /path/to/source.mp4}"
OUT_DIR="$(dirname "$0")/../public/videos"
OUT_FILE="${OUT_DIR}/video-04_00-00_to_05-20.mp4"

mkdir -p "$OUT_DIR"

ffmpeg -y -i "$INPUT" -ss 00:00:00 -to 00:05:20 -c copy "$OUT_FILE" 2>/dev/null || \
ffmpeg -y -i "$INPUT" -ss 00:00:00 -to 00:05:20 -c:v libx264 -c:a aac "$OUT_FILE"

echo "Wrote: $OUT_FILE"
echo "URL after deploy: https://setegnworku.github.io/Personalwebpage/videos/video-04_00-00_to_05-20.mp4"
