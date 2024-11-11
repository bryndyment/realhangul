import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { Em, Heading, Strong } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const WhatIsHiragana: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="What Is Hiragana?" />

      <Scrolling>
        <Typography>
          <>Hiragana is one of four writing systems used in Japanese (the others being </>

          <Link component={RouterLink} href="/blog/what-is-katakana" sx={LINK.plain}>
            katakana
          </Link>

          <>, kanji, and rōmaji).</>
        </Typography>

        <Typography>
          <>It is the most elementary of the four, is the first one taught to children, and consists of 71 </>

          <Link component={RouterLink} href="/hiragana" sx={LINK.plain}>
            single
          </Link>

          <> and 36 </>

          <Link component={RouterLink} href="/hiragana/double" sx={LINK.plain}>
            double
          </Link>

          <> characters.</>
        </Typography>

        <Typography>
          Think of hiragana as the Japanese alphabet. Every Japanese sentence can be written entirely in hiragana, since 100% of the sounds used in Japanese
          have a matching hiragana character.
        </Typography>

        <Typography>
          Each hiragana character is pronounced only one way, and, with a few exceptions, there are no two characters with the same pronunciation.
        </Typography>

        <Typography>
          <>Exceptions include </>

          <Strong>じ/ぢ</Strong>

          <> </>

          <Em>(‘ji’)</Em>

          <> and </>

          <Strong>ず/づ</Strong>

          <> </>

          <Em>(‘zu’).</Em>
        </Typography>

        <Typography>Historically they sounded different, but they are identical in modern Japanese.</Typography>
      </Scrolling>
    </Top>

    <Bottom next="/blog/how-is-hiragana-used" />
  </Base>
)
