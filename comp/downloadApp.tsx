'use client'

import { scale, scaleOff } from '@/util/common'
import { _Sx, TRANSFORM } from '@/util/styles'
import { Link } from '@mui/material'
import { FC } from 'react'

// constants

const LOCAL: _Sx = {
  link: {
    background: 'url(/download.svg) top right no-repeat',
    color: 'transparent',
    display: 'inline-block',
    height: 40,
    position: 'relative',
    right: -1,
    textDecoration: 'none',
    transition: TRANSFORM,
    width: 120
  }
}

// components

export const DownloadApp: FC = () => (
  <Link
    component="a"
    href="https://itunes.apple.com/app/apple-store/id343807473?pt=17385800&ct=realkana.com%2F&mt=8"
    id="download"
    onMouseOut={scaleOff}
    onMouseOver={scale}
    sx={LOCAL.link}
  >
    Download on the App Store
  </Link>
)
