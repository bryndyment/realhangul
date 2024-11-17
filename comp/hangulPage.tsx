'use client'

import { Base } from '@/comp/base'
import { ButtonLink } from '@/comp/buttonLink'
import { CheckUncheckAll } from '@/comp/checkUncheckAll'
import { Heading } from '@/comp/common'
import { ConditionalLink } from '@/comp/conditionalLink'
import { Hangul } from '@/comp/hangul'
import { PostLink } from '@/comp/postLink'
import { Preview } from '@/comp/preview'
import { HangulGroups, Tabs } from '@/util/common'
import { _Sx, BOTTOM, LINK, TOP, zMobileMediaQuery } from '@/util/styles'
import { Box, List, ListItem, Typography } from '@mui/material'
import { capitalize } from 'lodash'
import { FC } from 'react'

// types
type _HangulPageProps = {
  canonical?: string
  columns: number
  description?: string
  id: HangulGroups
  label: string
  link?: string
  linkLabel?: string
  next?: string
  postLink?: string
  previous?: string
  rangeEnd: number
  rangeStart: number
  tab: string
  variant: string
}

// constants
const LOCAL: _Sx = {
  top: { background: 'none', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', pb: 0, [zMobileMediaQuery]: { pb: 0 } }
}

// components
export const HangulPage: FC<_HangulPageProps> = ({ columns, id, label, link, linkLabel, next, previous, rangeEnd, rangeStart, tab, variant }) => (
  <Base tab={tab}>
    <Box id="top" sx={{ ...TOP.main, ...LOCAL.top }}>
      <Box id="hangul">
        <Heading h1={capitalize(tab)} h2={variant} />

        <Typography>
          <>Choose some </>
          <PostLink label={label} link={link} linkLabel={linkLabel} />
          <>, then click </>
          <ButtonLink href="/study" sx={LINK.mainButtonRed}>
            study
          </ButtonLink>
          <>.</>
        </Typography>

        <Hangul columns={columns} hangulPageId={id} rangeEnd={rangeEnd} rangeStart={rangeStart} />
      </Box>

      <Preview isHangul={tab === Tabs.HANGUL} />
    </Box>

    <Box sx={BOTTOM.main}>
      <CheckUncheckAll hangulPageId={id} />

      <List sx={BOTTOM.buttons}>
        <ListItem>
          <ConditionalLink label="Previous" link={previous} />
        </ListItem>

        <ListItem>
          <ConditionalLink label="Next" link={next} />
        </ListItem>
      </List>
    </Box>
  </Base>
)
