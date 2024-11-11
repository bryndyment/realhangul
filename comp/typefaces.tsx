'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { calculate } from '@/util/common'
import { _Sx, SECONDARY } from '@/util/styles'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

// types

type _TypefaceProps = { checked: boolean; index: number }

// constants

const LOCAL: _Sx = {
  checkbox: { '&.Mui-checked': { color: SECONDARY }, mt: 0.875, p: 0 },
  label: { flexDirection: 'column-reverse', mx: 0 },
  typefaces: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 1,
    display: 'flex',
    height: 107,
    justifyContent: 'space-between',
    my: 2,
    overflowX: 'scroll',
    pt: 1.75,
    WebkitOverflowScrolling: 'touch'
  }
}

// components

const Typeface: FC<_TypefaceProps> = ({ checked, index }) => {
  const { updateContext } = useAppContext()

  const handleClick = () => updateContext({ typefaces: calculate('#typefaces input') })

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onClick={handleClick} size="small" sx={LOCAL.checkbox} />}
      label={<Image alt={`typeface ${9 - index}`} height={47} src={`/typeface-${9 - index}.png`} unoptimized width={62} />}
      sx={LOCAL.label}
    />
  )
}

export const Typefaces: FC = () => {
  const { typefaces } = useAppContext()

  let counter = 9
  let decrementer = typefaces

  return (
    <Box id="typefaces" sx={LOCAL.typefaces}>
      {[...Array(counter)]
        .map((_, index) => {
          const power = 2 ** --counter
          const checked = decrementer >= power

          if (checked) {
            decrementer -= power
          }

          return <Typeface checked={checked} index={index} key={index} />
        })
        .reverse()}
    </Box>
  )
}
