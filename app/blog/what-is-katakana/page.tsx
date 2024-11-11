import { WhatIsKatakana } from '@/comp/pages/blog/whatIsKatakana'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/what-is-katakana',
  description: 'What is katakana?',
  title: 'What Is Katakana? : Real Kana'
})

// components

const WhatIsKatakanaPage: FC = () => <WhatIsKatakana />

export default WhatIsKatakanaPage
