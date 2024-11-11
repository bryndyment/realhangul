import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/katakana/double',
  description: 'Choose some double katakana and click study.',
  title: 'Katakana – Double : Real Kana'
})

// components

const KatakanaDoublePage: FC = () => (
  <KanaPage
    columns={12}
    id={KanaGroups.KATAKANA_DOUBLE}
    label="katakana"
    next="/katakana/extended"
    previous="/katakana"
    rangeEnd={17}
    rangeStart={14}
    tab="katakana"
    variant="Double Characters"
  />
)

export default KatakanaDoublePage
