import { App } from '@/comp/pages/app'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/app',
  description: 'Learn hangul with the Real Hangul app.',
  title: 'Learn Hangul : Real Hangul App'
})

// components

const AppPage: FC = () => <App />

export default AppPage
