'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { ALL_HANGUL, calculate, clickCheckbox, HANGUL_LABELS } from '@/util/common'
import { _Sx, GRAY, SECONDARY, zMobileMediaQuery } from '@/util/styles'
import { Box, Checkbox, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { FC, MouseEvent } from 'react'

// types
type _CheckboxesProps = { columns: number; stateKey: string; stateValue: number }
type _HangulCell = { hangul: string; label: string | undefined }
type _HangulProps = {
  columns: number
  hangulPageId: string
  rangeEnd: number
  rangeStart: number
}
type _RowsProps = {
  hangulPageId: string
  rows: _HangulCell[]
}

// constants
const LOCAL: _Sx = {
  cellHangul: { [zMobileMediaQuery]: { minWidth: 34 } },
  checkbox: { '&.Mui-checked': { color: SECONDARY }, p: 0 },
  checkboxCell: {
    '&:last-child': { borderRight: 'none' },
    borderBottom: 'none',
    borderRight: `1px solid ${GRAY[200]}`,
    fontSize: 15,
    lineHeight: 1,
    pb: 1.25,
    pt: 1,
    px: 0,
    textAlign: 'center'
  },
  hangulCell: {
    '&:last-child': { borderRight: 'none' },
    borderBottom: 'none',
    borderRight: `1px solid ${GRAY[200]}`,
    lineHeight: 1,
    pb: 0.75,
    pt: 1,
    px: 0,
    textAlign: 'center'
  }
}

// components
const Checkboxes: FC<_CheckboxesProps> = ({ columns, stateKey, stateValue }) => {
  const { updateContext } = useAppContext()

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()

    updateContext({ [stateKey]: calculate('#top table input') })
  }

  let counter = columns
  let decrementer = stateValue

  const checkboxes = [...Array(columns)].map((_, index) => {
    const power = 2 ** --counter

    if (decrementer >= power) {
      decrementer -= power

      return (
        <TableCell key={index} onClick={clickCheckbox} sx={LOCAL.checkboxCell}>
          <Checkbox checked={true} onClick={handleClick} size="small" sx={LOCAL.checkbox} />
        </TableCell>
      )
    }

    return (
      <TableCell key={index} onClick={clickCheckbox} sx={LOCAL.checkboxCell}>
        <Checkbox checked={false} onClick={handleClick} size="small" sx={LOCAL.checkbox} />
      </TableCell>
    )
  })

  return <TableRow sx={{ textAlign: 'center' }}>{checkboxes.reverse()}</TableRow>
}

export const Hangul: FC<_HangulProps> = ({ columns, hangulPageId, rangeEnd, rangeStart }) => {
  const context = useAppContext()
  const value = context[hangulPageId as keyof typeof context]
  const rows = ALL_HANGUL.slice(rangeStart, rangeEnd).map(hangul => ({
    hangul,
    label: HANGUL_LABELS.get(hangul)
  }))

  return (
    <Box
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 1,
        cursor: 'pointer',
        my: 1.5,
        overflowX: 'scroll',
        textAlign: 'center',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <Table sx={{ borderCollapse: 'separate', width: '100%' }}>
        <TableBody>
          <Rows hangulPageId={hangulPageId} rows={rows} />

          <Checkboxes columns={columns} stateKey={hangulPageId} stateValue={typeof value === 'number' ? value : 0} />
        </TableBody>
      </Table>
    </Box>
  )
}

const Rows: FC<_RowsProps> = ({ hangulPageId, rows }) => (
  <>
    {rows.map((row, index) => (
      <TableRow key={index}>
        <HangulCell cell={row} hangulPageId={hangulPageId} />
      </TableRow>
    ))}
  </>
)

const HangulCell: FC<{ cell: _HangulCell; hangulPageId: string }> = ({ cell }) => (
  <TableCell onClick={clickCheckbox} sx={{ ...LOCAL.hangulCell }}>
    <Box sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      <Typography>{cell.hangul}</Typography>
    </Box>

    <Box fontSize={15} sx={{ color: GRAY[500], mt: 0.5 }}>
      {cell.label}
    </Box>
  </TableCell>
)
