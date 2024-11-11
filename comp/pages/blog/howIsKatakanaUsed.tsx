import { Base, Scrolling } from '@/comp/base'
import { Bottom, Top } from '@/comp/bottomTop'
import { Em, Heading, Strong } from '@/comp/common'
import { EXAMPLE, LINK, TOP } from '@/util/styles'
import { Box, Link, List, ListItem, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const HowIsKatakanaUsed: FC = () => (
  <Base tab="blog">
    <Top>
      <Heading h1="Real Kana Blog" h2="How Is Katakana Used?" />

      <Scrolling>
        <Typography>
          <>Here are some examples of where </>

          <Link component={RouterLink} href="/blog/what-is-katakana" sx={LINK.plain}>
            katakana
          </Link>

          <> is used in Japanese writing.</>
        </Typography>

        <List sx={TOP.list}>
          <ListItem sx={TOP.item}>
            <Typography>
              <>Foreign loan words:</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>ビル</Strong>

                <> </>

                <Em>(‘building’),</Em>

                <> </>

                <Strong>コーヒー</Strong>

                <> </>

                <Em>(‘coffee’),</Em>

                <> </>

                <Strong>クロワッサン</Strong>

                <> </>

                <Em>(‘croissant’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <>Foreign proper nouns:</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>ロンドン</Strong>

                <> </>

                <Em>(‘London’),</Em>

                <> </>

                <Strong>ジョン スミス</Strong>

                <> </>

                <Em>(‘John Smith’)</Em>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>
              <>Onomatopoeia (words used to represent sounds), used heavily in spoken and written Japanese, including manga:</>

              <Box component="span" sx={EXAMPLE}>
                <Strong>ピンポン</Strong>

                <> </>

                <Em>(‘pinpon’),</Em>

                <> the “ding dong” sound of a doorbell.</>
              </Box>
            </Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>For emphasis, similar to the use of italics in English.</Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>For clarity, similar to the use of capital letters in English.</Typography>
          </ListItem>
        </List>
      </Scrolling>
    </Top>

    <Bottom next="/blog/introducing-high-scores" previous="/blog/what-is-katakana" />
  </Base>
)
