import { WhatIsHangul } from '@/comp/pages/blog/whatIsHangul'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/what-is-hangul',
  description: 'What is Hangul? Learn about the Korean writing system.',
  title: 'What Is Hangul? : Real Hangul'
})

// components

const WhatIsHangulPage: FC = () => <WhatIsHangul />

export default WhatIsHangulPage
