import { WhatIsHiragana } from '@/comp/pages/blog/whatIsHiragana'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/what-is-hiragana',
  description: 'What is hiragana?',
  title: 'What Is Hiragana? : Real Kana'
})

// components

const WhatIsHiraganaPage: FC = () => <WhatIsHiragana />

export default WhatIsHiraganaPage
