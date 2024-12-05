'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { calculate, HangulGroups, scale, scaleOff } from '@/util/common'
import { LINK } from '@/util/styles'
import { Box } from '@mui/material'
import { FC } from 'react'

// types

type _AllChecked = { [key: string]: number }
type _CheckUncheckAllProps = { hangulPageId: HangulGroups }

// constants

const ALL_CHECKED: _AllChecked = {
  hiragana: 65535,
  hiraganaDouble: 4095,
  katakana: 65535,
  katakanaDouble: 4095,
  katakanaExtended: 16383,
  katakanaWords: 31,
  words: 31
}

// components

export const CheckUncheckAll: FC<_CheckUncheckAllProps> = ({ hangulPageId }) => {
  const context = useAppContext()

  const handleClick = () => {
    document.querySelectorAll<HTMLInputElement>('#kana input').forEach(elem => (elem.checked = check))

    context.updateContext({ [hangulPageId]: calculate('#top table input') })
  }

  const check = context[hangulPageId] !== ALL_CHECKED[hangulPageId]

  if (check) {
    return (
      <Box component="span" onClick={handleClick} onMouseOut={scaleOff} onMouseOver={scale} sx={LINK.mainButtonWhite}>
        Check All
      </Box>
    )
  }

  return (
    <Box component="span" onClick={handleClick} onMouseOut={scaleOff} onMouseOver={scale} sx={LINK.mainButtonWhite}>
      Uncheck All
    </Box>
  )
}
