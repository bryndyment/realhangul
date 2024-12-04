import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hangul/commonSyllables',
  description: 'Choose some hangul common syllables and click study.',
  title: 'Hangul – commonSyllables : Real Hangul'
})

// components

const HangulCommonSyllablesPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.HANGUL_COMMON_SYLLABLES}
    label="hangul"
    link="/introducing-commonSyllables"
    linkLabel="commonSyllables"
    next="/hangul/words"
    previous="/hangul/doubleConsonants"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Common Syllables"
  />
)

export default HangulCommonSyllablesPage
