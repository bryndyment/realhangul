import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { Em, Heading, Strong } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const WhatIsHangul: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Hangul Blog" h2="What Is Hangul?" />

      <Scrolling>
        <Typography>
          <>Hangul is the official writing system of the Korean language, created in the 15th century by King Sejong the Great.</>
        </Typography>

        <Typography>
          <>The basic hangul alphabet consists of 24 letters: 14 </>

          <Link component={RouterLink} href="/hangul" sx={LINK.plain}>
            consonants
          </Link>

          <> and 10 </>

          <Link component={RouterLink} href="/hangul" sx={LINK.plain}>
            vowels
          </Link>

          <>. These combine to form syllable blocks used in writing Korean words.</>
        </Typography>

        <Typography>
          Unlike many other writing systems, hangul was deliberately created with a clear purpose and scientific design. The shapes of the consonants are based
          on the shape of the mouth and tongue when pronouncing them, while the vowels are based on philosophical concepts of heaven (ㆍ), earth (ㅡ), and human
          (ㅣ).
        </Typography>

        <Typography>
          <Strong>한글</Strong>

          <> (hangul) is made up of two syllables: </>

          <Strong>한</Strong>

          <> </>

          <Em>(han)</Em>

          <> and </>

          <Strong>글</Strong>

          <> </>

          <Em>(gul)</Em>

          <>.</>
        </Typography>

        <Typography>
          <>
            Hangul is remarkably easy to learn compared to other writing systems. Its logical structure and consistent rules make it possible for most people to
            learn the basics within a few hours.
          </>
        </Typography>

        <Typography>
          <>
            The simplicity of hangul was intentional - it was created to promote literacy among common people at a time when only the elite could read and write
            using Chinese characters.
          </>
        </Typography>
      </Scrolling>
    </Top>

    <Bottom next="/blog/how-is-hangul-used" />
  </Base>
)
