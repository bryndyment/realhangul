import { HangulPage } from '@/comp/hangulPage'
import { buildMetadata, HangulGroups } from '@/util/common'

// metadata
export const generateMetadata = buildMetadata({
  canonical: '/One',
  description: 'Choose some hangul characters and click study.',
  title: 'Hangul : Real Hangul'
})

// components
const HangulMainPage = () => (
  <>
    <HangulPage
      columns={16}
      id={HangulGroups.SIMPLE_VOWELS}
      label="hangul"
      link="/what-is-hangul"
      next="/compoundVowels"
      rangeEnd={5}
      rangeStart={0}
      tab="hangul"
      variant="Compound Vowels"
    />
  </>
)

export default HangulMainPage
