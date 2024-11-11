import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/katakana/extended',
  description: 'Choose some extended katakana and click study.',
  title: 'Katakana – Extended : Real Kana'
})

// components

const KatakanaExtendedPage: FC = () => (
  <KanaPage
    columns={14}
    id={KanaGroups.KATAKANA_EXTENDED}
    label="katakana"
    next="/katakana/words"
    previous="/katakana/double"
    rangeEnd={22}
    rangeStart={17}
    tab="katakana"
    variant="Extended Characters"
  />
)

export default KatakanaExtendedPage
