# scripts/

## remove_bg.py — 透過処理スクリプト

NPC・ボスキャラクターの白背景を AI（rembg / isnet-anime モデル）で自動的に透過処理します。

### 前提

- Python 3.10 以上
- pip が使える環境

### セットアップ（初回のみ）

```bash
# GPU あり（CUDA 環境 — 高速）
pip install "rembg[gpu]" pillow

# GPU なし（CPU のみ — 低速だが動作する）
pip install rembg pillow
```

> 初回実行時に `isnet-anime` モデル（約 176 MB）が自動ダウンロードされます。

---

### 使い方

```bash
# プロジェクトルートで実行
python3 scripts/remove_bg.py
```

処理対象フォルダ：

| フォルダ | 内容 |
|---|---|
| `assets/npcs/` | NPC 6 キャラクター（fukurou, tanuki, guildmaster, takozou, rina, fukami） |
| `assets/story/boss/` | ボス 3 枚（yami_normal, yami_damaged, yami_defeated） |

ストーリー背景画像（`assets/story/prologue/` 等）は透過不要なので対象外。

---

### オプション

```bash
# NPC だけ処理
python3 scripts/remove_bg.py --only npcs

# ボスだけ処理
python3 scripts/remove_bg.py --only boss

# やり直し — バックアップ(*_orig.png)からオリジナルを復元
python3 scripts/remove_bg.py --restore
```

---

### 出力

- 処理後の PNG は元のパスに **上書き保存**（アルファチャンネル付き）
- オリジナルは `*_orig.png` として同フォルダに自動バックアップ

```
assets/npcs/
  fukurou.png       ← 透過済み（上書き）
  fukurou_orig.png  ← オリジナルバックアップ
  tanuki.png
  tanuki_orig.png
  ...
```

---

### 透過が上手くいかない場合

1. `--restore` でオリジナルを復元
2. 画像生成ツールで「白背景（#FFFFFF）」を確認
3. 再生成した画像で再実行

または手動で GIMP / Photoshop の「色域選択 → 削除」で対応。
