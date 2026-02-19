/**
 * units.js - Grimoire Guardians
 * ユニット定義とロードマップ
 *
 * 各ユニットの問題データを動的インポート（import()）で遅延ロードする。
 * DLC・未実装ユニットも定義し、loader が null のものは未実装扱い。
 *
 * @version 1.0
 * @date 2026-02-19
 */

/**
 * ユニット定義マップ
 * key: unitId（worlds.js の unitId と対応）
 * value: { unitId, title, loader }
 *
 * @type {Object<string, {unitId: string, title: string, loader: (() => Promise<{default: Array}>) | null}>}
 */
export const UNITS = {
  'M1-01': {
    unitId: 'M1-01',
    title: 'なかまづくりと かず',
    loader: () => import('./questions/M1-01.js')
  },
  'M1-02': {
    unitId: 'M1-02',
    title: 'なんばんめ',
    loader: null  // Phase 0.2で実装予定
  },
  'M1-03': {
    unitId: 'M1-03',
    title: 'いくつと いくつ',
    loader: null  // Phase 0.2で実装予定
  },
  'M1-04': {
    unitId: 'M1-04',
    title: 'たしざん（1）',
    loader: null  // Phase 0.2で実装予定
  },
  'M1-05': {
    unitId: 'M1-05',
    title: 'ひきざん（1）',
    loader: null  // Phase 0.2で実装予定
  },
  'M1-06': {
    unitId: 'M1-06',
    title: 'おおきい かず',
    loader: null  // Phase 0.3で実装予定
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
