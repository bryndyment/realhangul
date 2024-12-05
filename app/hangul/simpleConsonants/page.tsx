import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/simpleConsonants',
  description: 'Choose some  simple Consonants and click study.',
  title: 'Hangul – Simple Consonants : Real Hangul'
})

// components

const HangulSimpleConsonantsPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.SIMPLE_CONSONANTS}
    label="hangul"
    next="/doubleConsonants"
    previous="/compoundVowels"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Simple Consonants"
  />
)

export default HangulSimpleConsonantsPage
