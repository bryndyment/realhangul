import { HangulPage } from '@/comp/hangulPage'
import { ALL_HANGUL, buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/compound-vowel-simple-consonant',
  description: 'Choose some compound vowel and click study.',
  title: 'Compound Vowel : Page 1'
})

// components

const CompoundVowelSimpleConsonantPageOne: FC = () => (
  <HangulPage
    columns={ALL_HANGUL.get(HangulGroups.COMPOUND_VOWELS)!.slice(0, 11)}
    id={HangulGroups.COMPOUND_VOWELS}
    label="Compound Vowels and Consonants"
    link="/what-is-hangul"
    next="/hangul/four"
    previous="/hangul/two"
    rows={ALL_HANGUL.get(HangulGroups.SIMPLE_CONSONANTS)!.slice(0, 7)}
    tab="hangul"
    variant="Three"
  />
)

export default CompoundVowelSimpleConsonantPageOne
