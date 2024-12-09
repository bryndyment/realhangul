import { HangulPage } from '@/comp/hangulPage'
import { ALL_HANGUL, buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/compound-vowel-simple-consonant',
  description: 'Choose some doubleConsonants and click study.',
  title: 'Compound Vowel - Page2'
})

// components

const CompoundVowelSimpleConsonantPageTwo: FC = () => (
  <HangulPage
    columns={ALL_HANGUL.get(HangulGroups.COMPOUND_VOWELS)!.slice(0, 11)}
    id={HangulGroups.COMPOUND_VOWELS}
    label="Compound Vowels and Consonants"
    link="/what-is-hangul"
    next="/hangul/five"
    previous="/hangul/three"
    rows={ALL_HANGUL.get(HangulGroups.SIMPLE_CONSONANTS)!.slice(7, 14)}
    tab="hangul"
    variant="Four"
  />
)

export default CompoundVowelSimpleConsonantPageTwo
