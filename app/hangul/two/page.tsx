import { HangulPage } from '@/comp/hangulPage'
import { ALL_HANGUL, buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/simple-vowel-simple-consonant',
  description: 'Choose some simple consonants and simple vowels study.',
  title: 'Hangul Practice - Page 2'
})

// components
const SimpleVowelSimpleConsonantPageTwo: FC = () => (
  <HangulPage
    columns={ALL_HANGUL.get(HangulGroups.SIMPLE_VOWELS)!.slice(0, 10)}
    id={HangulGroups.SIMPLE_VOWELS}
    label="Vowels and Consonants"
    link="/what-is-hangul"
    next="/hangul/three"
    previous="/hangul"
    rows={ALL_HANGUL.get(HangulGroups.SIMPLE_CONSONANTS)!.slice(7, 14)}
    tab="hangul"
    variant="Two"
  />
)

export default SimpleVowelSimpleConsonantPageTwo
