import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { Em, Heading, Strong } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const WhatIsKatakana: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="What Is Katakana?" />

      <Scrolling>
        <Typography>
          <>Katakana is one of four writing systems used in Japanese (the others being </>

          <Link component={RouterLink} href="/blog/what-is-hiragana" sx={LINK.plain}>
            hiragana
          </Link>

          <>, kanji, and rōmaji).</>
        </Typography>

        <Typography>
          <>Katakana is used primarily to represent foreign names and loan words that have been incorporated into the language, and consists of 71 </>

          <Link component={RouterLink} href="/katakana" sx={LINK.plain}>
            single
          </Link>

          <> and 36 </>

          <Link component={RouterLink} href="/katakana/double" sx={LINK.plain}>
            double
          </Link>

          <> characters.</>
        </Typography>

        <Typography>
          <>Each of these katakana has an identically-pronounced </>

          <Link component={RouterLink} href="/hiragana" sx={LINK.plain}>
            hiragana
          </Link>

          <> equivalent.</>
        </Typography>

        <Typography>
          <>There are also about 30 </>

          <Link component={RouterLink} href="/katakana/extended" sx={LINK.plain}>
            extended
          </Link>

          <> katakana that represent sounds that don’t exist in native Japanese words, such as </>

          <Strong>ティ</Strong>

          <> </>

          <Em>(‘ti’)</Em>

          <> in </>

          <Strong>パーティー</Strong>

          <> </>

          <Em>(‘party’).</Em>
        </Typography>

        <Typography>As such, extended katakana have no hiragana equivalent.</Typography>
      </Scrolling>
    </Top>

    <Bottom next="/blog/how-is-katakana-used" previous="/blog/how-is-hiragana-used" />
  </Base>
)
