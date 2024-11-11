import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { Heading } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const IntroducingWords: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="Introducing Words" />

      <Scrolling>
        <Typography>
          <Link component={RouterLink} href="/hiragana/words" sx={LINK.plain}>
            Hiragana
          </Link>

          <> and </>

          <Link component={RouterLink} href="/katakana/words" sx={LINK.plain}>
            katakana
          </Link>

          <> words are now available.</>
        </Typography>

        <Typography>The word lists are based upon the standard JLPT language proficiency tests.</Typography>

        <Typography>In Japan, these words are typically written using kana alone (i.e., no kanji).</Typography>
      </Scrolling>
    </Top>

    <Bottom previous="/blog/introducing-high-scores" />
  </Base>
)
