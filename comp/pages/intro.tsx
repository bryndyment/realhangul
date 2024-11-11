import { Base } from '@/comp/base'
import { ButtonLink } from '@/comp/buttonLink'
import { Em, Heading } from '@/comp/common'
import { Device } from '@/comp/device'
import { DownloadApp } from '@/comp/downloadApp'
import { BOTTOM, LINK, TOP, zMobileMediaQuery } from '@/util/styles'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

// constants

const LOCAL = {
  credit: { alignItems: 'baseline', display: 'flex' },
  hangul: { [zMobileMediaQuery]: { '&::before': { content: '"한"', display: 'inline-block', fontSize: 16, margin: -0.375 }, '& span': { display: 'none' } } },
  mobile: { [zMobileMediaQuery]: { display: 'none' } },
  top: { display: 'flex', justifyContent: 'space-between' },
  yori: { ml: 0.5, opacity: 0.3 }
}

// components

export const Intro: FC = () => (
  <Base tab="intro">
    <Box id="top" sx={{ ...TOP.main, ...LOCAL.top }}>
      <Box>
        <Heading h1="Real Hangul" h2="Learn Korean Writing" />

        <Typography>
          <>It’s easy to use. Click </>

          <ButtonLink href="/hangul" sx={LINK.mainButtonRed}>
            <Box component="span" sx={LOCAL.hangul}>
              <span>hangul</span>
            </Box>
          </ButtonLink>

          <> and/or </>

          <> and choose which characters you’d like to study.</>
        </Typography>

        <Typography>
          <>Then click </>

          <ButtonLink href="/study" sx={LINK.mainButton}>
            study
          </ButtonLink>

          <> and type each character’s rōmaji equivalent (e.g. </>

          <Em>‘a’).</Em>
        </Typography>

        <Typography>That’s it!</Typography>
      </Box>

      <Device link="/app" />
    </Box>

    <Box sx={BOTTOM.main}>
      <Box component="span" sx={{ ...LOCAL.credit }}>
        <ButtonLink href="https://hoologic.io" isExternal sx={{ ...LINK.mainButtonWhite, ...LOCAL.mobile }}>
          Hoo Logic
        </ButtonLink>

        <Box component="span" sx={{ ...LOCAL.mobile, ...LOCAL.yori }}>
          より
        </Box>
      </Box>

      <DownloadApp />
    </Box>
  </Base>
)
