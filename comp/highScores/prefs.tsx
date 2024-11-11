'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { LINK } from '@/util/styles'
import { Box, Link } from '@mui/material'
import RouterLink from 'next/link'
import { FC, useMemo } from 'react'

// components

export const HighScoresPrefs: FC = () => {
  const { isContinuousPlay, isRandomOrder, updateContext } = useAppContext()

  const highScoresSx = useMemo(
    () => ({ background: 'linear-gradient(to right, white 20%, rgba(255, 255, 255, 0))', borderRadius: 1, mt: 2, pb: 1.625, pl: 2.75, pr: 3, pt: 1.5 }),
    []
  )

  const handleClick = () => {
    updateContext({ isContinuousPlay: false, isRandomOrder: true })
  }

  const isMobile = window.matchMedia('(max-width: 609px)').matches

  if (isMobile) return null

  if (isContinuousPlay || !isRandomOrder) {
    return (
      <Box sx={highScoresSx}>
        <Box component="span" sx={{ mr: 1 }}>
          <Link component={RouterLink} href="/blog/introducing-high-scores" sx={LINK.plain}>
            High scores
          </Link>

          <> are disabled.</>
        </Box>

        <Link component="a" onClick={handleClick} sx={LINK.main}>
          Enable
        </Link>
      </Box>
    )
  }

  return (
    <Box sx={highScoresSx}>
      <Link component={RouterLink} href="/blog/introducing-high-scores" sx={LINK.plain}>
        High scores
      </Link>

      <> are enabled.</>
    </Box>
  )
}
