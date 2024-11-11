import { Base } from '@/comp/base'
import { Top } from '@/comp/bottomTop'
import { Heading } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// constants

const LINKS = [
  ['What Is Hangul?', '/blog/what-is-hangul'],
  ['How Is Hangul Used?', '/blog/how-is-hangul-used'],
  ['Introducing High Scores', '/blog/introducing-high-scores'],
  ['Introducing Words', '/blog/introducing-words']
]

// components

export const Blog: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Hangul Blog" h2="Hangul &amp; Hangul" />

      <Typography>Here are a few useful articles about hangul:</Typography>

      {LINKS.map(item => (
        <Typography key={item[1]}>
          <Link component={RouterLink} href={item[1]} sx={LINK.main}>
            {item[0]}
          </Link>
        </Typography>
      ))}
    </Top>
  </Base>
)
