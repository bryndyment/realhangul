import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hiragana/double',
  description: 'Choose some double hiragana and click study.',
  title: 'Hiragana – Double : Real Kana'
})

// components

const HiraganaDoublePage: FC = () => (
  <KanaPage
    canonical="/hiragana/double"
    columns={12}
    id={KanaGroups.HIRAGANA_DOUBLE}
    label="hiragana"
    next="/hiragana/words"
    previous="/hiragana"
    rangeEnd={8}
    rangeStart={5}
    tab="hiragana"
    variant="Double Characters"
  />
)

export default HiraganaDoublePage
