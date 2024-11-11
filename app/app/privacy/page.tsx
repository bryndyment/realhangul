import { Privacy } from '@/comp/pages/app/privacy'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/app/privacy',
  description: 'The Real Kana app – privacy policy.',
  robots: 'nofollow, noindex',
  title: 'Privacy Policy : Real Kana App'
})

// components

const PrivacyPage: FC = () => <Privacy />

export default PrivacyPage
