import { HowIsHiraganaUsed } from '@/comp/pages/blog/howIsHiraganaUsed'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/how-is-hiragana-used',
  description: 'How is hiragana used?',
  title: 'How Is Hiragana Used? : Real Kana'
})

// components

const HowIsHiraganaUsedPage: FC = () => <HowIsHiraganaUsed />

export default HowIsHiraganaUsedPage
