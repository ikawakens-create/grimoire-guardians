/**
 * ConceptVisualizer.js - Grimoire Guardians
 * 概念可視化コンポーネント（Ph3で本実装予定）
 *
 * 概要:
 *   UnitIntroScreen の _renderFirst() から呼ばれ、
 *   ユニット別のアニメーションとキャラ対話を演出する。
 *
 *   Ph3 実装予定の機能:
 *   - フクロウ先生との台詞ステップ（タップで進む）
 *   - conceptGuides.js に基づくビジュアルアニメーション
 *   - マイクロ体験問題（2〜3択・最大2回リトライ・自動進行）
 *
 * ステートマシン（Ph3以降）:
 *   idle → playing → waiting_tap → complete
 *
 * ライフサイクル:
 *   const cv = new ConceptVisualizer(onComplete);
 *   cv.render(container, unitId);
 *   // 演出完了後 onComplete() が呼ばれる
 *   cv.destroy();
 *
 * @version 0.1 (スケルトン)
 * @date 2026-04-03
 */

class ConceptVisualizer {
  /**
   * @param {Function} onComplete - 演出完了時のコールバック () => void
   */
  constructor(onComplete) {
    this._onComplete = onComplete;
    this._el = null;
  }

  /**
   * コンポーネントを描画する（Ph3で本実装）
   * @param {HTMLElement} container - 描画先の親要素
   * @param {string}      unitId    - ユニットID（例: 'M1-01'）
   */
  render(container, unitId) {
    // Ph3で ConceptVisualizer 本実装
    // 現時点では何も描画しない（スロットを空にしてエラーなし動作）
  }

  /**
   * コンポーネントを破棄する
   */
  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
  }
}

export { ConceptVisualizer };
