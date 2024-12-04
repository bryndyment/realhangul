import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hangul/doubleConsonants',
  description: 'Choose some hangul doubleConsonants and click study.',
  title: 'Hangul – Double Consonants : Real Hangul'
})

// components

const HangulDoubleConsonantsPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.HANGUL_DOUBLE_CONSONANTS}
    label="hangul"
    link="/introducing-doubleConsonants"
    linkLabel="doubleConsonants"
    next="/hangul/commonSyllables"
    previous="/hangul/simpleConsonants"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Double Consonants"
  />
)

export default HangulDoubleConsonantsPage
