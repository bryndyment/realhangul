import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hangul/words',
  description: 'Choose some hangul words and click study.',
  title: 'Hangul – Words : Real Hangul'
})

// components

const HangulWordsPage: FC = () => (
  <HangulPage
    columns={5}
    id={HangulGroups.HANGUL_WORDS}
    label="hangul"
    link="/introducing-words"
    linkLabel="words"
    previous="/hangul/commonSyllables"
    rangeEnd={23}
    rangeStart={22}
    tab="hangul"
    variant="Words"
  />
)

export default HangulWordsPage
