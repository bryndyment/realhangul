import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/commonSyllables',
  description: 'Choose some common syllables and click study.',
  title: 'Hangul – commonSyllables : Real Hangul'
})

// components

const HangulCommonSyllablesPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.COMMON_SYLLABLES}
    label="hangul"
    next="/words"
    previous="/doubleConsonants"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Common Syllables"
  />
)

export default HangulCommonSyllablesPage
