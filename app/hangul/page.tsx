import { HangulPage } from '@/comp/hangulPage'
import { ALL_HANGUL, buildMetadata, HangulGroups } from '@/util/common'

// metadata
export const generateMetadata = buildMetadata({
  canonical: '/simple-vowel-simple-consonant',
  description: 'Choose some hangul characters and click study.',
  title: 'Hangul Practice - Page 1'
})

const SimpleVowelSimpleConsonantPageOne = () => (
  <HangulPage
    columns={ALL_HANGUL.get(HangulGroups.SIMPLE_VOWELS)!.slice(0, 10)}
    id={HangulGroups.SIMPLE_VOWELS}
    label="Vowels and Consonants"
    link="/what-is-hangul"
    next="/hangul/two"
    rows={ALL_HANGUL.get(HangulGroups.SIMPLE_CONSONANTS)!.slice(0, 7)}
    tab="hangul"
    variant="One"
  />
)

export default SimpleVowelSimpleConsonantPageOne
