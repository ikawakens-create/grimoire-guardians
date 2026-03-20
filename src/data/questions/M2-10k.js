/**
 * M2-10k.js - Grimoire Guardians 問題データ
 * ユニット: M2-10k「九九 そうまとめ」
 * プール: 81問（1×1〜9×9 全組み合わせ）/ 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── 1のだん ──
  { id: 'M2-10k-Q01', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 1 = ？', choices: ['0', '1', '2', '3'], correctAnswer: '1' },
  { id: 'M2-10k-Q02', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 2 = ？', choices: ['1', '2', '3', '4'], correctAnswer: '2' },
  { id: 'M2-10k-Q03', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 3 = ？', choices: ['1', '2', '3', '4'], correctAnswer: '3' },
  { id: 'M2-10k-Q04', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 4 = ？', choices: ['3', '4', '5', '8'], correctAnswer: '4' },
  { id: 'M2-10k-Q05', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 5 = ？', choices: ['4', '5', '6', '10'], correctAnswer: '5' },
  { id: 'M2-10k-Q06', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 6 = ？', choices: ['5', '6', '7', '12'], correctAnswer: '6' },
  { id: 'M2-10k-Q07', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 7 = ？', choices: ['6', '7', '8', '14'], correctAnswer: '7' },
  { id: 'M2-10k-Q08', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 8 = ？', choices: ['7', '8', '9', '16'], correctAnswer: '8' },
  { id: 'M2-10k-Q09', unitId: 'M2-10k', step: 1, type: 'text', question: '1 × 9 = ？', choices: ['8', '9', '10', '18'], correctAnswer: '9' },
  // ── 2のだん ──
  { id: 'M2-10k-Q10', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 1 = ？', choices: ['1', '2', '3', '4'], correctAnswer: '2' },
  { id: 'M2-10k-Q11', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 2 = ？', choices: ['2', '4', '6', '8'], correctAnswer: '4' },
  { id: 'M2-10k-Q12', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 3 = ？', choices: ['4', '5', '6', '8'], correctAnswer: '6' },
  { id: 'M2-10k-Q13', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 4 = ？', choices: ['6', '7', '8', '10'], correctAnswer: '8' },
  { id: 'M2-10k-Q14', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 5 = ？', choices: ['8', '9', '10', '12'], correctAnswer: '10' },
  { id: 'M2-10k-Q15', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 6 = ？', choices: ['10', '11', '12', '14'], correctAnswer: '12' },
  { id: 'M2-10k-Q16', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 7 = ？', choices: ['12', '13', '14', '16'], correctAnswer: '14' },
  { id: 'M2-10k-Q17', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 8 = ？', choices: ['14', '15', '16', '18'], correctAnswer: '16' },
  { id: 'M2-10k-Q18', unitId: 'M2-10k', step: 1, type: 'text', question: '2 × 9 = ？', choices: ['16', '17', '18', '20'], correctAnswer: '18' },
  // ── 3のだん ──
  { id: 'M2-10k-Q19', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 1 = ？', choices: ['1', '2', '3', '6'], correctAnswer: '3' },
  { id: 'M2-10k-Q20', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 2 = ？', choices: ['3', '6', '9', '12'], correctAnswer: '6' },
  { id: 'M2-10k-Q21', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 3 = ？', choices: ['6', '7', '9', '12'], correctAnswer: '9' },
  { id: 'M2-10k-Q22', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 4 = ？', choices: ['9', '11', '12', '15'], correctAnswer: '12' },
  { id: 'M2-10k-Q23', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 5 = ？', choices: ['12', '13', '15', '18'], correctAnswer: '15' },
  { id: 'M2-10k-Q24', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 6 = ？', choices: ['15', '17', '18', '21'], correctAnswer: '18' },
  { id: 'M2-10k-Q25', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 7 = ？', choices: ['18', '20', '21', '24'], correctAnswer: '21' },
  { id: 'M2-10k-Q26', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 8 = ？', choices: ['21', '22', '24', '27'], correctAnswer: '24' },
  { id: 'M2-10k-Q27', unitId: 'M2-10k', step: 1, type: 'text', question: '3 × 9 = ？', choices: ['24', '25', '27', '30'], correctAnswer: '27' },
  // ── 4のだん ──
  { id: 'M2-10k-Q28', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 1 = ？', choices: ['2', '3', '4', '8'], correctAnswer: '4' },
  { id: 'M2-10k-Q29', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 2 = ？', choices: ['4', '6', '8', '12'], correctAnswer: '8' },
  { id: 'M2-10k-Q30', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 3 = ？', choices: ['8', '10', '12', '16'], correctAnswer: '12' },
  { id: 'M2-10k-Q31', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 4 = ？', choices: ['12', '14', '16', '20'], correctAnswer: '16' },
  { id: 'M2-10k-Q32', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 5 = ？', choices: ['16', '18', '20', '24'], correctAnswer: '20' },
  { id: 'M2-10k-Q33', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 6 = ？', choices: ['20', '22', '24', '28'], correctAnswer: '24' },
  { id: 'M2-10k-Q34', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 7 = ？', choices: ['24', '26', '28', '32'], correctAnswer: '28' },
  { id: 'M2-10k-Q35', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 8 = ？', choices: ['28', '30', '32', '36'], correctAnswer: '32' },
  { id: 'M2-10k-Q36', unitId: 'M2-10k', step: 1, type: 'text', question: '4 × 9 = ？', choices: ['32', '34', '36', '40'], correctAnswer: '36' },
  // ── 5のだん ──
  { id: 'M2-10k-Q37', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 1 = ？', choices: ['1', '5', '10', '15'], correctAnswer: '5' },
  { id: 'M2-10k-Q38', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 2 = ？', choices: ['5', '8', '10', '15'], correctAnswer: '10' },
  { id: 'M2-10k-Q39', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 3 = ？', choices: ['10', '13', '15', '20'], correctAnswer: '15' },
  { id: 'M2-10k-Q40', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 4 = ？', choices: ['15', '18', '20', '25'], correctAnswer: '20' },
  { id: 'M2-10k-Q41', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 5 = ？', choices: ['20', '22', '25', '30'], correctAnswer: '25' },
  { id: 'M2-10k-Q42', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 6 = ？', choices: ['25', '28', '30', '35'], correctAnswer: '30' },
  { id: 'M2-10k-Q43', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 7 = ？', choices: ['30', '33', '35', '40'], correctAnswer: '35' },
  { id: 'M2-10k-Q44', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 8 = ？', choices: ['35', '38', '40', '45'], correctAnswer: '40' },
  { id: 'M2-10k-Q45', unitId: 'M2-10k', step: 1, type: 'text', question: '5 × 9 = ？', choices: ['40', '42', '45', '50'], correctAnswer: '45' },
  // ── 6のだん ──
  { id: 'M2-10k-Q46', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 1 = ？', choices: ['1', '5', '6', '12'], correctAnswer: '6' },
  { id: 'M2-10k-Q47', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 2 = ？', choices: ['6', '10', '12', '18'], correctAnswer: '12' },
  { id: 'M2-10k-Q48', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 3 = ？', choices: ['12', '15', '18', '24'], correctAnswer: '18' },
  { id: 'M2-10k-Q49', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 4 = ？', choices: ['18', '21', '24', '30'], correctAnswer: '24' },
  { id: 'M2-10k-Q50', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 5 = ？', choices: ['24', '27', '30', '36'], correctAnswer: '30' },
  { id: 'M2-10k-Q51', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 6 = ？', choices: ['30', '33', '36', '42'], correctAnswer: '36' },
  { id: 'M2-10k-Q52', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 7 = ？', choices: ['36', '40', '42', '48'], correctAnswer: '42' },
  { id: 'M2-10k-Q53', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 8 = ？', choices: ['42', '45', '48', '54'], correctAnswer: '48' },
  { id: 'M2-10k-Q54', unitId: 'M2-10k', step: 1, type: 'text', question: '6 × 9 = ？', choices: ['48', '51', '54', '60'], correctAnswer: '54' },
  // ── 7のだん ──
  { id: 'M2-10k-Q55', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 1 = ？', choices: ['1', '6', '7', '14'], correctAnswer: '7' },
  { id: 'M2-10k-Q56', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 2 = ？', choices: ['7', '12', '14', '21'], correctAnswer: '14' },
  { id: 'M2-10k-Q57', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 3 = ？', choices: ['14', '18', '21', '28'], correctAnswer: '21' },
  { id: 'M2-10k-Q58', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 4 = ？', choices: ['21', '24', '28', '35'], correctAnswer: '28' },
  { id: 'M2-10k-Q59', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 5 = ？', choices: ['28', '32', '35', '42'], correctAnswer: '35' },
  { id: 'M2-10k-Q60', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 6 = ？', choices: ['35', '38', '42', '49'], correctAnswer: '42' },
  { id: 'M2-10k-Q61', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 7 = ？', choices: ['42', '46', '49', '56'], correctAnswer: '49' },
  { id: 'M2-10k-Q62', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 8 = ？', choices: ['49', '52', '56', '63'], correctAnswer: '56' },
  { id: 'M2-10k-Q63', unitId: 'M2-10k', step: 1, type: 'text', question: '7 × 9 = ？', choices: ['56', '60', '63', '70'], correctAnswer: '63' },
  // ── 8のだん ──
  { id: 'M2-10k-Q64', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 1 = ？', choices: ['4', '6', '8', '16'], correctAnswer: '8' },
  { id: 'M2-10k-Q65', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 2 = ？', choices: ['8', '14', '16', '24'], correctAnswer: '16' },
  { id: 'M2-10k-Q66', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 3 = ？', choices: ['16', '21', '24', '32'], correctAnswer: '24' },
  { id: 'M2-10k-Q67', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 4 = ？', choices: ['24', '28', '32', '40'], correctAnswer: '32' },
  { id: 'M2-10k-Q68', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 5 = ？', choices: ['32', '36', '40', '48'], correctAnswer: '40' },
  { id: 'M2-10k-Q69', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 6 = ？', choices: ['40', '44', '48', '56'], correctAnswer: '48' },
  { id: 'M2-10k-Q70', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 7 = ？', choices: ['48', '52', '56', '64'], correctAnswer: '56' },
  { id: 'M2-10k-Q71', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 8 = ？', choices: ['56', '60', '63', '64'], correctAnswer: '64' },
  { id: 'M2-10k-Q72', unitId: 'M2-10k', step: 1, type: 'text', question: '8 × 9 = ？', choices: ['63', '64', '72', '81'], correctAnswer: '72' },
  // ── 9のだん ──
  { id: 'M2-10k-Q73', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 1 = ？', choices: ['1', '8', '9', '18'], correctAnswer: '9' },
  { id: 'M2-10k-Q74', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 2 = ？', choices: ['9', '16', '18', '27'], correctAnswer: '18' },
  { id: 'M2-10k-Q75', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 3 = ？', choices: ['18', '24', '27', '36'], correctAnswer: '27' },
  { id: 'M2-10k-Q76', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 4 = ？', choices: ['27', '32', '36', '45'], correctAnswer: '36' },
  { id: 'M2-10k-Q77', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 5 = ？', choices: ['36', '40', '45', '54'], correctAnswer: '45' },
  { id: 'M2-10k-Q78', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 6 = ？', choices: ['45', '48', '54', '63'], correctAnswer: '54' },
  { id: 'M2-10k-Q79', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 7 = ？', choices: ['54', '56', '63', '72'], correctAnswer: '63' },
  { id: 'M2-10k-Q80', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 8 = ？', choices: ['63', '64', '72', '81'], correctAnswer: '72' },
  { id: 'M2-10k-Q81', unitId: 'M2-10k', step: 1, type: 'text', question: '9 × 9 = ？', choices: ['72', '76', '81', '90'], correctAnswer: '81' }
];

export const stepConfig = [
  { step: 1, pick: 15 }
];

export default questions;
