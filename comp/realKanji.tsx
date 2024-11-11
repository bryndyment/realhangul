'use client'

import { Phases, scale, scaleOff, Visibilities } from '@/util/common'
import { LINK } from '@/util/styles'
import { BREAKPOINTS } from '@/util/theme'
import { Link } from '@mui/material'
import { FC } from 'react'

// types

type _RealKanjiProps = { phase?: Phases }

// components

export const RealKanji: FC<_RealKanjiProps> = ({ phase }) => (
  <Link
    component="a"
    href="https://realkanji.com"
    onMouseOut={scaleOff}
    onMouseOver={scale}
    sx={{
      ...LINK.mainButtonWhite,
      [BREAKPOINTS.down('sm')]: { visibility: Visibilities.HIDDEN },
      ...(phase !== undefined && { visibility: phase === Phases.INITIAL ? Visibilities.VISIBLE : Visibilities.HIDDEN })
    }}
  >
    Real Kanji
  </Link>
)
