/**
 * M1-15a.js - Grimoire Guardians 問題データ
 * ユニット: M1-15a「なんじ なんぷん（〜30ぷん）」
 *
 * 対象: 小学1年生、1分単位の時計の読み方（前半：1〜30分）
 * 準拠: 日本文教出版 算数1年
 *
 * M1-08シリーズとの関係:
 *   M1-08a: なんじちょうど（:00）
 *   M1-08b: なんじはん（:30）
 *   M1-08c: 5ふんたんい（:05/:10/:15...）
 *   M1-15a: なんじなんぷん 前半（:01〜:30）← ここ
 *   M1-15b: なんじなんぷん 後半（:31〜:59）
 *
 * 設計方針:
 *   まず5の倍数（既習）で ウォームアップしてから、
 *   端数分（6分・16分・23分など）に進む。
 *   0x分（07分・03分）は特に読み間違いが起きやすいため丁寧に扱う。
 *
 * カテゴリ構成（15問）
 *   Category A: 5の倍数・復習から始める（3問）
 *   Category B: 端数分（1〜30分）（7問）
 *   Category C: 難しいパターン（5問）← 0x分・ひっかけ
 *
 * @version 1.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Category A: 5の倍数・復習（3問）
  // 既習の5分単位から入ってウォームアップ
  // =====================================================
  {
    id: 'M1-15a-Q01',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 3, minute: 5 },
    choices: ['3じ 5ふん', '3じ 10ふん', '4じ 5ふん', '3じ 1ぷん'],
    correctAnswer: '3じ 5ふん',
    explanation: 'みじかいはりが 3、ながいはりが 1（5ふん）のところ。3じ5ふん！'
  },
  {
    id: 'M1-15a-Q02',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 7, minute: 10 },
    choices: ['7じ 2ふん', '7じ 10ふん', '8じ 10ふん', '7じ 50ふん'],
    correctAnswer: '7じ 10ふん',
    explanation: 'みじかいはりが 7、ながいはりが 2（10ふん）のところ。7じ10ふん！'
  },
  {
    id: 'M1-15a-Q03',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 1, minute: 15 },
    choices: ['1じ 3ぷん', '1じ 5ふん', '1じ 15ふん', '2じ 15ふん'],
    correctAnswer: '1じ 15ふん',
    explanation: 'みじかいはりが 1、ながいはりが 3（15ふん）のところ。1じ15ふん！'
  },

  // =====================================================
  // Category B: 端数分（1〜30分）（7問）
  // 5の倍数でない分数を読む
  // =====================================================
  {
    id: 'M1-15a-Q04',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 6, minute: 16 },
    choices: ['6じ 13ふん', '6じ 16ふん', '6じ 19ふん', '7じ 16ふん'],
    correctAnswer: '6じ 16ふん',
    explanation: 'みじかいはりが 6と 7のあいだ（6じすぎ）、ながいはりは 16ふん。6じ16ふん！'
  },
  {
    id: 'M1-15a-Q05',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 2, minute: 23 },
    choices: ['2じ 20ふん', '2じ 23ふん', '2じ 25ふん', '3じ 23ふん'],
    correctAnswer: '2じ 23ふん',
    explanation: '2じ 23ふん。ながいはりは 20ふんより 3つすすんだところ。'
  },
  {
    id: 'M1-15a-Q06',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 11, minute: 27 },
    choices: ['11じ 25ふん', '11じ 27ふん', '11じ 29ふん', '12じ 27ふん'],
    correctAnswer: '11じ 27ふん',
    explanation: '11じ 27ふん。ながいはりは 25ふんより 2つすすんだところ。'
  },
  {
    id: 'M1-15a-Q07',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 4, minute: 18 },
    choices: ['4じ 15ふん', '4じ 16ふん', '4じ 18ふん', '5じ 18ふん'],
    correctAnswer: '4じ 18ふん',
    explanation: '4じ 18ふん。ながいはりは 15ふんより 3つすすんだところ。'
  },
  {
    id: 'M1-15a-Q08',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 9, minute: 13 },
    choices: ['9じ 10ふん', '9じ 13ふん', '9じ 15ふん', '10じ 13ふん'],
    correctAnswer: '9じ 13ふん',
    explanation: '9じ 13ふん。ながいはりは 10ふんより 3つすすんだところ。'
  },
  {
    id: 'M1-15a-Q09',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 5, minute: 29 },
    choices: ['5じ 25ふん', '5じ 28ふん', '5じ 29ふん', '5じ 30ふん'],
    correctAnswer: '5じ 29ふん',
    explanation: '5じ 29ふん。ながいはりは 30ふん（はん）の 1つまえ。'
  },
  {
    id: 'M1-15a-Q10',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 10, minute: 22 },
    choices: ['10じ 20ふん', '10じ 22ふん', '10じ 24ふん', '11じ 22ふん'],
    correctAnswer: '10じ 22ふん',
    explanation: '10じ 22ふん。ながいはりは 20ふんより 2つすすんだところ。'
  },

  // =====================================================
  // Category C: 難しいパターン（5問）
  // 0x分・読み間違いが起きやすいパターン
  // =====================================================
  {
    id: 'M1-15a-Q11',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？\n（ながいはりに ちゅうもく！）',
    clockFace: { hour: 8, minute: 7 },
    choices: ['8じ 1ぷん', '8じ 5ふん', '8じ 7ふん', '8じ 35ふん'],
    correctAnswer: '8じ 7ふん',
    explanation: '8じ 7ふん。ながいはりは 5ふんより 2つすすんで 7ふん。「れいじかん7ふん」ではなく「8じ7ふん」！'
  },
  {
    id: 'M1-15a-Q12',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 12, minute: 14 },
    choices: ['12じ 10ふん', '12じ 12ふん', '12じ 14ふん', '1じ 14ふん'],
    correctAnswer: '12じ 14ふん',
    explanation: '12じ 14ふん。みじかいはりが 12のあたりにあるときは「12じ」。'
  },
  {
    id: 'M1-15a-Q13',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 3, minute: 21 },
    choices: ['3じ 20ふん', '3じ 21ふん', '3じ 22ふん', '4じ 21ふん'],
    correctAnswer: '3じ 21ふん',
    explanation: '3じ 21ふん。ながいはりは 20ふんより 1つすすんだところ。'
  },
  {
    id: 'M1-15a-Q14',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？\n（ながいはりに ちゅうもく！）',
    clockFace: { hour: 7, minute: 3 },
    choices: ['7じ 1ぷん', '7じ 3ぷん', '7じ 15ふん', '7じ 30ふん'],
    correctAnswer: '7じ 3ぷん',
    explanation: '7じ 3ぷん。ながいはりは 12（0ふん）から 3つすすんで 3ぷん。'
  },
  {
    id: 'M1-15a-Q15',
    unitId: 'M1-15a',
    type: 'clock',
    question: 'とけいは なんじ なんぷん？',
    clockFace: { hour: 11, minute: 28 },
    choices: ['11じ 25ふん', '11じ 26ふん', '11じ 28ふん', '12じ 28ふん'],
    correctAnswer: '11じ 28ふん',
    explanation: '11じ 28ふん。ながいはりは 25ふんより 3つすすんだところ。'
  }
];

export default questions;
