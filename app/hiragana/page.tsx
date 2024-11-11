import { KanaPage } from '@/comp/kanaPage'
import { buildMetadata, KanaGroups } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/hiragana',
  description: 'Choose some hiragana and click study.',
  title: 'Hiragana : Real Kana'
})

// components

const HiraganaPage: FC = () => (
  <KanaPage
    columns={16}
    id={KanaGroups.HIRAGANA}
    label="hiragana"
    link="/what-is-hiragana"
    next="/hiragana/double"
    rangeEnd={5}
    rangeStart={0}
    tab="hiragana"
    variant="Single Characters"
  />
)

export default HiraganaPage
