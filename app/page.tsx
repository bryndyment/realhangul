import { Intro } from '@/comp/pages/intro'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/',
  description: 'Learn hiragana and katakana with Real Kana.',
  title: 'Learn Hiragana And Katakana : Real Kana'
})

// components

const IntroPage: FC = () => <Intro />

export default IntroPage
