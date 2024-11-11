import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { ButtonLink } from '@/comp/buttonLink'
import { Em, Heading, Strong } from '@/comp/common'
import { EXAMPLE, LINK, TOP } from '@/util/styles'
import { Box, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'

// components

export const HowIsHiraganaUsed: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="How Is Hiragana Used?" />

      <Scrolling>
        <Typography>
          <>Here are some examples of where </>

          <ButtonLink href="/blog/what-is-hiragana" sx={LINK.plain}>
            hiragana
          </ButtonLink>

          <> is used in Japanese writing.</>
        </Typography>

        <List sx={TOP.list}>
          <ListItem sx={TOP.item}>
            <Typography>
              <>Anything written for young children (school texts, manga, etc.):</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>わたしはたなかです</Strong>

                <>。</>

                <Em>(‘I am Tanaka.’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <>Verb endings, particles, and other grammar-related cases:</>

              <Box component="span" sx={EXAMPLE}>
                <>私</>

                <Strong>は</Strong>

                <>日本語</>

                <Strong>を</Strong>

                <>勉強</>

                <Strong>している</Strong>

                <>。</>

                <Em>(‘I am studying Japanese.’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <>Hundreds of words for which there is no kanji, or where the kanji version of the word is rarely used:</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>ここ</Strong>

                <> </>

                <Em>(‘here’),</Em>

                <> </>

                <Strong>はい</Strong>

                <> </>

                <Em>(‘yes’),</Em>

                <> </>

                <Strong>きれい</Strong>

                <> </>

                <Em>(‘pretty’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <Em>Furigana,</Em>

              <> the small hiragana “subtitles” that appear alongside kanji.</>
            </Typography>
          </ListItem>
        </List>
      </Scrolling>
    </Top>

    <Bottom next="/blog/what-is-katakana" previous="/blog/what-is-hiragana" />
  </Base>
)
