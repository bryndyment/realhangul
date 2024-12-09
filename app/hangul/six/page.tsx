import { HangulPage } from '@/comp/hangulPage'
import { ALL_HANGUL, buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/compound-vowel-double-consonant',
  description: 'Choose some doubleConsonants and click study.',
  title: 'Hangul – compound-vowel-double-consonant'
})

// components

const CompoundVowelDoubleConsonantPage: FC = () => (
  <HangulPage
    columns={ALL_HANGUL.get(HangulGroups.COMPOUND_VOWELS)!.slice(0, 11)}
    id={HangulGroups.DOUBLE_CONSONANTS}
    label="Compound vowel double consonants"
    link="/what-is-hangul"
    previous="/hangul/five"
    rows={ALL_HANGUL.get(HangulGroups.DOUBLE_CONSONANTS)!.slice(0, 5)}
    tab="hangul"
    variant="Six"
  />
)

export default CompoundVowelDoubleConsonantPage
