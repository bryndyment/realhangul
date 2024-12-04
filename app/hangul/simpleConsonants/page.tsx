import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hangul/simpleConsonants',
  description: 'Choose some hangul simpleConsonants and click study.',
  title: 'Hangul – Simple Consonants : Real Hangul'
})

// components

const HangulSimpleConsonantsPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.HANGUL_SIMPLE_CONSONANTS}
    label="hangul"
    link="/introducing-simpleConsonants"
    linkLabel="simpleConsonants"
    next="/hangul/doubleConsonants"
    previous="/hangul/compoundVowels"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Simple Consonants"
  />
)

export default HangulSimpleConsonantsPage
