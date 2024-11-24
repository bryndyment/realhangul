import { SCALE, SCALE_OFF } from '@/util/styles'
import { LabelDisplayedRowsArgs } from '@mui/material'
import { MouseEvent } from 'react'

// types

type _buildMetadataParams = {
  canonical: string
  description: string
  robots?: string
  title: string
}

export enum KanaGroups {
  HIRAGANA = 'hiragana',
  HIRAGANA_DOUBLE = 'hiraganaDouble',
  HIRAGANA_WORDS = 'hiraganaWords',
  KATAKANA = 'katakana',
  KATAKANA_DOUBLE = 'katakanaDouble',
  KATAKANA_EXTENDED = 'katakanaExtended',
  KATAKANA_WORDS = 'katakanaWords'
}

export enum HangulGroups {
  HANGUL_COMMON_SYLLABLES = 'hangulCommonSyllables',
  HANGUL_COMPOUND_VOWELS = 'hangulCompoundVowels',
  HANGUL_DOUBLE_CONSONANTS = 'hangulDoubleConsonants',
  HANGUL_SIMPLE_CONSONANTS = 'hangulSimpleConsonants',
  HANGUL_SIMPLE_VOWELS = 'hangulSimpleVowels',
  HANGUL_WORDS = 'hangulWords'
}

export enum Phases {
  INITIAL,
  STARTED,
  RESTARTED
}

export enum Tabs {
  APP = 'app',
  BLOG = 'blog',
  EXTRA = 'extra',
  HANGUL = 'hangul',
  INTRO = 'intro',
  STUDY = 'study'
}

export enum Visibilities {
  HIDDEN = 'hidden',
  VISIBLE = 'visible'
}

export const ALL_HANGUL = [
  // HANGUL_SIMPLE_VOWELS

  'ㅏ',
  'ㅑ',
  'ㅓ',
  'ㅕ',
  'ㅗ',
  'ㅛ',
  'ㅜ',
  'ㅠ',
  'ㅡ',
  'ㅣ',

  // HANGUL_COMPOUND_VOWELS

  'ㅐ',
  'ㅒ',
  'ㅔ',
  'ㅖ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅢ',

  // HANGUL_SIMPLE_CONSONANTS

  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',

  // HANGUL_DOUBLE_CONSONANTS

  'ㄲ',
  'ㄸ',
  'ㅃ',
  'ㅆ',
  'ㅉ',

  // HANGUL_COMMON_SYLLABLES

  '가',
  '나',
  '다',
  '라',
  '마',
  '바',
  '사',
  '아',
  '자',
  '차',
  '카',
  '타',
  '파',
  '하',

  // HANGUL_WORDS

  '사랑',
  '학교',
  '대한민국',
  '음식',
  '친구',
  '여행',
  '사람'
]

export const PAGES = new Map([
  [HangulGroups.HANGUL_COMMON_SYLLABLES, { columns: 6, offset: 39 }],
  [HangulGroups.HANGUL_COMPOUND_VOWELS, { columns: 4, offset: 10 }],
  [HangulGroups.HANGUL_DOUBLE_CONSONANTS, { columns: 5, offset: 34 }],
  [HangulGroups.HANGUL_SIMPLE_CONSONANTS, { columns: 7, offset: 21 }],
  [HangulGroups.HANGUL_SIMPLE_VOWELS, { columns: 5, offset: 0 }],
  [HangulGroups.HANGUL_WORDS, { columns: 2, offset: 53 }]
])

export const HANGUL_LABELS = new Map([
  // HANGUL_SIMPLE_VOWELS

  ['ㄱ', 'g'],
  ['ㄲ', 'kk'],
  ['ㄴ', 'n'],
  ['ㄷ', 'd'],
  ['ㄸ', 'tt'],
  ['ㄹ', 'r/l'],
  ['ㅁ', 'm'],
  ['ㅂ', 'b'],
  ['ㅃ', 'pp'],
  ['ㅅ', 's'],

  // HANGUL_COMPOUND_VOWELS

  ['ㅆ', 'ss'],
  ['ㅇ', 'ng'],
  ['ㅈ', 'j'],
  ['ㅉ', 'jj'],
  ['ㅊ', 'ch'],
  ['ㅋ', 'k'],
  ['ㅌ', 't'],
  ['ㅍ', 'p'],
  ['ㅎ', 'h'],
  ['ㅏ', 'a'],
  ['ㅐ', 'ae'],

  // HANGUL_SIMPLE_CONSONANTS

  ['ㅑ', 'ya'],
  ['ㅒ', 'yae'],
  ['ㅓ', 'eo'],
  ['ㅔ', 'e'],
  ['ㅕ', 'yeo'],
  ['ㅖ', 'ye'],
  ['ㅗ', 'o'],
  ['ㅘ', 'wa'],
  ['ㅙ', 'wae'],
  ['ㅚ', 'oe'],
  ['ㅛ', 'yo'],
  ['ㅜ', 'u'],
  ['ㅝ', 'wo'],
  ['ㅞ', 'we'],

  // HANGUL_DOUBLE_CONSONANTS

  ['ㅟ', 'wi'],
  ['ㅠ', 'yu'],
  ['ㅡ', 'eu'],
  ['ㅢ', 'ui'],
  ['ㅣ', 'i'],

  // HANGUL_COMMON_SYLLABLES

  ['가', 'ga'],
  ['나', 'na'],
  ['다', 'da'],
  ['대한민국', 'daehanminguk'],
  ['라', 'ra'],
  ['마', 'ma'],
  ['바', 'ba'],
  ['사', 'sa'],
  ['사람', 'saram'],
  ['사랑', 'sarang'],
  ['아', 'a'],
  ['여행', 'yeohaeng'],
  ['음식', 'eumsik'],
  ['자', 'ja'],

  // HANGUL_WORDS

  ['차', 'cha'],
  ['친구', 'chingu'],
  ['카', 'ka'],
  ['타', 'ta'],
  ['파', 'pa'],
  ['하', 'ha'],
  ['학교', 'hakgyo']
])

