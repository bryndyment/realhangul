'use client'

import { AdMetricsPro } from '@/comp/adMetricsPro'
import { AppContext } from '@/comp/appContext'
import { Background } from '@/comp/background'
import { DesktopAds } from '@/comp/desktopAds'
import { MobileAd } from '@/comp/mobileAd'
import { PreloadImages } from '@/comp/preloadImages'
import { ThemeContext } from '@/comp/themeContext'
import { IS_LIVE } from '@/util/common'
import { _Sx, BLACK, WHITE, zMobileMediaQuery } from '@/util/styles'
import { Box, CssBaseline } from '@mui/material'
import { FC, ReactNode, useRef } from 'react'

// types

type _ClientProps = { children: ReactNode }

// constants

const LOCAL: _Sx = {
  all: {
    '& p': { '&:last-of-type': { mb: 0 }, lineHeight: 1.6, mb: 1 },
    alignItems: 'center',
    color: BLACK,
    display: 'flex',
    fontFamily: 'lucida grande, verdana, sans-serif',
    fontSize: 15,
    justifyContent: 'center',
    letterSpacing: 0,
    lineHeight: 'normal',
    minHeight: '100vh',
    userSelect: 'none',
    WebkitFontSmoothing: 'auto',
    [zMobileMediaQuery]: { flexDirection: 'column', justifyContent: 'flex-start' }
  },
  content: {
    borderRadius: 1.5,
    boxShadow: '0 0 15px 0 rgba(205, 205, 205, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 594,
    minHeight: 600,
    minWidth: 304,
    mx: 1,
    my: 1.125,
    position: 'relative',
    width: 'calc(100% - 16px)',
    [zMobileMediaQuery]: { bgcolor: WHITE, minHeight: 'auto' }
  }
}

// components

export const Client: FC<_ClientProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <ThemeContext>
        <CssBaseline />

        <AppContext>
          <Box sx={LOCAL.all}>
            <Box ref={containerRef} sx={LOCAL.content}>
              <Background containerRef={containerRef} />

              {children}

              {IS_LIVE && <DesktopAds />}
            </Box>

            {IS_LIVE && <MobileAd />}
          </Box>
        </AppContext>
      </ThemeContext>

      {IS_LIVE && <AdMetricsPro />}

      <PreloadImages />
    </>
  )
}
