/**
 * units.js - Grimoire Guardians
 * ユニット定義とロードマップ
 *
 * 各ユニットの問題データを動的インポート（import()）で遅延ロードする。
 * DLC・未実装ユニットも定義し、loader が null のものは未実装扱い。
 *
 * Phase 0.2 更新（2026-02-24）:
 *   - M1-07 〜 M1-10d を実装済みに変更
 *   - M1-08 を M1-08a / M1-08b / M1-08c に分割（時計3ワールド）
 *
 * Phase 2 更新（2026-03-19）:
 *   - M2-01〜M2-15d（42ユニット）をローダー未実装として登録
 *
 * @version 4.0
 * @date 2026-03-19
 */

/**
 * ユニット定義マップ
 * key: unitId（worlds.js の unitId と対応）
 * value: { unitId, title, loader }
 *
 * @type {Object<string, {unitId: string, title: string, loader: (() => Promise<{default: Array}>) | null}>}
 */
export const UNITS = {
  // ---- Phase 0.1（実装済み）----

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

  // ---- Phase 0.2（実装済み: M1-07〜M1-12c）----

  'M1-07': {
    unitId: 'M1-07',
    title: '20までの かず',
    loader: () => import('./questions/M1-07.js')
  },

  // M1-08 は 3ワールドに分割（なんじ・なんじはん・5分単位）
  'M1-08a': {
    unitId: 'M1-08a',
    title: 'なんじ（ちょうど）',
    loader: () => import('./questions/M1-08a.js')
  },
  'M1-08b': {
    unitId: 'M1-08b',
    title: 'なんじはん',
    loader: () => import('./questions/M1-08b.js')
  },
  'M1-08c': {
    unitId: 'M1-08c',
    title: '５ふんたんいに ちょうせん！',
    loader: () => import('./questions/M1-08c.js')
  },

  'M1-09': {
    unitId: 'M1-09',
    title: 'さくらんぼ算のひみつ',
    loader: () => import('./questions/M1-09.js')
  },
  'M1-10a': {
    unitId: 'M1-10a',
    title: 'くりあがり（9のせかい）',
    loader: () => import('./questions/M1-10a.js')
  },
  'M1-10b': {
    unitId: 'M1-10b',
    title: 'くりあがり（8のせかい）',
    loader: () => import('./questions/M1-10b.js')
  },
  'M1-10c': {
    unitId: 'M1-10c',
    title: 'くりあがり（7・6のせかい）',
    loader: () => import('./questions/M1-10c.js')
  },
  'M1-10d': {
    unitId: 'M1-10d',
    title: 'くりあがりのおうよう',
    loader: () => import('./questions/M1-10d.js')
  },

  'M1-11a': {
    unitId: 'M1-11a',
    title: '10からひくひみつ',
    loader: () => import('./questions/M1-11a.js')
  },
  'M1-11b': {
    unitId: 'M1-11b',
    title: 'くりさがり（11・12のせかい）',
    loader: () => import('./questions/M1-11b.js')
  },
  'M1-11c': {
    unitId: 'M1-11c',
    title: 'くりさがり（13〜18のせかい）',
    loader: () => import('./questions/M1-11c.js')
  },
  'M1-11d': {
    unitId: 'M1-11d',
    title: 'くりさがりのおうよう',
    loader: () => import('./questions/M1-11d.js')
  },
  'M1-12a': {
    unitId: 'M1-12a',
    title: '3つのかずのたしざん',
    loader: () => import('./questions/M1-12a.js')
  },
  'M1-12b': {
    unitId: 'M1-12b',
    title: '3つのかずのひきざん',
    loader: () => import('./questions/M1-12b.js')
  },
  'M1-12c': {
    unitId: 'M1-12c',
    title: 'たしざん・ひきざんまじり',
    loader: () => import('./questions/M1-12c.js')
  },

  // ---- Phase 0.2（実装済み: M1-13）----

  'M1-13': {
    unitId: 'M1-13',
    title: 'かたちあそび',
    loader: () => import('./questions/M1-13.js')
  },

  'M1-13b': {
    unitId: 'M1-13b',
    title: 'かたちづくり',
    loader: () => import('./questions/M1-13b.js')
  },

  // ---- Phase 0.3（M1-14〜M1-16）----

  'M1-14a': {
    unitId: 'M1-14a',
    title: 'かずの よみかき（10のまとまり）',
    loader: () => import('./questions/M1-14a.js')
  },
  'M1-14b': {
    unitId: 'M1-14b',
    title: 'かずの じゅんばん と だいしょう',
    loader: () => import('./questions/M1-14b.js')
  },
  'M1-14c': {
    unitId: 'M1-14c',
    title: 'おおきい かず の たしざん',
    loader: () => import('./questions/M1-14c.js')
  },
  'M1-14d': {
    unitId: 'M1-14d',
    title: 'おおきい かず の ひきざん',
    loader: () => import('./questions/M1-14d.js')
  },
  'M1-15a': {
    unitId: 'M1-15a',
    title: 'なんじ なんぷん（〜30ぷん）',
    loader: () => import('./questions/M1-15a.js')
  },
  'M1-15b': {
    unitId: 'M1-15b',
    title: 'なんじ なんぷん（31ぷん〜）',
    loader: () => import('./questions/M1-15b.js')
  },
  'M1-16a': {
    unitId: 'M1-16a',
    title: 'ずを つかって（たしざん 文章題）',
    loader: () => import('./questions/M1-16a.js')
  },
  'M1-16b': {
    unitId: 'M1-16b',
    title: 'ずを つかって（ひきざん 文章題）',
    loader: () => import('./questions/M1-16b.js')
  },

  // ---- Phase 2 Grade 2 深海グリモア（未実装 — loader: null）----

  // Zone 1 浅瀬（7本）— 筆算
  'M2-01':  { unitId: 'M2-01',  title: '2けたの たしざん',           loader: () => import('./questions/M2-01.js') },
  'M2-02':  { unitId: 'M2-02',  title: 'くりあがりの たしざん',      loader: () => import('./questions/M2-02.js') },
  'M2-02b': { unitId: 'M2-02b', title: '2けた＋2けたの たしざん',    loader: () => import('./questions/M2-02b.js') },
  'M2-03':  { unitId: 'M2-03',  title: '2けたの ひきざん',           loader: () => import('./questions/M2-03.js') },
  'M2-03b': { unitId: 'M2-03b', title: 'くりさがりの ひきざん',      loader: () => import('./questions/M2-03b.js') },
  'M2-04':  { unitId: 'M2-04',  title: '2けたの けいさん おうよう',  loader: () => import('./questions/M2-04.js') },
  'M2-04b': { unitId: 'M2-04b', title: 'ひっさん まとめ',            loader: () => import('./questions/M2-04b.js') },

  // Zone 2 サンゴ礁（9本）— 数・量・時刻（仮実装）
  'M2-05':  { unitId: 'M2-05',  title: 'ながさを はかろう',   loader: () => import('./questions/M2-05.js') },
  'M2-06a': { unitId: 'M2-06a', title: 'おおきい かず①',     loader: () => import('./questions/M2-06a.js') },
  'M2-06b': { unitId: 'M2-06b', title: 'おおきい かず②',     loader: () => import('./questions/M2-06b.js') },
  'M2-07':  { unitId: 'M2-07',  title: 'みずの かさ',         loader: () => import('./questions/M2-07.js') },
  'M2-08':  { unitId: 'M2-08',  title: 'おもさを はかろう',   loader: () => import('./questions/M2-08.js') },
  'M2-09a': { unitId: 'M2-09a', title: 'じこくと じかん①',   loader: () => import('./questions/M2-09a.js') },
  'M2-09b': { unitId: 'M2-09b', title: 'じこくと じかん②',   loader: () => import('./questions/M2-09b.js') },
  'M2-09c': { unitId: 'M2-09c', title: 'じかんの もんだい',   loader: () => import('./questions/M2-09c.js') },
  'M2-09d': { unitId: 'M2-09d', title: 'さんごしょう まとめ', loader: () => import('./questions/M2-09d.js') },

  // Zone 3 外洋（11本）— 九九（m2_10a〜i はフラッシュモード対象）
  'M2-10a': { unitId: 'M2-10a', title: '九九 2のだん',        loader: () => import('./questions/M2-10a.js') },
  'M2-10b': { unitId: 'M2-10b', title: '九九 3のだん',        loader: () => import('./questions/M2-10b.js') },
  'M2-10c': { unitId: 'M2-10c', title: '九九 4のだん',        loader: () => import('./questions/M2-10c.js') },
  'M2-10d': { unitId: 'M2-10d', title: '九九 5のだん',        loader: () => import('./questions/M2-10d.js') },
  'M2-10e': { unitId: 'M2-10e', title: '九九 6のだん',        loader: () => import('./questions/M2-10e.js') },
  'M2-10f': { unitId: 'M2-10f', title: '九九 7のだん',        loader: () => import('./questions/M2-10f.js') },
  'M2-10g': { unitId: 'M2-10g', title: '九九 8のだん',        loader: () => import('./questions/M2-10g.js') },
  'M2-10h': { unitId: 'M2-10h', title: '九九 9のだん',        loader: () => import('./questions/M2-10h.js') },
  'M2-10i': { unitId: 'M2-10i', title: '九九 1のだん・0のかけざん', loader: () => import('./questions/M2-10i.js') },
  'M2-10j': { unitId: 'M2-10j', title: 'かけざん もんだい',   loader: () => import('./questions/M2-10j.js') },
  'M2-10k': { unitId: 'M2-10k', title: '九九 そうまとめ',     loader: () => import('./questions/M2-10k.js') },

  // Zone 4 深海（11本）— 図形・3桁筆算・分数
  'M2-11':  { unitId: 'M2-11',  title: 'さんかくけいと しかくけい',     loader: () => import('./questions/M2-11.js') },
  'M2-12':  { unitId: 'M2-12',  title: 'ちょうほうけい・せいほうけい', loader: () => import('./questions/M2-12.js') },
  'M2-12b': { unitId: 'M2-12b', title: 'ずけい まとめ',                loader: () => import('./questions/M2-12b.js') },
  'M2-13a': { unitId: 'M2-13a', title: '3けたの たしざん',             loader: () => import('./questions/M2-13a.js') },
  'M2-13b': { unitId: 'M2-13b', title: '3けたの ひきざん',             loader: () => import('./questions/M2-13b.js') },
  'M2-13c': { unitId: 'M2-13c', title: '3けた ひっさん まとめ',        loader: () => import('./questions/M2-13c.js') },
  'M2-14a': { unitId: 'M2-14a', title: 'ぶんすうの きほん',            loader: () => import('./questions/M2-14a.js') },
  'M2-14b': { unitId: 'M2-14b', title: 'ぶんすうの たしざん',          loader: () => import('./questions/M2-14b.js') },
  'M2-14c': { unitId: 'M2-14c', title: 'ぶんすうの ひきざん',          loader: () => import('./questions/M2-14c.js') },
  'M2-14d': { unitId: 'M2-14d', title: 'ぶんすうの おうよう',          loader: () => import('./questions/M2-14d.js') },
  'M2-14e': { unitId: 'M2-14e', title: 'ぶんすう まとめ',              loader: () => import('./questions/M2-14e.js') },

  // Zone 5 海底都市（4本）— 総復習
  'M2-15a': { unitId: 'M2-15a', title: 'そうふくしゅう①',                loader: () => import('./questions/M2-15a.js') },
  'M2-15b': { unitId: 'M2-15b', title: 'そうふくしゅう②',                loader: () => import('./questions/M2-15b.js') },
  'M2-15c': { unitId: 'M2-15c', title: 'そうふくしゅう③',                loader: () => import('./questions/M2-15c.js') },
  'M2-15d': { unitId: 'M2-15d', title: 'グランド・レヴィアサン けっせん！', loader: () => import('./questions/M2-15d.js') },
};

/**
 * ユニットの問題データを動的ロード
 * @param {string} unitId - ユニットID（例: 'M1-01'）
 * @returns {Promise<{questions: Array, stepConfig: Array|null}>}
 *   questions: 問題データ配列
 *   stepConfig: ステップ別選出設定（stepConfigをexportしないユニットはnull）
 * @throws {Error} ユニットが未実装またはロード失敗の場合
 *
 * @example
 * const { questions, stepConfig } = await loadUnitQuestions('M1-01');
 */
export async function loadUnitQuestions(unitId) {
  const unit = UNITS[unitId];

  if (!unit) {
    throw new Error(`[Units] Unknown unitId: ${unitId}`);
  }

  if (!unit.loader) {
    throw new Error(`[Units] Unit "${unitId}" (${unit.title}) は未実装です`);
  }

  const mod = await unit.loader();
  return {
    questions: mod.default,
    stepConfig: mod.stepConfig ?? null
  };
}

export default UNITS;
