#!/usr/bin/env python3
"""
remove_bg.py - Grimoire Guardians 透過処理スクリプト
=====================================================
NPC・ボスキャラクターの白背景を AI (rembg isnet-anime) で透過処理する。

使い方:
    python3 scripts/remove_bg.py

    # 特定フォルダのみ処理:
    python3 scripts/remove_bg.py --only npcs

    # バックアップを復元（やり直したいとき）:
    python3 scripts/remove_bg.py --restore

必要なパッケージ（初回のみ）:
    pip install rembg[gpu] pillow   # GPU あり（推奨・高速）
    pip install rembg pillow        # GPU なし（CPU のみ）

初回実行時: isnet-anime モデル（約176MB）が自動ダウンロードされます。
"""

import argparse
import io
import shutil
import sys
from pathlib import Path

# ──────────────────────────────────────────
# 設定
# ──────────────────────────────────────────

# 透過処理するフォルダ（プロジェクトルートからの相対パス）
# ストーリー背景は不要、NPC・ボスのみ
TARGET_DIRS = [
    'assets/npcs',         # NPC 6 キャラクター
    'assets/story/boss',   # ボスキャラクター 3 枚
]

# アニメ・イラスト向けモデル（chibi キャラクターに最適）
REMBG_MODEL = 'isnet-anime'

# バックアップファイルの接尾辞
BACKUP_SUFFIX = '_orig'


# ──────────────────────────────────────────
# ユーティリティ
# ──────────────────────────────────────────

def check_dependencies() -> bool:
    """必要なパッケージが揃っているか確認する"""
    missing = []
    try:
        import rembg  # noqa: F401
    except ImportError:
        missing.append('rembg')
    try:
        from PIL import Image  # noqa: F401
    except ImportError:
        missing.append('Pillow')

    if missing:
        print('\n❌ 必要なパッケージが不足しています:')
        print(f'   pip install {" ".join(missing)}')
        return False
    return True


def backup_path(img_path: Path) -> Path:
    """オリジナルのバックアップパスを返す"""
    return img_path.with_name(img_path.stem + BACKUP_SUFFIX + img_path.suffix)


def is_processed(img_path: Path) -> bool:
    """既に処理済み（バックアップが存在する）かどうか"""
    return backup_path(img_path).exists()


# ──────────────────────────────────────────
# 透過処理
# ──────────────────────────────────────────

def process_image(input_path: Path, output_path: Path) -> bool:
    """
    単一画像の背景を透過処理して保存する。
    input_path  : 処理元（バックアップ済みオリジナル）
    output_path : 保存先（元ファイルと同じパスに上書き）
    Returns True if successful.
    """
    from rembg import remove, new_session
    from PIL import Image

    try:
        # isnet-anime セッション（初回はモデルをダウンロード）
        session = new_session(REMBG_MODEL)

        with open(input_path, 'rb') as f:
            input_data = f.read()

        # AI 背景除去
        output_data = remove(input_data, session=session)

        # アルファチャンネルを確認してから保存
        img = Image.open(io.BytesIO(output_data)).convert('RGBA')

        # 品質チェック: アルファが全不透明なら除去失敗とみなす
        alpha = img.getchannel('A')
        if max(alpha.getdata()) == 255 and min(alpha.getdata()) == 255:
            print(' ⚠️ アルファが全不透明（背景除去できていない可能性）', end='')

        img.save(output_path, 'PNG')
        return True

    except Exception as e:
        print(f'\n   ❌ エラー: {e}')
        return False


# ──────────────────────────────────────────
# バッチ処理
# ──────────────────────────────────────────

