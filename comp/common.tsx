import { SECONDARY_DARKER, SECONDARY_DARKEST, zMobileMediaQuery } from '@/util/styles'
import { Box, SxProps } from '@mui/material'
import Image from 'next/image'
import { FC, ReactNode } from 'react'

// types

type _EmProps = { children: ReactNode }
type _H1Props = { children: ReactNode }
type _H2Props = { children: ReactNode }
type _HeadingProps = { className?: string; h1: string; h2?: string; message?: string; sx?: SxProps }
type _StrongProps = { children: ReactNode }

// components

export const Em: FC<_EmProps> = ({ children }) => (
  <Box component="span" sx={{ fontStyle: 'italic' }}>
    {children}
  </Box>
)

const H1: FC<_H1Props> = ({ children }) => (
  <Box component="h1" sx={{ color: SECONDARY_DARKEST, fontSize: 24, mb: 0, mt: -0.625 }}>
    {children}
  </Box>
)

const H2: FC<_H2Props> = ({ children }) => (
  <Box component="h2" sx={{ color: SECONDARY_DARKER, fontSize: 18, mb: 0, mt: 0.5, [zMobileMediaQuery]: { mt: 0 } }}>
    {children}
  </Box>
)

export const Heading: FC<_HeadingProps> = ({ h1, h2, message, sx = {} }) => (
  <Box sx={{ display: 'flex', mb: 1.75, mt: 0.25, ...sx }}>
    <Image alt="Real Kana logo" height={45} src="/logo.png" style={{ borderRadius: 2, zIndex: 1 }} unoptimized width={45} />

    <Box sx={{ ml: 1.625, [zMobileMediaQuery]: { ml: 1 } }}>
      <H1>{h1}</H1>

      <H2>{h2 || message}</H2>
    </Box>
  </Box>
)

export const Strong: FC<_StrongProps> = ({ children }) => (
  <Box component="span" sx={{ fontWeight: 700 }}>
    {children}
  </Box>
)
