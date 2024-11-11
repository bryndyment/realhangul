import { Base } from '@/comp/base'
import { Top } from '@/comp/bottomTop'
import { Heading } from '@/comp/common'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// constants

const LINKS = [
  ['What Is Hiragana?', '/blog/what-is-hiragana'],
  ['How Is Hiragana Used?', '/blog/how-is-hiragana-used'],
  ['What Is Katakana?', '/blog/what-is-katakana'],
  ['How Is Katakana Used?', '/blog/how-is-katakana-used'],
  ['Introducing High Scores', '/blog/introducing-high-scores'],
  ['Introducing Words', '/blog/introducing-words']
]

// components

export const Blog: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="Hiragana &amp; Katakana" />

      <Typography>Here are a few useful articles about hiragana and katakana:</Typography>

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
