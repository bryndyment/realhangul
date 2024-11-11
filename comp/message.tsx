'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { _Sx, zMobileMediaQuery } from '@/util/styles'
import { Typography } from '@mui/material'
import { FC } from 'react'

// constants

const LOCAL: _Sx = {
  message: { bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1, px: 2, py: 1, transition: 'opacity 0.1s', [zMobileMediaQuery]: { display: 'none' } }
}

// components

export const Message: FC = () => {
  const { isMessageShowing, message } = useAppContext()

  return <Typography sx={{ ...LOCAL.message, opacity: Number(isMessageShowing) }}>{message}</Typography>
}
