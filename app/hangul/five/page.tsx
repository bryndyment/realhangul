import { HangulPage } from '@/comp/hangulPage'
import { ALL_HANGUL, buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/simple-vowel-double-consonant',
  description: 'Choose some doubleConsonants and click study.',
  title: 'Hangul – Double Consonants : Real Hangul'
})

// components

const SimpleVowelDoubleConsonantPage: FC = () => (
  <HangulPage
    columns={ALL_HANGUL.get(HangulGroups.SIMPLE_VOWELS)!.slice(0, 10)}
    id={HangulGroups.DOUBLE_CONSONANTS}
    label="Simple Vowel Double Consonants"
    link="/what-is-hangul"
    next="/hangul/six"
    previous="/hangul/four"
    rows={ALL_HANGUL.get(HangulGroups.DOUBLE_CONSONANTS)!.slice(0, 5)}
    tab="hangul"
    variant="Five"
  />
)

export default SimpleVowelDoubleConsonantPage
