import { Base } from '@/comp/base'
import { ButtonLink } from '@/comp/buttonLink'
import { Heading } from '@/comp/common'
import { Device } from '@/comp/device'
import { DownloadApp } from '@/comp/downloadApp'
import { _Sx, BOTTOM, LINK, TOP } from '@/util/styles'
import { Box, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'

// constants

const LOCAL: _Sx = { top: { display: 'flex', justifyContent: 'space-between' } }

// components

export const App: FC = () => (
  <Base tab="app">
    <Box id="top" sx={{ ...TOP.main, ...LOCAL.top }}>
      <Box>
        <Heading h1="Real Hangul App" h2="For iOS" />

        <Typography>Learn hangul — quickly.</Typography>

        <List sx={TOP.list}>
          <ListItem sx={TOP.item}>
            <Typography>keyboard, slideshow and swipe modes</Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>repeat problem characters</Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>native pronunciation</Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>basic scoring</Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>nine typefaces</Typography>
          </ListItem>

          <ListItem sx={TOP.item}>
            <Typography>horizontal and vertical text</Typography>
          </ListItem>
        </List>

        <Typography>… and a simple, distraction-free interface.</Typography>
      </Box>

      <Device link="https://itunes.apple.com/app/apple-store/id343807473?pt=17385800&ct=realkana.com%2F&mt=8" />
    </Box>

    <Box sx={BOTTOM.main}>
      <ButtonLink href="mailto:info@hoologic.io" sx={LINK.mainButtonWhite}>
        Contact
      </ButtonLink>

      <DownloadApp />
    </Box>
  </Base>
)
