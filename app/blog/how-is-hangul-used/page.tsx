import { HowIsHangulUsed } from '@/comp/pages/blog/howIsHangulUsed'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/how-is-hangul-used',
  description: 'How is Hangul used in Korean writing?',
  title: 'How Is Hangul Used? : Real Hangul'
})

// components

const HowIsHangulUsedPage: FC = () => <HowIsHangulUsed />

export default HowIsHangulUsedPage
