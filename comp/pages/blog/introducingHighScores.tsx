import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { Heading } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const IntroducingHighScores: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="Introducing High Scores" />

      <Scrolling>
        <Typography>High scores are now saved in the browser.</Typography>

        <Typography>
          <Link component={RouterLink} href="/extra" sx={LINK.plain}>
            Continuous play
          </Link>

          <> must be unchecked and </>

          <Link component={RouterLink} href="/extra" sx={LINK.plain}>
            random order
          </Link>

          <> must be checked.</>
        </Typography>

        <Typography>Separate high scores are kept for each unique set of hiragana and katakana.</Typography>
      </Scrolling>
    </Top>

    <Bottom next="/blog/introducing-words" previous="/blog/how-is-katakana-used" />
  </Base>
)
