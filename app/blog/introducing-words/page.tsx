import { IntroducingWords } from '@/comp/pages/blog/introducingWords'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/introducing-words',
  description: 'Introducing words.',
  title: 'Introducing Words : Real Hangul'
})

// components

const IntroducingWordsPage: FC = () => <IntroducingWords />

export default IntroducingWordsPage
