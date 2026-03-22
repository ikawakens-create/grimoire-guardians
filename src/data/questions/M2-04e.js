/**
 * M2-04e.js - Grimoire Guardians 問題データ
 * ユニット: M2-04e「3桁のひっ算まとめ」（たし・ひき混合）
 *
 * 対象: 小学2年生、3桁のたしざん・ひきざん総合
 * モード: digit-by-digit のみ
 *
 * Step構成
 *   Step1: 3桁のたしざん（繰り上がりあり・なし混合）（プール6問 → 5問）
 *   Step2: 3桁のひきざん（繰り下がりあり・なし混合）（プール6問 → 5問）
 *   Step3: たし・ひき混合（プール7問 → 5問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [

  // Step1: 3桁のたしざん（繰り上がりあり・なし混合）
  { id: 'M2-04e-Q01', unitId: 'M2-04e', step: 1, type: 'hitsuzan', operator: '+', operand1: 231, operand2: 45, correctAnswer: '276', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q02', unitId: 'M2-04e', step: 1, type: 'hitsuzan', operator: '+', operand1: 346, operand2: 27, correctAnswer: '373', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q03', unitId: 'M2-04e', step: 1, type: 'hitsuzan', operator: '+', operand1: 452, operand2: 38, correctAnswer: '490', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q04', unitId: 'M2-04e', step: 1, type: 'hitsuzan', operator: '+', operand1: 537, operand2: 64, correctAnswer: '601', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q05', unitId: 'M2-04e', step: 1, type: 'hitsuzan', operator: '+', operand1: 614, operand2: 53, correctAnswer: '667', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q06', unitId: 'M2-04e', step: 1, type: 'hitsuzan', operator: '+', operand1: 728, operand2: 46, correctAnswer: '774', hitsuzanMode: 'digit-by-digit' },

  // Step2: 3桁のひきざん（繰り下がりあり・なし混合）
  { id: 'M2-04e-Q07', unitId: 'M2-04e', step: 2, type: 'hitsuzan', operator: '-', operand1: 276, operand2: 45, correctAnswer: '231', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q08', unitId: 'M2-04e', step: 2, type: 'hitsuzan', operator: '-', operand1: 373, operand2: 27, correctAnswer: '346', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q09', unitId: 'M2-04e', step: 2, type: 'hitsuzan', operator: '-', operand1: 490, operand2: 38, correctAnswer: '452', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q10', unitId: 'M2-04e', step: 2, type: 'hitsuzan', operator: '-', operand1: 601, operand2: 64, correctAnswer: '537', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q11', unitId: 'M2-04e', step: 2, type: 'hitsuzan', operator: '-', operand1: 667, operand2: 53, correctAnswer: '614', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q12', unitId: 'M2-04e', step: 2, type: 'hitsuzan', operator: '-', operand1: 774, operand2: 46, correctAnswer: '728', hitsuzanMode: 'digit-by-digit' },

  // Step3: たし・ひき混合
  { id: 'M2-04e-Q13', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '+', operand1: 325, operand2: 47, correctAnswer: '372', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q14', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '-', operand1: 542, operand2: 68, correctAnswer: '474', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q15', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '+', operand1: 436, operand2: 85, correctAnswer: '521', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q16', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '-', operand1: 623, operand2: 47, correctAnswer: '576', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q17', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '+', operand1: 547, operand2: 76, correctAnswer: '623', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q18', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '-', operand1: 734, operand2: 56, correctAnswer: '678', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04e-Q19', unitId: 'M2-04e', step: 3, type: 'hitsuzan', operator: '+', operand1: 658, operand2: 75, correctAnswer: '733', hitsuzanMode: 'digit-by-digit' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
