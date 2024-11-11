import { Study } from '@/comp/pages/study'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// types

type _StudyPageProps = { searchParams: Promise<{ [key: string]: string }> }

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/study',
  description: 'Type this character’s rōmaji equivalent.',
  title: 'Study : Real Kana'
})

// components

const StudyPage: FC<_StudyPageProps> = async props => {
  const searchParams = await props.searchParams

  return <Study searchParams={searchParams} />
}

export default StudyPage
