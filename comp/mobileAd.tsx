'use client'

import { useRefreshOnRouteChange } from '@/hooks/useRefreshOnRouteChange'
import { Box } from '@mui/material'
import { FC } from 'react'

// components

export const MobileAd: FC = () => {
  useRefreshOnRouteChange()

  if (typeof window === 'undefined' || !matchMedia('(max-width: 609px)').matches) return null

  return (
    <Box id="div-gpt-ad-1603205305199-0" sx={{ '& > div': { height: '100%' }, position: 'static' }}>
      <script>{(window as any).googletag?.cmd.push(() => (window as any).googletag?.display('div-gpt-ad-1603205305199-0'))}</script>
    </Box>
  )
}