def run_process(project_root: Path, only: str | None = None) -> tuple[int, int]:
    """
    TARGET_DIRS 内の PNG をまとめて処理する。
    Returns (total, success).
    """
    total = success = 0

    dirs = TARGET_DIRS
    if only:
        dirs = [d for d in TARGET_DIRS if only in d]
        if not dirs:
            print(f'⚠️  --only "{only}" に一致するフォルダがありません')
            print(f'   指定可能: npcs, boss')
            return 0, 0

    for rel_dir in dirs:
        target_dir = project_root / rel_dir

        if not target_dir.exists():
            print(f'\n⚠️  フォルダ未作成のためスキップ: {rel_dir}')
            continue

        png_files = sorted(p for p in target_dir.glob('*.png')
                           if BACKUP_SUFFIX not in p.stem)

        if not png_files:
            print(f'\n📁 {rel_dir}')
            print('   ⚠️  PNG が見つかりません — 画像を配置後に再実行してください')
            continue

        print(f'\n📁 {rel_dir}  ({len(png_files)} 枚)')

        for img_path in png_files:
            if is_processed(img_path):
                print(f'   ✅ スキップ（処理済み）: {img_path.name}')
                continue

            print(f'   🔄 {img_path.name} ...', end='', flush=True)

            # オリジナルをバックアップ
            bp = backup_path(img_path)
            shutil.copy2(img_path, bp)

            total += 1
            ok = process_image(bp, img_path)

            if ok:
                success += 1
                # ファイルサイズを表示（透過後の確認用）
                size_kb = img_path.stat().st_size // 1024
                print(f' 完了 ({size_kb} KB)')
            else:
                # 失敗時はオリジナルを復元
                shutil.copy2(bp, img_path)
                bp.unlink()
                print(' 失敗（オリジナルを保持）')

    return total, success


def run_restore(project_root: Path) -> int:
    """バックアップ (*_orig.png) からオリジナルを復元する"""
    restored = 0
    for rel_dir in TARGET_DIRS:
        target_dir = project_root / rel_dir
        if not target_dir.exists():
            continue
        for bp in sorted(target_dir.glob(f'*{BACKUP_SUFFIX}.png')):
            original = bp.with_name(bp.name.replace(BACKUP_SUFFIX, ''))
            shutil.copy2(bp, original)
            bp.unlink()
            print(f'   ↩️  復元: {original.name}')
            restored += 1
    return restored


# ──────────────────────────────────────────
# エントリポイント
# ──────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Grimoire Guardians — NPC/ボス 透過処理スクリプト'
    )
    parser.add_argument(
        '--only', metavar='DIR',
        help='処理するフォルダを絞り込む (例: npcs, boss)'
    )
    parser.add_argument(
        '--restore', action='store_true',
        help='バックアップ (*_orig.png) からオリジナルを復元する'
    )
    args = parser.parse_args()

    # プロジェクトルート = このスクリプトの親ディレクトリ
    project_root = Path(__file__).resolve().parent.parent

    print('=' * 52)
    print('🎮 Grimoire Guardians — 透過処理スクリプト')
    print(f'   モデル  : {REMBG_MODEL}  (アニメ/イラスト向け)')
    print(f'   対象    : {", ".join(TARGET_DIRS)}')
    print('=' * 52)

    # ── 復元モード ──────────────────────────
    if args.restore:
        print('\n↩️  バックアップから復元します...')
        n = run_restore(project_root)
        print(f'\n完了: {n} 枚 復元しました')
        return

    # ── 透過処理モード ───────────────────────
    if not check_dependencies():
        sys.exit(1)

    print('\n初回実行時はモデル（約176MB）のダウンロードが発生します。')
    print('オリジナルは *_orig.png として自動バックアップされます。\n')

    total, success = run_process(project_root, only=args.only)

    print('\n' + '=' * 52)
    if total == 0:
        print('⚠️  処理対象の画像がありませんでした。')
        print('   以下のフォルダに PNG を配置してから再実行してください:')
        for d in TARGET_DIRS:
            print(f'   {project_root / d}/')
    else:
        failed = total - success
        print(f'✅ 完了  成功: {success}/{total} 枚', end='')
        print(f'  失敗: {failed} 枚' if failed else '')
        if success > 0:
            print('\n   透過済み PNG は元のファイルパスに上書き保存されています。')
            print('   やり直す場合: python3 scripts/remove_bg.py --restore')
    print('=' * 52)


if __name__ == '__main__':
    main()
