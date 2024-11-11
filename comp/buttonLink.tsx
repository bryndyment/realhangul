'use client'

import { scale, scaleOff } from '@/util/common'
import { Link, SxProps } from '@mui/material'
import RouterLink from 'next/link'
import { FC, ReactNode } from 'react'

// types

type _ButtonLinkProps = { children: ReactNode; href: string; isExternal?: boolean; sx?: SxProps }

// components

export const ButtonLink: FC<_ButtonLinkProps> = ({ children, href, isExternal = false, sx }) => (
  <Link component={isExternal ? 'a' : RouterLink} href={href} onMouseOut={scaleOff} onMouseOver={scale} sx={sx} target={isExternal ? '_blank' : undefined}>
    {children}
  </Link>
)
