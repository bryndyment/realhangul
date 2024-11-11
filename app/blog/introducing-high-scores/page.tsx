import { IntroducingHighScores } from '@/comp/pages/blog/introducingHighScores'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog/introducing-high-scores',
  description: 'Introducing high scores.',
  title: 'Introducing High Scores : Real Kana'
})

// components

const IntroducingHighScoresPage: FC = () => <IntroducingHighScores />

export default IntroducingHighScoresPage
