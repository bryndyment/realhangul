'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { _Sx, BLACK, SECONDARY } from '@/util/styles'
import { Box, Checkbox, InputLabel } from '@mui/material'
import { ChangeEvent, FC, MouseEvent } from 'react'

// constants

const LOCAL: _Sx = {
  checkbox: { '&.Mui-checked': { color: SECONDARY }, p: 0 },
  inputLabel: { color: BLACK, cursor: 'pointer', fontSize: 14, fontWeight: 700, ml: 0.875, py: 0.5, textTransform: 'uppercase' },
  option: { alignItems: 'center', display: 'flex' },
  options: { background: 'linear-gradient(to right, white 20%, rgba(255, 255, 255, 0))', borderRadius: 1, px: 2.625, py: 1 }
}

const MESSAGE: { [key: string]: string } = {
  isContinuousPlayHelp: 'If checked, your score never resets; otherwise, it resets each time you complete a set.',
  isRandomOrderHelp: 'If checked, the kana are reshuffled each time you complete a set; otherwise, they’re always shown in the same order.',
  isRepeatProblemHangulHelp: 'If checked, kana guessed incorrectly are shown again at a random point later in the set. Your score is not affected.',
  isSpeedModeHelp: 'If checked, typing a vowel (or ‘n’ for ん) automatically submits your guess; otherwise, use the spacebar to submit it.'
}

// components

export const Options: FC = () => {
  const { isContinuousPlay, isRandomOrder, isRepeatProblemHangul, isSpeedMode, updateContext } = useAppContext()

  const handleChange = (event: ChangeEvent) => updateContext({ [(event as any).target.id]: (event as any).target.checked })

  const hideMessage = () => updateContext({ isMessageShowing: false })

  const showMessage = (event: MouseEvent) => updateContext({ isMessageShowing: true, message: MESSAGE[`${(event as any).currentTarget.htmlFor}Help`] })

  return (
    <Box sx={LOCAL.options}>
      <Box sx={LOCAL.option}>
        <Checkbox checked={isContinuousPlay} id="isContinuousPlay" onChange={handleChange} size="small" sx={LOCAL.checkbox} />

        <InputLabel htmlFor="isContinuousPlay" onMouseOut={hideMessage} onMouseOver={showMessage} sx={LOCAL.inputLabel}>
          Continuous Play
        </InputLabel>
      </Box>

      <Box sx={LOCAL.option}>
        <Checkbox checked={isRandomOrder} id="isRandomOrder" onChange={handleChange} size="small" sx={LOCAL.checkbox} />

        <InputLabel htmlFor="isRandomOrder" onMouseOut={hideMessage} onMouseOver={showMessage} sx={LOCAL.inputLabel}>
          Random Order
        </InputLabel>
      </Box>

      <Box sx={LOCAL.option}>
        <Checkbox checked={isRepeatProblemHangul} id="isRepeatProblemHangul" onChange={handleChange} size="small" sx={LOCAL.checkbox} />

        <InputLabel htmlFor="isRepeatProblemHangul" onMouseOut={hideMessage} onMouseOver={showMessage} sx={LOCAL.inputLabel}>
          Repeat Problem Kana
        </InputLabel>
      </Box>

      <Box sx={LOCAL.option}>
        <Checkbox checked={isSpeedMode} id="isSpeedMode" onChange={handleChange} size="small" sx={LOCAL.checkbox} />

        <InputLabel htmlFor="isSpeedMode" onMouseOut={hideMessage} onMouseOver={showMessage} sx={LOCAL.inputLabel}>
          Speed Mode
        </InputLabel>
      </Box>
    </Box>
  )
}
