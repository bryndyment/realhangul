import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hiragana/words',
  description: 'Choose some hiragana words and click study.',
  title: 'Hiragana – Words : Real Kana'
})

// components

const HiraganaWordsPage: FC = () => (
  <KanaPage
    columns={5}
    id={KanaGroups.HIRAGANA_WORDS}
    label="hiragana"
    link="/introducing-words"
    linkLabel="words"
    next="/katakana"
    previous="/hiragana/double"
    rangeEnd={9}
    rangeStart={8}
    tab="hiragana"
    variant="Words"
  />
)

export default HiraganaWordsPage
