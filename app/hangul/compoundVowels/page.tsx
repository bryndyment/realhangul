import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hangul/compoundVowels',
  description: 'Choose some hangul compound vowels and click study.',
  title: 'Hangul – Compound Vowels : Real Hangul'
})

// components

const HangulCompoundVowelsPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.HANGUL_COMPOUND_VOWELS}
    label="hangul"
    link="/introducing-compoundVowels"
    linkLabel="words"
    next="/hangul/simpleConsonants"
    previous="/hangul"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Compound Vowels"
  />
)

export default HangulCompoundVowelsPage
