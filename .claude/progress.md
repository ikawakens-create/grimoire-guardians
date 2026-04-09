# 進捗レポート

最終更新: 2026-04-09

## フェーズ別進捗

| フェーズ | 状態 | 説明 |
|----------|------|------|
| Phase 0.1 | ✅ 完了 | コアインフラ・8ユニット・4画面 |
| Phase 0.2 | ✅ 完了 | M1-07〜M1-13・ClockFace・ステップシャッフル |
| Phase 0.3 | ✅ 完了 | M1-14〜M1-16b・33ワールド・700問以上 |
| Phase 1-D | ✅ 完了 | 家ビルド（6セクション・15スタイル・写真機能） |
| Phase 1-E | ✅ 完了 | まちシステム（7施設・SVGマップ・農場・商店） |
| Phase 1-F | ✅ 完了 | スキンシステム（24スキン・かけら集め） |
| Phase 1-F 強化 | ✅ 完了 | スキン全面改修 Week A〜E（旅の仲間化・WardrobeScreen リアクションプレビュー・CharacterAvatar v2.1） |
| Phase 1-D 強化 | 🔜 待機中 | マイハウス画像アセット統合（spritesheet.png 実画像待ち） |
| Phase 1-H | ✅ 完了 | きおくのいせき（40モンスター・フラグOFF） |
| Phase 1 音声 | ⬜ 未着手 | Web Audio API（現在モック） |
| Phase 2 | ✅ 完了 | 2年生算数 M2シリーズ（42ユニット・1000問以上） |
| Phase 3 | ⬜ 未着手 | Grade 3（dimensionConfig.js に次元定義あり） |

## 直近の主な変更

- Week E: WardrobeScreen リアクションプレビュー実装・CharacterAvatar v2.1（updateSkin API）（2026-04-09）
- Week A〜D: スキン「旅の仲間化」全面改修・WardrobeScreen 新規作成・CharacterAvatar v2 API・テイラータブ強化（2026-04-08）
- sw.js v2.3.9：WardrobeScreen を ASSETS[] に追加（2026-04-08）
- スキン画像25種を透過・リサイズ処理して `assets/skins/` に配置（2026-04-02）
- ✅ 技術的負債（高）Router 汎用化：`_persistentScreens Map` に一本化（2026-03-31）
- ✅ 技術的負債（高）GameStore 分割：`initialState.js` に分離（2026-03-31）
