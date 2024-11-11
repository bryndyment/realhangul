'use client'

import { useRefreshOnRouteChange } from '@/hooks/useRefreshOnRouteChange'
import { _Sx } from '@/util/styles'
import { Box } from '@mui/material'
import { FC } from 'react'

// constants

const AD_SX = { '& > div': { height: '100%' }, height: 250, position: 'absolute', width: 300 }

const LOCAL: _Sx = {
  adBottomLeftSx: { ...AD_SX, right: 614, top: 310 },
  adBottomRightSx: { ...AD_SX, left: 614, top: 310 },
  adTopLeftSx: { ...AD_SX, right: 614, top: 40 },
  adTopRightSx: { ...AD_SX, left: 614, top: 40 }
}

// components

export const DesktopAds: FC = () => {
  useRefreshOnRouteChange()

  if (typeof window === 'undefined' || matchMedia('(max-width: 609px)').matches) return null

  return (
    <>
      <Box sx={LOCAL.adBottomLeftSx}>
        <Box id="div-gpt-ad-1601001555256-0">
          <script>{(window as any).googletag?.cmd.push(() => (window as any).googletag?.display('div-gpt-ad-1601001555256-0'))}</script>
        </Box>
      </Box>

      <Box sx={LOCAL.adBottomRightSx}>
        <Box id="div-gpt-ad-1601001633012-0">
          <script>{(window as any).googletag?.cmd.push(() => (window as any).googletag?.display('div-gpt-ad-1601001633012-0'))}</script>
        </Box>
      </Box>

      <Box sx={LOCAL.adTopLeftSx}>
        <Box id="div-gpt-ad-1601001504782-0">
          <script>{(window as any).googletag?.cmd.push(() => (window as any).googletag?.display('div-gpt-ad-1601001504782-0'))}</script>
        </Box>
      </Box>

      <Box sx={LOCAL.adTopRightSx}>
        <Box id="div-gpt-ad-1601001602392-0">
          <script>{(window as any).googletag?.cmd.push(() => (window as any).googletag?.display('div-gpt-ad-1601001602392-0'))}</script>
        </Box>
      </Box>
    </>
  )
}
