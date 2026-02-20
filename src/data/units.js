/**
 * units.js - Grimoire Guardians
 * ユニット定義とロードマップ
 *
 * 各ユニットの問題データを動的インポート（import()）で遅延ロードする。
 * DLC・未実装ユニットも定義し、loader が null のものは未実装扱い。
 *
 * B案採用（2026-02-20 Gemini承認）:
 *   M1-05b（たしざんおうよう）・M1-06b（ひきざんおうよう）を追加
 *
 * @version 2.0
 * @date 2026-02-20
 */

/**
 * ユニット定義マップ
 * key: unitId（worlds.js の unitId と対応）
 * value: { unitId, title, loader }
 *
 * @type {Object<string, {unitId: string, title: string, loader: (() => Promise<{default: Array}>) | null}>}
 */
export const UNITS = {
  // ---- Phase 0.1（Week 3A 実装済み）----

  'M1-01': {
    unitId: 'M1-01',
    title: 'なかまづくりと かず',
    loader: () => import('./questions/M1-01.js')
  },
  'M1-02': {
    unitId: 'M1-02',
    title: '10までの かず',
    loader: () => import('./questions/M1-02.js')
  },
  'M1-03': {
    unitId: 'M1-03',
    title: 'なんばんめ',
    loader: () => import('./questions/M1-03.js')
  },
  'M1-04': {
    unitId: 'M1-04',
    title: 'いくつと いくつ',
    loader: () => import('./questions/M1-04.js')
  },
  'M1-05': {
    unitId: 'M1-05',
    title: 'たしざん（1）きほん',
    loader: () => import('./questions/M1-05.js')
  },
  'M1-05b': {
    unitId: 'M1-05b',
    title: 'たしざん（1）おうよう',
    loader: () => import('./questions/M1-05b.js')
  },
  'M1-06': {
    unitId: 'M1-06',
    title: 'ひきざん（1）きほん',
    loader: () => import('./questions/M1-06.js')
  },
  'M1-06b': {
    unitId: 'M1-06b',
    title: 'ひきざん（1）おうよう',
    loader: () => import('./questions/M1-06b.js')
  },

  // ---- Phase 0.2（未実装）----

  'M1-07': {
    unitId: 'M1-07',
    title: 'おおきい かず',
    loader: null  // Phase 0.2 で実装予定
  },
  'M1-08': {
    unitId: 'M1-08',
    title: 'とけい',
    loader: null  // Phase 0.2 で実装予定
  },
  'M1-09': {
    unitId: 'M1-09',
    title: 'かたちあそび',
    loader: null  // Phase 0.2 で実装予定
  },
  'M1-10': {
    unitId: 'M1-10',
    title: 'たしざん（2）くりあがり',
    loader: null  // Phase 0.2 で実装予定（繰り上がり段階設計あり）
  },
  'M1-11': {
    unitId: 'M1-11',
    title: 'ひきざん（2）くりさがり',
    loader: null  // Phase 0.2 で実装予定
  }
};

/**
 * ユニットの問題データを動的ロード
 * @param {string} unitId - ユニットID（例: 'M1-01'）
 * @returns {Promise<Array>} 問題データ配列
 * @throws {Error} ユニットが未実装またはロード失敗の場合
 *
 * @example
 * const questions = await loadUnitQuestions('M1-01');
 */
export async function loadUnitQuestions(unitId) {
  const unit = UNITS[unitId];

  if (!unit) {
    throw new Error(`[Units] Unknown unitId: ${unitId}`);
  }

  if (!unit.loader) {
    throw new Error(`[Units] Unit "${unitId}" (${unit.title}) は未実装です`);
  }

  const module = await unit.loader();
  return module.default;
}

export default UNITS;
