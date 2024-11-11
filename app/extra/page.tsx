import { Extra } from '@/comp/pages/extra'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/extra',
  description: 'Choose some typefaces and options and click study.',
  title: 'Extra : Real Kana'
})

// components

const ExtraPage: FC = () => <Extra />

export default ExtraPage
