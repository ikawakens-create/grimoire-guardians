/**
 * M1-15b.js - Grimoire Guardians 問題データ
 * ユニット: M1-15b「なんじ なんぷん（31ぷん〜）」
 *
 * 対象: 小学1年生、1分単位の時計の読み方（後半：31〜59分）
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   31〜59分はながいはりが「右側から下側・左側」に位置するため、
 *   前半（15aの1〜30分）より慣れが必要。
 *   5の倍数（35/40/45/50/55分）から入り、端数分へ進む。
 *   「総復習」で全範囲をランダムに確認してM1-15を完成させる。
 *
 * カテゴリ構成（15問）
 *   Category A: 31〜45分（5の倍数含む）（7問）
 *   Category B: 46〜59分（5問）
 *   Category C: 総復習（全範囲ランダム）（3問）
 *
 * @version 1.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Category A: 31〜45分（7問）
  // =====================================================
  {
    id: 'M1-15b-Q01',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 5, minute: 35 },
    choices: ['5じ 30ふん', '5じ 35ふん', '5じ 40ふん', '6じ 35ふん'],
    correctAnswer: '5じ 35ふん',
    explanation: '5じ 35ふん。ながいはりは 30ふん（はん）から 1つすすんで 7のところ。'
  },
  {
    id: 'M1-15b-Q02',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 9, minute: 40 },
    choices: ['9じ 35ふん', '9じ 40ふん', '9じ 45ふん', '10じ 40ふん'],
    correctAnswer: '9じ 40ふん',
    explanation: '9じ 40ふん。ながいはりは 8のところ（40ふん）。'
  },
  {
    id: 'M1-15b-Q03',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 2, minute: 33 },
    choices: ['2じ 30ふん', '2じ 33ふん', '2じ 35ふん', '3じ 33ふん'],
    correctAnswer: '2じ 33ふん',
    explanation: '2じ 33ふん。ながいはりは 30ふんより 3つすすんだところ。'
  },
  {
    id: 'M1-15b-Q04',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 11, minute: 45 },
    choices: ['11じ 40ふん', '11じ 43ふん', '11じ 45ふん', '12じ 45ふん'],
    correctAnswer: '11じ 45ふん',
    explanation: '11じ 45ふん。ながいはりは 9のところ（45ふん）。'
  },
  {
    id: 'M1-15b-Q05',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 7, minute: 38 },
    choices: ['7じ 35ふん', '7じ 38ふん', '7じ 40ふん', '8じ 38ふん'],
    correctAnswer: '7じ 38ふん',
    explanation: '7じ 38ふん。ながいはりは 35ふんより 3つすすんだところ。'
  },
  {
    id: 'M1-15b-Q06',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 1, minute: 31 },
    choices: ['1じ 29ふん', '1じ 30ふん', '1じ 31ふん', '2じ 31ふん'],
    correctAnswer: '1じ 31ふん',
    explanation: '1じ 31ふん。ながいはりは 30ふん（はん）から 1つすすんだところ。'
  },
  {
    id: 'M1-15b-Q07',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 4, minute: 43 },
    choices: ['4じ 40ふん', '4じ 43ふん', '4じ 45ふん', '5じ 43ふん'],
    correctAnswer: '4じ 43ふん',
    explanation: '4じ 43ふん。ながいはりは 40ふんより 3つすすんだところ。'
  },

  // =====================================================
  // Category B: 46〜59分（5問）
  // =====================================================
  {
    id: 'M1-15b-Q08',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 3, minute: 50 },
    choices: ['3じ 45ふん', '3じ 48ふん', '3じ 50ふん', '4じ 50ふん'],
    correctAnswer: '3じ 50ふん',
    explanation: '3じ 50ふん。ながいはりは 10（50ふん）のところ。'
  },
  {
    id: 'M1-15b-Q09',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 8, minute: 55 },
    choices: ['8じ 50ふん', '8じ 55ふん', '9じ 55ふん', '9じ 5ふん'],
    correctAnswer: '8じ 55ふん',
    explanation: '8じ 55ふん。ながいはりは 11（55ふん）のところ。もうすぐ 9じ！'
  },
  {
    id: 'M1-15b-Q10',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 1, minute: 47 },
    choices: ['1じ 45ふん', '1じ 47ふん', '1じ 49ふん', '2じ 47ふん'],
    correctAnswer: '1じ 47ふん',
    explanation: '1じ 47ふん。ながいはりは 45ふんより 2つすすんだところ。'
  },
  {
    id: 'M1-15b-Q11',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 6, minute: 52 },
    choices: ['6じ 50ふん', '6じ 52ふん', '6じ 54ふん', '7じ 52ふん'],
    correctAnswer: '6じ 52ふん',
    explanation: '6じ 52ふん。ながいはりは 50ふんより 2つすすんだところ。'
  },
  {
    id: 'M1-15b-Q12',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 10, minute: 58 },
    choices: ['10じ 55ふん', '10じ 57ふん', '10じ 58ふん', '11じ 58ふん'],
    correctAnswer: '10じ 58ふん',
    explanation: '10じ 58ふん。もうすぐ 11じ！ながいはりは 12（0ふん）の 2つまえ。'
  },

  // =====================================================
  // Category C: 総復習（3問）
  // 全範囲（1〜59分）からランダムに確認
  // =====================================================
  {
    id: 'M1-15b-Q13',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 3, minute: 43 },
    choices: ['3じ 40ふん', '3じ 43ふん', '3じ 45ふん', '4じ 43ふん'],
    correctAnswer: '3じ 43ふん',
    explanation: '3じ 43ふん。ながいはりは 40ふんより 3つすすんだところ。'
  },
  {
    id: 'M1-15b-Q14',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 9, minute: 56 },
    choices: ['9じ 50ふん', '9じ 55ふん', '9じ 56ふん', '10じ 56ふん'],
    correctAnswer: '9じ 56ふん',
    explanation: '9じ 56ふん。ながいはりは 55ふんより 1つすすんだところ。もうすぐ 10じ！'
  },
  {
    id: 'M1-15b-Q15',
    unitId: 'M1-15b',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 2, minute: 37 },
    choices: ['2じ 35ふん', '2じ 37ふん', '2じ 39ふん', '3じ 37ふん'],
    correctAnswer: '2じ 37ふん',
    explanation: '2じ 37ふん。ながいはりは 35ふんより 2つすすんだところ。'
  }
];

export default questions;
