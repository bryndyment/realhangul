'use client'

import { scale, scaleOff } from '@/util/common'
import { GRAY, TRANSFORM, zMobileMediaQuery } from '@/util/styles'
import { Box, Link } from '@mui/material'
import Image from 'next/image'
import RouterLink from 'next/link'
import { FC } from 'react'

// types

type _DeviceProps = { link: string }

// constants

const LOCAL = {
  device: {
    background: '#fbfbfb',
    border: `1px solid ${GRAY[400]}`,
    borderRadius: 2.5,
    boxShadow: '0 0 15px 0px rgba(205, 205, 205, 0.95)',
    pb: 5,
    position: 'absolute',
    pt: 4,
    right: 0,
    top: 0,
    transition: TRANSFORM
  },
  link: { minWidth: 175, ml: 6.25, position: 'relative', width: 175, [zMobileMediaQuery]: { display: 'none' } }
}

// components

export const Device: FC<_DeviceProps> = ({ link }) => {
  const markup = (
    <Box onMouseOut={scaleOff} onMouseOver={scale} sx={LOCAL.device}>
      <Image
        alt="app"
        height={275}
        src="/app.jpg"
        style={{ borderBottom: `1px solid ${GRAY[400]}`, borderTop: `1px solid ${GRAY[400]}`, boxSizing: 'content-box', display: 'block' }}
        unoptimized
        width={175}
      />

      <Image alt="rating" height={15} src="/rating.png" style={{ left: 49, position: 'absolute', top: 321 }} unoptimized width={76} />
    </Box>
  )

  if (/^http/.test(link)) {
    return (
      <Link component="a" href={link} sx={LOCAL.link}>
        {markup}
      </Link>
    )
  }

  return (
    <Link component={RouterLink} href={link} sx={LOCAL.link}>
      {markup}
    </Link>
  )
}
