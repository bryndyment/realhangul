import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/katakana',
  description: 'Choose some katakana and click study.',
  title: 'Katakana : Real Kana'
})

// components

const KatakanaPage: FC = () => (
  <KanaPage
    columns={16}
    id={KanaGroups.KATAKANA}
    label="katakana"
    link="/what-is-katakana"
    next="/katakana/double"
    previous="/hiragana/words"
    rangeEnd={14}
    rangeStart={9}
    tab="katakana"
    variant="Single Characters"
  />
)

export default KatakanaPage
