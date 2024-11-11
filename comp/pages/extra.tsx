import { Base } from '@/comp/base'
import { ButtonLink } from '@/comp/buttonLink'
import { Heading } from '@/comp/common'
import { HighScoresPrefs } from '@/comp/highScores/prefs'
import { Message } from '@/comp/message'
import { Options } from '@/comp/options'
import { Typefaces } from '@/comp/typefaces'
import { _Sx, BLACK, LINK, SECONDARY, TOP } from '@/util/styles'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

// constants

const LOCAL: _Sx = {
  checkbox: { '&.Mui-checked': { color: SECONDARY }, p: 0 },
  disabled: { mr: 1 },
  highScores: { background: 'linear-gradient(to right, white 20%, rgba(255, 255, 255, 0))', borderRadius: 1, mt: 2, pb: 1.625, pl: 2.75, pr: 3, pt: 1.5 },
  inputLabel: { color: BLACK, cursor: 'pointer', fontSize: 14, fontWeight: 700, ml: 0.875, py: 0.5, textTransform: 'uppercase' },
  option: { alignItems: 'center', display: 'flex' },
  options: { background: 'linear-gradient(to right, white 20%, rgba(255, 255, 255, 0))', borderRadius: 1, px: 2.625, py: 1 },
  top: { background: 'none', pb: 0 }
}

// components

export const Extra: FC = () => (
  <Base tab="extra">
    <Box id="top" sx={{ ...TOP.main, ...LOCAL.top }}>
      <Heading h1="Extra" h2="Preferences" />

      <Typography>
        <>Choose some typefaces and options, then click </>

        <ButtonLink href="/study" sx={LINK.mainButtonRed}>
          study
        </ButtonLink>

        <>.</>
      </Typography>

      <Typefaces />

      <Options />

      <HighScoresPrefs />
    </Box>

    <Message />
  </Base>
)
