import { SCALE, SCALE_OFF } from '@/util/styles'
import { LabelDisplayedRowsArgs } from '@mui/material'
import { MouseEvent } from 'react'

// Types
type _buildMetadataParams = {
  canonical: string
  description: string
  robots?: string
  title: string
}

export enum HangulGroups {
  COMPOUND_VOWELS = 'compoundVowels',
  DOUBLE_CONSONANTS = 'doubleConsonants',
  SIMPLE_CONSONANTS = 'simpleConsonants',
  SIMPLE_VOWELS = 'simpleVowels'
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

// export enum Categories {
//   FIRST_CATEGORY = 'firstCategory',
//   FOURTH_CATEGORY = 'fourthCategory',
//   SECOND_CATEGORY = 'secondCategory',
//   THIRD_CATEGORY = 'thirdCategory'
// }

// Vowels

export const VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']

// Consonants (y-axis)

export const CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ']

// Hangul Labels
export const HANGUL_LABELS = new Map<string, string>([
  // Consonants
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
  ['ㅆ', 'ss'],
  ['ㅇ', 'ng'],
  ['ㅈ', 'j'],
  ['ㅉ', 'jj'],
  ['ㅊ', 'ch'],
  ['ㅋ', 'k'],
  ['ㅌ', 't'],
  ['ㅍ', 'p'],
  ['ㅎ', 'h'],

  // Vowels

  ['ㅏ', 'a'],
  ['ㅐ', 'ae'],
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
  ['ㅟ', 'wi'],
  ['ㅠ', 'yu'],
  ['ㅡ', 'eu'],
  ['ㅢ', 'ui'],
  ['ㅣ', 'i']
])

CONSONANTS.forEach(consonant => {
  VOWELS.forEach(vowel => {
    const syllable = consonant + vowel // Combine consonant and vowel
    const label = (HANGUL_LABELS.get(consonant) || '') + (HANGUL_LABELS.get(vowel) || '')
    HANGUL_LABELS.set(syllable, label) // Add syllable to the map
  })
})

// Grouping Hangul

export const ALL_HANGUL = new Map<HangulGroups, string[]>([
  [HangulGroups.COMPOUND_VOWELS, VOWELS.slice(10)], // Compound vowels
  [HangulGroups.DOUBLE_CONSONANTS, CONSONANTS.slice(14)], // Double consonants
  [HangulGroups.SIMPLE_CONSONANTS, CONSONANTS.slice(0, 14)], // First 14 consonants
  [HangulGroups.SIMPLE_VOWELS, VOWELS.slice(0, 10)] // First 10 vowels
])

// Page configurations

// export const PAGES = [
//   {
//     category: Categories.FIRST_CATEGORY,
//     columns: HangulGroups.SIMPLE_VOWELS,
//     id: 'one',
//     range: { column: [0, 10], row: [0, 7] },
//     rows: HangulGroups.SIMPLE_CONSONANTS
//   },
//   {
//     category: Categories.SECOND_CATEGORY,
//     columns: HangulGroups.COMPOUND_VOWELS,
//     id: 'two',
//     range: { column: [0, 11], row: [0, 7] },
//     rows: HangulGroups.SIMPLE_CONSONANTS
//   },
//   {
//     category: Categories.THIRD_CATEGORY,
//     columns: HangulGroups.SIMPLE_VOWELS,
//     id: 'three',
//     range: { column: [0, 10], row: [0, 5] },
//     rows: HangulGroups.DOUBLE_CONSONANTS
//   },
//   {
//     category: Categories.FOURTH_CATEGORY,
//     columns: HangulGroups.COMPOUND_VOWELS,
//     id: 'four',
//     range: { column: [0, 11], row: [0, 5] },
//     rows: HangulGroups.DOUBLE_CONSONANTS
//   }
// ]

// Generate Hangul matrix dynamically with labels

// export const generateHangulMatrixWithLabels = (
//   rows: string[],
//   columns: string[],
//   range: { column: number[]; row: number[] }
// ): { hangul: string; label: string }[][] => {
//   const limitedRows = rows.slice(range.row[0], range.row[1])
//   const limitedColumns = columns.slice(range.column[0], range.column[1])

//   return limitedRows.map(row =>
//     limitedColumns.map(column => ({
//       hangul: row + column,
//       label: HANGUL_LABELS.get(row + column) || ''
//     }))
//   )
// }

// Get matrix for a specific page
// export const getPageMatrixWithLabels = (pageId: string): { hangul: string; label: string }[][] => {
//   const pageConfig = PAGES.find(page => page.id === pageId)
//   if (!pageConfig) {
//     const validIds = PAGES.map(page => page.id).join(', ')
//     throw new Error(`Invalid Page ID: ${pageId}. Valid IDs are: ${validIds}`)
//   }

//   const rows = ALL_HANGUL.get(pageConfig.rows) || []
//   const columns = ALL_HANGUL.get(pageConfig.columns) || []
//   return generateHangulMatrixWithLabels(rows, columns, pageConfig.range)
// }

export const IS_LIVE = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const KEY_SET_V1 = String.raw`(\d+)-(\d+)-(\d+)-(\d+)-(\d+)`
export const KEY_SET_V2 = String.raw`(\d+)-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)`

export const ROWS_PER_PAGE = 8

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
