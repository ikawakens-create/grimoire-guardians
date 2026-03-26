#!/bin/bash
# session-start.sh - Grimoire Guardians セットアップフック
# Claude Code Web 版のセッション開始時に自動実行される
# ローカル環境では何もしない（CLAUDE_CODE_REMOTE チェック）

set -euo pipefail

# Web 版（リモート環境）のみ実行
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "=== Grimoire Guardians セットアップ開始 ==="

# ── 透過処理用パッケージ ──────────────────────
# rembg: AI背景除去（isnet-anime モデル使用）
# pillow: 画像処理
echo "📦 rembg[cpu] / pillow をインストール中..."
pip install --quiet "rembg[cpu]" pillow

echo "✅ セットアップ完了"
