/**
 * dimensionConfig.js - Grimoire Guardians
 * 次元（学年・教科）ごとのテーマ定義（仮）
 *
 * NOTE: この設計は仮です。次元2以降の実装時に調整してください。
 * dim1（小学1年生算数）のみ現在実装済みです。
 *
 * 拡張手順:
 *   1. このファイルに新次元エントリを追加
 *   2. src/data/storyData.js に新次元のストーリーテキストを追加
 *   3. 新次元のワールドデータ（worlds_dim2.js 等）を作成
 *   4. index.js のルーターに次元切り替えロジックを追加
 *
 * @version 1.0 (仮)
 * @date 2026-03-16
 */

/**
 * 次元定義マップ
 * @type {Object.<string, DimensionDef>}
 *
 * @typedef {Object} DimensionDef
 * @property {string}   id           - 次元ID
 * @property {string}   name         - 表示名（ひらがな）
 * @property {string}   subject      - 対象学年・教科
 * @property {Object}   theme        - カラーテーマ
 * @property {string}   npcGuardian  - 主要NPC識別子
 * @property {string}   bossName     - ボスの名前
 * @property {string}   bossEmoji    - ボスの絵文字フォールバック
 * @property {string}   sealType     - 封印の種類（演出テキスト用）
 * @property {number}   worldCount   - ワールド総数
 * @property {boolean}  available    - 現在プレイ可能か
 */
export const DIMENSIONS = {

  // ──────────────────────────────────────────────
  // 次元1：かずの次元（小学1年生算数）★実装済み
  // ──────────────────────────────────────────────
  dim1: {
    id:          'dim1',
    name:        'かずの次元',
    subject:     '小学1年生 算数',
    theme: {
      primary:   '#6B48FF',
      dark:      '#2D1B69',
      accent:    '#FFD700',
      fog:       'rgba(45, 27, 105, 0.6)',
    },
    npcGuardian: 'fukurou',
    bossName:    'やみのまじん',
    bossEmoji:   '👾',
    sealType:    '魔法陣',
    worldCount:  33,
    available:   true,
  },

  // ──────────────────────────────────────────────
  // 次元2：うみの次元（小学2年生算数）★未実装
  // ──────────────────────────────────────────────
  dim2: {
    id:          'dim2',
    name:        'うみの次元',
    subject:     '小学2年生 算数',
    theme: {
      primary:   '#00B4D8',
      dark:      '#03045E',
      accent:    '#90E0EF',
      fog:       'rgba(3, 4, 94, 0.6)',
    },
    npcGuardian: 'ningyo',       // 人魚の賢者（未実装）
    bossName:    'やみのりゅう',
    bossEmoji:   '🐉',
    sealType:    '水晶封印',
    worldCount:  0,              // 未確定
    available:   false,
  },

  // ──────────────────────────────────────────────
  // 次元3：そらの次元（小学3年生算数）★未実装
  // ──────────────────────────────────────────────
  dim3: {
    id:          'dim3',
    name:        'そらの次元',
    subject:     '小学3年生 算数',
    theme: {
      primary:   '#74B9FF',
      dark:      '#0984E3',
      accent:    '#FDCB6E',
      fog:       'rgba(9, 132, 227, 0.5)',
    },
    npcGuardian: 'tori',         // 鳥の賢者（未実装）
    bossName:    'やみのかぜ',
    bossEmoji:   '🌪️',
    sealType:    '雲の封印',
    worldCount:  0,
    available:   false,
  },

  // ──────────────────────────────────────────────
  // 言葉の次元（国語）★未実装
  // ──────────────────────────────────────────────
  kotoba: {
    id:          'kotoba',
    name:        'ことばの次元',
    subject:     '小学1〜3年生 国語',
    theme: {
      primary:   '#00B894',
      dark:      '#00695C',
      accent:    '#FFEAA7',
      fog:       'rgba(0, 105, 92, 0.5)',
    },
    npcGuardian: 'kitsune',      // キツネの詩人（未実装）
    bossName:    'やみのちんもく',
    bossEmoji:   '🌑',
    sealType:    '言葉の封印',
    worldCount:  0,
    available:   false,
  },
};

/**
 * 現在利用可能な次元リストを返す
 * @returns {DimensionDef[]}
 */
export function getAvailableDimensions() {
  return Object.values(DIMENSIONS).filter(d => d.available);
}

/**
 * IDで次元定義を取得する
 * @param {string} id
 * @returns {DimensionDef|null}
 */
export function getDimensionById(id) {
  return DIMENSIONS[id] || null;
}

export default DIMENSIONS;
