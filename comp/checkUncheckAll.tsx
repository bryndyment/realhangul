'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { calculate, KanaGroups, scale, scaleOff } from '@/util/common'
import { LINK } from '@/util/styles'
import { Box } from '@mui/material'
import { FC } from 'react'

// types

type _AllChecked = { [key: string]: number }
type _CheckUncheckAllProps = { kanaPageId: KanaGroups }

// constants

const ALL_CHECKED: _AllChecked = {
  hiragana: 65535,
  hiraganaDouble: 4095,
  hiraganaWords: 31,
  katakana: 65535,
  katakanaDouble: 4095,
  katakanaExtended: 16383,
  katakanaWords: 31
}

// components

export const CheckUncheckAll: FC<_CheckUncheckAllProps> = ({ kanaPageId }) => {
  const context = useAppContext()

  const handleClick = () => {
    document.querySelectorAll<HTMLInputElement>('#kana input').forEach(elem => (elem.checked = check))

    context.updateContext({ [kanaPageId]: calculate('#top table input') })
  }

  const check = context[kanaPageId] !== ALL_CHECKED[kanaPageId]

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
