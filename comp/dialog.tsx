'use client'

import { Heading } from '@/comp/common'
import { _Sx, TRANSFORM } from '@/util/styles'
import { Opening } from '@hoologic/use-opening'
import { Close } from '@mui/icons-material'
import { Box, IconButton, Dialog as MuiDialog } from '@mui/material'
import Image from 'next/image'
import { FC, MouseEvent, ReactNode } from 'react'

// types

type _DialogProps = { children: ReactNode; close?: any; h1: string; h2?: string; message?: string; opening: Opening }

// constants

const LOCAL: _Sx = {
  close: { color: 'inherit', m: 0.25, transition: TRANSFORM },
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: 1.5,
      display: 'flex',
      height: 600,
      justifyContent: 'space-between',
      letterSpacing: 0,
      lineHeight: 'normal',
      overflow: 'hidden',
      padding: 0,
      WebkitFontSmoothing: 'auto',
      width: 594
    }
  },
  heading: { mb: 1, ml: 2, mt: 2 },
  headingAndClose: { alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }
}

// components

export const Dialog: FC<_DialogProps> = ({ children, close, h1, h2, message, opening }) => {
  const handleClick = (event: MouseEvent) => event.stopPropagation()

  return (
    <MuiDialog onClick={handleClick} onClose={close || opening.close} open={opening.isOpen} sx={LOCAL.dialog}>
      <Image alt="background" height={600} src="/background.jpg" style={{ opacity: 0.1, position: 'absolute' }} unoptimized width={594} />

      <Box sx={LOCAL.headingAndClose}>
        <Heading h1={h1} h2={h2} message={message} sx={LOCAL.heading} />

        <IconButton onClick={close || opening.close} size="large" sx={LOCAL.close}>
          <Close />
        </IconButton>
      </Box>

      {children}
    </MuiDialog>
  )
}
