スプライトシートスライス配置ガイド — style_ice (こおりのいえ)
================================================================

スプライトシート（Gemini生成: 512×2064px, 6等分ROW）をここに配置してください。

※ Geminiが ROW4・ROW5 のラベルを誤記していますが、
  内容（位置）は正しいので Y座標でスライスすれば問題ありません。

■ 必要ファイル一覧（5枚）:

  tower.png   — ROW1+ROW2を結合: Y:0    高さ:688px  (氷の尖塔+ダイヤ壁)
  floor3.png  — ROW3:            Y:688  高さ:344px  (3階・フロスト窓)
  floor2.png  — ROW4:            Y:1032 高さ:344px  (2階・氷柱窓) ←ラベル誤記無視
  floor1.png  — ROW5:            Y:1376 高さ:344px  (1階・アーチドア) ←ラベル誤記無視
  garden.png  — ROW6:            Y:1720 高さ:344px  (雪庭・氷フェンス)

■ ImageMagickでスライスする場合:

  convert spritesheet.png -crop 512x688+0+0    tower.png
  convert spritesheet.png -crop 512x344+0+688  floor3.png
  convert spritesheet.png -crop 512x344+0+1032 floor2.png
  convert spritesheet.png -crop 512x344+0+1376 floor1.png
  convert spritesheet.png -crop 512x344+0+1720 garden.png

■ 幅はすべて 512px で統一すること。
