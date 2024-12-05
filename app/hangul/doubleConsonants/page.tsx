import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/consonants/double',
  description: 'Choose some doubleConsonants and click study.',
  title: 'Hangul – Double Consonants : Real Hangul'
})

// components

const HangulDoubleConsonantsPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.DOUBLE_CONSONANTS}
    label="hangul"
    next="/commonSyllables"
    previous="/simpleConsonants"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Double Consonants"
  />
)

export default HangulDoubleConsonantsPage
