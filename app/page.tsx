import { Intro } from '@/comp/pages/intro'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/',
  description: 'Learn Hangul with Real Hangul.',
  title: 'Learn Hangul : Real Hangul'
})

// components

const IntroPage: FC = () => <Intro />

export default IntroPage