export const HANGUL_WORDS_WITH_MEANING = new Map([
  ['대한민국', { label: 'daehanminguk', meaning: 'Korea', position: [0, 2], topikLevel: 'Advanced' }],
  ['사람', { label: 'saram', meaning: 'person', position: [2, 0], topikLevel: 'Beginner' }],
  ['사랑', { label: 'sarang', meaning: 'love', position: [0, 0], topikLevel: 'Beginner' }],
  ['여행', { label: 'yeohaeng', meaning: 'travel', position: [1, 2], topikLevel: 'Intermediate' }],
  ['음식', { label: 'eumsik', meaning: 'food', position: [1, 0], topikLevel: 'Intermediate' }],
  ['친구', { label: 'chingu', meaning: 'friend', position: [1, 1], topikLevel: 'Beginner' }],
  ['학교', { label: 'hakgyo', meaning: 'school', position: [0, 1], topikLevel: 'Beginner' }]
])

export const TOPIK_LEVELS = [
  {
    label: 'TOPIK 1–2',
    level: 'Beginner',
    words: [
      { label: 'sarang', meaning: 'love', word: '사랑' },
      { label: 'hakgyo', meaning: 'school', word: '학교' },
      { label: 'saram', meaning: 'person', word: '사람' }
    ]
  },
  {
    label: 'TOPIK 3–4',
    level: 'Intermediate',
    words: [
      { label: 'yeohaeng', meaning: 'travel', word: '여행' },
      { label: 'eumsik', meaning: 'food', word: '음식' }
    ]
  },
  {
    label: 'TOPIK 5–6',
    level: 'Advanced',
    words: [{ label: 'daehanminguk', meaning: 'Korea', word: '대한민국' }]
  }
]

export const IS_LIVE = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const KEY_SET_V1 = String.raw`(\d+)-(\d+)-(\d+)-(\d+)-(\d+)`
export const KEY_SET_V2 = String.raw`(\d+)-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)`

export const ROWS_PER_PAGE = 8

// functions

export const advanceIndex = (index: number, array: string[][]) => (index === array.length - 1 ? 0 : index + 1)

export const calculate = (selector: string) => {
  let index = 0
  let value = 0

  document.querySelectorAll<HTMLInputElement>(selector).forEach(item => {
    if (item.checked) {
      value += 2 ** index
    }

    index++
  })

  return value
}

export const buildMetadata =
  ({ canonical, description, robots, title }: _buildMetadataParams) =>
  async () => ({
    alternates: {
      canonical
    },
    description,
    ...(robots ? { robots } : IS_LIVE ? { robots: 'nofollow, noindex' } : { robots: 'nofollow, noindex' }),
    title
  })

export const clickCheckbox = (event: MouseEvent) => {
  const index = Array.from(event.currentTarget.parentNode!.children).indexOf(event.currentTarget)

  document.querySelectorAll<HTMLInputElement>('#top table input')[index].click()
}

export const displayedRows = ({ count, from, to }: LabelDisplayedRowsArgs, label?: string) =>
  `${from}–${to} of ${count === -1 ? `more than ${count}${label ? ` ${label}` : ''}` : `${count}${label ? ` ${label}` : ''}`}`

export const nthChild = (event: MouseEvent) => Array.from(event.currentTarget.parentNode!.children).indexOf(event.currentTarget) + 1

export const scale = (event: any) => {
  const width = event.currentTarget.offsetWidth

  const scale = ((width + 1) / width + SCALE) / 2

  if (!matchMedia('(max-width: 609px)').matches) {
    event.currentTarget.style.transform = `scale(${scale})`
  }
}

export const scaleOff = (event: any) => {
  if (!matchMedia('(max-width: 609px)').matches) {
    event.currentTarget.style.transform = `scale(${SCALE_OFF})`
  }
}
