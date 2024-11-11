import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { ButtonLink } from '@/comp/buttonLink'
import { Em, Heading, Strong } from '@/comp/common'
import { EXAMPLE, LINK, TOP } from '@/util/styles'
import { Box, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'

// components

export const HowIsHangulUsed: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="How Is Hangul Used?" />

      <Scrolling>
        <Typography>
          <>Here are some examples of where </>

          <ButtonLink href="/blog/what-is-hangul" sx={LINK.plain}>
            hangul
          </ButtonLink>

          <> is used in Korean writing.</>
        </Typography>

        <List sx={TOP.list}>
          <ListItem sx={TOP.item}>
            <Typography>
              <>Everyday writing in Korea, including signage, books, and official documents:</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>안녕하세요</Strong>

                <>。</>

                <Em>(‘Hello’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <>Native Korean words and phrases, particularly where Chinese characters (hanja) are rarely used:</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>우리</Strong>

                <> </>

                <Em>(‘we’ or ‘us’),</Em>

                <> </>

                <Strong>사랑</Strong>

                <> </>

                <Em>(‘love’),</Em>

                <> </>

                <Strong>친구</Strong>

                <> </>

                <Em>(‘friend’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <>Grammar particles, verb endings, and sentence structure, unique to the Korean language:</>

              <Box component="span" sx={EXAMPLE}>
                <>저는 </>

                <Strong>학교에</Strong>

                <> 갑니다.</>

                <Em>(‘I am going to school.’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <Em>Romanization support,</Em>

              <> which provides phonetic guidance for non-native speakers.</>
            </Typography>
          </ListItem>
        </List>
      </Scrolling>
    </Top>

    <Bottom next="/blog/what-is-hangul" previous="/blog/what-is-hangul" />
  </Base>
)
