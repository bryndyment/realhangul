import { HowIsKatakanaUsed } from '@/comp/pages/blog/howIsKatakanaUsed'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/how-is-katakana-used',
  description: 'How is katakana used?',
  title: 'How Is Katakana Used? : Real Kana'
})

// components

const HowIsKatakanaUsedPage: FC = () => <HowIsKatakanaUsed />

export default HowIsKatakanaUsedPage
