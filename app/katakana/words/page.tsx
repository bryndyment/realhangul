import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/katakana/words',
  description: 'Choose some katakana words and click study.',
  title: 'Katakana – Words : Real Kana'
})

// components

const KatakanaWordsPage: FC = () => (
  <KanaPage
    columns={5}
    id={KanaGroups.KATAKANA_WORDS}
    label="katakana"
    link="/introducing-words"
    linkLabel="words"
    previous="/katakana/extended"
    rangeEnd={23}
    rangeStart={22}
    tab="katakana"
    variant="Words"
  />
)

export default KatakanaWordsPage
