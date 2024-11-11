import { Base } from '@/comp/base'
import { ButtonLink } from '@/comp/buttonLink'
import { Heading } from '@/comp/common'
import { BOTTOM, LINK, TOP } from '@/util/styles'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

// components

export const Privacy: FC = () => (
  <Base tab="app">
    <Box id="top" sx={TOP.main}>
      <Heading h1="Real Kana App" h2="Privacy Policy" />

      <Typography>Data is not collected from this app.</Typography>
    </Box>

    <Box sx={BOTTOM.main}>
      <ButtonLink href="mailto:info@hoologic.io" isExternal sx={LINK.mainButtonWhite}>
        Contact
      </ButtonLink>
    </Box>
  </Base>
)
