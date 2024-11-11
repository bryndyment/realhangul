import { App } from '@/comp/pages/app'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/app',
  description: 'Learn hiragana and katakana with the Real Kana app.',
  title: 'Learn Hiragana And Katakana : Real Kana App'
})

// components

const AppPage: FC = () => <App />

export default AppPage
