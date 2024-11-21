import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'

// metadata
export const generateMetadata = buildMetadata({
  canonical: '/hangul',
  description: 'Choose some hangul characters and click study.',
  title: 'Hangul : Real Hangul'
})

// components
const HangulMainPage = () => (
  <>
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
  </>
)

export default HangulMainPage
