'use client'

import { Tabs } from '@/util/common'
import { LINK, SCALE, SCALE_OFF, TRANSFORM, WHITE, zMobileMediaQuery } from '@/util/styles'
import { Box, Link, List, ListItem } from '@mui/material'
import { capitalize } from 'lodash'
import RouterLink from 'next/link'
import { FC, ReactNode, useCallback, useMemo } from 'react'

// types

type _BaseProps = { children: ReactNode; tab?: string }
type _ScrollingProps = { children: ReactNode }
type _TabBarProps = { tab: string }

// constants

const PAGES = [
  { link: '/', tab: Tabs.INTRO },
  { link: '/hangul', tab: Tabs.HANGUL },
  { link: '/study', tab: Tabs.STUDY },
  { link: '/extra', tab: Tabs.EXTRA },
  { isHiddenMobile: true, link: '/blog', tab: Tabs.BLOG },
  { link: '/app', tab: Tabs.APP }
]

// components

export const Base: FC<_BaseProps> = ({ children, tab = '' }) => (
  <>
    <TabBar tab={tab} />

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'space-between',
        minHeight: 175,
        padding: 2,
        position: 'relative',
        [zMobileMediaQuery]: { padding: 1 }
      }}
    >
      {children}
    </Box>
  </>
)

export const Scrolling: FC<_ScrollingProps> = ({ children }) => (
  <Box maxHeight={364} sx={{ '::-webkit-scrollbar': { width: 7 }, '::-webkit-scrollbar-thumb': { bgcolor: '#ddd', borderRadius: 3.5 }, overflowY: 'auto' }}>
    {children}
  </Box>
)

const TabBar: FC<_TabBarProps> = ({ tab }) => {
  const linkSx = useMemo(
    () => ({
      '& > div': { display: 'inline-block', transition: TRANSFORM },
      boxShadow: 'inset 0 -5px 5px 0 #e3e9f4',
      display: 'block',
      lineHeight: '37px',
      textAlign: 'center',
      transition: 'none'
    }),
    []
  )

  const linkFrontSx = useMemo(() => ({ ...linkSx, boxShadow: 'none', height: 40 }), [linkSx])
  const mobileSx = useMemo(() => ({ [zMobileMediaQuery]: { display: 'none !important' } }), [])

  const tabSx = useMemo(
    () => ({
      '&:first-of-type, &:first-of-type > *': { borderLeftWidth: 0, borderTopLeftRadius: 6 },
      '&:last-child, &:last-child > *': { borderTopRightRadius: 6 },
      bgcolor: WHITE,
      border: '3px solid #b6cbf3',
      borderRightWidth: 0,
      borderTopWidth: 0,
      display: 'unset',
      flexGrow: 1,
      p: 0,
      width: 'unset',
      [zMobileMediaQuery]: {
        '&:nth-of-type(2) > a::before': { content: '"ひ"', fontSize: 16, lineHeight: 0 },
        '&:nth-of-type(3) > a::before': { content: '"カ"', fontSize: 16, lineHeight: 0 }
      }
    }),
    []
  )

  const tabFrontSx = useMemo(
    () => ({
      ...tabSx,
      bgcolor: 'none',
      borderBottomWidth: 0,
      [zMobileMediaQuery]: {
        '&:nth-of-type(2) > a::before': { content: '"ひ"', fontSize: 16, lineHeight: 0 },
        '&:nth-of-type(3) > a::before': { content: '"カ"', fontSize: 16, lineHeight: 0 }
      }
    }),
    [tabSx]
  )

  const childScale = (event: any) => {
    const width = event.currentTarget.children[0].offsetWidth

    const scale = ((width + 1) / width + SCALE) / 2

    event.currentTarget.children[0].style.transform = `scale(${scale})`
  }

  const childScaleOff = (event: any) => (event.currentTarget.children[0].style.transform = `scale(${SCALE_OFF})`)

  const linkRef = useCallback((link: any) => {
    if (link !== null) {
      childScale({ currentTarget: link })
    }
  }, [])

  return (
    <List sx={{ display: 'flex', height: 40, listStyleType: 'none', m: 0, p: 0 }}>
      {PAGES.map((item, index) =>
        item.tab === tab ? (
          <ListItem key={index} sx={{ ...tabFrontSx, ...(item.isHiddenMobile && mobileSx) }}>
            <Link component={RouterLink} href={item.link} ref={linkRef} sx={{ ...LINK.main, ...linkSx, ...linkFrontSx }}>
              <Box sx={{ ...((item.tab === Tabs.HIRAGANA || item.tab === Tabs.KATAKANA) && mobileSx) }}>{capitalize(item.tab)}</Box>
            </Link>
          </ListItem>
        ) : (
          <ListItem key={index} sx={{ ...tabSx, ...(item.isHiddenMobile && mobileSx) }}>
            <Link component={RouterLink} href={item.link} onMouseOut={childScaleOff} onMouseOver={childScale} sx={{ ...LINK.main, ...linkSx }}>
              <Box sx={{ ...((item.tab === Tabs.HIRAGANA || item.tab === Tabs.KATAKANA) && mobileSx) }}>{capitalize(item.tab)}</Box>
            </Link>
          </ListItem>
        )
      )}
    </List>
  )
}
