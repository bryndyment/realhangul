import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'
import { Suspense } from 'react'

// metadata
export const generateMetadata = buildMetadata({
  canonical: '/hangul',
  description: 'Choose some Hangul characters and click study.',
  title: 'Hangul : Real Hangul'
})

// components
const HangulMainPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HangulPage
      columns={16}
      id={HangulGroups.HANGUL}
      label="hangul"
      link="/what-is-hangul"
      next="/hangul/double"
      rangeEnd={5}
      rangeStart={0}
      tab="hangul"
      variant="Single Characters"
    />
  </Suspense>
)

export default HangulMainPage
